import * as React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People"; // For Users
import MessageIcon from "@mui/icons-material/Message"; // For Messages
import LocalShippingIcon from "@mui/icons-material/LocalShipping"; // For Delivery Status
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  ButtonBase,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import toast from "react-hot-toast";
import axios from "axios";

export default function SidebarDashboard() {
  const theme = useTheme();
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user?.email) {
      setIsAdmin(false);
      return;
    }
    // Fetch role from backend
    const fetchRole = async () => {
      try {
        const res = await axios.get(`http://localhost:8157/users/${user.email}`);
        setIsAdmin(res.data?.role === "admin");
      } catch (err) {
        console.error("Error fetching user role:", err);
        setIsAdmin(false);
      }
    };
    fetchRole();
  }, [user?.email]);

  // Define navItems based on role
  const navItems = isAdmin
    ? [
        { label: "Home", icon: <HomeIcon />, path: "/" },
        { label: "Users", icon: <PeopleIcon />, path: "/dashboard/users" },
        { label: "Messages", icon: <MessageIcon />, path: "/dashboard/messages" },
      ]
    : [
        { label: "Home", icon: <HomeIcon />, path: "/" },
        { label: "My Cart", icon: <ShoppingCartIcon />, path: "/dashboard/cart" },
        { label: "My Billings", icon: <ReceiptIcon />, path: "/dashboard/billings" },
        { label: "Delivery Status", icon: <LocalShippingIcon />, path: "/dashboard/delivery-status" }
      ];

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("You logged out successfully");
        navigate("/login"); // Redirect after logout
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.error("Logout error:", err);
      });
  };

  const blue = "#1976d2";
  const blueLight = "#2196f3";

  return (
    <Box sx={{ width: 240 }}>
      <Paper
        elevation={3}
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2,
          bgcolor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
        }}
      >
        {/* Top */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: "bold",
              color: blue,
              textAlign: "center",
              textShadow: `0 0 6px ${blueLight}99`,
            }}
          >
            Dashboard
          </Typography>

          <List>
            {navItems.map(({ label, icon, path }) => {
              const isActive =
                path === "/dashboard/cart"
                  ? currentPath === "/dashboard" || currentPath === "/dashboard/cart"
                  : currentPath === path;

              return (
                <NavLink key={label} to={path} style={{ textDecoration: "none" }}>
                  <ListItem
                    sx={{
                      cursor: "pointer",
                      borderRadius: 2,
                      mb: 1,
                      bgcolor: isActive ? `${blue}22` : "transparent",
                      color: isActive ? blue : theme.palette.text.primary,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: `${blueLight}22`,
                        transform: "scale(1.03)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive ? blue : theme.palette.text.secondary,
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={label}
                      primaryTypographyProps={{
                        fontWeight: isActive ? "bold" : "normal",
                      }}
                    />
                  </ListItem>
                </NavLink>
              );
            })}
          </List>
        </Box>

        {/* Logout */}
        <List>
          <ListItem
            component={ButtonBase}
            onClick={handleLogout}
            sx={{
              cursor: "pointer",
              borderRadius: 2,
              color: theme.palette.text.primary,
              "&:hover": {
                bgcolor: "#ffebee",
                color: "#d32f2f",
                transform: "scale(1.03)",
              },
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.text.secondary }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}
