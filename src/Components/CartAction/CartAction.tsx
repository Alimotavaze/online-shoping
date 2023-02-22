import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useApp } from "../../App";
import { CartItemType } from "../../Hooks/useAppContext";
type CartActionProps = {
  item: CartItemType;
};

export default function CartActions({ item }: CartActionProps) {
  const { addToCart, getCartItem, removeCart, updateCart } = useApp();
  const cartItem = getCartItem(item.id);

  const handelUpdateQuantity = () => {
    if (!cartItem) return;

    if (cartItem?.quantity < 2) {
      removeCart(item.id);
    } else {
      updateCart(item.id, cartItem.quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      image: item.image,
      name: item.name,
      price: item.price,
      quantity: 1,
    });
  };

  return (
    <Stack direction="row" spacing={3}>
      <IconButton onClick={handelUpdateQuantity} size="small">
        {cartItem?.quantity! < 2 && <FaTrash />}
        {cartItem?.quantity! > 1 && <FaMinus />}
      </IconButton>
      <Typography
        variant="h6"
        color="primary"
        sx={{ width: 30, textAlign: "center" }}
      >
        {cartItem?.quantity!}
      </Typography>
      <IconButton size="small" onClick={handleAddToCart}>
        <FaPlus />
      </IconButton>
    </Stack>
  );
}
