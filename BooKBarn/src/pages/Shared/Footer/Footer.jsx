import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Tooltip,
  useTheme, // Import useTheme hook
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { motion } from "framer-motion";

const Footer = () => {
  const theme = useTheme(); // Access the theme palette

  const socialIcons = [
    {
      href: "https://facebook.com",
      label: "Facebook",
      icon: <FacebookIcon />,
      // Using theme colors for hover, or close approximations for distinct brands
      hoverColor: theme.palette.secondary.light, // A bright, but soft teal
    },
    {
      href: "https://twitter.com", // Or X
      label: "Twitter / X",
      icon: <TwitterIcon />,
      hoverColor: theme.palette.primary.light, // A bright, but soft purple
    },
    {
      href: "mailto:youremail@example.com",
      label: "Email",
      icon: <EmailIcon />,
      hoverColor: theme.palette.secondary.main, // Main teal
    },
    {
      href: "https://linkedin.com",
      label: "LinkedIn",
      icon: <LinkedInIcon />,
      hoverColor: theme.palette.primary.main, // Main purple
    },
  ];

  return (
    <Box
      component={motion.footer}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      sx={{
        backgroundColor: theme.palette.background.paper, // Use a dark paper background
        // Or a custom slightly darker shade for deeper footer feel
        // backgroundColor: '#1A1A1A',
        color: theme.palette.text.primary, // Main text color for footer content
        py: { xs: 4, md: 6 }, // Increased vertical padding
        mt: 12, // Increased top margin to separate from content
        borderRadius: "20px 20px 0 0", // More pronounced rounded top corners
        // Softer, more contained shadow with a subtle glow
        boxShadow: `0 -8px 25px rgba(0, 0, 0, 0.6), 0 0 20px ${theme.palette.secondary.dark}08`,
        borderTop: `1px solid ${theme.palette.divider}`, // Subtle top border
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: { xs: 4, md: 5 }, // Increased gap for better spacing
          fontSize: "1rem", // Slightly larger base font size
        }}
      >
        {/* Copyright */}
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="body1" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
            &copy; {new Date().getFullYear()} BookBarn. All rights reserved.
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary, // Secondary text color
              fontSize: "0.8rem", // Slightly larger caption
              display: "block",
              mt: 1, // More margin
            }}
          >
            Crafted with{" "}
            <Box
              component="span"
              sx={{ color: theme.palette.primary.main, fontWeight: "bold" }} // Use primary color for heart
            >
              ♥
            </Box>{" "}
            for Readers
          </Typography>
        </Box>

        {/* Page Links */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 2.5, sm: 4 }, // Adjusted gap for links
            flexWrap: "wrap",
            justifyContent: "center",
            "& a": {
              color: theme.palette.text.secondary, // Links initially secondary text color
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "1rem", // Standard link font size
              position: "relative",
              transition: "color 0.3s ease-in-out",
              "&:hover": {
                color: theme.palette.primary.light, // Hover color from primary light
              },
              "&::after": {
                content: '""',
                position: "absolute",
                width: "0%",
                height: "2px",
                bottom: "-6px", // Further below the text
                left: 0,
                backgroundColor: theme.palette.primary.main, // Underline color from primary main
                transition: "width 0.3s ease-in-out",
                borderRadius: "2px",
              },
              "&:hover::after": {
                width: "100%",
              },
            },
          }}
        >
          <Link href="/">Home</Link>
          <Link href="/about-us-page">About</Link>
          <Link href="/soon-on">Soon On</Link>
          {/* Add more relevant links if any */}
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </Box>

        {/* Social Media Icons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}> {/* Increased gap */}
          {socialIcons.map((item) => (
            <Tooltip title={item.label} placement="top" key={item.label} arrow>
              <IconButton
                component="a"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                sx={{
                  color: theme.palette.text.secondary, // Icon color initially secondary text
                  backgroundColor: "rgba(30, 30, 30, 0.4)", // Slightly more opaque dark background
                  borderRadius: "50%", // Make icons perfectly round
                  padding: "10px", // Slightly larger touch area
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    color: item.hoverColor, // Specific hover color
                    backgroundColor: "rgba(30, 30, 30, 0.6)", // Darker on hover
                    transform: "translateY(-3px) scale(1.05)", // Gentle lift and scale
                    // Softer, more focused glow
                    boxShadow: `0 0 10px ${item.hoverColor}40, 0 0 20px ${item.hoverColor}20`,
                  },
                }}
              >
                {item.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;