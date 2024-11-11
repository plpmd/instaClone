import { Stack } from 'expo-router';

export default function HomeStack() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerTitle: 'Publicações',
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        name='chat'
        options={{
          headerTitle: 'Conversa',
          headerTitleAlign: 'center',
        }}
      />

    </Stack>
  );
}
