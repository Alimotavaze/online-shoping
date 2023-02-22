import { Box } from "@mui/material";
import React from "react";
import BestSeller from "./Components/BestSeller";
import NewProducts from "./Components/NewProducts";
import Slider from "./Components/Slider";

export default function Home() {
  return (
    <Box sx={{ gap: 9 }}>
      <Slider />
      <BestSeller />
      <NewProducts />
    </Box>
  );
}
