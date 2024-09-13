import * as ImagePicker from 'expo-image-picker';

export default async function pickImage(setImage: React.Dispatch<React.SetStateAction<string | null>>) {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 0.5,
  });

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
}
