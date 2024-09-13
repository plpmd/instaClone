import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabsLayout() {
  return <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', tabBarShowLabel: false }}>
    <Tabs.Screen
      name="index"
      options={{
        title: 'For you',
        tabBarIcon: ({ color }) => <FontAwesome size={26} name="home" color={color} />
      }}
    />

    <Tabs.Screen
      name="new"
      options={{
        title: 'Create post',
        tabBarIcon: ({ color }) => <FontAwesome size={26} name="plus-square-o" color={color} />
      }}
    />

    <Tabs.Screen
      name="profile"
      options={{
        title: 'Profile',
        tabBarIcon: ({ color }) => <FontAwesome size={26} name="user" color={color} />
      }}
    />
  </Tabs>
}
