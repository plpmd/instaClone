import { ReactNode } from "react";
import { View, Pressable, Text, TouchableWithoutFeedback } from "react-native";

type Props = {
  text: string
  onPress: () => void
  icon?: ReactNode
}

export default function Button({ text, onPress, icon }: Props) {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <View className='w-full'>
        <View className='h-16 w-full justify-center border-none p-3 rounded-xl pr-12 bg-[#e5f3f0]  text=[#545b5a]'>
          <Text className="font-Jakarta-Regular text-[#0e1b13] text-base">{text}</Text>
        </View>
        { icon }
      </View>
    </TouchableWithoutFeedback>
  )
}
