import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

export default function actionConfig(i) {
  let icon;
  let bgkColor;
  let link;

  if (i == "Data") {
    icon = <AntDesign name="wifi" size={20} color="rgb(59, 130, 246)" />;
    bgkColor = "#EFF6FF";
    link = "/mainSidescreens/buyData";
  }
  if (i == "Wallet") {
    icon = <AntDesign name="wallet" size={20} color="rgb(34, 197, 94)" />;
    bgkColor = "#F0FDF4";
    link = "/mainSidescreens/fundAccount";
  }

  if (i == "Airtime") {
    icon = <AntDesign name="phone" size={20} color="rgb(234, 179, 8)" />;
    bgkColor = "#FEFCE8";
    link = "/mainSidescreens/airtime-purchase";
  }
  if (i == "Electricity") {
    icon = (
      <MaterialIcons name="electric-bolt" size={20} color="rgb(168, 85, 247)" />
    );
    bgkColor = "#FAF5FF";
    link = "/electricity";
  }
  if (i == "Education") {
    icon = <AntDesign name="book" size={20} color="rgb(236, 72, 153)" />;
    bgkColor = "#FDF2F8";
    link = "/mainSidescreens/education-subscription";
  }
  if (i == "Cable") {
    icon = <Feather name="tv" size={20} color={"rgb(239, 68, 68)"} />;
    bgkColor = "#FEF2F2";
    link = "/mainSidescreens/cable-subscription";
  }
  if (i == "referral") {
    icon = (
      <MaterialIcons name="person-add" size={20} color={"rgb(239, 68, 68)"} />
    );
    bgkColor = "#FEF2F2";
    link = "/mainSidescreens/refer-screen";
  }
  return [icon, bgkColor, link];
}
