import {
  AppBar,
  Container,
  Toolbar,
  Stack,
  styled,
  Typography,
  IconButton,
  Box,
  Badge,
} from "@mui/material";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Outlet, NavLink as NavlinkReact, useNavigate } from "react-router-dom";
import { useApp } from "../../App";
import LoginSection from "./LoginSection";

const NavLink = styled(NavlinkReact)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  transition: "color 0.3s ease-in-out",
  "&.active": {
    color: theme.palette.secondary.main,
  },
  "&:hover": {
    color: theme.palette.secondary.light,
  },
}));
export default function Layout() {
  const route = useNavigate();
  const { cart } = useApp();

  const handleGotoCart = () => {
    route("/cart");
  };
  return (
    <Stack spacing={12} justifyContent={"center"} alignItems={"center"}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "primary",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <Stack
            direction={"row"}
            spacing={2}
            width="100%"
            sx={{
              justifyContent: "space-between",
              alignItems: "space-between",
            }}
          >
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <NavLink to="/">خانه</NavLink>
              <NavLink to="/products">محصولات</NavLink>
              <NavLink to="/about">درباره ما</NavLink>
              <NavLink to="/profile">پروفایل کاربری</NavLink>
              <NavLink to="/cart">سبد خرید</NavLink>
            </Stack>
            <Box sx={{ flexWrap: 1 }}></Box>
            <Stack direction={"row"} spacing={2} alignItems="center">
              <IconButton
                sx={{ color: "common.white" }}
                onClick={handleGotoCart}
              >
                <Badge badgeContent={cart.length} color="secondary">
                  <FaShoppingCart />
                </Badge>
              </IconButton>
              <LoginSection />
              <Typography variant="h5">مرکز خرید </Typography>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Container maxWidth={"lg"}>
        <Outlet />
      </Container>
    </Stack>
  );
}
