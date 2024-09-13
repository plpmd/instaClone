import { useAuth } from "@/src/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth()
  if(isAuthenticated){
    return <Redirect href="/(tabs)" />
  }
  
  return <Stack>
    <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Boas Vindas',
          headerTitleAlign: 'center',
        }}
      />
  </Stack>
}
