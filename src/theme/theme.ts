"use client";
import { createTheme, Loader } from "@mantine/core";
import { colors } from "./colors";
import { components } from "./components";
import { Sizes } from "@/base/constants";
import { exo2 } from "@/utils/fonts";
import { RingLoader } from "./components/loader";

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
  components: {
    ...components,
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, ring: RingLoader },
        type: "ring",
      },
    }),
  },
  headings: {
    fontFamily: exo2.style.fontFamily,
  },
});
