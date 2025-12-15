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

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      // TODO: Show error message
      console.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await register(name, email, password);
      // Navigation handled by AuthContext
    } catch (error) {
      console.error('Registration failed:', error);
      // TODO: Show error message to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="flex-1 justify-center items-center p-6 bg-background-0">
      <VStack space="xl" className="w-full max-w-md">
        <VStack space="md" className="items-center mb-6">
          <Heading size="3xl" className="text-typography-900">
            Create Account
          </Heading>
          <Text className="text-typography-600 text-center">
            Start your learning journey today
          </Text>
        </VStack>

        <VStack space="lg">
          <FormControl>
            <Input>
              <InputField
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
              />
            </Input>
          </FormControl>

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

          <FormControl>
            <Input>
              <InputField
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </Input>
          </FormControl>

          <Button onPress={handleRegister} disabled={loading} className="mt-4">
            <ButtonText>{loading ? 'Creating Account...' : 'Create Account'}</ButtonText>
          </Button>

          <Pressable onPress={() => router.back()}>
            <Text className="text-center text-typography-600">
              Already have an account?{' '}
              <Text className="text-primary-600 font-semibold">Sign In</Text>
            </Text>
          </Pressable>
        </VStack>
      </VStack>
    </Box>
  );
}