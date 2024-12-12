"use client";
import { createTheme } from "@mantine/core";
import { colors } from "./colors";
import { components } from "./components";
import { Sizes } from "@/base/constants";
import { exo2 } from "@/utils/fonts";

export const theme = createTheme({
  colors: colors,
  radius: {
    xs: Sizes.xs,
    sm: Sizes.sm,
    md: Sizes.md,
    xl: Sizes.xl,
    lg: Sizes.lg,
    "2xl": Sizes["2xl"],
  },
  components: components,
  headings: {
    fontFamily: exo2.style.fontFamily,
  },
  
});
