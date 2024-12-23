import React, { useEffect, useState } from "react";
import { createAuthAxios } from "@/api/authAxios";
import { ActivityIndicator, View } from "react-native";
import { Colors } from "../constants/Colors";
import TransactionCard from "./TransactionCard";
import CustomizableMainText from "./CustomizableMainText";
import { Fonts } from "../constants/Fonts";
export default function TransactionSection() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const authAxios = createAuthAxios();
  console.log(transactions);

  useEffect(() => {
    authAxios
      .get("/payments/")
      .then((res) => {
        // Parse, sort by date, and limit to 3 most recent transactions
        const sortedTransactions = JSON.parse(res.data.message)
          .sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
          .slice(0, 10); // Limit to 3 most recent transactions
        setTransactions(sortedTransactions);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  return (
    <View>
      {/* transactions section */}

      <CustomizableMainText
        style={{
          fontFamily: Fonts.BoldText,
          fontSize: 15,
          color: "black",
        }}
      >
        Recent Funding Transactions
      </CustomizableMainText>
      {loading ? (
        <ActivityIndicator
          size={40}
          color={Colors.mainBlue}
        ></ActivityIndicator>
      ) : transactions.length == 0 ? (
        <CustomizableMainText
          style={{
            color: "black",
            textAlign: "center",
            opacity: 0.5,
          }}
        >
          Nothing here yet!
        </CustomizableMainText>
      ) : (
        transactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))
      )}
    </View>
  );
}
//  [
//           {
//             amount: "5000",
//             date_created: new Date(),
//             remark: "Airtime",
//             status: "penidng",
//           },
//         ]
