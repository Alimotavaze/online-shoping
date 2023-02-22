import { Button, Card, CardContent, CardHeader } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../../App";
import CartDetailItem from "./CartDetailItem";

export default function CartDetail() {
  const { cart } = useApp();
  const router = useNavigate();

  const total = cart.reduce((a, b) => a + b.price * b.quantity, 0);
  const totalItems = cart.reduce((a, b) => a + b.quantity, 0);

  const handleCheckOut = () => {
    router("/checkout");
  };

  const handleContinue = () => {
    router("/products");
  };

  return (
    <Stack spacing={4}>
      <Card>
        <CardHeader title="جزئیات خرید:" />
        <CardContent>
          <Stack spacing={2}>
            <CartDetailItem
              title="محصولات خریداری شده:"
              value={totalItems.toLocaleString()}
            />
            <CartDetailItem
              title="مبلغ قابل پرداخت:"
              value={total.toLocaleString()}
            />
          </Stack>
        </CardContent>
      </Card>
      <Stack direction={"row"} justifyContent="space-between">
        <Button variant="contained" onClick={handleCheckOut}>
          پرداخت
        </Button>
        <Button variant="outlined" onClick={handleContinue}>
          ادامه خرید
        </Button>
      </Stack>
    </Stack>
  );
}
