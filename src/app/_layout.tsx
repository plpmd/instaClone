import { Stack } from 'expo-router';
import '../../global.css';
import AuthProvider from '../providers/AuthProvider';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar backgroundColor='white'/>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  )
}
