import React from "react";
import ScreenLayout from "../../components/ScreenLayout";
import ActionCard from "../../components/ActionCard";
import { Colors } from "../../constants/Colors";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function Settings() {
  return (
    <ScreenLayout>
      <ActionCard
        bgColor={Colors.mainBlue}
        mainTxt={"Update your general information"}
        headerTxt={"User Information"}
        iconbgColor={Colors.secondaryBlue}
      >
        <AntDesign name="user" size={30} color={"white"}></AntDesign>
      </ActionCard>
      <ActionCard
        bgColor={"rgb(220, 252, 231)"}
        iconbgColor={"rgb(134 ,239 ,172)"}
        mainTxt={"Update your password"}
        headerTxt={"Change Password"}
      >
        <AntDesign size={30} color={"white"} name="lock1"></AntDesign>
      </ActionCard>
      <ActionCard
        bgColor={"rgb(254 ,249 ,195)"}
        iconbgColor={"rgb(253,224,71)"}
        mainTxt={"Update your transaction PIN"}
        headerTxt={"Change Pin"}
      >
        <Feather size={30} color={"white"} name="key"></Feather>
      </ActionCard>
    </ScreenLayout>
  );
}
