import React, { useState } from "react";
import Card from "./Card";
import { Pressable, Text, View } from "react-native";
import CustomizableMainText from "./CustomizableMainText";
import { Fonts } from "@/constants/Fonts";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
export default function QuestionCard({
  index,
  openIndex,
  setOpenIndex,
  headerTxt,
  mainTxt,
}) {
  return (
    <Pressable
      onPress={() => {
        if (index == openIndex) {
          setOpenIndex(null);
          return;
        }
        setOpenIndex(index);
      }}
    >
      <Card
        style={{
          borderRadius: 12,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            alignSelf: "flex-end",
            borderRadius: 15,
            width: 30,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign
            name={index == openIndex ? "up" : "down"}
            size={20}
            color={Colors.mainBlue}
          ></AntDesign>
        </View>

        <CustomizableMainText
          style={{
            fontFamily: Fonts.semiBold,
            fontSize: 14,
          }}
        >
          {headerTxt}
        </CustomizableMainText>
        <CustomizableMainText
          style={{
            fontSize: 12,
            display: index == openIndex ? "flex" : "none",
          }}
        >
          {mainTxt}
        </CustomizableMainText>
      </Card>
    </Pressable>
  );
}
