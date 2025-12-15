import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { ScrollView } from 'react-native';

export default function PointsScreen() {
  return (
    <ScrollView className="flex-1 bg-background-0">
      <Box className="p-6">
        <VStack space="lg">
          <Heading size="2xl" className="text-typography-900">
            My Points
          </Heading>
          
          {/* Points Summary Card */}
          <Box className="p-6 bg-primary-500 rounded-xl">
            <VStack space="sm" className="items-center">
              <Text className="text-white text-lg">Total Points</Text>
              <Heading size="4xl" className="text-white">
                0
              </Heading>
            </VStack>
          </Box>

          {/* Points History */}
          <VStack space="md">
            <Heading size="lg" className="text-typography-900">
              Recent Activity
            </Heading>
            <Box className="p-6 bg-background-50 rounded-lg border border-outline-200">
              <Text className="text-center text-typography-500">
                No activity yet
              </Text>
            </Box>
          </VStack>
        </VStack>
      </Box>
    </ScrollView>
  );
}