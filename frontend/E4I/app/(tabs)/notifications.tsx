import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { ScrollView } from 'react-native';

export default function NotificationsScreen() {
  return (
    <ScrollView className="flex-1 bg-background-0">
      <Box className="p-6">
        <VStack space="lg">
          <Heading size="2xl" className="text-typography-900">
            Notifications
          </Heading>
          
          {/* TODO: Add notifications list */}
          <Box className="p-6 bg-background-50 rounded-lg border border-outline-200">
            <Text className="text-center text-typography-500">
              No new notifications
            </Text>
          </Box>
        </VStack>
      </Box>
    </ScrollView>
  );
}