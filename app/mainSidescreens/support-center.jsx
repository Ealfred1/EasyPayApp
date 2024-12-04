import React from "react";
import ScreenLayout from "../../components/ScreenLayout";
import CustomizableMainText from "../../components/CustomizableMainText";
import { Fonts } from "../../constants/Fonts";
import { Colors } from "../../constants/Colors";

import ActionCard from "../../components/ActionCard";
import {
  AntDesign,
  FontAwesome5,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";
export default function SupportCenter() {
  return (
    <ScreenLayout>
      <CustomizableMainText
        style={{
          textAlign: "center",
          fontSize: 17,
          fontFamily: Fonts.BoldText,
          color: Colors.secondaryBlue,
        }}
      >
        Support Center
      </CustomizableMainText>
      <CustomizableMainText
        style={{
          textAlign: "center",
          fontSize: 12,
          opacity: 0.7,
          color: "black",
          //   fontFamily: Fonts.BoldText,
        }}
      >
        Need help? Explore our support options below to find the assistance you
        need.
      </CustomizableMainText>

      <ActionCard
        bgColor={"white"}
        borderColor={Colors.mainTheme}
        iconbgColor={Colors.secondaryBlue}
        headerTxt={"FAQs"}
        mainTxt={"Find quick answers to our most commonly asked questions."}
        linkTxt={"Visit FAQ"}
      >
        <AntDesign name="questioncircle" size={30} color="white" />
      </ActionCard>
      <ActionCard
        bgColor={"white"}
        iconbgColor={Colors.secondaryBlue}
        headerTxt={"Whatsapp"}
        borderColor={Colors.mainTheme}
        mainTxt={
          "Chat with our support team via whatsapp on 09164661632 for immediate help."
        }
        linkTxt={"Start Chat"}
      >
        <Ionicons name="chatbubbles" size={30} color="white" />
      </ActionCard>
      <ActionCard
        bgColor={"white"}
        iconbgColor={Colors.secondaryBlue}
        borderColor={Colors.mainTheme}
        headerTxt={"Email Support"}
        mainTxt={"Reach out to us via email for assistance on any issue."}
        linkTxt={"Contact Us"}
      >
        <Fontisto name="email" size={30} color="white" />
      </ActionCard>
      <ActionCard
        bgColor={"white"}
        iconbgColor={Colors.secondaryBlue}
        borderColor={Colors.mainTheme}
        headerTxt={"Knowledege Base"}
        mainTxt={
          "Explore guides and articles to make the most of our services."
        }
        linkTxt={"Learn More"}
      >
        <AntDesign name="book" size={30} color="white" />
      </ActionCard>
    </ScreenLayout>
  );
}
