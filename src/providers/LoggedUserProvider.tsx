import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../domain/model";
import { useAuth } from "./AuthProvider";
import { supabase } from "../lib/supabase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

type Props = {
  children: ReactNode
}

export const LoggedUserContext = createContext<{
  id: string;
  setId: (value: string) => void;
  remoteImage: string;
  setRemoteImage: (value: string) => void;
  username: string;
  setUsername: (value: string) => void;
  bio: string;
  setBio: (value: string) => void;
}>({
  id: '',
  setId: () => {},
  remoteImage: '',
  setRemoteImage: () => {},
  username: '',
  setUsername: () => {},
  bio: '',
  setBio: () => {},
});

export const useLoggedUserContext = () => {
  const context = useContext(LoggedUserContext);

  if (!context) {
    throw new Error('useLoggedUserContext must be used within a LoggedUserContext');
  }

  return context;
};

export default function LoggedUserProvider({ children }: Props) {
  const [id, setId] = useState('');
  const [remoteImage, setRemoteImage] = useState('');
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')

  const { user } = useAuth()

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    if (!user) {
      return
    }

    const { data }: PostgrestSingleResponse<User[]> =
      await supabase.from('profiles').select('*').eq('id', user.id);

    if (data) {
      setUsername(data[0].username)
      setBio(data[0].bio)
      setId(data[0].id)
      data[0].avatar_url && setRemoteImage(data[0].avatar_url)
    }
  }

  return (
    <LoggedUserContext.Provider
      value={{
        id,
        setId,
        remoteImage,
        setRemoteImage,
        username,
        setUsername,
        bio,
        setBio
      }}
    >
      {children}
    </LoggedUserContext.Provider>
  )
}
