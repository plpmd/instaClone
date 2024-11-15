import { Redirect, Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from '@/src/providers/AuthProvider';
import NotificationProvider from '@/src/providers/NotificationProvider';
import ChatProvider from '@/src/providers/ChatProvider';
import LoggedUserProvider from '@/src/providers/LoggedUserProvider';
import { Feather, AntDesign } from '@expo/vector-icons';

export default function TabsLayout() {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Redirect href="/(auth)" />
  }

  return (
    <NotificationProvider>
      <LoggedUserProvider>
        <ChatProvider>
          <Tabs
            screenOptions={{ tabBarActiveTintColor: 'black', tabBarShowLabel: false }}
          >
            <Tabs.Screen
              name="(home)"
              options={{
                headerShown: false,
                tabBarIcon: ({ color }) => (
                  <AntDesign name="home" size={26} color={color} />
                ),
              }}
            />

            <Tabs.Screen
              name="NewPost"
              options={{
                headerShown: false,
                tabBarIcon: ({ color }) => (
                  <AntDesign name="plus" size={26} color={color} />
                ),
              }}
            />

            <Tabs.Screen
              name="(profile)"
              options={{
                headerShown: false,
                tabBarIcon: ({ color }) => (
                  <Feather name="user" size={26} color={color} />
                ),
              }}
            />
          </Tabs>
        </ChatProvider>
      </LoggedUserProvider>


    </NotificationProvider>
  );
}
