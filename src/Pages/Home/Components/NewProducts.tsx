import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";
import CustomSlider from "../../../Components/CustomSlider";
import ProductItems, { ProductType } from "../../../Components/ProductItems";
import useFetch from "../../../Hooks/useFetch";
const settings = {
  autoplay: true,
  arrows: true,
  dots: true,
  slidesToScroll: 3,
  slidesToShow: 3,
  speed: 2000,
};
export default function NewProducts() {
  const {
    isError,
    isLoading,
    data: products,
  } = useFetch<ProductType[]>("/products/newest");
  if (isLoading)
    return (
      <Box mt={3} sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          mb={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton variant="text" width={210} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Skeleton variant="rectangular" width={210} height={230} />
          <Skeleton variant="rectangular" width={210} height={230} />
          <Skeleton variant="rectangular" width={210} height={230} />
          <Skeleton variant="rectangular" width={210} height={230} />
        </Box>
      </Box>
    );
  return (
    <Box sx={{ mt: 10 }}>
      <Typography variant="h4" style={{ textAlign: "center" }}>
        محصولات جدید
      </Typography>
      <CustomSlider {...settings}>
        {products?.map((item) => (
          <ProductItems item={item} />
        ))}
      </CustomSlider>
    </Box>
  );
}
