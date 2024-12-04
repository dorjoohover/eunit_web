import { Colors, Sizes } from "@/base/constants";
import { Tabs } from "@mantine/core";

export const navigations = {
  Tab: Tabs.extend({
    defaultProps: {
      fw: 500,
      className: "uppercase",
      c: "slateGrey",
      color: Colors.main,
    },
    vars: (theme, props) => {
      switch (props.variant) {
        default:
          return {
            root: {
              //   color: Colors.main,
              "--tabs-color": Colors.red
            },
          };
      }
    },
  }),
};
