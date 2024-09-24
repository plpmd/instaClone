import { Alert, FlatList, Image, View } from 'react-native';
import posts from '@/assets/data/posts.json'
import PostListItem from '@/src/components/PostListItem';
import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { Post } from '@/src/domain/model';

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts()
  },[])

  const fetchPosts = async () => {
    setLoading(true);
    let { data, error } = await supabase.from('posts').select('*, user:profiles(*)')

    if(error){
      Alert.alert('Um erro aconteceu.')
    }

    if (data && Array.isArray(data)) {
      setPosts(data);
    } else {
      Alert.alert('Ainda não temos posts.')
    }
    setLoading(false);
  }
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      contentContainerStyle={{ gap: 10, maxWidth: 512, alignSelf: 'center', width: '100%' }}
      showsVerticalScrollIndicator={false}
      onRefresh={fetchPosts}
      refreshing={loading}
    />
  );
}
