import { Box, Skeleton, Stack ,Typography} from "@mui/material";
import React from "react";
import CustomSlider from "../../../Components/CustomSlider";
import useFetch from "../../../Hooks/useFetch";
type SliderDataType = {
  id: number;
  title: string;
  image: string;
  thumbnail: string;
};
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
export default function Slider() {
  const {
    isError,
    isLoading,
    data: sliders,
  } = useFetch<SliderDataType[]>("/sliders");
  if (isLoading)
    return (
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={400}
      />
    );
  if (isError)
    return (
      <Stack
        direction="row"
        sx={{ justifyContent: "center", alignItems: "center", mt: 4 }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1">
            عملیات، با مشکل مواجه شد. لطفاً از برقراری ارتباط خود با اینترنت،
            اطمینان حالص فرمایید.
          </Typography>
        </Box>
      </Stack>
    );
  return (
    <CustomSlider {...settings} isResponsive={false}>
      {sliders?.map((item) => (
        <Box>
          <img
            src={item.image}
            alt={item.title}
            style={{ height: 400, width: "100%" }}
          />
        </Box>
      ))}
    </CustomSlider>
  );
}
