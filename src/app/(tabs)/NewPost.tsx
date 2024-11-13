import React, { useEffect, useState } from 'react';
import { View, Image, TextInput, Platform, ScrollView, Keyboard, TouchableOpacity, Text, Alert, useWindowDimensions } from 'react-native';
import { cld, uploadImage } from '@/src/lib/cloudinary';
import { supabase } from '@/src/lib/supabase';
import { useAuth } from '@/src/providers/AuthProvider';
import { router, useLocalSearchParams } from 'expo-router';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import pickImage from '@/src/util/pickImage';
import { RoundButton } from '@/src/components/RoundButton';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from 'cloudinary-react-native';
import { PostImageSelect } from '@/src/components/PostImageSelect';
import { Header } from '@/src/components/Header';

type Props = {
  editTitle: string
  editCaption: string
  editImage: string
  editPostId: string
}

//TODO header
export default function NewPost() {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [remoteImage, setRemoteImage] = useState<string | null>(null);
  const [postId, setPostId] = useState('')

  const { editTitle, editCaption, editImage, editPostId } = useLocalSearchParams<Props>();

  useEffect(() => {
    if (editTitle) {
      setTitle(editTitle)
    }

    if (editCaption) {
      setCaption(editCaption)
    }

    if (editImage) {
      setRemoteImage(editImage)
    }

    if (editPostId) {
      setPostId(editPostId)
    }

  }, [editTitle, editCaption, editImage])

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
      .upsert([
        {
          id: editPostId,
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

  const { width } = useWindowDimensions()

  let remoteCldImage
  if (remoteImage) {
    remoteCldImage = cld.image(remoteImage);
    remoteCldImage
      .resize(thumbnail().width(Math.floor(width)).height(Math.floor(width)))
  }

  return (
    <View className='w-full h-full'>
      <Header text={editPostId ? 'Editar' : 'Publicar'}/>
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
          {remoteCldImage ? (
            <TouchableOpacity onPress={() => pickImage(setImage)}>
              <AdvancedImage
                cldImg={remoteCldImage}
                className="w-full aspect-[4/3] rounded-md bg-slate-100"
              />
            </TouchableOpacity>
          ) : (
            image ? (
              <Image
                source={{ uri: image }}
                className="w-full aspect-[4/3] rounded-md bg-slate-100"
              />
            ) : (
              <PostImageSelect onPress={() => pickImage(setImage)} />
            )
          )}

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

          <View className="mt-auto w-full justify-end flex-row">
            <RoundButton onPress={createPost} icon={
              <FontAwesome5
                name="paper-plane"
                size={24}
                color="#545b5a"
              />}
            />
          </View>
        </View>

      </ScrollView>
    </View>

  );
}
