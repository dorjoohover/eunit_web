import { Colors, Sizes } from "@/base/constants";
import { exo2 } from "@/utils/fonts";
import { Text, Title } from "@mantine/core";

export const text = {
  Title: Title.extend({
    defaultProps: {
      fw: 500,
      className: exo2.className,
      tt: "uppercase",
      size: Sizes.md,
    },
    styles: (theme, props) => {
      switch (props.variant) {
        case "title":
          return {
            root: {
              c: Colors.black,
              fontSize: props.size == "lg" ? Sizes["2xl"] : Sizes.lg,
            },
          };
        default:
          return {
            root: {
              color: Colors.grey,
            },
          };
      }
    },
  }),
  Text: Text.extend({
    defaultProps: {
      c: Colors.black,
      fz: Sizes.s,
      className: exo2.className,
    },

    styles: (theme, props) => {
      switch (props.variant) {
        case "warn":
          return {
            root: {
              padding: Sizes.s,
              color: Colors.red,
              borderRadius: Sizes.md,
              maxWidth: 300,
              background: Colors.pinkWhite,
              border: `2px solid ${Colors.pink}`,
            },
          };
        default:
          return {
            root: {},
          };
      }
    },
  }),
};
