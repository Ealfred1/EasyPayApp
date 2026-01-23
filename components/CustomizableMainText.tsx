import React from "react";
import { Text } from "react-native";

export default function CustomizableMainText({ style, children }) {
  return (
    <Text
      style={[
        {
          fontSize: 12,
          fontFamily: "Poppins_400Regular",
          color: "#FFFFFF",
          marginVertical: 7,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
