import { Dispatch, SetStateAction } from "react";
import { Text, TextInput as RNTextInput } from "react-native";

type Props = {
  header: string
  placeholder: string
  value: string
  onChangeText: Dispatch<SetStateAction<string>>
}

export default function TextInput({ header, placeholder, value, onChangeText}: Props) {
  return (
    <>
      <Text className='text-gray-500 font-semibold'>{header}</Text>
      <RNTextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className='border border-gray-300 p-3 rounded-md'
      />
    </>
  )
}
