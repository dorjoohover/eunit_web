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
  },
  components: {
    Select: Select.extend({
      defaultProps: {
        className:
          "border-greyNew rounded-[15px] border-2  overflow-hidden select",
        searchable: true,
        // comboboxProps: {{}}
      },
    }),
    NumberInput: NumberInput.extend({
      defaultProps: {
        className: "border-greyNew rounded-[15px] border-2",
        hideControls: true,
        bg: "transparent",
      },
    }),
  },
});
