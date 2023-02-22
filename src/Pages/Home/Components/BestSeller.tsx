import { Box, Skeleton, Typography } from "@mui/material";
import CustomSlider from "../../../Components/CustomSlider";
import ProductItems, { ProductType } from "../../../Components/ProductItems";
import useFetch from "../../../Hooks/useFetch";

export default function BestSeller() {
  const {
    isError,
    isLoading,
    data: product,
  } = useFetch<ProductType[]>("/products/BestSeller");
  const settings = {
    autoplay: true,
    arrows: true,
    dots: true,
    slidesToScroll: 3,
    slidesToShow: 3,
    speed: 2000,
  };

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
        محصولات پر فروش
      </Typography>
      <CustomSlider isResponsive={true} {...settings}>
        {product?.map((item) => (
          <ProductItems item={item} />
        ))}
      </CustomSlider>
    </Box>
  );
}
