import React from "react";
import { Pressable, Text, View } from "react-native";
import CustomizableMainText from "./CustomizableMainText";

export default function PrimaryButton({ children, style, btnText }) {
  return (
    <View
      style={[
        {
          borderRadius: 40,
          overflow: "hidden",
          marginVertical: 10,
          // backgroundColor: "red",
        },
        style,
      ]}
    >
      <Pressable
        style={({ pressed }) => {
          return {
            backgroundColor: "#33A1FF",
            borderRadius: 40,
            paddingVertical: 5,
            // paddingHorizontal: 5,

            justifyContent: "center",
            alignItems: "center",
          };
        }}
        android_ripple={{
          color: "white",
          radius: 100,
          // borderless: true,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            gap: 5,
          }}
        >
          <CustomizableMainText
            style={{
              fontFamily: "Poppins_700Bold",
              color: "white",
              fontSize: 10,
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
