import { useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slot } from 'expo-router';

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authStatus = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(authStatus === 'true');
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn === null) return; // Still loading

    const inAuthGroup = segments[0] === 'login' || segments[0] === 'register';

    if (!isLoggedIn && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/login');
    } else if (isLoggedIn && inAuthGroup) {
      // Redirect to main app if authenticated
      router.replace('/(tabs)');
    }
  }, [isLoggedIn, segments]);

  // Show nothing while checking authentication
  if (isLoggedIn === null) {
    return null; // Or a loading screen
  }

  return <Slot />;
}