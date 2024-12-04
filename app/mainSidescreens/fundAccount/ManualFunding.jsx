import React, { useState } from "react";
import ScreenLayout from "../../../components/ScreenLayout";
import PrimaryInput from "../../../components/PrimaryInput";
import PrimaryButton from "../../../components/PrimaryButton";
import { Image, View } from "react-native";
import MainText from "../../../components/MainText";
import CustomizableMainText from "../../../components/CustomizableMainText";
import { Fonts } from "../../../constants/Fonts";
import ImagePickerComponent from "../../../components/ImagePicker";
import { Colors } from "../../../constants/Colors";

export default function ManualFunding() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <ScreenLayout>
      <PrimaryInput inputText="Amount" keyboardType="numeric"></PrimaryInput>
      <View>
        <CustomizableMainText
          style={{
            color: "black",

            fontSize: 12,
            fontFamily: Fonts.semiBold,
            opacity: 0.7,
          }}
        >
          Upload Image
        </CustomizableMainText>

        <ImagePickerComponent
          onImageSelected={setSelectedImage}
          selectedImage={selectedImage}
        ></ImagePickerComponent>
      </View>
      <View>
        <CustomizableMainText
          style={{
            color: "black",
          }}
        >
          <CustomizableMainText
            style={{
              color: "black",
              fontFamily: Fonts.semiBold,
            }}
          >
            Account Number{" "}
          </CustomizableMainText>
          : 6104930954
        </CustomizableMainText>
        <CustomizableMainText
          style={{
            color: "black",
          }}
        >
          <CustomizableMainText
            style={{
              color: "black",
              fontFamily: Fonts.semiBold,
            }}
          >
            Account Name
          </CustomizableMainText>{" "}
          : Ifeanyi Emmanuel Chukwu
        </CustomizableMainText>
        <CustomizableMainText
          style={{
            color: "black",
          }}
        >
          <CustomizableMainText
            style={{
              color: "black",
              fontFamily: Fonts.semiBold,
            }}
          >
            Bank Name
          </CustomizableMainText>{" "}
          : OPAY
        </CustomizableMainText>
      </View>

      <CustomizableMainText
        style={{
          color: "black",
          textAlign: "center",
          marginVertical: 10,
          opacity: 0.6,
        }}
      >
        *Enter an amount and upload a screenshot of your receipt.
      </CustomizableMainText>
      <PrimaryButton btnText={"Submit"}></PrimaryButton>
    </ScreenLayout>
  );
}
