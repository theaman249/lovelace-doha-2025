import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileScreen() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };
  
  return (
    <ScrollView className="flex-1 bg-background-0">
      <Box className="p-6">
        <VStack space="lg">
          {/* Profile Header */}
          <VStack space="md" className="items-center py-6">
            <Box className="w-24 h-24 bg-primary-300 rounded-full items-center justify-center">
              <Text className="text-3xl text-white">U</Text>
            </Box>
            <VStack space="xs" className="items-center">
              <Heading size="xl" className="text-typography-900">
                User Name
              </Heading>
              <Text className="text-typography-600">
                user@example.com
              </Text>
            </VStack>
          </VStack>

          {/* Stats */}
          <HStack space="md" className="justify-around py-4">
            <VStack space="xs" className="items-center">
              <Heading size="xl" className="text-typography-900">
                0
              </Heading>
              <Text className="text-typography-600">Courses</Text>
            </VStack>
            <VStack space="xs" className="items-center">
              <Heading size="xl" className="text-typography-900">
                0
              </Heading>
              <Text className="text-typography-600">Points</Text>
            </VStack>
            <VStack space="xs" className="items-center">
              <Heading size="xl" className="text-typography-900">
                0
              </Heading>
              <Text className="text-typography-600">Certificates</Text>
            </VStack>
          </HStack>

          {/* Settings/Options */}
          <VStack space="md" className="mt-6">
            <Heading size="lg" className="text-typography-900">
              Settings
            </Heading>
            
            <Box className="p-4 bg-background-50 rounded-lg">
              <Text className="text-typography-700">Edit Profile</Text>
            </Box>
            
            <Box className="p-4 bg-background-50 rounded-lg">
              <Text className="text-typography-700">Preferences</Text>
            </Box>
            
            <Box className="p-4 bg-background-50 rounded-lg">
              <Text className="text-typography-700">Privacy & Security</Text>
            </Box>
          </VStack>

          {/* Logout Button */}
          <Button onPress={handleLogout} className="mt-6 bg-error-500">
            <ButtonText>Log Out</ButtonText>
          </Button>
        </VStack>
      </Box>
    </ScrollView>
  );
}