import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { Camera, Award, BookOpen, Trophy } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';
import { Image } from 'react-native';

export default function ProfileScreen() {
  const { logout } = useAuth();
  const { totalPoints: totalPointsParam } = useLocalSearchParams();

  // Mock user data - replace with actual user data from your auth context or API
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    alias: '@johndoe',
    profileImage: null, // Set to image URI when available
    courses: 5,
    points: totalPointsParam ? parseInt(Array.isArray(totalPointsParam) ? totalPointsParam[0] : totalPointsParam) : 42,
    certificates: 1
  };

  const totalPoints = parseInt(Array.isArray(totalPointsParam) ? totalPointsParam[0] : totalPointsParam) || userData.points;

  const handleLogout = async () => {
    await logout();
  };
  
  return (
    <ScrollView className="flex-1 bg-background-0">
      <Box className="p-6">
        <VStack space="xl">
          {/* Profile Header with Image */}
          <VStack space="lg" className="items-center py-6">
            {/* Profile Picture */}
            <Box className="relative">
              <Box className="w-32 h-32 rounded-full overflow-hidden items-center justify-center border-4 border-white shadow-lg">
                <Image
                  source={require('@/assets/images/doha.jpg')}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </Box>
              {/* Camera Icon for editing */}
              <Box className="absolute bottom-0 right-0 w-10 h-10 bg-primary-500 rounded-full items-center justify-center border-2 border-white">
                <Icon as={Camera} size="sm" className="text-white" />
              </Box>
            </Box>

            {/* User Info */}
            <VStack space="sm" className="items-center">
              <Heading size="2xl" className="text-typography-900">
                {userData.firstName} {userData.lastName}
              </Heading>
              <Text className="text-typography-600 text-base">
                {userData.email}
              </Text>
              <Text className="text-primary-600 font-semibold">
                {userData.alias}
              </Text>
            </VStack>
          </VStack>

          {/* Stats Cards */}
          <HStack space="sm" className="justify-between">
            {/* Courses Card */}
            <Box className="flex-1 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <VStack space="sm" className="items-center">
                <Box className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center">
                  <Icon as={BookOpen} size="md" className="text-white" />
                </Box>
                <Heading size="2xl" className="text-blue-700">
                  {userData.courses}
                </Heading>
                <Text className="text-blue-600 font-medium text-sm">Courses</Text>
              </VStack>
            </Box>

            {/* Points Card */}
            <Box className="flex-1 p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
              <VStack space="sm" className="items-center">
                <Box className="w-12 h-12 bg-amber-500 rounded-full items-center justify-center">
                  <Icon as={Trophy} size="md" className="text-white" />
                </Box>
                <Heading size="2xl" className="text-amber-700">
                  {totalPoints}
                </Heading>
                <Text className="text-amber-600 font-medium text-sm">Points</Text>
              </VStack>
            </Box>

            {/* Certificates Card */}
            <Box className="flex-1 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
              <VStack space="sm" className="items-center">
                <Box className="w-12 h-12 bg-emerald-500 rounded-full items-center justify-center">
                  <Icon as={Award} size="md" className="text-white" />
                </Box>
                <Heading size="2xl" className="text-emerald-700">
                  {userData.certificates}
                </Heading>
                <Text className="text-emerald-600 font-medium text-sm">Certificates</Text>
              </VStack>
            </Box>
          </HStack>

          {/* Settings/Options */}
          <VStack space="md" className="mt-4">
            <Heading size="xl" className="text-typography-900">
              Settings
            </Heading>
            
            <Button variant="outline" className="justify-start">
              <Box className="w-full p-2">
                <HStack space="md" className="items-center">
                  <Box className="w-10 h-10 bg-primary-100 rounded-lg items-center justify-center">
                    <Text className="text-xl">👤</Text>
                  </Box>
                  <VStack className="flex-1">
                    <Text className="text-typography-900 font-semibold">Edit Profile</Text>
                    <Text className="text-typography-500 text-sm">Update your personal information</Text>
                  </VStack>
                  <Text className="text-typography-400">›</Text>
                </HStack>
              </Box>
            </Button>
            
            <Button variant="outline" className="justify-start">
              <Box className="w-full p-2">
                <HStack space="md" className="items-center">
                  <Box className="w-10 h-10 bg-primary-100 rounded-lg items-center justify-center">
                    <Text className="text-xl">⚙️</Text>
                  </Box>
                  <VStack className="flex-1">
                    <Text className="text-typography-900 font-semibold">Preferences</Text>
                    <Text className="text-typography-500 text-sm">Customize your experience</Text>
                  </VStack>
                  <Text className="text-typography-400">›</Text>
                </HStack>
              </Box>
            </Button>
            
            <Button variant="outline" className="justify-start">
              <Box className="w-full p-2">
                <HStack space="md" className="items-center">
                  <Box className="w-10 h-10 bg-primary-100 rounded-lg items-center justify-center">
                    <Text className="text-xl">🔒</Text>
                  </Box>
                  <VStack className="flex-1">
                    <Text className="text-typography-900 font-semibold">Privacy & Security</Text>
                    <Text className="text-typography-500 text-sm">Manage your data and security</Text>
                  </VStack>
                  <Text className="text-typography-400">›</Text>
                </HStack>
              </Box>
            </Button>

            <Button variant="outline" className="justify-start">
              <Box className="w-full p-2">
                <HStack space="md" className="items-center">
                  <Box className="w-10 h-10 bg-primary-100 rounded-lg items-center justify-center">
                    <Text className="text-xl">ℹ️</Text>
                  </Box>
                  <VStack className="flex-1">
                    <Text className="text-typography-900 font-semibold">Help & Support</Text>
                    <Text className="text-typography-500 text-sm">Get help with your account</Text>
                  </VStack>
                  <Text className="text-typography-400">›</Text>
                </HStack>
              </Box>
            </Button>
          </VStack>

          {/* Logout Button */}
          <Button onPress={handleLogout} className="mt-6 bg-error-500" size="lg">
            <ButtonText className="font-semibold">Log Out</ButtonText>
          </Button>
        </VStack>
      </Box>
    </ScrollView>
  );
}