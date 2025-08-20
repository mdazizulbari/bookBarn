import React, { useEffect, useState } from "react";
import BookSearchBar from "./BookSearchBar";
import BookCard from "./BookCard";
import {
  Grid,
  Container,
  Pagination,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const Books = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mounted, setMounted] = useState(false);

  const [categories] = useState([
    "All",
    "AI",
    "Statistics",
    "Mathematics",
    "Networking",
    "Algorithms",
    "Operating Systems",
    "History",
    "Literature",
    "Drama",
    "Philosophy",
    "Business",
    "Economics",
    "Art",
    "Engineering",
  ]);

  const booksPerPage = 9;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      setBooks([]);
      try {
        const url =
          selectedCategory === "All"
            ? "http://localhost:8157/books"
            : `http://localhost:8157/books/category/${selectedCategory}`;
        const res = await axios.get(url);
        setBooks(res.data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      }
    };
    fetchBooks();
  }, [selectedCategory]);

  // Remove deleted book from UI instantly
  const handleDelete = (deletedBookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== deletedBookId));
  };

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.course}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Colors for dark theme
  const primaryMain = "#1e88e5";
  const primaryLight = "#42a5f5";
  const backgroundPaper = "#121212";
  const backgroundDefault = "#1e1e1e";
  const textPrimary = "#e0e0e0";
  const textSecondary = "#a0a0a0";

  return (
    <Container
      sx={{
        py: 4,
        backgroundColor: backgroundPaper,
        borderRadius: 3,
        boxShadow: `0 0 30px ${primaryMain}33, inset 0 0 15px ${primaryLight}22`,
        minHeight: "80vh",
        transition: "all 0.4s ease",
        transform: mounted ? "scale(1)" : "scale(0.95)",
        opacity: mounted ? 1 : 0,
        fontFamily: "'Inter', sans-serif",
        color: textPrimary,
      }}
    >
      {/* Heading */}
      <Typography
        variant="h5"
        sx={{
          color: primaryMain,
          mb: 3,
          fontWeight: "bold",
          letterSpacing: "0.05em",
          textAlign: "center",
          textShadow: `0 0 10px ${primaryLight}bb`,
        }}
      >
        Browse Books
      </Typography>

      {/* Category Dropdown */}
      <FormControl
        sx={{
          minWidth: 200,
          mb: 3,
          mx: "auto",
          display: "block",
          "& .MuiOutlinedInput-root": {
            backgroundColor: backgroundDefault,
            borderRadius: 2,
            "& fieldset": { borderColor: primaryMain },
            "&:hover fieldset": { borderColor: primaryLight },
            "&.Mui-focused fieldset": {
              borderColor: primaryMain,
              boxShadow: `0 0 8px ${primaryMain}aa`,
            },
          },
          "& .MuiInputLabel-root": {
            color: primaryMain,
            "&.Mui-focused": { color: primaryMain },
          },
        }}
        size="small"
      >
        <InputLabel id="category-select-label">Select Category</InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategory}
          onChange={handleCategoryChange}
          sx={{ color: textPrimary }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category} sx={{ color: textPrimary }}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Search Bar */}
      <BookSearchBar
        searchQuery={searchQuery}
        setSearchQuery={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
      />

      {/* Books Grid */}
      <Grid container spacing={3} justifyContent="center">
        {currentBooks.length > 0 ? (
          currentBooks.map((book, idx) => (
            <Grid item key={book._id || idx}>
              <BookCard book={book} onDelete={handleDelete} />
            </Grid>
          ))
        ) : (
          <Typography
            variant="body1"
            sx={{ mt: 4, color: textSecondary, width: "100%", textAlign: "center" }}
          >
            No books found for this category or search.
          </Typography>
        )}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            size="large"
            sx={{
              "& .Mui-selected": {
                backgroundColor: primaryMain,
                color: "#fff",
                boxShadow: `0 0 10px ${primaryMain}`,
              },
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export default Books;
