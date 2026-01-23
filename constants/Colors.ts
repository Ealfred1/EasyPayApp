const mainBlue = "rgba(0, 127, 255, 0.5)";
const secondaryBlue = "#33A1FF";
const mainTheme = "#007BFF";

export const Colors = {
  // Flat properties for existing usage
  mainBlue,
  secondaryBlue,
  mainTheme,
  // Fallbacks for potentially missing properties if strict
  vibrantGreen: "#22c55e",
  lightBackground: "#f3f4f6",
  textPrimary: "#1f2937",

  // Theme support
  light: {
    text: '#000',
    background: '#fff',
    tint: mainTheme,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: mainTheme,
    mainBlue,
    secondaryBlue,
    mainTheme,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: mainTheme,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: mainTheme,
    mainBlue,
    secondaryBlue,
    mainTheme,
  },
};