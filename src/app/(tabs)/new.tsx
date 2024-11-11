import React, { useState } from 'react';
import { View, Image, TextInput, Platform, ScrollView, Keyboard, TouchableOpacity, Text, Alert } from 'react-native';
import Button from '@/src/components/Button';
import { uploadImage } from '@/src/lib/cloudinary';
import { supabase } from '@/src/lib/supabase';
import { useAuth } from '@/src/providers/AuthProvider';
import { router } from 'expo-router';
import { AntDesign, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import pickImage from '@/src/util/pickImage';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const authState = useAuth();
  const session = authState?.session;

  const createPost = async () => {
    let imagePublicId
    if (image) {
      const response = await uploadImage(image);
      imagePublicId = response?.public_id;
    }

    const { error } = await supabase
      .from('posts')
      .insert([
        {
          caption,
          title,
          image: imagePublicId,
          user_id: session?.user.id
        },
      ])
      .select();

    if (error) {
      Alert.alert('Error ao publicar')
    } else {
      router.push('/(home)');
    }

  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: Platform.OS === 'android' ? 16 : 8,
        paddingHorizontal: 16,
        backgroundColor: 'white',
      }}
    >
      <View className="items-left flex-1 gap-3">
        {image ?
          <TouchableOpacity
            onPress={() => pickImage(setImage)}
          >
            <Image source={{ uri: image }}
              className="w-full aspect-[4/3] rounded-md bg-slate-300"
            />
          </TouchableOpacity>
          :
          <TouchableOpacity
            onPress={() => pickImage(setImage)}
          >
            <View className="flex
              items-center
              justify-center
              aspect-[4/3] rounded-md bg-slate-300
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
        }

        <TextInput
          onChangeText={(newValue) => setTitle(newValue)}
          value={title}
          placeholder="Título da sua publicação"
          className="font-Jakarta-Bold text-[#0e1b13] text-lg text-left"
        />

        <TextInput
          onChangeText={(newValue) => setCaption(newValue)}
          value={caption}
          placeholder="Qual é a sua ideia?"
          multiline
          numberOfLines={10}
          className="font-Jakarta-Regular text-[#0e1b13] text-base"
          textAlignVertical="top"
        />

        <View className="mt-auto w-full">
          <Button onPress={createPost} text="Publicar" icon={
            <FontAwesome5
              name="paper-plane"
              size={24}
              color="#545b5a"
              className='absolute right-3 top-1/2 transform -translate-y-1/2'
            />}
          />
        </View>
      </View>

    </ScrollView>
  );
}
