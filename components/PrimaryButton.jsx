import React from "react";
import { Pressable, Text, View } from "react-native";
import CustomizableMainText from "./CustomizableMainText";
import { Fonts } from "../constants/Fonts";

export default function PrimaryButton({
  children,
  style,
  btnText,
  smallBtn,
  onPress,
}) {
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
        style={({ pressed }) => {
          return {
            backgroundColor: "#33A1FF",
            borderRadius: 40,
            paddingVertical: 5,
            paddingHorizontal: 10,

            justifyContent: "center",
            alignItems: "center",
          };
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
              fontFamily: Fonts.BoldText,
              color: "white",
              fontSize: smallBtn ? 10 : 12,
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
