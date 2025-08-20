import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Stack,
  Divider,
  useTheme, // Import useTheme hook
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion"; // Import motion for animations

const Contact = () => {
  const theme = useTheme(); // Access the theme palette
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      // It's good practice to use environment variables for API URLs
      // For example: process.env.REACT_APP_API_URL/contact
      const res = await axios.post("http://localhost:8157/contact", formData);
      setFeedback({ type: "success", message: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" }); // Clear form on success
    } catch (err) {
      console.error("Error sending contact message:", err); // Log the error for debugging
      setFeedback({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const infoVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
    },
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 6 },
        bgcolor: theme.palette.background.default, // Use dark background
        color: theme.palette.text.primary, // Primary text color
        minHeight: "80vh", // Ensure it takes up enough vertical space
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
        <title>BookBarn | Contact Us</title>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Typography
              variant="h3"
              component="h2"
              fontWeight="bold"
              color={theme.palette.primary.main} // Primary color for heading
              gutterBottom
              sx={{
                textShadow: `0 0 10px ${theme.palette.primary.main}66`, // Subtle glow
              }}
            >
              Get in Touch
            </Typography>
            <Typography
              variant="body1"
              color={theme.palette.text.secondary} // Secondary text color for description
              maxWidth={700} // Slightly wider description
              mx="auto"
              sx={{ lineHeight: 1.6 }}
            >
              We'd love to hear from you. Whether you have a question, feedback,
              or just want to say hello, our inbox is always open. Your insights
              help us make BookBarn even better!
            </Typography>
          </motion.div>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
          gap={{ xs: 6, md: 8 }} // Increased gap for visual separation
          alignItems="start"
        >
          {/* Contact Form */}
          <Box
            component={motion.form} // Animate the form
            variants={formVariants}
            initial="hidden"
            animate="visible"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{
              bgcolor: theme.palette.background.paper, // Dark paper background for cards
              p: { xs: 4, md: 5 }, // Increased padding
              borderRadius: 3, // Consistent border radius
              // Custom shadow for paper, similar to what's defined in theme.js for MuiPaper
              boxShadow: `0 8px 20px rgba(0, 0, 0, 0.5), inset 0 0 4px rgba(0, 0, 0, 0.2)`,
              display: "flex",
              flexDirection: "column",
              gap: 3, // Consistent gap between form fields
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              color={theme.palette.secondary.main}
              mb={1}
            >
              Send Us a Message
            </Typography>
            <TextField
              required
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              variant="outlined" // Use outlined variant for dark themes
              InputLabelProps={{
                style: { color: theme.palette.text.secondary },
              }} // Label color
              InputProps={{
                style: {
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.divider,
                },
              }} // Input text color
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },
              }} // Outline border color
            />
            <TextField
              required
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                style: { color: theme.palette.text.secondary },
              }}
              InputProps={{
                style: {
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.divider,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },
              }}
            />
            <TextField
              required
              label="Message"
              name="message"
              multiline
              rows={5}
              value={formData.message}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                style: { color: theme.palette.text.secondary },
              }}
              InputProps={{
                style: {
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.divider,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },
              }}
            />
            {feedback && (
              <Typography
                color={
                  feedback.type === "error"
                    ? theme.palette.error.main
                    : theme.palette.success.main
                }
                sx={{ mt: 1 }}
              >
                {feedback.message}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 2, // More margin
                fontWeight: "bold",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText, // Ensure text is visible on button
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                  boxShadow:
                    theme.components.MuiButton.styleOverrides.root["&:hover"]
                      .boxShadow,
                  transform:
                    theme.components.MuiButton.styleOverrides.root["&:hover"]
                      .transform,
                },
                "&.Mui-disabled": {
                  // Style for disabled state
                  backgroundColor: theme.palette.action.disabledBackground,
                  color: theme.palette.action.disabled,
                },
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </Box>

          {/* Contact Information */}
          <Box
            component={motion.div} // Animate the info box
            variants={infoVariants}
            initial="hidden"
            animate="visible"
            sx={{
              bgcolor: theme.palette.background.paper, // Dark paper background
              p: { xs: 4, md: 5 }, // Increased padding
              borderRadius: 3,
              boxShadow: `0 8px 20px rgba(0, 0, 0, 0.5), inset 0 0 4px rgba(0, 0, 0, 0.2)`,
              display: "flex",
              flexDirection: "column",
              gap: 2, // Consistent gap between info items
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              color={theme.palette.secondary.main}
              gutterBottom
            >
              Contact Information
            </Typography>
            <Typography variant="body1" color={theme.palette.text.primary}>
              <strong>Email:</strong>{" "}
              <Link
                href="mailto:support@bookbarn.com"
                color={theme.palette.primary.light}
                underline="hover"
              >
                support@bookbarn.com
              </Link>
            </Typography>
            <Typography variant="body1" color={theme.palette.text.primary}>
              <strong>Phone:</strong>{" "}
              <Link
                href="tel:+8801670415337"
                color={theme.palette.primary.light}
                underline="hover"
              >
                +880 1670 415337
              </Link>
            </Typography>
            <Typography variant="body1" color={theme.palette.text.primary}>
              <strong>Address:</strong>{" "}
              <Link
                href="https://maps.app.goo.gl/YourMapLink"
                target="_blank"
                rel="noopener noreferrer"
                color={theme.palette.primary.light}
                underline="hover"
              >
                East Delta University, Chattogram, Bangladesh
              </Link>
            </Typography>
            <Divider sx={{ my: 3, borderColor: theme.palette.divider }} />{" "}
            {/* Darker divider */}
            <Typography
              variant="h6"
              fontWeight="medium"
              color={theme.palette.text.primary}
              gutterBottom
            >
              Connect With Us
            </Typography>
            <Stack direction="row" spacing={3}>
              <Link
                href="https://www.facebook.com/bookbarn"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color={theme.palette.primary.light}
                sx={{ fontWeight: "medium" }}
              >
                Facebook
              </Link>
              <Link
                href="https://www.instagram.com/bookbarn"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color={theme.palette.primary.light}
                sx={{ fontWeight: "medium" }}
              >
                Instagram
              </Link>
              <Link
                href="https://twitter.com/bookbarn"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color={theme.palette.primary.light}
                sx={{ fontWeight: "medium" }}
              >
                Twitter
              </Link>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
