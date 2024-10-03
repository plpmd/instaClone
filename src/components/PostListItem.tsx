import { Post } from '@/src/domain/model';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { Ionicons } from '@expo/vector-icons';
import { AdvancedImage } from 'cloudinary-react-native';
import { useState } from 'react';
import { Text, TextInput, useWindowDimensions, View } from 'react-native';
import { cld } from '../lib/cloudinary';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

type Props = {
  post: Post
}

export default function PostListItem({ post }: Props) {
  const { width } = useWindowDimensions()
  const [response, setResponse] = useState('')

  const image = cld.image(post.image);
  image
    .resize(thumbnail().width(Math.floor(width)).height(Math.floor(width)))

  const avatar = cld.image(post.user.avatar_url || 'default_avatar')
  avatar.resize(thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face())))


  const enterChat = async () => {
    const { data, error } = await supabase
      .from('chats')
      .select('*')
      .eq('post_id', post.id)

    if(data && data.length > 0){

    } else {

    }
  }

  return (
    <View className="bg-white p-3 gap-3">
      <View className='flex-row items-center gap-3'>
        <AdvancedImage cldImg={avatar} className='w-12 aspect-square rounded-md' />
        <Text className='font-semibold'>{post.user.username || 'New user'}</Text>
      </View>

      <AdvancedImage cldImg={image} className='aspect-[4/3] rounded-md' />

      {/* <Text className='font-semibold'>{post?.likes?.[0].count || 0} likes</Text> */}
      <Text>
        <Text className='font-semibold'>{post.user.username}{'  '}</Text>
        {post.caption}
      </Text>

      <View className='relative mt-3'>
        <TextInput className='border-none p-3 rounded-xl pr-10 bg-[#d3e6e2]  text=[#545b5a]'
          placeholder='O que isso te fez pensar?'
          value={response}
          onChangeText={(newValue) => setResponse(newValue)}
          multiline
        />
        <Ionicons
          name="chatbubble-outline"
          size={24}
          color="#545b5a"
          className='absolute right-3 top-1/2 transform -translate-y-1/2'
          onPress={enterChat}
        />
      </View>
    </View >
  );
}
