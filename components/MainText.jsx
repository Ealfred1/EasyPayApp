import React from "react";
import { Text } from "react-native";

export default function MainText({ children }) {
  return (
    <Text
      style={{
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
        color: "black",
        marginVertical: 4,
        // opacity: 0.7,
      }}
    >
      {children}
    </Text>
  );
}
