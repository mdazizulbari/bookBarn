import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import axios from "axios";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8157/contact"); // Your API URL to get messages
        setMessages(res.data || []);
        setError("");
      } catch (err) {
        setError("Failed to load messages.");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (loading)
    return (
      <Box sx={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center", color: "error.main" }}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );

  if (messages.length === 0)
    return (
      <Box sx={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6">No messages found.</Typography>
      </Box>
    );

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}>
        Contact Messages
      </Typography>

      <Paper>
        <List>
          {messages.map(({ _id, name, email, message }, i) => (
            <React.Fragment key={_id || i}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={`${name} (${email})`}
                  secondary={message}
                  sx={{ whiteSpace: "pre-line" }}
                />
              </ListItem>
              {i !== messages.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
