import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import CustomizableMainText from "./CustomizableMainText";
import Card from "./Card";
import { Fonts } from "../constants/Fonts";
import { Colors } from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

export default function ActionCard({
  bgColor,
  borderColor,
  iconbgColor,
  headerTxt,
  mainTxt,
  children,
  linkTxt,
  onPress,
}) {
  console.log(onPress, "help");

  return (
    <Pressable onPress={onPress}>
      <Card
        style={{
          backgroundColor: bgColor,
          width: "100%",
          borderRadius: 10,
          borderColor: borderColor ? borderColor : "white",
          marginVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
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
              // backgroundColor: "pink",
              width: "80%",
            }}
          >
            <CustomizableMainText
              style={{
                fontSize: 15,
                fontFamily: Fonts.semiBold,
                marginVertical: 0,
                color: "black",
              }}
            >
              {headerTxt}
            </CustomizableMainText>
            {/* <Text></Text> */}
            {/* <MainText></MainText> */}
            <CustomizableMainText style={{ marginVertical: 0, color: "black" }}>
              {mainTxt}
            </CustomizableMainText>
            {linkTxt && (
              <TouchableOpacity>
                <CustomizableMainText
                  style={{ marginVertical: 5, color: Colors.secondaryBlue }}
                >
                  {linkTxt}{" "}
                  <AntDesign
                    name="arrowright"
                    size={12}
                    color={Colors.secondaryBlue}
                  />
                </CustomizableMainText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Card>
    </Pressable>
  );
}
