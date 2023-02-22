import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useApp } from "../../App";
export type ProductType = {
  id: number;
  name: string;
  description: string;
  image: string;
  thumbnail: string;
  price: number;
  stock: number;
};
type ProductTypeProps = {
  item: ProductType;
};

export default function ProductItems({ item }: ProductTypeProps) {
  const { addToCart, removeCart, updateCart, getCartItem } = useApp();
  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      image: item.thumbnail,
      name: item.name,
      price: item.price,
      quantity: 1,
    });
  };
  const cartItem = getCartItem(item.id);
  const handelUpdateQuantity = () => {
    if (!cartItem) return;
    if (cartItem?.quantity < 2) {
      removeCart(item.id);
    } else {
      updateCart(cartItem.id, cartItem.quantity - 1);
    }
  };

  const ActionButton = () => {
    if (!cartItem) {
      return (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleAddToCart}
        >
          Add
        </Button>
      );
    } else {
      return (
        <Stack direction="row" spacing={3}>
          <IconButton onClick={handelUpdateQuantity} size="small">
            {cartItem.quantity < 2 && <FaTrash />}
            {cartItem.quantity > 1 && <FaMinus />}
          </IconButton>
          <Typography
            variant="h6"
            color="primary"
            sx={{ width: 30, textAlign: "center" }}
          >
            {cartItem.quantity}
          </Typography>
          <IconButton size="small" onClick={handleAddToCart}>
            <FaPlus />
          </IconButton>
        </Stack>
      );
    }
  };
  return (
    <Card key={item.id} dir={"rtl"}>
      <CardMedia>
        <img
          src={item.thumbnail}
          alt={item.name}
          style={{ maxWidth: "100%" }}
        />
      </CardMedia>
      <CardContent>
        <Typography variant={"subtitle1"}>{item.name}</Typography>
        <Box
          sx={{
            rtl: "true",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle2" sx={{ dir: "rtl" }}>
            قیمت:{" "}
          </Typography>
          <Typography variant="subtitle2">
            {item.price.toLocaleString()}تومان
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained">جزئیات</Button>
        <ActionButton />
      </CardActions>
    </Card>
  );
}
