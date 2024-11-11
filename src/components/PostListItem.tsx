import { Post } from '@/src/domain/model';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { Ionicons } from '@expo/vector-icons';
import { AdvancedImage } from 'cloudinary-react-native';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native';
import { cld } from '../lib/cloudinary';
import { useChatContext } from '../providers/ChatProvider';

type Props = {
  post: Post
}

export default function PostListItem({ post }: Props) {
  const { width } = useWindowDimensions()

  const image = cld.image(post.image);
  image
    .resize(thumbnail().width(Math.floor(width)).height(Math.floor(width)))

  const avatar = cld.image(post.user.avatar_url || 'default_avatar')
  avatar.resize(thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face())))

  const { setPostId, setPostOwner, setChatId } = useChatContext()

  const enterChat = async () => {
    /* const { data, error } = await supabase
      .from('chats')
      .select('*')
      .eq('post_id', post.id)

    if (data && data.length > 0) {
      setChatId(data[0].id)
    } */

    setPostId(post.id)
    setPostOwner(post.user)
    router.push(`/chat`)
  }

  const lastTap = useRef<number | null>(null);

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap.current && now - lastTap.current < DOUBLE_PRESS_DELAY) {
      enterChat()
    } else {
      lastTap.current = now;
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <TouchableWithoutFeedback
        onPress={handleDoubleTap}
      >
        <View className="bg-white p-3 gap-3">
          <View className='flex-row items-center gap-3'>
            <AdvancedImage cldImg={avatar} className='w-12 aspect-square rounded-full' />
            <Text className='font-Jakarta-Bold font-semibold'>{post.user.username || 'New user'}</Text>
          </View>

          <AdvancedImage cldImg={image} className='aspect-[4/3] rounded-md' />

          <Text className="font-Jakarta-Bold text-[#0e1b13] text-lg font-bold leading-tight tracking-[-0.015em] text-left pt-2">
            {post.title}
          </Text>
          <Text className="font-Jakarta-Regular text-[#0e1b13] text-base font-normal leading-normal">
            {post.caption}
          </Text>

          <TouchableWithoutFeedback className='relative mt-3'
            onPress={enterChat}
          >
            <View>
              <View className='h-16 justify-center border-none p-3 rounded-xl pr-12 bg-[#e5f3f0]  text=[#545b5a]'>
                <Text>O que isso te faz pensar?</Text>
              </View>
              <Ionicons
                name="chatbubble-outline"
                size={24}
                color="#545b5a"
                className='absolute right-3 top-1/2 transform -translate-y-1/2'
              />
            </View>
          </TouchableWithoutFeedback>

        </View >
      </TouchableWithoutFeedback>
    </ScrollView>

  );
}
