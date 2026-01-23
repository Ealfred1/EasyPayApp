import React, { useState } from "react";
import ScreenLayout from "../../components/ScreenLayout";
import CustomizableMainText from "../../components/CustomizableMainText";
import QuestionCard from "../../components/QuestionCard";
import { Fonts } from "../../constants/Fonts";
import { Colors } from "@/constants/Colors";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <ScreenLayout>
      <CustomizableMainText
        style={{
          textAlign: "center",
          fontSize: 17,
          fontFamily: Fonts.BoldText,
          color: Colors.secondaryBlue,
        }}
      >
        Frequently Asked Questions
      </CustomizableMainText>

      {[
        {
          q: "What is our service about?",
          a: "We provide data, airtime, cable subscription, electricity subscription, and education pins to make various services more accessible and affordable for students and other users.",
        },
        {
          q: "How do I purchase a package?",
          a: "Select your vendor and package, enter necessary details, and proceed to checkout. Payment options will appear to complete your purchase.",
        },
        {
          q: "Can I get a refund?",
          a: "Refunds are provided for specific cases. If you need one, reach out to our support with your purchase details.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept transfers to your virtual account, paystack, monnify and manual funding. If you come across any issues funding your account feel free to contact the customer service",
        },
        {
          q: "How can I contact customer support?",
          a: "Our support team is available via the contact form on our site or at dataease247@gmail.com.",
        },
      ].map((item, index) => {
        return (
          <QuestionCard
            index={index + 1}
            openIndex={openIndex}
            key={item.q}
            setOpenIndex={setOpenIndex}
            mainTxt={item.a}
            headerTxt={item.q}
          ></QuestionCard>
        );
      })}
    </ScreenLayout>
  );
}
