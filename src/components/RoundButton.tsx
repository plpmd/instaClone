import { ReactNode } from "react"
import { GestureResponderEvent, TouchableOpacity, View } from "react-native"

type Props = {
  icon: ReactNode,
  onPress: (e: GestureResponderEvent) => void
}
export const RoundButton = ({ icon, onPress }: Props) => {
  return (
    <View className='
      bg-[#e5f3f0] 
      aspect-square 
      rounded-full 
      justify-center 
      items-center 
      p-2
      h-16'
      >
      <TouchableOpacity onPress={onPress}>
        {icon}
      </TouchableOpacity>
    </View>
  )

}
