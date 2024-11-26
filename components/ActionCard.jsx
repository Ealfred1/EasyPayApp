import React from "react";
import { Pressable, View } from "react-native";
import CustomizableMainText from "./CustomizableMainText";
import Card from "./Card";
import { Fonts } from "../constants/Fonts";

export default function ActionCard({
  bgColor,
  iconbgColor,
  headerTxt,
  mainTxt,
  children,
}) {
  return (
    <Pressable>
      <Card
        style={{
          backgroundColor: bgColor,

          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              padding: 12,
              borderRadius: 12,
              backgroundColor: iconbgColor,
            }}
          >
            {children}
          </View>

          <View
            style={{
              marginLeft: 10,
            }}
          >
            <CustomizableMainText
              style={{
                fontSize: 15,
                fontFamily: Fonts.semiBold,
                marginVertical: 0,
              }}
            >
              {headerTxt}
            </CustomizableMainText>
            {/* <Text></Text> */}
            {/* <MainText></MainText> */}
            <CustomizableMainText style={{ marginVertical: 0 }}>
              {mainTxt}
            </CustomizableMainText>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}
