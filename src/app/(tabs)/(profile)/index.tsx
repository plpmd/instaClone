import { cld } from '@/src/lib/cloudinary';
import { useLoggedUserContext } from '@/src/providers/LoggedUserProvider';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from 'cloudinary-react-native';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { FieldCount } from '../../../components/FieldCount';
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { Post } from '@/src/domain/model';
import ProfilePostListItem from '@/src/components/ProfilePostListItem';
import { RoundButton } from '@/src/components/RoundButton';
import { router, useLocalSearchParams } from 'expo-router'
import { Header } from '@/src/components/Header';

type Props = {
  refreshUser?: 'true' | 'false'
}
export default function ProfileScreen() {
  const { remoteImage, username, bio, id, getProfile } = useLoggedUserContext()
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPostId, setSelectedPostId] = useState<string>('')

  const { refreshUser } = useLocalSearchParams<Props>();

  useEffect(() => {
    if (refreshUser === 'true') {
      getProfile();
    }
  }, [refreshUser])

  const avatar = cld.image(remoteImage || 'default_avatar')
  avatar.resize(thumbnail().width(160).height(160).gravity(focusOn(FocusOn.face())))

  const fetchPosts = async () => {
    setLoading(true);
    let { data, error } = await supabase
      .from('posts')
      .select('*, user:profiles(*)')
      .eq('user_id', id)

    if (error) {
      Alert.alert('Something went wrong');
    }
    if (data && Array.isArray(data)) {
      setPosts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts()
  }, [])


  return (
    <View className='flex-1 bg-white'>
      <Header text='Perfil' />
      <View className='p-3 gap-3'>
        <View className='flex-row w-full items-center gap-6'>
          <AdvancedImage cldImg={avatar} className='w-20 aspect-square rounded-full' />
          <View className='flex-row justify-between flex-1 gap-6'>
            <FieldCount
              field={'Publicações'}
              count={5}
            />
            <FieldCount
              field={'Conversas'}
              count={21}
            />
            <FieldCount
              field={'Projetos'}
              count={0}
            />
          </View>
        </View>

        <View className='flex-row justify-between'>
          <View>
            <Text className='font-Jakarta-Bold'>{username || 'Novo usuário'}</Text>
            <Text className='font-Jakarta-Regular'>{bio}</Text>
          </View>

          <RoundButton
            icon={
              <Ionicons name="pencil-outline" size={24} color="black" />
            }
            onPress={() => router.push('/profileEdit')}
          />
        </View>

        <View className="h-px bg-slate-200 w-full" />
        <Text className='font-Jakarta-Bold text-sm'>Minhas publicações:</Text>
        <FlatList
          data={posts}
          renderItem={({ item }) => <ProfilePostListItem
            setSelectedPostId={setSelectedPostId}
            post={item}
            isSelected={item.id === selectedPostId}
          />
          }
          keyExtractor={item => item.id}
        />

      </View>
    </View>

  )
}
