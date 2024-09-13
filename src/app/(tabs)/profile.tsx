import { Image, Text, View } from 'react-native';
import { useState } from 'react';
import TextButton from '@/src/components/TextButton';
import pickImage from '@/src/util/pickImage';
import Button from '@/src/components/Button';
import TextInput from '@/src/components/TextInput';

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState('')

  return (
    <View className='p-3 flex-1'>
      <View className='items-center mt-3'>
        {image ?
          <Image source={{ uri: image }}
            className='w-52 aspect-square self-center rounded-full bg-slate-300'
          />
          :
          <View className='w-52 aspect-square self-center rounded-full bg-slate-300' />
        }
        <TextButton onPress={() => pickImage(setImage)}>Change</TextButton>
      </View>

      <TextInput 
        header='Username'
        value={username}
        onChangeText={setUsername}
        placeholder='José Luiz'
      />

      <View className='gap-3 mt-auto'>
        <Button onPress={() => { }} text='Update' />
        <Button onPress={() => { }} text='Sign out' />
      </View>

    </View>
  )
}
