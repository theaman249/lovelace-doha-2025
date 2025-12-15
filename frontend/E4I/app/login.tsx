import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TextInput, Pressable, Text, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with your actual authentication API call
      // Example: const response = await fetch('http://your-backend/login', {...})
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store authentication state
      await AsyncStorage.setItem('isLoggedIn', 'true');
      
      // Navigate to the main app
      router.replace('/(tabs)');
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const goToRegister = () => {
    router.push('/register');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center items-center px-6">
          {/* Header */}
          <View className="mb-8 items-center">
            <Text className="text-3xl font-bold text-white mb-2">Welcome</Text>
            <Text className="text-gray-400 text-center">Sign in to your account</Text>
          </View>

          {/* Error Message */}
          {error ? (
            <View className="w-full bg-red-900 border border-red-600 rounded-lg p-3 mb-6">
              <Text className="text-red-100">{error}</Text>
            </View>
          ) : null}

          {/* Email Input */}
          <View className="w-full mb-4">
            <Text className="text-white mb-2 font-semibold">Email</Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              editable={!isLoading}
              keyboardType="email-address"
              autoCapitalize="none"
              className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg"
            />
          </View>

          {/* Password Input */}
          <View className="w-full mb-6">
            <Text className="text-white mb-2 font-semibold">Password</Text>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
              secureTextEntry
              className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg"
            />
          </View>

          {/* Login Button */}
          <Pressable
            onPress={handleLogin}
            disabled={isLoading}
            className={`w-full py-3 rounded-lg items-center justify-center ${
              isLoading ? 'bg-blue-700 opacity-75' : 'bg-blue-600'
            }`}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold text-lg">Sign In</Text>
            )}
          </Pressable>

          {/* Sign Up Link */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-400">Don't have an account? </Text>
            <Pressable onPress={goToRegister} disabled={isLoading}>
              <Text className="text-blue-500 font-semibold">Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
