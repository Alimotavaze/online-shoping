import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApp } from "../../App";
import usePost from "../../Hooks/usePost";

export default function CheckOut() {
  const { cart, clearCart } = useApp();
  const [address, setAddress] = useState("");
  const router = useNavigate();
  const { isLoading, callPost } = usePost("/orders");
  const handleAddOrder = async () => {
    const orderItems = cart.map((item) => {
      return {
        productId: item.id,
        quantity: item.quantity,
      };
    });
    const response = await callPost({
      orderItems,
      address,
      date: 1 / 1 / 2001,
    });
    console.log(response);
    if (response?.success) {
      toast.success(response?.message || "ثبت سفارش، موفقیت آمیز بود");
      clearCart();
      router("profile/orders", { replace: true });
    } else {
      toast.error(response?.message || "سفارش، موفقیت آمیز نبود");
    }
  };
  if (cart.length < 1) return <Navigate to="/products" replace />;
  return (
    <>
      <Stack spacing={3}>
        {cart.map((item) => (
          <Grid container spacing={2} key={item.id}>
            <Grid item xs={12} md={3}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: 100, maxWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h5"> {item.name}</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Stack spacing={2}>
                <Typography variant="subtitle1">
                  تعداد: {item.quantity}
                </Typography>

                <Typography variant="h5">
                  {" "}
                  {(item.price * item.quantity).toLocaleString()} تومان
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        ))}
        <TextField
          label="آدرس"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Stack>

      <Button
        onClick={handleAddOrder}
        variant="contained"
        sx={{ mt: 4 }}
        disabled={isLoading}
      >
        ثبت سفارش
      </Button>
    </>
  );
}
