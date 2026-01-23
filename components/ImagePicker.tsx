import React from "react";
import {
  Button,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Card from "./Card";
import { Ionicons } from "@expo/vector-icons";
import CustomizableMainText from "./CustomizableMainText";
import { Colors } from "../constants/Colors";

const ImagePickerComponent = ({ onImageSelected, selectedImage }) => {
  const pickImage = async () => {
    // Ask for permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access the gallery is required!");
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3], // Optional: Crop aspect ratio
      quality: 1, // Image quality (0 to 1)
      includeBase64: true,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0]); // Pass the selected image URI to the parent
    }
  };
  console.log(selectedImage);

  return (
    <Card
      style={{
        borderRadius: 7,
        backgroundColor: Colors.secondaryBlue,
      }}
    >
      <View
        style={{
          //   backgroundColor: "red",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={pickImage}
          style={{
            alignItems: "center",
          }}
        >
          {!selectedImage ? (
            <Ionicons name="image" size={40} color={"white"}></Ionicons>
          ) : (
            <Image
              source={{ uri: selectedImage }}
              style={{
                width: "100%",
                height: 300,
                borderRadius: 10,
                marginBottom: 16,
              }}
            />
          )}

          <CustomizableMainText style={{}}>
            {selectedImage ? "Change Image" : "Select an Image"}
          </CustomizableMainText>
        </TouchableOpacity>
      </View>
    </Card>

    // <View>
    //   <Button title="Pick an Image" onPress={pickImage} />
    // </View>
  );
};

export default ImagePickerComponent;
