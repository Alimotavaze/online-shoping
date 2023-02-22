import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

type CartDetailItemProps = {
  title: string;
  value: string;
};
export default function CartDetailItem({ title, value }: CartDetailItemProps) {
  return (
    <Stack direction={"row"} justifyContent="space-between">
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="subtitle1">{value}</Typography>
    </Stack>
  );
}
