import React from "react";
import Card from "./Card";
import { PlatformColor, View } from "react-native";
import CustomizableMainText from "./CustomizableMainText";
import { Fonts } from "../constants/Fonts";
import { Platform } from "react-native";
import { Colors } from "@/constants/Colors";
import { format } from "date-fns";
export default function TransactionCard({ transaction }) {
  const { amount, date_created, remark, status } = transaction;
  console.log(amount);

  return (
    <Card
      style={{
        backgroundColor: "white",
        borderColor: "#D3D3D3",
        borderWidth: 1,
        // borderColor: "white",

        padding: 10,
        marginVertical: 3,
        borderRadius: 10,
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
                color: "black",
              }}
            >
              {/* Airtime */}
              {remark}
            </CustomizableMainText>
            <CustomizableMainText
              style={{
                marginVertical: 0,
                fontSize: 10,
                color: "grey",
              }}
            >
              {format(new Date(date_created), "MMM dd, h:mm a")}
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
              fontFamily: Fonts.regularText,
              color: Platform.select({
                android: PlatformColor("@android:color/holo_red_light"),
                ios: PlatformColor("systemRed"),
              }),
            }}
          >
            {status === "Failed" ? "-" : ""} ₦{amount}
          </CustomizableMainText>
          <CustomizableMainText
            style={{
              marginVertical: 0,
              fontSize: 10,
              color: "grey",
            }}
          >
            {status}
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
