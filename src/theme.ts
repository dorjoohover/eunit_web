"use client";

import { createTheme, NumberInput, Select, virtualColor } from "@mantine/core";

export const theme = createTheme({
  colors: {
    primary: virtualColor({
      name: "primary",
      dark: "#001529",
      light: "#001529",
    }),
    mixedBlue20: virtualColor({
      name: "mixedBlue20",
      dark: "#2850FA33",
      light: "#2850FA33",
    }),
    slateGrey: virtualColor({
      name: "slateGrey",
      dark: "#919EAF",
      light: "#919EAF",
    }),
    main: virtualColor({
      name: "main",
      dark: "#2850FA",
      light: "#2850FA",
    }),
    smokyBlue: virtualColor({
      name: "smokyBlue",
      dark: "#7A808D",
      light: "#7A808D",
    }),
    grey: virtualColor({
      name: "grey",
      dark: "#D9D9D9",
      light: "#D9D9D9",
    }),
  },
  components: {
    Select: Select.extend({
      defaultProps: {
        className: "rounded-[8px] ",
        searchable: true,
        // comboboxProps: {{}}
      },
    }),
    NumberInput: NumberInput.extend({
      defaultProps: {
        className: "rounded-[8px] ",
        hideControls: true,
        bg: "transparent",
      },
    }),
  },
});
