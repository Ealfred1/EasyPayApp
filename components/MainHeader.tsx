import React from "react";
import { Text , StyleProp, TextStyle } from "react-native";
import { Colors } from "@/constants/Colors";

interface MainHeaderProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export default function MainHeader({ children, style }: MainHeaderProps) {
  return (
    <Text
      style={[
        {
          fontSize: 25,
          color: Colors.mainTheme,
          fontFamily: "Poppins_700Bold_Italic",
          marginVertical: 10,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
