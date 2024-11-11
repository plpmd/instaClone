import { useEffect, useState } from 'react';
import { Image, TextInput, View } from 'react-native';
import TextButton from '@/src/components/TextButton';
import pickImage from '@/src/util/pickImage';
import Button from '@/src/components/Button';
import { uploadImage } from '@/src/lib/cloudinary';
import { supabase } from '@/src/lib/supabase';
import { useAuth } from '@/src/providers/AuthProvider';
import { router } from 'expo-router';

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState<string | null>(null);

  const authState = useAuth()
  const session = authState?.session

  useEffect(() => {
    if (!image) {
      pickImage(setImage)
    }
  }, [image])


  const createPost = async () => {
    if (!image) return
    const response = await uploadImage(image)
    const imagePublicId = response?.public_id

    const { data, error } = await supabase
      .from('posts')
      .insert([
        { 
          caption,
          title, 
          image: imagePublicId, 
          user_id: session?.user.id 
        },
      ])
      .select()

      router.push('/(tabs)')

  }

  return (
    <View className='p-3 items-center flex-1'>
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
        onChangeText={(newValue) => setTitle(newValue)}
        value={title}
        placeholder='Título da sua publicação'
        className='w-full p-3'
      />

      <TextInput
        onChangeText={(newValue) => setCaption(newValue)}
        value={caption}
        placeholder='Qual é a sua ideia?'
        className='w-full p-3'
      />

      <View className='mt-auto w-full'>
        <Button onPress={createPost} text='Share' />
      </View>

    </View>
  )

}
