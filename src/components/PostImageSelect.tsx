import { GestureResponderEvent, TouchableOpacity } from "react-native"
import { View, Text } from "react-native"
import { AntDesign } from '@expo/vector-icons';

type Props = {
  onPress: (e: GestureResponderEvent) => void
}
export const PostImageSelect = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View className="
        flex
        items-center
        justify-center
        aspect-[4/3] rounded-md bg-slate-100
        flex-column"
      >
        <Text className="font-Jakarta-Regular text-[#1f2722] text-lg">
          Adicionar foto
        </Text>
        <AntDesign
          name="picture"
          size={40}
          color="#393e3b"
          className='mt-8'
        />
      </View>
    </TouchableOpacity>
  )
}
