import { useState } from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@/components/ui/modal';
import { Icon } from '@/components/ui/icon';
import { X, AlertCircle, CheckCircle } from 'lucide-react-native';
import { ScrollView } from 'react-native';

export default function RedeemPointsScreen() {
  const [points, setPoints] = useState(1000);
  const [pointsToRedeem, setPointsToRedeem] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const conversionRate = 20; // 20 points = 1 KT
  const maxKT = Math.floor(points / conversionRate);
  const enteredPoints = parseInt(pointsToRedeem) || 0;
  const ktAmount = Math.floor(enteredPoints / conversionRate);
  const isValidAmount = enteredPoints > 0 && enteredPoints <= points && enteredPoints >= conversionRate;

  const handleRedeemClick = () => {
    if (isValidAmount) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmRedeem = () => {
    setPoints(points - enteredPoints);
    setShowConfirmModal(false);
    setShowSuccessModal(true);
    setPointsToRedeem('');
  };

  const handleCancelRedeem = () => {
    setShowConfirmModal(false);
  };

  return (
    <ScrollView className="flex-1 bg-background-0">
      <Box className="flex-1 justify-center items-center p-6">
        <VStack space="xl" className="w-full max-w-md">
          {/* Header */}
          <VStack space="sm" className="items-center">
            <Heading size="3xl" className="text-typography-900 text-center">
              Redeem Your Points
            </Heading>
            <Text className="text-typography-600 text-center">
              Convert your points into Knowledge Tokens
            </Text>
          </VStack>

          {/* Points Display Card */}
          <Box className="p-6 bg-primary-50 rounded-xl border-2 border-primary-200">
            <VStack space="md">
              <HStack className="justify-between items-center">
                <Text className="text-typography-700 font-medium">Available Points</Text>
                <Heading size="2xl" className="text-primary-600">
                  {points}
                </Heading>
              </HStack>
              <HStack className="justify-between items-center">
                <Text className="text-typography-700 font-medium">Maximum KT</Text>
                <HStack space="xs" className="items-center">
                  <Text className="text-2xl">🪙</Text>
                  <Heading size="2xl" className="text-primary-600">
                    {maxKT}
                  </Heading>
                </HStack>
              </HStack>
              <Box className="pt-2 border-t border-primary-200">
                <Text className="text-typography-500 text-xs text-center">
                  Exchange Rate: {conversionRate} points = 1 KT
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* Input Section */}
          <VStack space="md">
            <VStack space="sm">
              <Text className="text-typography-900 font-semibold text-lg">
                Points to Redeem
              </Text>
              <Input size="xl" variant="outline">
                <InputField
                  value={pointsToRedeem}
                  onChangeText={setPointsToRedeem}
                  placeholder="Enter points amount"
                  keyboardType="numeric"
                />
              </Input>
              {pointsToRedeem && enteredPoints < conversionRate && (
                <HStack space="xs" className="items-center">
                  <Icon as={AlertCircle} size="sm" className="text-error-500" />
                  <Text className="text-error-500 text-sm">
                    Minimum {conversionRate} points required
                  </Text>
                </HStack>
              )}
              {pointsToRedeem && enteredPoints > points && (
                <HStack space="xs" className="items-center">
                  <Icon as={AlertCircle} size="sm" className="text-error-500" />
                  <Text className="text-error-500 text-sm">
                    Insufficient points
                  </Text>
                </HStack>
              )}
            </VStack>

            {/* Preview Card */}
            {isValidAmount && (
              <Box className="p-4 bg-success-50 rounded-lg border border-success-200">
                <VStack space="sm">
                  <Text className="text-typography-700 font-medium text-center">
                    You will receive
                  </Text>
                  <HStack className="justify-center items-center" space="sm">
                    <Text className="text-3xl">🪙</Text>
                    <Heading size="3xl" className="text-success-600">
                      {ktAmount} KT
                    </Heading>
                  </HStack>
                  <Text className="text-typography-500 text-xs text-center">
                    for {enteredPoints} points
                  </Text>
                </VStack>
              </Box>
            )}

            {/* Redeem Button */}
            <Button
              onPress={handleRedeemClick}
              isDisabled={!isValidAmount}
              size="xl"
              className="mt-4"
            >
              <ButtonText>Redeem Points</ButtonText>
            </Button>
          </VStack>
        </VStack>
      </Box>

      {/* Confirmation Modal */}
      <Modal isOpen={showConfirmModal} onClose={handleCancelRedeem} size="md">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="xl">Confirm Redemption</Heading>
            <ModalCloseButton>
              <Icon as={X} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <VStack space="lg">
              <Text className="text-typography-700 text-center">
                Are you sure you want to redeem these points?
              </Text>
              
              <Box className="p-4 bg-background-50 rounded-lg border border-outline-200">
                <VStack space="sm">
                  <HStack className="justify-between items-center">
                    <Text className="text-typography-600">Points to Redeem</Text>
                    <Text className="text-typography-900 font-bold text-lg">
                      {enteredPoints}
                    </Text>
                  </HStack>
                  <HStack className="justify-between items-center">
                    <Text className="text-typography-600">KT to Receive</Text>
                    <HStack space="xs" className="items-center">
                      <Text className="text-xl">🪙</Text>
                      <Text className="text-primary-600 font-bold text-lg">
                        {ktAmount}
                      </Text>
                    </HStack>
                  </HStack>
                  <Box className="pt-2 border-t border-outline-200">
                    <HStack className="justify-between items-center">
                      <Text className="text-typography-600">Remaining Points</Text>
                      <Text className="text-typography-900 font-semibold">
                        {points - enteredPoints}
                      </Text>
                    </HStack>
                  </Box>
                </VStack>
              </Box>

              <Text className="text-typography-500 text-xs text-center">
                This action cannot be undone
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack space="md" className="w-full">
              <Button
                onPress={handleCancelRedeem}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                onPress={handleConfirmRedeem}
                className="flex-1"
                size="lg"
              >
                <ButtonText>Confirm</ButtonText>
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Success Modal */}
      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} size="md">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton>
              <Icon as={X} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <VStack space="lg" className="items-center py-4">
              <Box className="w-20 h-20 bg-success-100 rounded-full items-center justify-center">
                <Icon as={CheckCircle} size="xl" className="text-success-600" />
              </Box>
              
              <VStack space="sm" className="items-center">
                <Heading size="2xl" className="text-typography-900 text-center">
                  Redemption Successful!
                </Heading>
                <Text className="text-typography-600 text-center">
                  Your Knowledge Tokens have been added to your account
                </Text>
              </VStack>

              <Box className="p-4 bg-success-50 rounded-lg border border-success-200 w-full">
                <VStack space="sm">
                  <HStack className="justify-between items-center">
                    <Text className="text-typography-700">KT Received</Text>
                    <HStack space="xs" className="items-center">
                      <Text className="text-2xl">🪙</Text>
                      <Text className="text-success-600 font-bold text-xl">
                        +{ktAmount}
                      </Text>
                    </HStack>
                  </HStack>
                  <HStack className="justify-between items-center">
                    <Text className="text-typography-700">Current Points</Text>
                    <Text className="text-typography-900 font-semibold text-lg">
                      {points}
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={() => setShowSuccessModal(false)}
              className="w-full"
              size="lg"
            >
              <ButtonText>Done</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ScrollView>
  );
}