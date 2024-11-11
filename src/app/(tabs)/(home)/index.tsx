import PostListItem from '@/src/components/PostListItem';
import { Post } from '@/src/domain/model';
import { supabase } from '@/src/lib/supabase';
import { useAuth } from '@/src/providers/AuthProvider';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Alert, Animated, Dimensions, PanResponder, StyleSheet, Text, View } from 'react-native';

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const postLengthRef = useRef(0)
  useEffect(() => {
    fetchPosts()
  }, [])

  const { user } = useAuth()

  const fetchPosts = async () => {
    setLoading(true);
    let { data, error } = await supabase
      .from('posts')
      .select('*, user:profiles(*), my_likes:likes(*), likes(count)')
      .eq('my_likes.user_id', user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      Alert.alert('Something went wrong');
    }
    if (data && Array.isArray(data)) {
      setPosts(data);
      postLengthRef.current = data.length
    }
    setLoading(false);
  };

  const translateX = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;

  const changePost = useCallback((updateIndex: (prevIndex: number) => number) => {
    const newIndex = updateIndex(currentIndex);
    const direction = newIndex > currentIndex ? -screenWidth : screenWidth;

    Animated.timing(translateX, {
      toValue: direction,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex(updateIndex);
      translateX.setValue(0);

    });
  }, [currentIndex, screenWidth, translateX]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onMoveShouldSetPanResponder: (e, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        const dx = gestureState.dx;
        if (dx < -screenWidth / 5 && currentIndex < postLengthRef.current - 1) {
          changePost((prevIndex) => Math.min(prevIndex + 1, postLengthRef.current - 1));
        } else if (dx > screenWidth / 5) {
          changePost((prevIndex) => Math.max(prevIndex - 1, 0));
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const resetPosition = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  if (loading) {
    return <Text>Loading...</Text>
  }

  const handlePost = () => {
    if(currentIndex < posts.length){
      return posts[currentIndex]
    } else {
      setCurrentIndex(posts.length -1)
      return posts.at(-1)
    }
  }

  return (
    <View className='gap-10 w-full'>
      <Animated.View
        style={{
          transform: [{ translateX }]
        }
        }
        {...panResponder.panHandlers}
      >
        <PostListItem post={handlePost() || posts[0]} />
      </Animated.View>
    </View>
  );
}
