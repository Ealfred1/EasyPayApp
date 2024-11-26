import { Redirect } from "expo-router";
import React from "react";

export default function Index() {
  console.log("ok");

  return <Redirect href={"/mainSidescreens"}></Redirect>;
}
