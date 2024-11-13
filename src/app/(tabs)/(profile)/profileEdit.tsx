import { Alert, Image, Platform, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { useState } from 'react';
import TextButton from '@/src/components/TextButton';
import pickImage from '@/src/util/pickImage';
import Button from '@/src/components/Button';
import TextInput from '@/src/components/TextInput';
import { supabase } from '@/src/lib/supabase';
import { User } from '@/src/domain/model';
import { cld, uploadImage } from '@/src/lib/cloudinary';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from 'cloudinary-react-native';
import { useLoggedUserContext } from '@/src/providers/LoggedUserProvider';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router'

export default function ProfileEdit() {
  const { id, remoteImage, username, bio } = useLoggedUserContext()

  const [image, setImage] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState(username)
  const [newBio, setNewBio] = useState(bio)

  const { width } = useWindowDimensions()

  const updateProfile = async () => {
    if (!id) {
      return
    }

    const updatedProfile: User = {
      id: id,
      username: newUsername,
      bio: newBio,
    }

    if (image) {
      const response = await uploadImage(image)
      updatedProfile.avatar_url = response.public_id
    }

    const { error } = await supabase.from('profiles').upsert([updatedProfile])

    if (error) {
      Alert.alert('Failed to update profile')
    }

    router.push({
      pathname: '/(profile)',
      params: {
        refreshUser: 'true'
      }
    });
  }

  let remoteCldImage
  if (remoteImage) {
    remoteCldImage = cld.image(remoteImage);
    remoteCldImage
      .resize(thumbnail().width(Math.floor(width)).height(Math.floor(width)))
  }

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: Platform.OS === 'android' ? 16 : 8,
        backgroundColor: 'white',
      }}
    >
      <View className='p-3 flex-1'>
        <View className='items-center mt-3'>
          {image ?
            <Image source={{ uri: image }}
              className='w-52 aspect-square self-center rounded-full bg-slate-300'
            />
            : remoteCldImage ? <AdvancedImage cldImg={remoteCldImage} className='w-52 aspect-square self-center rounded-full bg-slate-300' /> :
              <View className='w-52 aspect-square self-center rounded-full bg-slate-300' />
          }
          <TextButton onPress={() => pickImage(setImage)}>Change</TextButton>
        </View>

        <TextInput
          header='Username'
          value={newUsername}
          onChangeText={setNewUsername}
          placeholder='José Luiz'
        />

        <TextInput
          header='Bio'
          value={newBio}
          onChangeText={setNewBio}
          placeholder='Conte algo sobre você'
        />

        <View className='mt-3'>
          <Button onPress={updateProfile} text='Atualizar' icon={
            <Ionicons name='checkmark' size={24} />
          } />
        </View>

        <View className='gap-3 mt-auto'>
          <Button onPress={() => supabase.auth.signOut()} text='Sign out' icon={
            <AntDesign name='logout' size={20} />
          } />
        </View>

      </View>
    </ScrollView>
  )
}
