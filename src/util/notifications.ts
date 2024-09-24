import { NotificationMessage } from "../domain/model/notificationMessage";
import { PostLike } from "../domain/model/postLike";
import { supabase } from "../lib/supabase";

async function sendPushNotification(message: NotificationMessage) {
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export async function sendLikeNotification  (like: PostLike){
  const { data } = await supabase.from('likes')
  .select('*, posts(*, profiles(*))')
  .eq('id', like.id)
  .single()

  const pushToken = data.posts.profiles.push_token

  if(!pushToken){
    return
  }

  const message = {
    to: pushToken,
    sound: 'default',
    title: 'Sua publicação recebeu uma curtida',
    body: `${data?.posts?.profiles.username} curtiu seu post!'`,
    data: { postId: data.posts.id },
  };
  
  sendPushNotification(message)

}
