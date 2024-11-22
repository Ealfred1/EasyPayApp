import React, { useEffect } from "react";
import { View } from "react-native";

export default function Card({ children, onLayoutChange, style }) {
  const handleLayout = (event) => {
    if (onLayoutChange == null) {
      return;
    }
    const { width, height } = event.nativeEvent.layout;
    // Pass the dimensions to the parent
    onLayoutChange({ width, height });
  };

  return (
    <View
      onLayout={handleLayout}
      style={[
        {
          // backgroundColor: "#007FFF",
          backgroundColor: "rgba(0, 127, 255, 0.5)",
          borderColor: "white",
          borderWidth: 2,
          borderRadius: 20,
          marginVertical: 20,
          padding: 20,
          alignItems: "flex-start",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
