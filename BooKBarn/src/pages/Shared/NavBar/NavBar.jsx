import React, { useContext, useState, useEffect } from "react";
import { LogOut, UserCircle, LayoutDashboard, ShoppingCart } from "lucide-react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
  Avatar,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Providers/AuthProviders";
import toast from "react-hot-toast";
import axios from "axios";

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:8157/users/${user?.email}`)
        .then((res) => {
          setIsAdmin(res.data?.role === "admin");
        })
        .catch((err) => {
          console.error("Error fetching user data: ", err);
        });
    }
  }, [user]);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    handleCloseUserMenu();
    logOut()
      .then(() => {
        toast.success("You logged out successfully");
        navigate("/login"); // Redirect to login page after logout
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.error("Logout error:", err);
      });
  };

  const navLinks = isAdmin
    ? [
        { label: "Home", path: "/" },
        { label: "All Books", path: "/all-books" },
        { label: "Add Books", path: "/add-books" },
        { label: "About Us", path: "/about-us" },
        { label: "Contact", path: "/contact" },
      ]
    : [
        { label: "Home", path: "/" },
        { label: "All Books", path: "/all-books" },
        { label: "About Us", path: "/about-us" },
        { label: "Contact", path: "/contact" },
      ];

  const userMenuItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard fontSize="small" />,
      path: "/dashboard",
      show: true,
    },
  ];

  return (
    <AppBar
      position="sticky"
      component={motion.div}
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "circOut" }}
      sx={{
        backgroundColor: "#0f172a",
        backdropFilter: "blur(6px)",
        borderRadius: "0 0 20px 20px",
        boxShadow: "0 4px 12px rgba(148, 163, 184, 0.2)",
        py: 1,
        borderBottom: "1px solid #334155",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <motion.img
              src="/open-book.png"
              alt="BookBarn Logo"
              style={{ width: "42px", height: "42px" }}
              initial={{ scale: 0.5, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            />
            <Typography
              variant="h5"
              noWrap
              component={NavLink}
              to="/"
              sx={{
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 700,
                letterSpacing: ".06rem",
                color: "#e0e7ff",
                textDecoration: "none",
                fontSize: { xs: "1.3rem", md: "1.75rem" },
                display: { xs: "none", md: "flex" },
                textShadow: "0 0 8px rgba(139, 92, 246, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "#c4b5fd",
                },
              }}
            >
              BookBarn
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navLinks.map(({ label, path }) => (
              <Button
                key={path}
                component={NavLink}
                to={path}
                sx={{
                  color: "#cbd5e1",
                  fontWeight: 500,
                  textTransform: "none",
                  fontSize: "1rem",
                  px: 2.5,
                  py: 1,
                  borderRadius: "10px",
                  "&.active": {
                    color: "#a78bfa",
                    fontWeight: 700,
                    backgroundColor: "#1e293b",
                  },
                  "&:hover": {
                    color: "#a78bfa",
                    backgroundColor: "#1e293b",
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {!user ? (
              <>
                <Button component={NavLink} to="/login" sx={{ color: "#cbd5e1", fontWeight: 600 }}>
                  Login
                </Button>
                <Button
                  component={NavLink}
                  to="/sign-up"
                  sx={{
                    color: "#0f172a",
                    backgroundColor: "#a78bfa",
                    fontWeight: 600,
                    px: 2,
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#7c3aed",
                      color: "#fff",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Tooltip title={user.displayName || "User"}>
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar src={user.photoURL || ""} alt="User" sx={{ width: 40, height: 40 }}>
                      {!user.photoURL && <UserCircle size={28} />}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    sx: {
                      backgroundColor: "#1e293b",
                      color: "#cbd5e1",
                    },
                  }}
                >
                  {userMenuItems
                    .filter((item) => item.show)
                    .map(({ label, path, icon }) => (
                      <MenuItem
                        key={path}
                        component={NavLink}
                        to={path}
                        onClick={handleCloseUserMenu}
                        sx={{
                          "&.active": {
                            backgroundColor: "#334155",
                            color: "#a78bfa",
                          },
                          "&:hover": {
                            backgroundColor: "#334155",
                            color: "#a78bfa",
                          },
                        }}
                      >
                        <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
                        <ListItemText>{label}</ListItemText>
                      </MenuItem>
                    ))}
                  <MenuItem onClick={handleLogout} sx={{ color: "#f87171" }}>
                    <ListItemIcon>
                      <LogOut size={18} color="#f87171" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
