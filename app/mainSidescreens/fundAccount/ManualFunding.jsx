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
import { useRouter } from "expo-router";
import { createAuthAxios } from "../../../api/authAxios";
export default function ManualFunding() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useRouter;
  const authAxios = createAuthAxios();
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    console.log("fuck");

    setLoading(true);

    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("path", selectedImage);
    formData.append("action", "manual_funding");
    console.log(formData);

    authAxios
      .post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Success:", res.data);

        setLoading(false);
        Swal.fire({
          title: "Upload successfull!",
          text: `Your reciept has been uploaded successfully your reference id: #${res.data.reference_id}`,
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "OK",
        }).then(() => {
          // Redirect to the desired page
          navigate("/mainSidescreen/index"); // Replace with your actual route path
        });
      })
      .catch((err) => {
        console.log("hmm");

        console.error(err);
        setLoading(false);
      });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  return (
    <ScreenLayout>
      <PrimaryInput
        inputText="Amount"
        keyboardType="numeric"
        onChangeText={(e) => {
          setAmount(e);
        }}
        value={amount}
      ></PrimaryInput>
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
      <PrimaryButton
        btnText={"Submit"}
        disabled={loading}
        onPress={handleSubmit}
      ></PrimaryButton>
    </ScreenLayout>
  );
}
