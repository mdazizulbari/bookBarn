// src/theme.js (Revised for less eye strain)
import { createTheme } from "@mui/material/styles";

const softDarkFancyTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9C27B0", // A slightly deeper, less intense purple (e.g., Material-UI Deep Purple 600)
      light: "#AB47BC", // Lighter variant for highlights, still soft
      dark: "#7B1FA2", // Deeper for hover, but not harsh
    },
    secondary: {
      main: "#00ACC1", // A calmer, less piercing teal (e.g., Material-UI Cyan 600)
      light: "#26C6DA", // Lighter variant for subtle accents
    },
    background: {
      default: "#121212", // Standard dark mode background, slightly lighter than pure black
      paper: "#1E1E1E", // Slightly lighter dark for cards, good contrast without harshness
    },
    text: {
      primary: "#E0E0E0", // Off-white, standard for dark themes
      secondary: "#A0A0A0", // Slightly darker gray for secondary text, softer than B0B0B0
    },
    divider: "#3A3A3A", // Slightly lighter divider for better visibility on dark backgrounds
  },
  typography: {
    fontFamily: "'Inter', sans-serif", // Reverting to Inter for better readability
    h2: {
      fontWeight: 700, // Slightly less bold
      letterSpacing: "-0.01em", // Less tight letter spacing
      fontSize: "3.2rem", // Slightly smaller
    },
    h4: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Standard rounded corners for comfort
          textTransform: "none",
          transition: "all 0.2s ease-in-out", // Faster, subtle transition
          "&:hover": {
            transform: "translateY(-2px)", // Subtle lift
            boxShadow: `0 6px 15px ${'rgba(156, 39, 176, 0.4)'}`, // Softer, less diffused shadow
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "linear-gradient(145deg, #212121, #1A1A1A)", // Softer gradient
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5), inset 0 0 4px rgba(0, 0, 0, 0.2)", // Softer, less "glowing" shadow
          borderRadius: "12px", // Medium roundedness
          transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
          "&:hover": {
            transform: "translateY(-4px)", // Medium lift
            boxShadow: "0 12px 25px rgba(0, 0, 0, 0.7), inset 0 0 6px rgba(0, 0, 0, 0.3)",
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        dot: {
          backgroundColor: '#424242',
        },
        dotActive: {
          backgroundColor: '#9C27B0', // Primary color
          boxShadow: `0 0 6px rgba(156, 39, 176, 0.5)`, // Softer glow
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: '#FFD700', // Classic gold stars, good contrast
        },
        iconEmpty: {
          color: '#555555', // Darker gray for empty stars, less stark than black
        },
      },
    },
  },
});

export default softDarkFancyTheme;