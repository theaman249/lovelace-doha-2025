import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';

export default function HomeScreen() {
  return (
    <Box className="flex-1 justify-center items-center p-4 bg-background-0">
      <VStack space="lg" className="items-center">
        <Heading size="2xl" className="text-red-700">
          Welcome to E4I!
        </Heading>
        <Text size="lg" className="text-typography-700">
          Built with Gluestack UI v3
        </Text>
        <Button onPress={() => console.log('Get Started pressed')}>
          <ButtonText>Get Started</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}