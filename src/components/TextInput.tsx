import { Dispatch, SetStateAction } from "react";
import { Text, TextInput as RNTextInput, View } from "react-native";

type Props = {
  header: string
  placeholder: string
  value: string
  onChangeText: Dispatch<SetStateAction<string>>
}

export default function TextInput({ header, placeholder, value, onChangeText}: Props) {
  return (
    <View className="mb-2">
      <Text className='text-gray-500 font-semibold mb-1'>{header}</Text>
      <RNTextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className='border border-gray-300 p-3 rounded-md'
      />
    </View>
  )
}
