import { Image, Pressable, Text, useWindowDimensions, View } from 'react-native';
import { Post } from '@/src/domain/model'
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons'
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from 'cloudinary-react-native';
import { cld } from '../lib/cloudinary';
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../providers/AuthProvider';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { PostLike } from '../domain/model/postLike';

type Props = {
  post: Post
}

export default function PostListItem({ post }: Props) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeRecord, setLikeRecord] = useState<PostLike | null>(null)
  const { width } = useWindowDimensions()
  const { user } = useAuth()

  useEffect(() => {
      if (isLiked && !likeRecord) {
        saveLike()
      } else {
        deleteLike()
      }
  })

  useEffect(() => {
    if(post.my_likes.length > 0){
      setLikeRecord(post.my_likes[0])
      setIsLiked(true)
    }
  },[post.my_likes])

  const saveLike = async () => {
    if (!user) return
    const { data }: PostgrestSingleResponse<PostLike[]> = await supabase
      .from('likes')
      .insert([{ user_id: user.id, post_id: post.id }])
      .select()

    if (data) {
      setLikeRecord(data[0])
    }
  }

  const deleteLike = async () => {
    if (!user) return
    if (likeRecord) {
      const { error } = await supabase.from('likes').delete().eq('id', likeRecord.id)
      if (!error) setLikeRecord(null)
    }
  }

  const image = cld.image(post.image);
  image
    .resize(thumbnail().width(Math.floor(width)).height(Math.floor(width)))

  const avatar = cld.image(post.user.avatar_url || 'default_avatar')
  avatar.resize(thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face())))

  return (
    <View className="bg-white">
      <View className='p-3 flex-row items-center gap-2'>
        <AdvancedImage cldImg={avatar} className='w-12 aspect-square rounded-full' />
        <Text className='font-semibold'>{post.user.username || 'New user'}</Text>
      </View>
      <AdvancedImage cldImg={image} className='w-full aspect-[4/3]' />

      <View className="flex-row gap-3 p-3">
        <AntDesign
          name={isLiked ? 'heart' : "hearto"}
          size={20}
          onPress={() => setIsLiked(!isLiked)}
          color={isLiked ? 'crimson' : 'black'}
        />
        <Ionicons name="chatbubble-outline" size={20} />
        <Feather name="send" size={20} />
        <Feather name="bookmark" size={20} className="ml-auto" />
      </View>

      <View className='px-3 pb-3'>
        <Text className='font-semibold'>58 likes</Text>
        <Text>
          <Text className='font-semibold'>{post.user.username}{'  '}</Text>
          {post.caption}
        </Text>
      </View >

    </View >
  );
}
