import React from "react";
import { Text } from "react-native";

export default function MainHeader({ children }) {
  return (
    <Text
      style={{
        fontSize: 25,
        color: "#33A1FF",
        fontFamily: "Poppins_700Bold_Italic",
        marginVertical: 10,
      }}
    >
      {children}
    </Text>
  );
}
