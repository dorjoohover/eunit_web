import {
  InputBase,
  NumberInput,
  Radio,
  RadioGroup,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Colors, Sizes } from "@/base/constants";
import { DatePickerInput } from "@mantine/dates";

export const inputs = {
  NumberInput: NumberInput.extend({
    styles(theme, props) {
      if (props.variant == "bottom") {
        return {
          input: {
            border: "none",
            borderRadius: 0,
            borderBottom: `1px solid #000`,
            padding: props.p?.toString() ?? "8px 0px",
            margin: props.m?.toString() ?? "4px 0px",
            height: "auto",
            fontSize: props.fz?.toString() ?? 21,
          },
          label: {
            color: Colors.black,
            fontSize: props.__size ?? 24,
          },
        };
      }
      return {
        input: {
          background:
            props.value == undefined || props.value == ""
              ? "white"
              : Colors.reportInputActive,
        },
      };
    },
    defaultProps: {
      hideControls: true,
      miw: 150,
      radius: "sm",
      maw: 300,
      w: "300px",
      c: "grey",
      fw: 500,
    },

    // vars: (theme, props) => {
    //   return {
    //     root: {
    //       className: props.value == undefined ? "default" : "active",
    //     },
    //     controls: {},
    //   };
    // },
  }),

  DatePickerInput: DatePickerInput.extend({
    styles: (theme, props) => {
      return {
        label: {
          color: Colors.black,
          fontSize: props.__size ?? 30,
          marginBottom: props.mb?.toString() ?? 8,
        },
        root: {
          background: "transparent",
          borderRadius: props.radius ?? 5,
        },
        input: {
          background: props.bg?.toString() ?? "transparent",
          borderColor: props.color ?? "transparent",
          overflow: "hidden",
          width: props.w?.toString() ?? 300,
          border: `1px solid #000`,
          borderRadius: props.radius ?? 5,
          paddingTop: props.pt?.toString() ?? 8,
          paddingBottom: props.pb?.toString() ?? 8,
          paddingLeft: props.pl?.toString() ?? 21,
        },
      };
    },
  }),
  Textarea: Textarea.extend({
    styles(theme, props) {
      if (props.variant == "bottom") {
        return {
          input: {
            border: "none",
            borderRadius: 0,
            borderBottom: `1px solid #000`,
            padding: props.p?.toString() ?? "2px 8px",
          },
          label: {
            color: Colors.black,
            fontSize: props.__size ?? 30,
          },
        };
      }
      return {
        root: {
          background: "transparent",
          borderRadius: props.radius ?? 50,
        },
        input: {
          background: props.bg?.toString() ?? "transparent",
          borderColor: props.color ?? "transparent",
          overflow: "hidden",
          border: `${props.color ?? Colors.headBlue} 1px solid`,
          borderRadius: props.radius ?? 50,
          paddingLeft: props.pl?.toString() ?? 21,
        },
      };
    },
  }),
  TextInput: TextInput.extend({
    styles(theme, props) {
      if (props.variant == "bottom") {
        return {
          input: {
            border: "none",
            borderRadius: 0,
            borderBottom: `1px solid #000`,
            padding: props.p?.toString() ?? "8px 0px",
            margin: props.m?.toString() ?? "4px 0px",
            height: "auto",
          },
          label: {
            color: Colors.black,
            fontSize: props.__size ?? 24,
          },
        };
      }
      if (props.variant == "icon") {
        return {
          input: {
            border: `2px solid ${Colors.stroke}`,
            color: "#566476",
            padding: props.pe?.toString() ?? `8px 28px`,
            height: "auto",
            background: "white",
            borderRadius: 10,
          },
        };
      }
      return {
        root: {
          background: "transparent",
          borderRadius: props.radius ?? 50,
        },
        label: {
          marginBottom: 16,
          fontSize: 16,
        },
        input: {
          background: props.bg?.toString() ?? "transparent",
          borderColor: props.color ?? "transparent",
          border: `${props.color ?? Colors.headBlue} 1px solid`,
          overflow: "hidden !important",
          borderRadius: props.radius ?? 50,
          paddingLeft: props.pl?.toString() ?? 21,
          paddingTop: props.pt?.toString() ?? 4,
          paddingBottom: props.pb?.toString() ?? 4,
          color: props.c?.toString(),
          height: "auto",
          fontSize: props.fz?.toString() ?? 21,
        },
        wrapper: {
          borderRadius: props.radius ?? 50,
        },
      };
    },
    vars: (theme, props) => {
      if (props.variant === "xxl") {
        return {
          root: {},
          wrapper: {},
        };
      }

      if (props.variant === "xxs") {
        return {
          root: {},
          wrapper: {},
        };
      }

      return {
        root: {},
        wrapper: {},
        input: {
          "--input-placeholder-color": props.c,
        },
      };
    },
    defaultProps: {},
  }),
};

