import { createTheme, type MantineColorsTuple } from "@mantine/core";

const candyPink: MantineColorsTuple = [
  "#fff0f6",
  "#ffe0ee",
  "#ffc0db",
  "#ff9fc6",
  "#ff83b5",
  "#ff70aa",
  "#ff67a5",
  "#e65091",
  "#cd4381",
  "#b53571",
];

const crystalBlue: MantineColorsTuple = [
  "#eefbff",
  "#d9f5fb",
  "#b5eaf5",
  "#8edff0",
  "#70d6eb",
  "#5ed1e8",
  "#52cee7",
  "#3fb6cd",
  "#30a2b7",
  "#168ca0",
];

const mintSuccess: MantineColorsTuple = [
  "#effdf7",
  "#ddf8ec",
  "#bdf0db",
  "#99e8c8",
  "#7ce2ba",
  "#6adfb2",
  "#5fddad",
  "#4cc397",
  "#3cad86",
  "#24956f",
];

const coralError: MantineColorsTuple = [
  "#fff1f1",
  "#ffe1e2",
  "#ffc6c7",
  "#ffa6a8",
  "#ff8d91",
  "#ff7d82",
  "#ff747a",
  "#e35d64",
  "#ca5157",
  "#b24249",
];

export const appTheme = createTheme({
  primaryColor: "candyPink",
  defaultRadius: "md",
  colors: {
    candyPink,
    coralError,
    crystalBlue,
    mintSuccess,
  },
  headings: {
    fontWeight: "700",
  },
  components: {
    Badge: {
      defaultProps: {
        radius: "sm",
      },
    },
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
    Card: {
      defaultProps: {
        radius: "md",
        withBorder: true,
      },
    },
    Notification: {
      defaultProps: {
        radius: "md",
      },
    },
  },
});
