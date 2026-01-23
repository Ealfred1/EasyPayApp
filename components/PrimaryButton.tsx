import React from "react";
import { Pressable, Text, View } from "react-native";
import CustomizableMainText from "./CustomizableMainText";
import { Fonts } from "../constants/Fonts";

interface PrimaryButtonProps {
  children?: React.ReactNode;
  style?: any;
  btnText: string | React.ReactNode;
  smallBtn?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  btnbcgstyle?: any;
}

export default function PrimaryButton({
  children,
  style,
  btnText,
  smallBtn,
  disabled,
  onPress,
  btnbcgstyle,
}: PrimaryButtonProps) {
  return (
    <View
      style={[
        {
          borderRadius: 40,
          overflow: "hidden",
          marginVertical: 20,
          // backgroundColor: "red",
        },
        style,
      ]}
    >
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => {
          return [
            {
              backgroundColor: disabled ? "black" : "#33A1FF",
              borderRadius: 40,
              paddingVertical: 8,
              paddingHorizontal: 5,

              justifyContent: "center",
              alignItems: "center",
            },
            btnbcgstyle,
          ];
        }}
        android_ripple={{
          color: "white",
          radius: 700,
          // borderless: true,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <CustomizableMainText
            style={{
              fontFamily: Fonts.semiBold,
              color: "white",
              fontSize: smallBtn ? 10 : 14,
            }}
          >
            {btnText}
          </CustomizableMainText>
          {children}
        </View>
      </Pressable>
    </View>
  );
}
