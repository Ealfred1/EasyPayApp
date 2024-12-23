import React from "react";
import { Text, TextInput, View } from "react-native";
import { Fonts } from "../constants/Fonts";
import { Colors } from "../constants/Colors";

export default function PrimaryInput(props) {
  return (
    <View
      style={{
        marginVertical: 20,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontFamily: Fonts.semiBold,
          opacity: 0.7,
        }}
      >
        {props.inputText}
      </Text>
      <TextInput
        {...props}
        style={{
          fontSize: 12,
          borderRadius: 12,
          borderColor: Colors.secondaryBlue,
          borderWidth: 1,
        }}
      ></TextInput>
    </View>
  );
}
