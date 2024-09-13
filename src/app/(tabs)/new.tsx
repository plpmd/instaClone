import { useEffect, useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CreatePost() {
  const [caption, setCaption] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    if (!image) {
      pickImage()
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

    <Text onPress={pickImage} className='text-blue-500 font-semibold m-5'>
      Change
    </Text>

    <TextInput
      onChangeText={(newValue) => setCaption(newValue)}
      value={caption}
      placeholder='Whats on your mind?'
      className='w-full p-3'
    />

    <View className='mt-auto w-full'>
      <Pressable className='bg-blue-500 w-full p-3 items-center rounded-md'>
        <Text className='text-white font-semibold'>Share</Text>
      </Pressable>
    </View>

  </View>;
}
