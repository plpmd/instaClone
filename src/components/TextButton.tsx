import { ReactNode } from "react"
import { GestureResponderEvent, Text } from "react-native"

type Props = {
  onPress:  ((event: GestureResponderEvent) => void)
  children: ReactNode
}

export default function TextButton({ onPress, children }: Props) {
  return (
    <Text onPress={onPress} className='text-blue-500 font-semibold m-5'>
      {children}
    </Text>
  )
} 
