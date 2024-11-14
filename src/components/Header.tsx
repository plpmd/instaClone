import React from 'react';
import { Text, View } from "react-native";

type Props = {
  text: string;
};
import { SafeAreaView } from 'react-native-safe-area-context';

export const Header = ({ text }: Props) => {
  return (
    <SafeAreaView>
      <View className="h-[80px] bg-white justify-center items-center">
        <Text className="font-Jakarta-Semibold text-[#0e1b13] text-[18px] mt-4">{text}</Text>
        <View className="absolute bottom-0 w-full h-0.5 bg-slate-100" />
      </View>
    </SafeAreaView>
  );
};
