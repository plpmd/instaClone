import { useAuth } from "@/src/providers/AuthProvider";
import { useChatContext } from "@/src/providers/ChatProvider";
import { useLoggedUserContext } from "@/src/providers/LoggedUserProvider";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../../../firebase";
import pickImage from "@/src/util/pickImage";
import { uploadImage } from "@/src/util/uploadImage";
import {
  Actions,
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { Ionicons } from '@expo/vector-icons';
import ImageView from "react-native-image-viewing";
import { nanoid } from "nanoid";

const randomId = nanoid();

export default function PostChat() {
  const { id, remoteImage, username } = useLoggedUserContext()
  const { postId, postOwner, chatId } = useChatContext()

  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageView, setSeletedImageView] = useState("");
  const room = { id: `${postId}` };
  const selectedImage = '123';
  const userB = 'userB';
  const senderUser = {
    name: username,
    _id: id,
    avatar: remoteImage,
  }
  const roomId = room ? room.id : randomId;

  const roomRef = doc(db, "rooms", roomId);
  const roomMessagesRef = collection(db, "rooms", roomId, "messages");

  useEffect(() => {
    (async () => {
      if (!room) {
        const currUserData = {
          displayName: username,
          email: id,
          photoURL: remoteImage
        };

        const postOwnerData = {
          displayName: postOwner?.username,
          id: postOwner?.id,
          photoURL: postOwner?.avatar_url
        };

        const roomData = {
          participants: [currUserData, postOwnerData],
          participantsArray: [id, postOwner?.id],
        };
        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          Alert.alert(`${error}`)
        }
      }

      /* if (selectedImage && selectedImage.uri) {
        await sendImage(selectedImage.uri, emailHash);
      } */
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(roomMessagesRef, (querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages: any) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  const onSend = useCallback(async (messages: IMessage[]) => {
    const writes = messages.map((m) => addDoc(roomMessagesRef, {
      ...m,
      _id: m._id || Date.now().toString(),
      createdAt: new Date(),
      user: {
        _id: id,
        name: username,
        avatar: remoteImage,
      },
    }));

    await Promise.all(writes);

    const lastMessage = messages[messages.length - 1];

    // Update the room document separately
    if (roomRef && lastMessage) {
      await setDoc(doc(db, "rooms", roomId), { lastMessage }, { merge: true });
    }
  }, []);

  /* async function sendImage(uri, roomPath) {
    const { url, fileName } = await uploadImage(
      uri,
      `images/rooms/${roomPath || roomHash}`
    );
    const message = {
      _id: fileName,
      text: "",
      createdAt: new Date(),
      user: senderUser,
      image: url,
    };
    const lastMessage = { ...message, text: "Image" };
    await Promise.all([
      addDoc(roomMessagesRef, message),
      updateDoc(roomRef, { lastMessage }),
    ]);
  } */

  /* async function handlePhotoPicker() {
    const result = await pickImage();
    if (!result.cancelled) {
      await sendImage(result.uri);
    }
  } */

  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../../../../assets/chatbg.png")}
      style={{ flex: 1 }}
    >
      <GiftedChat
        onSend={onSend}
        messages={messages}
        user={senderUser}
        renderAvatar={null}
        /* renderActions={(props) => (
          <Actions
            {...props}
            containerStyle={{
              position: "absolute",
              right: 50,
              bottom: 5,
              zIndex: 9999,
            }}
            //onPressActionButton={handlePhotoPicker}
            icon={() => (
              <Ionicons name="camera" size={30} color={'grey'} />
            )}
          />
        )} */
        timeTextStyle={{ right: { color: 'grey' } }}
        renderSend={(props) => {
          const { text, onSend } = props;
          return (
            <Send {...props}>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 40,
                  backgroundColor: 'blue',
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 5,
                  marginLeft:5
                }}
                onPress={() => {
                  if (text && onSend) {
                    onSend(
                      {
                        text: text.trim(),
                      },
                      true
                    );
                  }
                }}
              >
                <Ionicons name="send" size={20} color={'white'} />
              </TouchableOpacity>
            </Send>

          );
        }}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 2,
              borderRadius: 20,
              paddingTop: 5,
            }}
          />
        )}
        renderBubble={(props) => (
          <Bubble
            {...props}
            textStyle={{ right: { color: 'white' } }}
            wrapperStyle={{
              left: {
                backgroundColor: 'white',
              },
              right: {
                backgroundColor: 'blue',
              },
            }}
          />
        )}
        renderMessageImage={(props) => {
          return (
            <View style={{ borderRadius: 15, padding: 2 }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  //setSeletedImageView(props.currentMessage.image);
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    width: 200,
                    height: 200,
                    padding: 6,
                    borderRadius: 15,
                    resizeMode: "cover",
                  }}
                  source={{ uri: props.currentMessage.image }}
                />
                {selectedImageView ? (
                  <ImageView
                    imageIndex={0}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    images={[{ uri: selectedImageView }]}
                  />
                ) : null}
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </ImageBackground>
  );
}
