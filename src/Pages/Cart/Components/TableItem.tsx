import { TableCell, TableRow } from "@mui/material";
import React from "react";
import CartActions from "../../../Components/CartAction";
import { CartItemType } from "../../../Hooks/useAppContext";

type TableItemProps = {
  item: CartItemType;
};

export default function TableItem({ item }: TableItemProps) {
  return (
    <TableRow>
      <TableCell>
        <img alt={item.name} src={item.image} style={{ width: 100 }} />{" "}
      </TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.price.toLocaleString()}</TableCell>
      <TableCell>
        <CartActions item={item} />
      </TableCell>
      <TableCell>{(item.price * item.quantity).toLocaleString()}</TableCell>
    </TableRow>
  );
}
