import React from "react";
import { InputBase, Paper, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

const BookSearchBar = ({ searchQuery, setSearchQuery }) => {
  const theme = useTheme();

  const handleSubmit = (e) => e.preventDefault();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: 4,
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={6}
        sx={{
          p: "6px 12px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: 600,
          borderRadius: "40px",
          backgroundColor: theme.palette.background.default,
          boxShadow: `0 0 12px ${theme.palette.primary.main}44`,
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: `0 0 20px ${theme.palette.primary.main}88`,
          },
        }}
      >
        <InputBase
          sx={{
            ml: 2,
            flex: 1,
            fontSize: "1rem",
            color: theme.palette.text.primary,
            "& input::placeholder": {
              color: theme.palette.text.secondary,
              opacity: 0.8,
            },
          }}
          placeholder="Search by title, author, course..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputProps={{ "aria-label": "search books" }}
        />
        <IconButton type="submit" sx={{ p: "10px", color: theme.palette.primary.main }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default BookSearchBar;
