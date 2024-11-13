import { Stack } from 'expo-router';

export default function ProfileStack() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerTitle: 'Perfil',
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        name='profileEdit'
        options={{
          headerTitle: 'Editar Perfil',
          headerTitleAlign: 'center',
        }}
      />

    </Stack>
  );
}
