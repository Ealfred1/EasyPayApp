import React from "react";
import { Text, TextInput, View } from "react-native";
import { Fonts } from "../constants/Fonts";
import { Colors } from "../constants/Colors";

export default function PrimaryInput(props: any) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View
      style={{
        marginVertical: 15,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontFamily: Fonts.semiBold,
          color: Colors.textPrimary,
          marginBottom: 8,
          opacity: 0.9,
        }}
      >
        {props.inputText}
      </Text>
      <TextInput
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          fontSize: 14,
          fontFamily: Fonts.Regular || "System",
          borderRadius: 12,
          backgroundColor: isFocused ? "#F0F9FF" : "#F9FAFB",
          borderColor: isFocused ? Colors.secondaryBlue : "#E5E7EB",
          borderWidth: 1.5,
          paddingVertical: 14,
          paddingHorizontal: 16,
          color: "#1F2937",
        }}
        placeholderTextColor="#9CA3AF"
      ></TextInput>
    </View>
  );
}
