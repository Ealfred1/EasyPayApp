import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenLayout from "../../components/ScreenLayout";
import PrimaryButton from "../../components/PrimaryButton";
import CustomizableMainText from "../../components/CustomizableMainText";
import MainHeader from "../../components/MainHeader";
import { Fonts } from "../../constants/Fonts";
import TransactionCard from "../../components/TransactionCard";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import Card from "../../components/Card";
import MainText from "../../components/MainText";

import actionConfig from "../../Utils/DashboardItem";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";

import { DashboardContext } from "../../context/DashboardContext";
// import Swal from "sweetalert2"; // SweetAlert2 for modals

import { createAuthAxios } from "@/api/authAxios";
import authAxios from "@/api/authAxios";
import TransactionSection from "../../components/TransactionSection";

export default function Dashboard() {
  const authAxios = createAuthAxios();

  const { user, loading } = useContext(DashboardContext);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const navigate = useRouter(); // To navigate the user to the settings page
  const router = navigate;
  useEffect(() => {
    if (user && user?.pin === null) {
      setIsPinModalOpen(true);
    }
  }, [user, navigate]);
  const screenWidth = Dimensions.get("window").width;

  let itemsPerRow;
  if (screenWidth <= 480) {
    itemsPerRow = 5; // Small phones
  } else if (screenWidth <= 768) {
    itemsPerRow = 6; // Large phones
  } else if (screenWidth <= 1024) {
    itemsPerRow = 7; // Tablets
  } else {
    itemsPerRow = 8; // Larger screens
  }

  // Calculate item width (adjust based on desired spacing and items per row)
  const itemWidth = Math.floor(screenWidth / itemsPerRow) - 8;

  return (
    <ScreenLayout whitebg={true}>
      <Modal
        visible={isPinModalOpen}
        transparent={true}
        statusBarTranslucent={true}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.7)",

            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              // minHeight: "50%",
              paddingVertical: 40,
              borderRadius: 20,
              padding: 5,
              justifyContent: "space-between",
            }}
          >
            <CustomizableMainText
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 17,
                fontFamily: Fonts.BoldText,
              }}
            >
              Set Your PIN
            </CustomizableMainText>
            <CustomizableMainText
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 12,
                fontFamily: Fonts.regularText,
              }}
            >
              You currently don’t have a PIN set. Would you like to create one?
            </CustomizableMainText>
            <View
              style={{
                flexDirection: "row",
                gap: 3,
              }}
            >
              <PrimaryButton
                btnText={"Set Pin"}
                style={{
                  flex: 1,
                }}
                onPress={() => {
                  setIsPinModalOpen(false);
                  router.push("/mainSidescreens/settings");
                }}
              ></PrimaryButton>
              <PrimaryButton
                btnText={"Cancel"}
                onPress={() => {
                  setIsPinModalOpen(false);
                }}
                style={{
                  flex: 1,
                }}
                btnbcgstyle={{ backgroundColor: "red" }}
              ></PrimaryButton>
            </View>
          </View>
        </View>
      </Modal>
      <Card>
        <CustomizableMainText
          style={{
            // fontFamily: Fonts.BoldText,
            fontSize: 20,
            fontFamily: Fonts.semiBold,
            // opacity: 0.8,
          }}
        >
          Hello! 👋
        </CustomizableMainText>

        <CustomizableMainText
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 15,
            opacity: 0.9,
          }}
        >
          {(loading && !user) || user == false ? (
            <ActivityIndicator color={"white"} size={20}></ActivityIndicator>
          ) : (
            `${user?.first_name} ${user?.last_name}`
          )}
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
          ₦ {(loading && !user) || user == false ? "Getting data..." : ""}{" "}
          {user?.balance}
        </CustomizableMainText>

        <View
          style={{
            flexDirection: "row",
            gap: 5,
          }}
        >
          <PrimaryButton
            btnText="Fund your wallet"
            onPress={() => router.push("/mainSidescreens/fundAccount")}
            smallBtn={true}
            style={{
              flex: 1,

              // backgroundColor: "pink",
            }}
          >
            <Entypo name="wallet" size={15} color={"white"} style={{}}></Entypo>
          </PrimaryButton>
          {/* <PrimaryButton
            btnText={"Upgrade Account"}
            smallBtn={true}
            style={{
              flex: 1,
            }}
          >
            <Feather
              name="arrow-up"
              size={15}
              color={"white"}
              style={{}}
            ></Feather>
          </PrimaryButton> */}
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
              {loading || !user || user == false ? (
                <ActivityIndicator
                  color={"white"}
                  size={20}
                ></ActivityIndicator>
              ) : (
                user?.account_num || user.phone_number
              )}
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

      <Card>
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

            // alignItems: "center",
            justifyContent: "flex-start",
            // gap: 20,
            // alignItems: "center",
            // justifyContent: "flex-start",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {[
            "Data",
            "Wallet",
            "Airtime",
            "Electricity",
            "Education",
            "Cable",
            "referral",
          ].map((i, index) => {
            let [icon, bgkColor, link] = actionConfig(i);

            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  router.push(link);
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    marginVertical: 10,
                  }}
                >
                  <View
                    style={{
                      width: itemWidth,
                      height: itemWidth,
                      borderRadius: itemWidth / 2,
                      // backgroundColor: "black",
                      marginVertical: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: bgkColor,
                      // padding: 3,
                    }}
                  >
                    {icon}
                  </View>
                  <MainText>{i}</MainText>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>

      <TransactionSection></TransactionSection>
    </ScreenLayout>
  );
}
