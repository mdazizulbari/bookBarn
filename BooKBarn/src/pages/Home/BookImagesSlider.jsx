import React from "react";
import Slider from "react-slick";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

const BookImagesSlider = ({ books }) => {
  const settings = {
    dots: true,
    infinite: books.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 960,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  if (!books || books.length === 0) return <Typography>No books found.</Typography>;

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", py: 6 }}>
      <Typography variant="h4" gutterBottom textAlign="center" color="white">
        Featured Books
      </Typography>
      <Slider {...settings}>
        {books.map((book) => (
          <Card
            key={book.id}
            sx={{
              mx: 2,
              backgroundColor: "#1E293B",
              color: "white",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image={book.image}
              alt={book.title}
              sx={{ height: 200, objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h6" noWrap>
                {book.title}
              </Typography>
              <Typography variant="body2" color="gray">
                {book.author}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </Box>
  );
};

export default BookImagesSlider;
