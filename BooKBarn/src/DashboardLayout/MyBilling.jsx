import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Paper, Stack, Divider } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../Providers/AuthProviders";
import toast from "react-hot-toast";

export default function Billings() {
  const { user } = useContext(AuthContext);
  const [billings, setBillings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    axios
      .get(`http://localhost:8157/billings?email=${user.email}`)
      .then((res) => {
        setBillings(res.data);
      })
      .catch(() => {
        toast.error("Failed to load billing history");
      })
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (loading) return <Typography>Loading billing history...</Typography>;

  if (billings.length === 0)
    return (
      <Typography textAlign="center" mt={4} color="text.secondary">
        No billing records found.
      </Typography>
    );

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" mb={3} fontWeight="bold" color="#1976d2">
        My Purchases
      </Typography>
      <Stack spacing={4}>
        {billings.map((bill) => (
          <Paper key={bill._id} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Transaction ID: {bill.transactionId}
            </Typography>
            <Typography variant="caption" color="text.secondary" mb={2} display="block">
              Purchased on: {new Date(bill.purchasedAt).toLocaleString()}
            </Typography>
            <Stack spacing={2}>
              {bill.items.map((item, index) => (
                <Box key={index}>
                  <Typography fontWeight="bold">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Author: {item.author}
                  </Typography>
                  <Typography>
                    Price: ৳{item.price.toFixed(2)} × {item.quantity || 1}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
