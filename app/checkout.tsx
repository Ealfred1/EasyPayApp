import { router, useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import ScreenLayout from "../components/ScreenLayout";
import { Colors } from "../constants/Colors";

export default function Checkout() {
  const { url } = useLocalSearchParams();
  const webViewRef = useRef(null);

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "payment") {
        router.replace("/mainSidescreens");
      }
    } catch (e) {}
  };

  return (
    <ScreenLayout>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webview}
        renderLoading={() => (
          <ActivityIndicator size={50} color={Colors.secondaryBlue} />
        )}
        javaScriptEnabled={true}
        onMessage={handleMessage}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
