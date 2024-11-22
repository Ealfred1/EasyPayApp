import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

import PrimaryButton from "../../components/PrimaryButton";
import CustomizableMainText from "../../components/CustomizableMainText";
import MainHeader from "../../components/MainHeader";
import { Fonts } from "../../constants/Fonts";
import TransactionCard from "../../components/TransactionCard";
import { Entypo, Feather } from "@expo/vector-icons";
import Card from "../../components/Card";
import MainText from "../../components/MainText";

export default function Dashboard() {
  const [childDimensions, setChildDimensions] = useState({
    width: 0,
    height: 0,
  });
  let width = childDimensions.width;

  const handleChildLayout = (dimensions) => {
    setChildDimensions(dimensions);
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar style="dark"></StatusBar>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1, padding: 10 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 50,
            // backgroundColor: "white",
          }}
        >
          <MainHeader>EasyPay</MainHeader>

          <Card>
            <CustomizableMainText
              style={{
                // fontFamily: Fonts.BoldText,
                fontSize: 15,
                opacity: 0.8,
              }}
            >
              Hello! 👋
            </CustomizableMainText>

            <CustomizableMainText
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 14,
              }}
            >
              Masterpiece Ayobami
            </CustomizableMainText>

            <CustomizableMainText
              style={{
                // color: "grey",
                // fontFamily: Fonts.BoldText,
                opacity: 0.7,
              }}
            >
              Explore your Dashboard
            </CustomizableMainText>

            <CustomizableMainText
              style={{
                marginBottom: 0,
                opacity: 0.7,
              }}
            >
              Main Balance
            </CustomizableMainText>
            <CustomizableMainText
              style={{
                fontSize: 15,
                fontFamily: Fonts.semiBold,
                marginTop: 5,
              }}
            >
              ₦ 0.00
            </CustomizableMainText>

            <View
              style={{
                flexDirection: "row",
                gap: 3,
              }}
            >
              <PrimaryButton
                btnText="Fund your wallet"
                style={{
                  flex: 1,

                  // backgroundColor: "pink",
                }}
              >
                <Entypo
                  name="wallet"
                  size={17}
                  color={"white"}
                  style={{}}
                ></Entypo>
              </PrimaryButton>
              <PrimaryButton
                btnText={"Upgarde Account"}
                style={{
                  flex: 1,
                }}
              >
                <Feather
                  name="arrow-up"
                  size={17}
                  color={"white"}
                  style={{}}
                ></Feather>
              </PrimaryButton>
            </View>

            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View>
                <CustomizableMainText
                  style={{
                    marginBottom: 0,
                    opacity: 0.7,
                  }}
                >
                  Account Number
                </CustomizableMainText>
                <CustomizableMainText
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.semiBold,
                    marginTop: 5,
                  }}
                >
                  7011173711
                </CustomizableMainText>
              </View>

              <View>
                <CustomizableMainText
                  style={{
                    marginBottom: 0,
                    opacity: 0.7,
                  }}
                >
                  Referral Bonus
                </CustomizableMainText>
                <CustomizableMainText
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.semiBold,
                    marginTop: 5,
                  }}
                >
                  ₦ 750.00
                </CustomizableMainText>
              </View>
            </View>
          </Card>

          <Card onLayoutChange={handleChildLayout}>
            <CustomizableMainText
              style={{
                fontFamily: Fonts.BoldText,
              }}
            >
              Features
            </CustomizableMainText>
            <View
              style={{
                flexDirection: "row",
                gap: 14,
                // justifyItems: "flex-start",
                // justifyContent: "flex-start",
                alignItems: "flex-start",
                // justifyContent: "space-between",
                flexWrap: "wrap",
                // backgroundColor: "pink",
              }}
            >
              {[
                "Data",
                "Wallet",
                "Airtime",
                "Electricity",
                "Education",
                "Cable",
              ].map((i, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: width / 6,
                        height: width / 6,
                        borderRadius: width / 6 / 2,
                        backgroundColor: "black",
                        marginVertical: 10,
                        padding: 10,
                      }}
                    ></View>
                    <MainText>{i}</MainText>
                  </View>
                );
              })}
            </View>
          </Card>

          <View>
            {/* transactions section */}

            <CustomizableMainText
              style={{
                fontFamily: Fonts.BoldText,
                fontSize: 15,
              }}
            >
              Recent Transactions
            </CustomizableMainText>
            <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
