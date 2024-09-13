import { Image, Text, useWindowDimensions, View } from 'react-native';
import { Post } from '@/src/domain/model'
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons'
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from 'cloudinary-react-native';
import { cld } from '../util/cloudinary';
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

type Props = {
  post: Post
}

export default function PostListItem({ post }: Props) {
  const { width } = useWindowDimensions()
  const image = cld.image(post.image);
  image
    .resize(thumbnail().width(Math.floor(width)).height(Math.floor(width)))
  
  const avatar = cld.image(post.user.avatar_url)
  avatar.resize(thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face())))

  return (
    <View className="bg-white">
      <View className='p-3 flex-row items-center gap-2'>
        <AdvancedImage cldImg={avatar} className='w-12 aspect-square rounded-full' />
        <Text className='font-semibold'>{post.user.username}</Text>
      </View>
      <AdvancedImage cldImg={image} className='w-full aspect-[4/3]' />
      <View className="flex-row gap-3 p-3">
        <AntDesign name="hearto" size={20} />
        <Ionicons name="chatbubble-outline" size={20} />
        <Feather name="send" size={20} />
        <Feather name="bookmark" size={20} className="ml-auto" />
      </View>
    </View>
  );
}
