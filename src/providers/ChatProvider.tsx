import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../domain/model";

type Props = {
  children: ReactNode
}

export const ChatContext = createContext<{
  postId: string;
  setPostId: (value: string) => void;
  chatId: string;
  setChatId: (value: string) => void;
  postOwner: User | null;
  setPostOwner: (value: User | null) => void;
}>({
  postId: '',
  setPostId: () => { },
  chatId: '',
  setChatId: () => { },
  postOwner: null,
  setPostOwner: () => { }
});

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChatContext must be used within a ChatContext');
  }

  return context;
};

export default function ChatProvider({ children }: Props) {
  const [postId, setPostId] = useState('');
  const [chatId, setChatId] = useState('');
  const [postOwner, setPostOwner] = useState<User|null>(null)

  return (
    <ChatContext.Provider
      value={{
        postId,
        setPostId,
        chatId,
        setChatId,
        postOwner,
        setPostOwner
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
