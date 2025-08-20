import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProviders";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
} from "@mui/material";

const AddBook = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Categories from Books component
  const categories = [
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
  ];

  // Conditions for dropdown
  const conditions = ["new", "used"];

  const onSubmit = async (data) => {
    const bookData = {
      ...data,
      sellerEmail: user.email,
      orderCount: 0, // Default
      created_at: new Date().toISOString(),
    };

    try {
      const res = await axios.post("http://localhost:8157/books", bookData);
      if (res.data.insertedId) {
        Swal.fire("✅ Success", "Book added successfully!", "success");
        reset();
      }
    } catch (err) {
      console.error("Error adding book:", err);
      Swal.fire(
        "❌ Error",
        err.response?.data?.message || "Failed to add book",
        "error"
      );
    }
  };

  // Theme colors from Books component
  const primaryMain = "#1e88e5";
  const primaryLight = "#42a5f5";
  const backgroundPaper = "#121212";
  const textPrimary = "#e0e0e0";

  return (
    <Container
      sx={{
        py: 4,
        backgroundColor: backgroundPaper,
        borderRadius: 3,
        boxShadow: `0 0 30px ${primaryMain}33, inset 0 0 15px ${primaryLight}22`,
        minHeight: "80vh",
        fontFamily: "'Inter', sans-serif",
        color: textPrimary,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: primaryMain,
          mb: 3,
          fontWeight: "bold",
          textAlign: "center",
          textShadow: `0 0 10px ${primaryLight}bb`,
        }}
      >
        Add a New Book
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        {/* Title */}
        <TextField
          label="Book Title"
          fullWidth
          margin="normal"
          {...register("title", { required: "Title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#1e1e1e",
              "& fieldset": { borderColor: primaryMain },
              "&:hover fieldset": { borderColor: primaryLight },
              "&.Mui-focused fieldset": { borderColor: primaryMain },
            },
            "& .MuiInputLabel-root": { color: primaryMain },
            "& .MuiInputBase-input": { color: textPrimary },
          }}
        />

        {/* Author */}
        <TextField
          label="Author"
          fullWidth
          margin="normal"
          {...register("author", { required: "Author is required" })}
          error={!!errors.author}
          helperText={errors.author?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#1e1e1e",
              "& fieldset": { borderColor: primaryMain },
              "&:hover fieldset": { borderColor: primaryLight },
              "&.Mui-focused fieldset": { borderColor: primaryMain },
            },
            "& .MuiInputLabel-root": { color: primaryMain },
            "& .MuiInputBase-input": { color: textPrimary },
          }}
        />

        {/* Course */}
        <TextField
          label="Course"
          fullWidth
          margin="normal"
          {...register("course", { required: "Course is required" })}
          error={!!errors.course}
          helperText={errors.course?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#1e1e1e",
              "& fieldset": { borderColor: primaryMain },
              "&:hover fieldset": { borderColor: primaryLight },
              "&.Mui-focused fieldset": { borderColor: primaryMain },
            },
            "& .MuiInputLabel-root": { color: primaryMain },
            "& .MuiInputBase-input": { color: textPrimary },
          }}
        />

        {/* Category */}
        <FormControl fullWidth margin="normal" sx={{ minWidth: 200 }}>
          <InputLabel sx={{ color: primaryMain }}>Category</InputLabel>
          <Select
            {...register("category", { required: "Category is required" })}
            error={!!errors.category}
            sx={{
              backgroundColor: "#1e1e1e",
              color: textPrimary,
              "& fieldset": { borderColor: primaryMain },
              "&:hover fieldset": { borderColor: primaryLight },
              "&.Mui-focused fieldset": { borderColor: primaryMain },
            }}
          >
            {categories.map((category) => (
              <MenuItem
                key={category}
                value={category}
                sx={{ color: textPrimary }}
              >
                {category}
              </MenuItem>
            ))}
          </Select>
          {errors.category && (
            <Typography sx={{ color: "#f44336", fontSize: "0.75rem", mt: 1 }}>
              {errors.category.message}
            </Typography>
          )}
        </FormControl>

        {/* Condition */}
        <FormControl fullWidth margin="normal" sx={{ minWidth: 200 }}>
          <InputLabel sx={{ color: primaryMain }}>Condition</InputLabel>
          <Select
            {...register("condition", { required: "Condition is required" })}
            error={!!errors.condition}
            sx={{
              backgroundColor: "#1e1e1e",
              color: textPrimary,
              "& fieldset": { borderColor: primaryMain },
              "&:hover fieldset": { borderColor: primaryLight },
              "&.Mui-focused fieldset": { borderColor: primaryMain },
            }}
          >
            {conditions.map((condition) => (
              <MenuItem
                key={condition}
                value={condition}
                sx={{ color: textPrimary }}
              >
                {condition}
              </MenuItem>
            ))}
          </Select>
          {errors.condition && (
            <Typography sx={{ color: "#f44336", fontSize: "0.75rem", mt: 1 }}>
              {errors.condition.message}
            </Typography>
          )}
        </FormControl>

        {/* Image URL */}
        <TextField
          label="Image URL"
          fullWidth
          margin="normal"
          {...register("image", { required: "Image URL is required" })}
          error={!!errors.image}
          helperText={errors.image?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#1e1e1e",
              "& fieldset": { borderColor: primaryMain },
              "&:hover fieldset": { borderColor: primaryLight },
              "&.Mui-focused fieldset": { borderColor: primaryMain },
            },
            "& .MuiInputLabel-root": { color: primaryMain },
            "& .MuiInputBase-input": { color: textPrimary },
          }}
        />

        {/* Price */}
        <TextField
          label="Price (BDT)"
          type="number"
          fullWidth
          margin="normal"
          {...register("price", {
            required: "Price is required",
            min: { value: 1, message: "Price must be positive" },
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#1e1e1e",
              "& fieldset": { borderColor: primaryMain },
              "&:hover fieldset": { borderColor: primaryLight },
              "&.Mui-focused fieldset": { borderColor: primaryMain },
            },
            "& .MuiInputLabel-root": { color: primaryMain },
            "& .MuiInputBase-input": { color: textPrimary },
          }}
        />

        {/* Quantity */}
        <TextField
          label="Quantity"
          type="number"
          fullWidth
          margin="normal"
          {...register("quantity", {
            required: "Quantity is required",
            min: { value: 1, message: "Quantity must be at least 1" },
          })}
          error={!!errors.quantity}
          helperText={errors.quantity?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#1e1e1e",
              "& fieldset": { borderColor: primaryMain },
              "&:hover fieldset": { borderColor: primaryLight },
              "&.Mui-focused fieldset": { borderColor: primaryMain },
            },
            "& .MuiInputLabel-root": { color: primaryMain },
            "& .MuiInputBase-input": { color: textPrimary },
          }}
        />

        {/* Location */}
        <TextField
          label="Location"
          fullWidth
          margin="normal"
          {...register("location", { required: "Location is required" })}
          error={!!errors.location}
          helperText={errors.location?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#1e1e1e",
              "& fieldset": { borderColor: primaryMain },
              "&:hover fieldset": { borderColor: primaryLight },
              "&.Mui-focused fieldset": { borderColor: primaryMain },
            },
            "& .MuiInputLabel-root": { color: primaryMain },
            "& .MuiInputBase-input": { color: textPrimary },
          }}
        />

        {/* Book Description */}
        <TextField
          label="Book Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          {...register("bookDescription", {
            required: "Description is required",
          })}
          error={!!errors.bookDescription}
          helperText={errors.bookDescription?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#1e1e1e",
              "& fieldset": { borderColor: primaryMain },
              "&:hover fieldset": { borderColor: primaryLight },
              "&.Mui-focused fieldset": { borderColor: primaryMain },
            },
            "& .MuiInputLabel-root": { color: primaryMain },
            "& .MuiInputBase-input": { color: textPrimary },
          }}
        />

        {/* Submit Button */}
        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: primaryMain,
              "&:hover": { backgroundColor: primaryLight },
              color: "#fff",
              fontWeight: "bold",
              py: 1.5,
              borderRadius: 2,
            }}
          >
            Add Book 🚀
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddBook;
