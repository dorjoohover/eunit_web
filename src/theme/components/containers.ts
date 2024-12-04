import { Colors, Sizes } from "@/base/constants";
import { Container, Flex, Paper, Stack } from "@mantine/core";

export const containers = {
  Flex: Flex.extend({
    defaultProps: {
      pos: "relative",
      w: "100%",
      columnGap: 12,
      gap: 12,
    },
    styles(theme, props) {
      switch (props.variant) {
        case "rounded":
          return {
            root: {
              background: Colors.main,
            },
          };
        case "col":
          return {
            root: {
              display: "flex",
              minHeight: "auto",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              gap: Sizes.lg,
              borderRadius: Sizes.md,
              background: "white",
              overflow: "hidden",
            },
          };
        case "start":
          return {
            root: {
              alignItems: "start",
              justifyItems: "start",
            },
          };
      }
      return {
        root: {},
      };
    },
    vars: (theme, props) => {
      switch (props.variant) {
        case "rounded":
          return {
            root: {
              className: "bg-main",
            },
          };
      }
      return {
        root: {},
      };
    },
  }),
  Stack: Stack.extend({
    defaultProps: {
      gap: 2,
    },
  }),
  Container: Container.extend({
    styles(theme, props) {
      switch (props.variant) {
        case "container":
          return {
            root: {
              margin: "auto",
            },
          };
        case "sideBorderLeft":
          return {
            root: {
              borderLeftColor: Colors.deepMose20,
              borderLeftWidth: 1,
              borderStyle: "solid",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 0,
              padding: 0
            },
          };
        case "row":
          return {
            root: {
              gap: Sizes["3xl"],
              display: "flex",
            },
          };
        case "filter":
          return {
            root: {
              filter: "drop-shadow(0 2px 4px rgb(0 0 0 / 0.1))",
              width: "100%",
              padding: `${Sizes["2xl"]} 5% ${Sizes["3xl"]} 5%`,
              border: `2px solid ${Colors.stroke}`,
              borderRadius: Sizes.lg,
              background: Colors.mainWhite,
            },
          };
        case "filter":
          return {
            root: {
              filter: "drop-shadow(0 2px 4px rgb(0 0 0 / 0.1))",
              width: "100%",
              padding: `${Sizes["2xl"]} 5% ${Sizes["3xl"]} 5%`,
              border: `2px solid ${Colors.stroke}`,
              borderRadius: Sizes.lg,
              background: Colors.mainWhite,
            },
          };
        case "report":
          return {
            root: {
              filter: "drop-shadow(0 2px 4px rgb(0 0 0 / 0.1))",
              width: "100%",
              padding: `${Sizes["2xl"]} 5% ${Sizes["3xl"]} 5%`,
              border: `2px solid ${Colors.stroke}`,
              borderTopLeftRadius: Sizes.lg,
              borderTopRightRadius: Sizes.lg,
              background: Colors.mainWhite,
            },
          };
        default:
          return {
            root: {},
          };
      }
    },
    vars: (theme, props) => {
      switch (props.variant) {
        case "container":
          return {
            root: {
              "--container-size": Sizes.large,
            },
          };
        case "container_medium":
          return {
            root: {
              "--container-size": Sizes.medium,
            },
          };
      }
      return {
        root: {},
      };
    },
    defaultProps: {},
  }),
  Paper: Paper.extend({
    // defaultProps: {
    //   w: 25,
    //   h: 25,
    //   bg: "main",
    // },
    styles(theme, props) {
      if (props.variant == "roundedIcon") {
        return {
          root: {
            transform: "translate(-50%, -50%)",
            display: "flex",
            top: "50%",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            position: "absolute",
            borderRadius: "100%",
          },
        };
      }
      return {};
    },
  }),
};
