import { Post } from '@/src/domain/model';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { Ionicons } from '@expo/vector-icons';
import { AdvancedImage } from 'cloudinary-react-native';
import { router } from 'expo-router';
import { Dispatch, SetStateAction } from 'react';
import { Text, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native';
import { cld } from '../lib/cloudinary';
import { useChatContext } from '../providers/ChatProvider';
import { RoundButton } from './RoundButton';

type Props = {
  post: Post
  isSelected: boolean
  setSelectedPostId: Dispatch<SetStateAction<string>>
}

export default function ProfilePostListItem({ post, isSelected, setSelectedPostId }: Props) {
  const { width } = useWindowDimensions();

  const image = cld.image(post.image);
  image.resize(thumbnail().width(Math.floor(width)).height(Math.floor(width)));

  const avatar = cld.image(post.user.avatar_url || 'default_avatar');
  avatar.resize(thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face())));

  const { setPostId, setPostOwner } = useChatContext();

  const enterChat = async () => {
    setPostId(post.id);
    setPostOwner(post.user);
    router.push(`/chat`);
  };

  const editPost = () => {
    setSelectedPostId('')

    router.push({
      pathname: '/NewPost',
      params: {
        editTitle: post.title,
        editCaption: post.caption,
        editImage: post.image,
        editPostId: post.id
      }
    });
  }
  return (
    <View className="relative">
      <TouchableWithoutFeedback
        onPress={() => setSelectedPostId(post.id)}
        className="justify-center items-center"
      >
        <View className="w-full">
          <View className="flex-row space-x-2 items-center py-4">
            {post.title || post.caption ? (
              <View className="flex-1">
                <Text className="font-Jakarta-Bold text-[#0e1b13] text-lg">
                  {post.title?.slice(0, 31)}...
                </Text>
                <Text className="font-Jakarta-Regular text-[#0e1b13] text-base">
                  {post.caption.slice(0, 70)}...
                </Text>
              </View>
            ) : null}

            {post.image && (
              <AdvancedImage cldImg={image} className="aspect-[4/3] w-24 rounded-md" />
            )}
          </View>

          <View className="h-px bg-slate-200 w-full" />
        </View>

      </TouchableWithoutFeedback>

      {isSelected && (
        <TouchableWithoutFeedback onPress={() => setSelectedPostId('')}>
          <View className="
          absolute 
          inset-0 
          items-center 
          w-full 
          h-full 
          backdrop-blur-md 
          bg-white/75 
          justify-center
          ">
            <View className="flex-row space-x-4 gap-8">
              <RoundButton
                onPress={editPost}
                icon={
                  <Ionicons name="pencil-outline" size={24} color="#545b5a" />
                }
              />
              <RoundButton
                onPress={enterChat}
                icon={
                  <Ionicons
                    name="chatbubble-outline"
                    size={24}
                    color="#545b5a"
                  />
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}
