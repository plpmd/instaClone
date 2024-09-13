import { useEffect, useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TextButton from '@/src/components/TextButton';
import pickImage from '@/src/util/pickImage';
import Button from '@/src/components/Button';

export default function CreatePost() {
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (!image) {
      pickImage(setImage)
    }
  }, [image])

  return <View className='p-3 items-center flex-1'>
    {image ?
      <Image source={{ uri: image }}
        className='w-52 aspect-[3/4] rounded-lg bg-slate-300'
      />
      :
      <View className='w-52 aspect-[3/4] rounded-lg bg-slate-300' />
    }

    <TextButton onPress={() => pickImage(setImage)}>
      Change
    </TextButton>

    <TextInput
      onChangeText={(newValue) => setCaption(newValue)}
      value={caption}
      placeholder='Whats on your mind?'
      className='w-full p-3'
    />

    <View className='mt-auto w-full'>
      <Button onPress={() => { }} text='Share' />
    </View>

  </View>;
}
