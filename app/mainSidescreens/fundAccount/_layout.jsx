import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="ManualFunding"
        options={{
          headerTitle: "Manual Funding",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Moniffy"
        options={{
          headerTitle: "Fund with Monnify",
        }}
      ></Stack.Screen>
    </Stack>
  );
}
