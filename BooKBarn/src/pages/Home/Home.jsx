import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import Rating from "@mui/material/Rating";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [reviews, setReviews] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8157/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8157/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  const handleExploreClick = () => {
    navigate("/all-books");
  };

  const bookSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const reviewSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    responsive: [{ breakpoint: 900, settings: { slidesToShow: 1 } }],
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 6, sm: 10, md: 12 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 8, md: 12 },
        overflowX: "hidden",
      }}
    >
        <title>BookBarn - Your Student Book Exchange</title>

      {/* Hero Section */}
      <Box sx={{ maxWidth: 800, textAlign: "center" }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: theme.typography.h2.fontWeight,
            fontSize: theme.typography.h2.fontSize,
            color: theme.palette.text.primary,
            mb: 2,
            textShadow: `0 0 8px ${theme.palette.primary.main}55, 0 0 16px ${theme.palette.primary.dark}33`,
          }}
        >
          Welcome to{" "}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            style={{ color: theme.palette.info.main }}
          >
            BookBarn
          </motion.span>{" "}
          <Typewriter
            words={[
              "– your student book exchange!",
              "– find books at great prices!",
              "– sell your used textbooks!",
              "– discover endless reads!",
            ]}
            loop
            cursor
            cursorStyle="_"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={1800}
          />
        </Typography>

        <Typography
          variant="h6"
          color={theme.palette.text.secondary}
          mb={4}
          sx={{ maxWidth: 600, mx: "auto", lineHeight: 1.6 }}
        >
          Your ultimate platform for buying and selling academic books within
          the student community. Connect with peers, save money, and give your
          books a new purpose.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={handleExploreClick}
          sx={{
            backgroundColor: theme.palette.primary.main,
            px: 5,
            py: 1.5,
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius:
              theme.components.MuiButton.styleOverrides.root.borderRadius,
            boxShadow: `0 4px 15px ${theme.palette.primary.main}66`,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              transform:
                theme.components.MuiButton.styleOverrides.root["&:hover"]
                  .transform,
              boxShadow:
                theme.components.MuiButton.styleOverrides.root["&:hover"]
                  .boxShadow,
            },
          }}
        >
          Start Exploring
        </Button>
      </Box>

      {/* Hero Image with Animation */}
      <motion.img
        src="/open-book.png"
        alt="Books Illustration"
        loading="lazy"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        style={{
          width: "100%",
          maxWidth: 450,
          borderRadius: "1.5rem",
          objectFit: "cover",
          boxShadow: `0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px ${theme.palette.primary.light}08, 0 0 30px ${theme.palette.info.light}08`,
          border: `1px solid ${theme.palette.divider}`,
        }}
      />

      {/* Featured Books Section */}
      <Box sx={{ width: "100%", maxWidth: 1200 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            color: theme.palette.info.main,
            fontWeight: theme.typography.h4.fontWeight,
            textAlign: "center",
            textShadow: `0 0 8px ${theme.palette.info.light}66, 0 0 16px ${theme.palette.info.light}44`,
          }}
        >
          Featured Books
        </Typography>

        {books.length === 0 ? (
          <Typography
            variant="body1"
            color={theme.palette.text.secondary}
            textAlign="center"
            sx={{ py: 3 }}
          >
            No featured books available at the moment. Please check back later!
          </Typography>
        ) : (
          <Slider {...bookSliderSettings}>
            {books.map((book, idx) => (
              <Box
                key={idx}
                sx={{
                  px: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  component={motion.img}
                  src={book.image}
                  alt={book.title}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.08,
                    ease: "easeOut",
                  }}
                  sx={{
                    height: 320,
                    width: 220,
                    borderRadius: 2,
                    objectFit: "cover",
                    boxShadow: `0 6px 20px ${theme.palette.primary.dark}55, 0 0 10px ${theme.palette.primary.light}11`,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    border: `1px solid ${theme.palette.divider}`,
                    "&:hover": {
                      transform: "scale(1.05) translateY(-5px)",
                      boxShadow: `0 10px 30px ${theme.palette.primary.main}88, 0 0 20px ${theme.palette.primary.light}33`,
                    },
                  }}
                />
              </Box>
            ))}
          </Slider>
        )}
      </Box>

      {/* Student Reviews Section */}
      <Box sx={{ width: "100%", maxWidth: 900, mt: 8, mb: 5 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 5,
            color: theme.palette.info.main,
            fontWeight: theme.typography.h4.fontWeight,
            textAlign: "center",
            textShadow: `0 0 8px ${theme.palette.info.light}66, 0 0 16px ${theme.palette.info.light}44`,
          }}
        >
          What Students Say
        </Typography>

        {reviews.length === 0 ? (
          <Typography
            variant="body1"
            color={theme.palette.text.secondary}
            textAlign="center"
            sx={{ py: 3 }}
          >
            No student reviews available yet. Be the first to share your
            experience!
          </Typography>
        ) : (
          <Slider {...reviewSliderSettings}>
            {reviews.map(({ id, name, avatar, text, rating }) => (
              <Paper
                key={id}
                elevation={0}
                sx={{
                  p: 4,
                  mx: 2,
                  minHeight: 180,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                  backgroundColor: theme.palette.background.paper,
                  backgroundImage:
                    theme.components.MuiPaper.styleOverrides.root
                      .backgroundImage,
                  boxShadow:
                    theme.components.MuiPaper.styleOverrides.root.boxShadow,
                  borderRadius:
                    theme.components.MuiPaper.styleOverrides.root.borderRadius,
                  transition:
                    theme.components.MuiPaper.styleOverrides.root.transition,
                  "&:hover":
                    theme.components.MuiPaper.styleOverrides.root["&:hover"],
                }}
              >
                <Avatar
                  src={avatar}
                  alt={name}
                  sx={{
                    width: 64,
                    height: 64,
                    border: `2px solid ${theme.palette.primary.main}`,
                    boxShadow: `0 0 10px ${theme.palette.primary.light}44`,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    mt: 1,
                  }}
                >
                  {name}
                </Typography>
                <Rating value={rating} readOnly precision={0.5} />
                <Typography
                  variant="body1"
                  color={theme.palette.text.secondary}
                  sx={{
                    mt: 1,
                    textAlign: "center",
                    fontStyle: "italic",
                    maxWidth: "95%",
                  }}
                >
                  "{text}"
                </Typography>
              </Paper>
            ))}
          </Slider>
        )}
      </Box>
    </Box>
  );
};

export default Home;
