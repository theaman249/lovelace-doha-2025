import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TextInput, Pressable, Text, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    setError('');
    
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with your actual registration API call
      // Example: const response = await fetch('http://your-backend/register', {...})
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store authentication state
      await AsyncStorage.setItem('isLoggedIn', 'true');
      
      // Navigate to the main app
      router.replace('/(tabs)');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    router.back();
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
            <Text className="text-3xl font-bold text-white mb-2">Create Account</Text>
            <Text className="text-gray-400 text-center">Sign up to get started</Text>
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
          <View className="w-full mb-4">
            <Text className="text-white mb-2 font-semibold">Password</Text>
            <TextInput
              placeholder="Create a password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
              secureTextEntry
              className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg"
            />
          </View>

          {/* Confirm Password Input */}
          <View className="w-full mb-6">
            <Text className="text-white mb-2 font-semibold">Confirm Password</Text>
            <TextInput
              placeholder="Confirm your password"
              placeholderTextColor="#9CA3AF"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!isLoading}
              secureTextEntry
              className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg"
            />
          </View>

          {/* Sign Up Button */}
          <Pressable
            onPress={handleRegister}
            disabled={isLoading}
            className={`w-full py-3 rounded-lg items-center justify-center ${
              isLoading ? 'bg-blue-700 opacity-75' : 'bg-blue-600'
            }`}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold text-lg">Sign Up</Text>
            )}
          </Pressable>

          {/* Login Link */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-400">Already have an account? </Text>
            <Pressable onPress={goToLogin} disabled={isLoading}>
              <Text className="text-blue-500 font-semibold">Sign In</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
