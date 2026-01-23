import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

export default function CheckoutScreen({ route }) {
  const { checkoutUrl } = route.params; // Pass the checkout URL as a prop

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: checkoutUrl }}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
