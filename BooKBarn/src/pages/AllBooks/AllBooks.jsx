import Books from "../Shared/Books/Books";
import { useState, useEffect } from "react";

const AllBooks = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  // Your preferred blue colors
  const blueMain = "#1e88e5";      // main blue
  const blueLight = "#64b5f6";     // lighter blue accent
  const bgDark = "#121212";        // dark background
  const cardBg = "#1e1e1e";        // card background dark gray
  const textPrimary = "#e0e0e0";   // light text
  const textSecondary = "#aaaaaa"; // secondary text

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "3rem 2rem 4rem",
        backgroundColor: bgDark,
        fontFamily: "'Inter', sans-serif",
        color: textPrimary,
      }}
    >
        <title>BookBarn | All Books</title>

      <header
        style={{
          marginBottom: "2.5rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            letterSpacing: "0.05em",
            color: blueMain,
            textShadow: `0 0 10px ${blueLight}aa`,
          }}
        >
          Explore Our Collection
        </h1>
        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "1.1rem",
            color: textSecondary,
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          Dive into thousands of books across genres and authors
        </p>
        <div
          style={{
            marginTop: "0.75rem",
            width: "6rem",
            height: "4px",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "2px",
            background: `linear-gradient(90deg, ${blueLight}, ${blueMain})`,
          }}
        />
      </header>

      <main
        className={`max-w-[1200px] mx-auto p-6 rounded-3xl border border-white/10 shadow-xl transition-all duration-300 ${
          mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{
          backgroundColor: cardBg,
          boxShadow:
            "0 12px 25px rgba(0, 0, 0, 0.7), inset 0 0 12px rgba(0,0,0,0.4)",
          minHeight: "70vh",
        }}
      >
        <Books />
      </main>
    </div>
  );
};

export default AllBooks;
