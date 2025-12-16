import { useState } from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';

export default function RedeemPointsScreen() {
  const [points, setPoints] = useState(1000); // Example points value

  const handleRedeem = () => {
    // Logic for redeeming points
    console.log('Redeeming points...');
  };

  return (
    <Box className="flex-1 justify-center items-center p-6 bg-background-0">
      <VStack space="xl" className="w-full max-w-md">
        <Heading size="3xl" className="text-typography-900 text-center">
          Redeem Your Points
        </Heading>
        <Text className="text-typography-600 text-center mb-4">
          You have {points} points available to redeem.
        </Text>
        <Button onPress={handleRedeem} className="mt-4">
          <ButtonText>Redeem Points</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}