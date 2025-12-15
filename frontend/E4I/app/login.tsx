import { useState } from 'react';
import { router } from 'expo-router';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Pressable } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login(email, password);
      // Navigation handled by AuthContext
    } catch (error) {
      console.error('Login failed:', error);
      // TODO: Show error message to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="flex-1 justify-center items-center p-6 bg-background-0">
      <VStack space="xl" className="w-full max-w-md">
        <VStack space="md" className="items-center mb-8">
          <Heading size="3xl" className="text-typography-900">
            Welcome Back
          </Heading>
          <Text className="text-typography-600 text-center">
            Sign in to continue your learning journey
          </Text>
        </VStack>

        <VStack space="lg">
          <FormControl>
            <Input>
              <InputField
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Input>
          </FormControl>

          <FormControl>
            <Input>
              <InputField
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </Input>
          </FormControl>

          <Button onPress={handleLogin} disabled={loading} className="mt-4">
            <ButtonText>{loading ? 'Signing In...' : 'Sign In'}</ButtonText>
          </Button>

          <Pressable onPress={() => router.push('/register')}>
            <Text className="text-center text-typography-600">
              Don't have an account?{' '}
              <Text className="text-primary-600 font-semibold">Sign Up</Text>
            </Text>
          </Pressable>
        </VStack>
      </VStack>
    </Box>
  );
}