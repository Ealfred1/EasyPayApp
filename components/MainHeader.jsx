import React from "react";
import { Text } from "react-native";
import { Colors } from "@/constants/Colors";
export default function MainHeader({ children }) {
  return (
    <Text
      style={{
        fontSize: 25,
        color: Colors.mainTheme,
        fontFamily: "Poppins_700Bold_Italic",
        marginVertical: 10,
      }}
    >
      {children}
    </Text>
  );
}
