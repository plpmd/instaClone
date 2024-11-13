import React from 'react';
import { Text, View } from "react-native";

type Props = {
  text: string;
};

export const Header = ({ text }: Props) => {
  return (
    <View className="h-28 bg-white justify-center items-center relative">
      <Text className="font-Jakarta-Semibold text-[#0e1b13] text-[18px] mt-4">{text}</Text>
      <View className="absolute bottom-0 w-full h-0.5 bg-slate-100" />
    </View>
  );
};
