import React from "react";
import ScreenLayout from "../../components/ScreenLayout";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Fonts } from "../../constants/Fonts";
import PrimaryInput from "../../components/PrimaryInput";
import PrimaryButton from "../../components/PrimaryButton";

export default function CableSubscription() {
  return (
    <ScreenLayout>
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 10,
            fontFamily: Fonts.semiBold,
            opacity: 0.7,
          }}
        >
          Cable Type
        </Text>
        <Picker selectedValue={"java"}>
          <Picker.Item label="Dstv" value="Dstv" />
          <Picker.Item label="Gotv" value="Gotv" />
          <Picker.Item label="Startimes" value="Startimes" />
        </Picker>
      </View>

      <View
        style={{
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 10,
            fontFamily: Fonts.semiBold,
            opacity: 0.7,
          }}
        >
          Select Package
        </Text>
        <Picker selectedValue={"java"}>
          <Picker.Item label="Dstv" value="Dstv" />
          <Picker.Item label="Gotv" value="Gotv" />
          <Picker.Item label="Startimes" value="Startimes" />
          <Picker.Item label="Dstv" value="Dstv" />
          <Picker.Item label="Gotv" value="Gotv" />
          <Picker.Item label="Startimes" value="Startimes" />
          <Picker.Item label="Dstv" value="Dstv" />
          <Picker.Item label="Gotv" value="Gotv" />
          <Picker.Item label="Startimes" value="Startimes" />
          <Picker.Item label="Dstv" value="Dstv" />
          <Picker.Item label="Gotv" value="Gotv" />
          <Picker.Item label="Startimes" value="Startimes" />
        </Picker>
      </View>

      <PrimaryInput
        inputText={"IUC Number"}
        keyboardType={"numeric"}
      ></PrimaryInput>

      <PrimaryButton btnText={"Purchase"}></PrimaryButton>
    </ScreenLayout>
  );
}
