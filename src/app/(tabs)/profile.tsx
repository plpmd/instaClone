import { Alert, Image, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import TextButton from '@/src/components/TextButton';
import pickImage from '@/src/util/pickImage';
import Button from '@/src/components/Button';
import TextInput from '@/src/components/TextInput';
import { supabase } from '@/src/lib/supabase';
import { useAuth } from '@/src/providers/AuthProvider';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { User } from '@/src/domain/model';

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')

  const { user } = useAuth()

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    if (!user) {
      return
    }

    const { data, error }: PostgrestSingleResponse<User[]> =
      await supabase.from('profiles').select('*').eq('id', user.id);

    if (error) {
      Alert.alert('Failed to fetch profile')
    }

    if (data) {
      setUsername(data[0].username)
      setBio(data[0].bio)
    }
  }

  const updateProfile = async () => {
    if (!user) {
      return
    }

    const { error } = await supabase.from('profiles').upsert({
      id: user?.id,
      username,
      bio
    })

    if (error) {
      Alert.alert('Failed to fetch profile')
    }
  }

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

      <TextInput
        header='Bio'
        value={bio}
        onChangeText={setBio}
        placeholder='Conte algo sobre você'
      />

      <View className='gap-3 mt-auto'>
        <Button onPress={updateProfile} text='Update' />
        <Button onPress={() => supabase.auth.signOut()} text='Sign out' />
      </View>

    </View>
  )
}
