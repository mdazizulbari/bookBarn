import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import toast from "react-hot-toast";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingUserId, setUpdatingUserId] = useState(null); // to track role update loading

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8157/users");
        setUsers(response.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch users");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleToggle = async (email, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    setUpdatingUserId(email);

    try {
      // Assuming your backend supports PATCH to update user role at /users/:email
      await axios.patch(`http://localhost:8157/users/${email}`, { role: newRole });

      // Update local users state after successful update
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, role: newRole } : user
        )
      );

      toast.success(`Role updated to ${newRole} for ${email}`);
    } catch (error) {
      console.error("Failed to update role:", error);
      toast.error("Failed to update role. Try again.");
    } finally {
      setUpdatingUserId(null);
    }
  };

  if (loading)
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "error.main",
        }}
      >
        <Typography variant="h6">{error}</Typography>
      </Box>
    );

  if (!users.length)
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">No users found.</Typography>
      </Box>
    );

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
      >
        User List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(({ name, email, role }) => (
              <TableRow key={email}>
                <TableCell>{name}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: role === "admin" ? "bold" : "normal",
                    color: role === "admin" ? "#e53935" : "inherit",
                  }}
                >
                  {role}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    color={role === "admin" ? "warning" : "primary"}
                    onClick={() => handleRoleToggle(email, role)}
                    disabled={updatingUserId === email}
                  >
                    {updatingUserId === email ? "Updating..." : role === "admin" ? "Make User" : "Make Admin"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
