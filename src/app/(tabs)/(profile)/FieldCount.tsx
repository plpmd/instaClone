import { Text, View } from "react-native"

type Props = {
  field: string,
  count: number
}

export const FieldCount = ({field, count}: Props) => {
  return (
    <View className="items-center">
      <Text className='font-Jakarta-Bold'>{count}</Text>
      <Text>{field}</Text>
    </View>
  )
}
