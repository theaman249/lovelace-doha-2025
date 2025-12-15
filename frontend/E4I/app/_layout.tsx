import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect, useState } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/hooks/use-auth';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <GluestackUIProvider mode="dark">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack 
          screenOptions={{ animationEnabled: true }}
          initialRouteName={!isLoggedIn ? 'login' : '(tabs)'}
        >
          {!isLoggedIn ? (
            <>
              <Stack.Screen 
                name="login" 
                options={{ 
                  headerShown: false,
                  animationTypeForReplace: isLoading ? 'none' : 'slide_from_right',
                }} 
              />
              <Stack.Screen 
                name="register" 
                options={{ 
                  headerShown: false,
                  animationTypeForReplace: isLoading ? 'none' : 'slide_from_right',
                }} 
              />
            </>
          ) : (
            <>
              <Stack.Screen 
                name="(tabs)" 
                options={{ 
                  headerShown: false,
                  animationTypeForReplace: 'fade',
                }} 
              />
              <Stack.Screen 
                name="modal" 
                options={{ 
                  presentation: 'modal', 
                  title: 'Modal',
                }} 
              />
            </>
          )}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
