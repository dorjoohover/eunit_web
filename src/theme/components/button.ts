import { Colors, Sizes } from "@/base/constants";
import { Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

export const buttons = {
  Button: Button.extend({
    styles(theme, props) {
      switch (props.variant) {
        case "select":
          return {
            root: {
              width: "auto",
              borderColor: Colors.stroke,
              borderWidth: 2,
              minWidth: 200,
            },
          };
        case "main":
          return {
            root: {
              width: "auto",
              borderColor: Colors.stroke,
              borderWidth: 2,
              minWidth: 200,
            },
          };
       
        case "small":
          return {
            root: {
              width: "auto",
              borderColor: Colors.stroke,
              borderWidth: 2,
            },
          };
        case "action": {
          return {
            root: {},
          };
        }
      }
      return {};
    },
    vars: (theme, props) => {
      switch (props.variant) {
        case "select":
          return {
            root: {
              "--button-color": "grey",
              "--button-bg": "white",
              "--button-radius": Sizes.sm,
              "--button-hover": Colors.selectHover,
              "--button-hover-color": Colors.black,
            },
          };
        case "main":
          return {
            root: {
              "--button-bg": Colors.main,
              "--button-color": "white",
              "--button-radius": Sizes.lg,
            },
          };
        case "action":
          return {
            root: {
              "--button-bg": Colors.main,
              "--button-color": "white",
              
            },
          };
      }
      return {
        root: {},
      };
    },
    // classNames: buttonClasses,
  }),
};
