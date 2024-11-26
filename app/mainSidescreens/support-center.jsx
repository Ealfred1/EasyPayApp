import React from "react";
import ScreenLayout from "../../components/ScreenLayout";
import CustomizableMainText from "../../components/CustomizableMainText";
import { Fonts } from "../../constants/Fonts";
import { Colors } from "../../constants/Colors";
import ActionCard from "../../components/ActionCard";
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
          //   fontFamily: Fonts.BoldText,
        }}
      >
        Need help? Explore our support options below to find the assistance you
        need.
      </CustomizableMainText>

      <ActionCard></ActionCard>
      <ActionCard></ActionCard>
      <ActionCard></ActionCard>
      <ActionCard></ActionCard>
    </ScreenLayout>
  );
}
