import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import ScreenLayout from "../components/ScreenLayout";
import { Colors } from "../constants/Colors";

export default function Checkout() {
  const { url } = useLocalSearchParams();

  return (
    <ScreenLayout>
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        renderLoading={() => (
          <ActivityIndicator size={50} color={Colors.secondaryBlue} />
        )}
        javaScriptEnabled={true}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
