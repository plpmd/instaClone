import { FlatList, Image, View } from 'react-native';
import posts from '@/assets/data/posts.json'
import PostListItem from '@/src/components/PostListItem';

export default function FeedScreen() {
  return (
    <FlatList
      className='items-center'
      data={posts}
      contentContainerStyle={{ gap: 10, maxWidth: 512, width: '100%'}}
      renderItem={({ item }) => <PostListItem post={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}
