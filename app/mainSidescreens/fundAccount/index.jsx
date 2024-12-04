import React from "react";
import ScreenLayout from "../../../components/ScreenLayout";
import Card from "../../../components/Card";
import { Pressable, Text, View } from "react-native";
import { FontAwesome5, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import CustomizableMainText from "../../../components/CustomizableMainText";
import { Fonts } from "../../../constants/Fonts";
import MainText from "../../../components/MainText";
import { Colors } from "../../../constants/Colors";
import ActionCard from "../../../components/ActionCard";
import { useRouter } from "expo-router";

export default function fundAccount() {
  const router = useRouter();
  return (
    <ScreenLayout>
      <ActionCard
        bgColor={"rgba(255, 165, 0, 0.7)"}
        iconbgColor={"orange"}
        mainTxt={"Fund account via admin"}
        headerTxt={"Manual Funding"}
        onPress={() =>
          router.push("/mainSidescreens/fundAccount/ManualFunding")
        }
      >
        <SimpleLineIcons
          name="wallet"
          size={30}
          color={"white"}
        ></SimpleLineIcons>
      </ActionCard>

      <ActionCard
        bgColor={Colors.mainBlue}
        iconbgColor={Colors.secondaryBlue}
        headerTxt={"Fund with Moniffy"}
        mainTxt={"Fund your account via Moniffy"}
        onPress={() => router.push("/mainSidescreens/fundAccount/Moniffy")}
      >
        <FontAwesome5
          name="money-bill"
          size={30}
          color={"white"}
        ></FontAwesome5>
      </ActionCard>

      {/* 
      //////// */}
    </ScreenLayout>
  );
}
