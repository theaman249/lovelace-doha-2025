import { useState } from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { 
  Modal, 
  ModalBackdrop, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody,
  ModalFooter 
} from '@/components/ui/modal';
import { Icon, CloseIcon } from '@/components/ui/icon';
import { Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { useRouter } from 'expo-router';

type Module = {
  id: number;
  name: string;
  totalPoints: number;
  maxPoints: number;
  color: string;
  units: { id: number; name: string; points: number; maxPoints: number }[];
  activities: { name: string; points: number; maxPoints: number }[];
};

// Mock data - replace with your actual data
const mockModules: Module[] = [
  {
    id: 1,
    name: 'Introduction to Corruption',
    totalPoints: 15,
    maxPoints: 20,
    color: '#dd0979',
    units: [
      { id: 1, name: 'Unit 1', points: 5, maxPoints: 5 },
      { id: 2, name: 'Unit 2', points: 5, maxPoints: 5 },
      { id: 3, name: 'Unit 3', points: 5, maxPoints: 10 }
    ],
    activities: [
      { name: 'Activity 1', points: 10, maxPoints: 10 },
      { name: 'Activity 2', points: 5, maxPoints: 10 }
    ]
  },
  {
    id: 2,
    name: 'UNODC',
    totalPoints: 12,
    maxPoints: 15,
    color: '#004c84',
    units: [
      { id: 1, name: 'Unit 1', points: 4, maxPoints: 5 },
      { id: 2, name: 'Unit 2', points: 4, maxPoints: 5 },
      { id: 3, name: 'Unit 3', points: 4, maxPoints: 5 }
    ],
    activities: [
      { name: 'Activity 1', points: 8, maxPoints: 10 },
      { name: 'Activity 2', points: 2, maxPoints: 10 }
    ]
  },
  {
    id: 3,
    name: 'Public Sector Corruption',
    totalPoints: 10,
    maxPoints: 20,
    color: '#ec6411',
    units: [
      { id: 1, name: 'Unit 1', points: 2, maxPoints: 5 },
      { id: 2, name: 'Unit 2', points: 2, maxPoints: 5 },
      { id: 3, name: 'Unit 3', points: 2, maxPoints: 5 },
      { id: 4, name: 'Unit 4', points: 2, maxPoints: 5 }
    ],
    activities: [
      { name: 'Activity 1', points: 5, maxPoints: 10 },
      { name: 'Activity 2', points: 5, maxPoints: 10 }
    ],
  },
  {
    id: 4,
    name: 'Corruption and Gender',
    totalPoints: 5,
    maxPoints: 15,
    color: '#289438',
    units: [
      { id: 1, name: 'Unit 1', points: 2, maxPoints: 5 },
      { id: 2, name: 'Unit 2', points: 2, maxPoints: 5 },
      { id: 3, name: 'Unit 3', points: 1, maxPoints: 5 }
    ],
    activities: [
      { name: 'Activity 1', points: 3, maxPoints: 10 },
      { name: 'Activity 2', points: 7, maxPoints: 10 }
    ]
  },
  {
    id: 5,
    name: 'Citizen Participation in Anti-Corruption',
    totalPoints: 0,
    maxPoints: 15,
    color: '#e6331d',
    units: [
      { id: 1, name: 'Unit 1', points: 0, maxPoints: 5 },
      { id: 2, name: 'Unit 2', points: 0, maxPoints: 5 },
      { id: 3, name: 'Unit 3', points: 0, maxPoints: 5 }
    ],
    activities: [
      { name: 'Activity 1', points: 0, maxPoints: 10 },
      { name: 'Activity 2', points: 0, maxPoints: 10 }
    ]
  }
];

export default function PointsScreen() {
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [redeemAmount, setRedeemAmount] = useState('');
  const router = useRouter();

  const totalPoints = mockModules.reduce((sum, mod) => sum + mod.totalPoints, 0);
  const conversionRate = 100; // 100 points = 1 KT
  const availableKT = Math.floor(totalPoints / conversionRate);

  const handleRedeem = () => {
    const ktToRedeem = parseInt(redeemAmount);
    if (ktToRedeem > 0 && ktToRedeem <= availableKT) {
      alert(`Successfully redeemed ${ktToRedeem} KT!`);
      setShowRedeemModal(false);
      setRedeemAmount('');
    }
  };

  return (
    <ScrollView className="flex-1 bg-background-0">
      <Box className="p-6">
        <VStack space="lg">
          {/* Header with Total Points (Clickable) */}
          <HStack className="justify-between items-center">
            <Heading size="2xl" className="text-typography-900">
              Points overview
            </Heading>
            
            <Pressable onPress={() => router.push('../redeem-points')}>
              <Box className="px-6 py-4 bg-primary-500 rounded-xl">
                <VStack space="xs" className="items-center">
                  <HStack space="xs" className="items-center">
                    <Text className="text-typography-950 text-sm font-medium"> Total</Text>
                  </HStack>
                  <Heading size="3xl" className="text-typography-950">
                    {totalPoints}
                  </Heading>
                  <Text className="text-typography-950 text-xs">Tap to redeem</Text>
                </VStack>
              </Box>
            </Pressable>
          </HStack>

          {/* Module Cards */}
          <VStack space="md">
            {mockModules.map((module) => {
              const percentage = (module.totalPoints / module.maxPoints) * 100;
              return (
                <Pressable
                  key={module.id}
                  onPress={() => setSelectedModule(module)}
                >
                  <Box className="p-5 bg-background-50 rounded-xl border border-outline-200">
                    <VStack space="sm">
                      <HStack className="justify-between items-start">
                        <VStack space="xs" className="flex-1">
                          <Heading size="lg" className="text-typography-900">
                            {module.name}
                          </Heading>
                          <Text className="text-typography-500 text-sm">
                            {module.units.length} units • {module.activities.length} activities
                          </Text>
                        </VStack>
                        <Text className="text-typography-400 text-xl">›</Text>
                      </HStack>
                      
                      <VStack space="sm">
                        <Progress value={percentage} size="sm" className="bg-background-200">
                          <ProgressFilledTrack className="bg-primary-500" />
                        </Progress>
                        <HStack className="justify-end items-center" space="xs">
                          <Text className="text-primary-500 text-lg">⭐</Text>
                          <Text className="text-typography-900 font-semibold text-lg">
                            {module.totalPoints}/{module.maxPoints}
                          </Text>
                        </HStack>
                      </VStack>
                    </VStack>
                  </Box>
                </Pressable>
              );
            })}
          </VStack>
        </VStack>
      </Box>

      {/* Redeem Modal */}
      <Modal isOpen={showRedeemModal} onClose={() => setShowRedeemModal(false)} size="md">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="xl" className="text-typography-900">
              Redeem Knowledge Tokens
            </Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <VStack space="lg">
              <Box className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                <VStack space="sm">
                  <HStack className="justify-between items-center">
                    <Text className="text-typography-700 font-medium">Your Points</Text>
                    <Text className="text-typography-900 font-bold text-xl">
                      {totalPoints}
                    </Text>
                  </HStack>
                  <HStack className="justify-between items-center">
                    <Text className="text-typography-700 font-medium">Available KT</Text>
                    <HStack space="xs" className="items-center">
                      <Text className="text-xl">🪙</Text>
                      <Text className="text-primary-600 font-bold text-xl">
                        {availableKT}
                      </Text>
                    </HStack>
                  </HStack>
                  <Text className="text-typography-500 text-xs">
                    Exchange rate: 100 points = 1 KT
                  </Text>
                </VStack>
              </Box>

              <VStack space="sm">
                <Text className="text-typography-700 font-medium">
                  Amount to Redeem
                </Text>
                <Input size="lg" variant="outline">
                  <InputField
                    type="text"
                    value={redeemAmount}
                    onChangeText={setRedeemAmount}
                    placeholder="Enter KT amount"
                    keyboardType="numeric"
                  />
                </Input>
                <Text className="text-typography-500 text-xs">
                  Maximum: {availableKT} KT
                </Text>
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={handleRedeem}
              isDisabled={!redeemAmount || parseInt(redeemAmount) > availableKT || parseInt(redeemAmount) <= 0}
              className="flex-1"
              size="lg"
            >
              <ButtonText>
                Redeem {redeemAmount || 0} KT
              </ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Module Detail Modal */}
      <Modal 
        isOpen={selectedModule !== null} 
        onClose={() => setSelectedModule(null)}
        size="full"
      >
        <ModalBackdrop />
        <ModalContent className="max-h-[85%]">
          <ModalHeader>
            <Heading size="xl" className="text-typography-900 flex-1 pr-8">
              {selectedModule?.name}
            </Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <ScrollView>
              <VStack space="lg" className="pb-4">
                {/* Total Score */}
                <Box className="p-5 bg-primary-500 rounded-xl">
                  <HStack className="justify-between items-center">
                    <HStack space="sm" className="items-center">
                      <Text className="text-2xl">🏅</Text>
                      <Text className="text-typography-950 font-semibold text-lg">
                        Module Total
                      </Text>
                    </HStack>
                    <Heading size="3xl" className="text-typography-950">
                      {selectedModule?.totalPoints}/{selectedModule?.maxPoints}
                    </Heading>
                  </HStack>
                </Box>

                {/* Units Breakdown */}
                <VStack space="sm">
                  <HStack space="xs" className="items-center">
                    <Box className="w-1 h-6 bg-primary-500 rounded-full" />
                    <Heading size="lg" className="text-typography-900">
                      Units
                    </Heading>
                  </HStack>
                  <VStack space="sm">
                    {selectedModule?.units.map((unit) => {
                      const unitPercentage = (unit.points / unit.maxPoints) * 100;
                      return (
                        <Box key={unit.id} className="p-4 bg-background-50 rounded-lg border border-outline-200">
                          <VStack space="sm">
                            <HStack className="justify-between items-center">
                              <Text className="text-typography-900 font-medium flex-1">
                                {unit.name}
                              </Text>
                              <HStack space="xs" className="items-center">
                                <Text className="text-primary-500">⭐</Text>
                                <Text className="text-typography-900 font-bold">
                                  {unit.points}<Text className="text-typography-500">/{unit.maxPoints}</Text>
                                </Text>
                              </HStack>
                            </HStack>
                            <Progress value={unitPercentage} size="sm" className="bg-background-200">
                              <ProgressFilledTrack className="bg-primary-500" />
                            </Progress>
                          </VStack>
                        </Box>
                      );
                    })}
                  </VStack>
                </VStack>

                {/* Activities Breakdown */}
                <VStack space="sm">
                  <HStack space="xs" className="items-center">
                    <Box className="w-1 h-6 bg-success-500 rounded-full" />
                    <Heading size="lg" className="text-typography-900">
                      Activities
                    </Heading>
                  </HStack>
                  <VStack space="sm">
                    {selectedModule?.activities.map((activity, idx) => {
                      const activityPercentage = (activity.points / activity.maxPoints) * 100;
                      return (
                        <Box key={idx} className="p-4 bg-background-50 rounded-lg border border-outline-200">
                          <VStack space="sm">
                            <HStack className="justify-between items-center">
                              <Text className="text-typography-900 font-medium flex-1 pr-2">
                                {activity.name}
                              </Text>
                              <HStack space="xs" className="items-center">
                                <Text className="text-primary-500">⭐</Text>
                                <Text className="text-typography-900 font-bold">
                                  {activity.points}<Text className="text-typography-500">/{activity.maxPoints}</Text>
                                </Text>
                              </HStack>
                            </HStack>
                            <Progress value={activityPercentage} size="sm" className="bg-background-200">
                              <ProgressFilledTrack className="bg-success-500" />
                            </Progress>
                          </VStack>
                        </Box>
                      );
                    })}
                  </VStack>
                </VStack>
              </VStack>
            </ScrollView>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Redeem Points Navigation */}
      {/* <Box className="p-4">
        <Pressable onPress={() => router.push('/redeem-points')}>
          <Text className="text-primary-600 font-semibold text-center">
            View and Redeem Points
          </Text>
        </Pressable>
      </Box> */}
    </ScrollView>
  );
}