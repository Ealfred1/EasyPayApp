import React from "react";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomizableMainText from "../../../components/CustomizableMainText";
import PrimaryInput from "../../../components/PrimaryInput";
import PrimaryButton from "../../../components/PrimaryButton";
import MainText from "../../../components/MainText";
import { Fonts } from "../../../constants/Fonts";

export default function Moniffy() {
  return (
    <ScreenLayout>
      <CustomizableMainText
        style={{
          color: "black",
          textAlign: "center",
          opacity: 0.6,
        }}
      >
        Enter an amount and click "Proceed" to be redirected to the checkout
        page, where you can choose to pay with your bank card or via transfer.
      </CustomizableMainText>
      <PrimaryInput
        inputText="Amount (₦)"
        placeHolder="Enter Amount"
      ></PrimaryInput>
      <PrimaryButton btnText={"Proceed"}></PrimaryButton>
      <CustomizableMainText
        style={{
          color: "black",
          marginTop: 0,
          fontFamily: Fonts.semiBold,
        }}
      >
        Fee: 1.2%
      </CustomizableMainText>
      <CustomizableMainText
        style={{
          color: "black",
          textAlign: "center",
          opacity: 0.6,
        }}
      >
        *Funding delays may occur. Refresh your dashboard after using Monnify.
      </CustomizableMainText>
    </ScreenLayout>
  );
}
