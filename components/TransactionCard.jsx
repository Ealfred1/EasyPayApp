import React from "react";
import Card from "./Card";
import { PlatformColor, View } from "react-native";
import CustomizableMainText from "./CustomizableMainText";
import { Fonts } from "../constants/Fonts";
import { Platform } from "react-native";

export default function TransactionCard() {
  return (
    <Card
      style={{
        backgroundColor: "white",
        borderColor: "#33A1FF",
        borderWidth: 1,
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",

          justifyContent: "space-between",

          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconCard></IconCard>
          <View
            style={{
              marginLeft: 10,
            }}
          >
            <CustomizableMainText
              style={{
                marginVertical: 0,
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              Airtime
            </CustomizableMainText>
            <CustomizableMainText
              style={{
                marginVertical: 0,
                fontSize: 10,
                color: "grey",
              }}
            >
              Nov 14, 12:00 PM
            </CustomizableMainText>
          </View>
        </View>

        <View
          style={{
            alignItems: "flex-end",
          }}
        >
          <CustomizableMainText
            style={{
              marginVertical: 0,
              fontFamily: "Poppins_600SemiBold",
              color: Platform.select({
                android: PlatformColor("@android:color/holo_red_light"),
                ios: PlatformColor("systemRed"),
              }),
            }}
          >
            - ₦100.00
          </CustomizableMainText>
          <CustomizableMainText
            style={{
              marginVertical: 0,
              fontSize: 10,
              color: "grey",
            }}
          >
            Deposit
          </CustomizableMainText>
        </View>
      </View>
    </Card>
  );
}

const IconCard = () => {
  return (
    <View
      style={{
        width: 40,
        height: 40,
        backgroundColor: "black",
        borderRadius: 20,
      }}
    ></View>
  );
};
