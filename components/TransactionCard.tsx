import React from "react";
import Card from "./Card";
import { PlatformColor, View , Platform } from "react-native";
import CustomizableMainText from "./CustomizableMainText";
import { Fonts } from "../constants/Fonts";

import { format } from "date-fns";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
export default function TransactionCard({ transaction }) {
  const { amount, date_created, remark, status, credit_type } = transaction;
  console.log(transaction);

  return (
    <Card
      style={{
        backgroundColor: "white",
        borderColor: "#D3D3D3",
        borderWidth: 1,
        // borderColor: "white",

        padding: 8,
        marginVertical: 3,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",

          justifyContent: "space-between",
          alignItems: "center",

          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            maxWidth: "100%",
          }}
        >
          <IconCard></IconCard>
          <View
            style={{
              marginLeft: 7,
              maxWidth: "100%",
            }}
          >
            <CustomizableMainText
              style={{
                marginVertical: 0,
                fontFamily: "Poppins_600SemiBold",
                color: "black",
                fontSize: 11,
                maxWidth: "100%",
                // backgroundColor: "red",
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
              fontSize: 10,
              fontFamily: Fonts.regularText,
              color:
                status === "Pending"
                  ? "orange"
                  : credit_type === "debit"
                  ? "red"
                  : "green",
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
        width: 50,
        height: 50,
        backgroundColor: Colors.secondaryBlue,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
      }}
    >
      <FontAwesome5 name="money-bill" size={15} color="white" />
    </View>
  );
};
