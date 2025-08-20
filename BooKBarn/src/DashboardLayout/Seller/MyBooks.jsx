import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import { AuthContext } from "../../Providers/AuthProviders";

const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [billings, setBillings] = useState([]);
  const [earnings, setEarnings] = useState({ total: 0, monthly: 0, yearly: 0 });

  // Theme colors from Books component
  const primaryMain = "#1e88e5";
  const backgroundPaper = "#121212";
  const textPrimary = "#e0e0e0";
  const textSecondary = "#a0a0a0";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch seller's books
        const booksRes = await axios.get(
          `http://localhost:8157/books?sellerEmail=${user.email}`
        );
        setBooks(booksRes.data);

        // Fetch seller's billings
        const billingsRes = await axios.get(
          `http://localhost:8157/billings?email=${user.email}`
        );
        setBillings(billingsRes.data);

        // Calculate earnings
        const now = new Date();
        const currentMonth =
          now.getFullYear() +
          "-" +
          (now.getMonth() + 1).toString().padStart(2, "0");
        const currentYear = now.getFullYear().toString();

        const earningsData = billingsRes.data.reduce(
          (acc, billing) => {
            const billingDate = new Date(billing.purchasedAt);
            const billingMonth =
              billingDate.getFullYear() +
              "-" +
              (billingDate.getMonth() + 1).toString().padStart(2, "0");
            const billingYear = billingDate.getFullYear().toString();

            const billingTotal = billing.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return {
              total: acc.total + billingTotal,
              monthly:
                acc.monthly +
                (billingMonth === currentMonth ? billingTotal : 0),
              yearly:
                acc.yearly + (billingYear === currentYear ? billingTotal : 0),
            };
          },
          { total: 0, monthly: 0, yearly: 0 }
        );

        setEarnings(earningsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user?.email) fetchData();
  }, [user?.email]);

  // Calculate total books sold and ongoing orders
  const totalBooksSold = books.reduce((sum, book) => sum + book.orderCount, 0);
  const ongoingOrders = billings
    .flatMap((billing) => billing.items)
    .filter((item) => books.some((book) => book.id === item.bookId)).length;

  return (
    <Container
      sx={{
        py: 4,
        backgroundColor: backgroundPaper,
        borderRadius: 2,
        minHeight: "80vh",
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
        }}
      >
        My Books
      </Typography>

      {/* Earnings Summary */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h6">
          Total Earnings: BDT {earnings.total.toLocaleString()}
        </Typography>
        <Typography variant="body1" sx={{ color: textSecondary }}>
          This Month: BDT {earnings.monthly.toLocaleString()}
        </Typography>
        <Typography variant="body1" sx={{ color: textSecondary }}>
          This Year: BDT {earnings.yearly.toLocaleString()}
        </Typography>
        <Typography variant="body1" sx={{ color: textSecondary, mt: 2 }}>
          Books Sold: {totalBooksSold}
        </Typography>
        <Typography variant="body1" sx={{ color: textSecondary }}>
          Ongoing Orders: {ongoingOrders}
        </Typography>
      </Box>

      {/* Books Grid */}
      <Grid container spacing={2}>
        {books.length > 0 ? (
          books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book._id}>
              <Card sx={{ backgroundColor: "#1e1e1e", color: textPrimary }}>
                <CardMedia
                  component="img"
                  height="120"
                  image={book.image}
                  alt={book.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: textSecondary }}>
                    Author: {book.author}
                  </Typography>
                  <Typography variant="body2" sx={{ color: textSecondary }}>
                    Price: BDT {book.price.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: textSecondary }}>
                    Quantity: {book.quantity}
                  </Typography>
                  <Typography variant="body2" sx={{ color: textSecondary }}>
                    Sold: {book.orderCount}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: book.quantity > 0 ? "#4caf50" : "#f44336" }}
                  >
                    Status: {book.quantity > 0 ? "Available" : "Sold Out"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography
            sx={{
              mt: 4,
              color: textSecondary,
              textAlign: "center",
              width: "100%",
            }}
          >
            No books listed yet.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default MyBooks;