export const select = {
  Select: Select.extend({
    styles(theme, props, ctx) {
      if (props.variant == "rounded") {
        return {
          wrapper: {
            marginTop: 8,
          },
          label: {
            fontSize: 21,
          },
          input: {
            borderRadius: 5,
            border: `2px solid ${Colors.headBlue}`,
            height: "auto",
            padding: "2px 10px",
          },
        };
      }
      return {
        root: {
          filter: "drop-shadow(0 2px 4px rgb(0 0 0 / 0.1))",
        },

        input: {
          border: `2px solid ${Colors.stroke}`,
          width: props.variant == "small" ? 150 : "100%",
        },
      };
    },
    vars: (theme, props) => {
      return {
        wrapper: {},
        input: {
          "--input-bg":
            props.variant == "small" || props.variant == "rounded"
              ? "transparent"
              : "white",
        },
      };
    },
    defaultProps: {
      className: "rounded-[8px] ",
      searchable: true,
      checkIconPosition: "right",
      width: "auto",
      bg: "transparent",
      leftSectionPointerEvents: "none",
    },
  }),
  InputBase: InputBase.extend({
    styles(theme, props, ctx) {
      if (props.variant == "rounded") {
        return {
          wrapper: {
            marginTop: 8,
          },
          label: {
            fontSize: 21,
          },
          input: {
            borderRadius: 5,
            border: `2px solid ${Colors.headBlue}`,
            height: "auto",
            padding: "2px 10px",
          },
        };
      }
      return {
        root: {
          filter: "drop-shadow(0 2px 4px rgb(0 0 0 / 0.1))",
        },

        input: {
          border: `2px solid ${Colors.stroke}`,
          width: props.variant == "small" ? 150 : "100%",
        },
      };
    },
    vars: (theme, props) => {
      return {
        wrapper: {},
        input: {
          "--input-bg":
            props.variant == "small" || props.variant == "rounded"
              ? "transparent"
              : "white",
        },
      };
    },
    defaultProps: {
      className: "rounded-[8px] ",
      bg: "transparent",
      leftSectionPointerEvents: "none",
    },
  }),
  RadioGroup: RadioGroup.extend({
    defaultProps: {
      fw: "bold",
    },
    vars: (theme, props) => {
      return {
        root: {},
      };
    },
    styles(theme, props) {
      return {
        label: {
          marginBottom: 0,
        },
        description: {
          display: "none",
        },
        root: {},
      };
    },
  }),
  Radio: Radio.extend({
    defaultProps: {
      fw: "bold",
    },
    styles(theme, props, ctx) {
      return {
        label: {
          fontWeight: "normal",
          color: Colors.black,
        },
        radio: {
          border: `2.5px solid ${Colors.main} `,
        },
        root: {
          margin: `${Sizes.xs} 0`,
        },
      };
    },
    vars: (theme, props) => {
      return {
        root: {
          "--radio-color": Colors.main,
        },
      };
    },
  }),
};
