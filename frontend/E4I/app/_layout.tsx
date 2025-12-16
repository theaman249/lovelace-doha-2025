import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import '@/global.css';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="redeem-points" options={{headerShown:false}} />
      </Stack>
    </AuthProvider>
  );
}