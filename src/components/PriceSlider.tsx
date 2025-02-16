import { filterByPriceRange } from "@/redux/slice/productSlice";
import { useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const valuetext = (value: number) => {
  return `$${value}`;
};

export const PriceSlider = () => {
  const [value, setValue] = useState<number[]>([0, 1000]);
  const dispatch = useAppDispatch();

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    console.log(event);
  };

  useEffect(() => {
    dispatch(filterByPriceRange({ min: value[0], max: value[1] }));
  }, [value, dispatch]);

  return (
    <Box sx={{ width: 200 }}>
      <Slider
        getAriaLabel={() => "Price range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={valuetext}
        min={0}
        max={1000}
        sx={{
          color: "",
          "& .MuiSlider-thumb": {
            backgroundColor: "#d3cfcf"
          },
          "& .MuiSlider-track": {
            backgroundColor: "#cbcbcb"
          },
          "& .MuiSlider-rail": {
            backgroundColor: "#4f4f4f"
          },
          "& .MuiSlider-valueLabel": {
            backgroundColor: "#3a3a3a"
          }
        }}
      />
    </Box>
  );
};
