import { filterByPriceRange } from "@/redux/slice/productSlice";
import { useAppDispatch } from "@/redux/store";
import { useState } from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const valuetext = (value: number) => `$${value}`;

export const PriceSlider = () => {
  const [value, setValue] = useState<number[]>([0, 1000]);
  const dispatch = useAppDispatch();

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleCommit = (
    _event: Event | React.SyntheticEvent,
    newValue: number | number[]
  ) => {
    const v = newValue as number[];
    dispatch(filterByPriceRange({ min: v[0], max: v[1] }));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        getAriaLabel={() => "Price range"}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleCommit}
        valueLabelDisplay="auto"
        valueLabelFormat={valuetext}
        min={0}
        max={1000}
        step={10}
        sx={{
          color: "var(--bronze)",
          height: 2,
          "& .MuiSlider-thumb": {
            width: 14,
            height: 14,
            backgroundColor: "var(--paper)",
            border: "2px solid var(--bronze)",
            "&:hover, &.Mui-focusVisible": { boxShadow: "none" }
          },
          "& .MuiSlider-track": {
            backgroundColor: "var(--bronze)",
            border: "none"
          },
          "& .MuiSlider-rail": { backgroundColor: "var(--line)", opacity: 1 },
          "& .MuiSlider-valueLabel": {
            backgroundColor: "var(--ink)",
            color: "var(--paper)",
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: 11
          }
        }}
      />
      <div className="mt-3 flex justify-between font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink-3">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </Box>
  );
};
