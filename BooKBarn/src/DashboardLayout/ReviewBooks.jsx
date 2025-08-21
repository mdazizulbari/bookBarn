import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  Box,
  Rating,
} from "@mui/material";

const ReviewBooks = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { register, handleSubmit, reset, setValue } = useForm();

  // Theme colors from Books component
  const primaryMain = "#1e88e5";
  const backgroundPaper = "#121212";
  const textPrimary = "#e0e0e0";
  const textSecondary = "#a0a0a0";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch purchased books
        const billingsRes = await axios.get(
          `http://localhost:8157/billings?email=${user.email}`
        );
        const books = billingsRes.data.flatMap((billing) => billing.items);
        setPurchasedBooks(books);

        // Fetch reviews to check for duplicates
        const reviewsRes = await axios.get("http://localhost:8157/reviews");
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user?.email) fetchData();
  }, [user?.email]);

  const onSubmit = async (data, book) => {
    if (!data.rating) {
      Swal.fire("❌ Error", "Rating is required", "error");
      return;
    }

    const reviewData = {
      bookId: book.bookId,
      avatar: user.photoURL,
      title: book.title,
      email: user.email,
      name: user.displayName,
      message: data.message,
      rating: data.rating,
      created_at: new Date().toISOString(),
    };

    try {
      const res = await axios.post("http://localhost:8157/reviews", reviewData);
      if (res.data.insertedId) {
        Swal.fire("✅ Success", "Review added successfully!", "success");
        setReviews([...reviews, reviewData]);
        reset();
      }
    } catch (error) {
      console.error("Error adding review:", error);
      Swal.fire(
        "❌ Error",
        error.response?.data?.message || "Failed to add review",
        "error"
      );
    }
  };

  return (
    <Container
      sx={{
        py: { xs: 2, sm: 3, md: 4 }, // Responsive padding
        px: { xs: 1, sm: 2, md: 3 },
        backgroundColor: backgroundPaper,
        borderRadius: { xs: 1, sm: 2 },
        minHeight: "80vh",
        color: textPrimary,
        maxWidth: "lg",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: primaryMain,
          mb: { xs: 2, sm: 3 },
          fontWeight: "bold",
          textAlign: "center",
          fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" }, // Responsive font size
        }}
      >
        Review Your Purchased Books
      </Typography>

      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        {purchasedBooks.length > 0 ? (
          purchasedBooks.map((book, index) => {
            const hasReviewed = reviews.some(
              (review) =>
                review.bookId === book.bookId && review.email === user.email
            );

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={`${book.bookId}-${index}`}
              >
                <Card
                  sx={{
                    backgroundColor: "#1e1e1e",
                    color: textPrimary,
                    borderRadius: 1,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={book.image}
                    alt={book.title}
                    sx={{
                      aspectRatio: "3/4", // Maintain consistent image ratio
                      objectFit: "cover",
                      height: "auto",
                      maxHeight: { xs: "100px", sm: "120px", md: "140px" }, // Responsive height
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      p: { xs: 1, sm: 2 }, // Responsive padding
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        mb: 1,
                      }}
                    >
                      {book.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: textSecondary,
                        fontSize: { xs: "0.8rem", sm: "0.875rem" },
                      }}
                    >
                      Author: {book.author}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: textSecondary,
                        fontSize: { xs: "0.8rem", sm: "0.875rem" },
                      }}
                    >
                      Price: BDT {book.price.toLocaleString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: textSecondary,
                        fontSize: { xs: "0.8rem", sm: "0.875rem" },
                      }}
                    >
                      Purchased: {book.quantity}
                    </Typography>

                    {!hasReviewed ? (
                      <Box
                        component="form"
                        onSubmit={handleSubmit((data) => onSubmit(data, book))}
                        sx={{ mt: { xs: 1, sm: 2 } }}
                      >
                        <TextField
                          label="Your Name"
                          fullWidth
                          margin="normal"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: "#1e1e1e",
                              "& fieldset": { borderColor: primaryMain },
                              "&:hover fieldset": { borderColor: "#42a5f5" },
                              "&.Mui-focused fieldset": {
                                borderColor: primaryMain,
                              },
                              fontSize: { xs: "0.8rem", sm: "0.875rem" },
                            },
                            "& .MuiInputLabel-root": {
                              color: primaryMain,
                              fontSize: { xs: "0.8rem", sm: "0.875rem" },
                            },
                            "& .MuiInputBase-input": {
                              color: textPrimary,
                              padding: { xs: "8px", sm: "12px" }, // Touch-friendly
                            },
                          }}
                        />
                        <TextField
                          label="Review Message"
                          fullWidth
                          margin="normal"
                          multiline
                          rows={2}
                          {...register("message", {
                            required: "Message is required",
                          })}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: "#1e1e1e",
                              "& fieldset": { borderColor: primaryMain },
                              "&:hover fieldset": { borderColor: "#42a5f5" },
                              "&.Mui-focused fieldset": {
                                borderColor: primaryMain,
                              },
                              fontSize: { xs: "0.8rem", sm: "0.875rem" },
                            },
                            "& .MuiInputLabel-root": {
                              color: primaryMain,
                              fontSize: { xs: "0.8rem", sm: "0.875rem" },
                            },
                            "& .MuiInputBase-input": {
                              color: textPrimary,
                              padding: { xs: "8px", sm: "12px" },
                            },
                          }}
                        />
                        <Box sx={{ mt: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: textSecondary,
                              fontSize: { xs: "0.8rem", sm: "0.875rem" },
                            }}
                          >
                            Rating
                          </Typography>
                          <Rating
                            name="rating"
                            onChange={(event, value) =>
                              setValue("rating", value)
                            }
                            sx={{
                              color: primaryMain,
                              "& .MuiRating-icon": {
                                fontSize: { xs: "1.2rem", sm: "1.5rem" }, // Touch-friendly
                              },
                            }}
                          />
                        </Box>
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          sx={{
                            mt: 2,
                            backgroundColor: primaryMain,
                            "&:hover": { backgroundColor: "#42a5f5" },
                            color: "#fff",
                            fontSize: { xs: "0.8rem", sm: "0.875rem" },
                            py: { xs: 1, sm: 1.5 }, // Touch-friendly
                          }}
                        >
                          Submit Review
                        </Button>
                      </Box>
                    ) : (
                      <Typography
                        sx={{
                          mt: 2,
                          color: textSecondary,
                          fontSize: { xs: "0.8rem", sm: "0.875rem" },
                        }}
                      >
                        You have already reviewed this book.
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Typography
            sx={{
              mt: 4,
              color: textSecondary,
              textAlign: "center",
              width: "100%",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            No purchased books found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default ReviewBooks;
