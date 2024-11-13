import { useFonts } from 'expo-font';
import { Redirect } from 'expo-router';

export default function Home() {
  const [fontsLoaded] = useFonts({
    'Jakarta-Bold': require('../../assets/fonts/Jakarta-Bold.ttf'),
    'Jakarta-Regular': require('../../assets/fonts/Jakarta-Regular.ttf'),
    'Jakarta-Semibold': require('../../assets/fonts/Jakarta-Semibold.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Redirect href="/(tabs)" />;
}
