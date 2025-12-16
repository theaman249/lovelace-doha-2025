// FILE: app/(tabs)/certificates.tsx
import { useState } from 'react';
import { ScrollView, Pressable } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Award, Star, Shield, CheckCircle, Download, Share2 } from 'lucide-react-native';
import { Button, ButtonText } from '@/components/ui/button';

// Mock data
const certificate = {
  id: 1,
  courseName: 'Introduction to Corruption',
  completionDate: 'December 15, 2024',
  recipientName: 'John Doe',
  instructor: 'Dr. Gracie Rhino',
  credentialId: 'E4I-2024-001234'
};

const badges = [
  {
    id: 1,
    title: 'Introduction to Corruption - Unit 1',
    description: 'Completed Definition of Corruption',
    courseColor: '#dd0979',
    earnedDate: 'Dec 1, 2024',
    icon: '🎯'
  },
  {
    id: 2,
    title: 'Introduction to Corruption - Unit 2',
    description: 'Completed Acts of Corruption',
    courseColor: '#dd0979',
    earnedDate: 'Dec 3, 2024',
    icon: '⚡'
  },
  {
    id: 3,
    title: 'Introduction to Corruption - Unit 3',
    description: 'Completed Effects of Corruption',
    courseColor: '#dd0979',
    earnedDate: 'Dec 5, 2024',
    icon: '🏆'
  },
  {
    id: 4,
    title: 'UNODC - Unit 1',
    description: 'Completed What is UNODC',
    courseColor: '#004c84',
    earnedDate: 'Dec 7, 2024',
    icon: '🌍'
  },
  {
    id: 5,
    title: 'UNODC - Unit 2',
    description: 'Completed Fighting Illegal Drugs',
    courseColor: '#004c84',
    earnedDate: 'Dec 9, 2024',
    icon: '🛡️'
  },
  {
    id: 6,
    title: 'Public Sector Corruption - Unit 1',
    description: 'Completed Public Sector Basics',
    courseColor: '#ec6411',
    earnedDate: 'Dec 11, 2024',
    icon: '🏛️'
  },
  {
    id: 7,
    title: 'Public Sector Corruption - Unit 2',
    description: 'Completed Causes & Agents',
    courseColor: '#ec6411',
    earnedDate: 'Dec 13, 2024',
    icon: '⚖️'
  },
  {
    id: 8,
    title: 'Corruption & Gender - Unit 1',
    description: 'Completed Gender Dynamics',
    courseColor: '#289438',
    earnedDate: 'Dec 15, 2024',
    icon: '💪'
  }
];

export default function CertificatesScreen() {
  const [selectedTab, setSelectedTab] = useState<'certificates' | 'badges'>('certificates');

  return (
    <Box className="flex-1 bg-background-0">
      {/* Header */}
      <Box className="px-6 pt-12 pb-4 bg-primary-500">
        <VStack space="md">
          <Heading size="2xl" className="text-blue-400">
            My Achievements
          </Heading>
          <Text className="text-primary-100">
            My certificates and badges
          </Text>
        </VStack>
      </Box>

      {/* Tab Navigation */}
      <HStack className="bg-white border-b border-outline-200">
        <Pressable
          onPress={() => setSelectedTab('certificates')}
          className="flex-1"
        >
          <Box
            className="p-4 items-center"
            style={{
              borderBottomWidth: 2,
              borderBottomColor: selectedTab === 'certificates' ? '#3B82F6' : 'transparent'
            }}
          >
            <Text
              className="font-semibold"
              style={{ color: selectedTab === 'certificates' ? '#3B82F6' : '#6B7280' }}
            >
              Certificates
            </Text>
          </Box>
        </Pressable>
        <Pressable
          onPress={() => setSelectedTab('badges')}
          className="flex-1"
        >
          <Box
            className="p-4 items-center"
            style={{
              borderBottomWidth: 2,
              borderBottomColor: selectedTab === 'badges' ? '#3B82F6' : 'transparent'
            }}
          >
            <Text
              className="font-semibold"
              style={{ color: selectedTab === 'badges' ? '#3B82F6' : '#6B7280' }}
            >
              Badges
            </Text>
          </Box>
        </Pressable>
      </HStack>

      <ScrollView className="flex-1">
        {selectedTab === 'certificates' ? (
          // Certificates View
          <VStack space="lg" className="p-6">
            {/* Certificate Card */}
            <Box 
              className="rounded-xl p-6"
              style={{
                backgroundColor: '#1E3A8A',
                borderWidth: 8,
                borderColor: '#1E40AF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 5
              }}
            >
              {/* Inner Border */}
              <Box
                className="p-6"
                style={{
                  borderWidth: 2,
                  borderColor: '#FBBF24'
                }}
              >
                <VStack space="lg" className="items-center">
                  {/* Header */}
                  <VStack space="md" className="items-center">
                    <Box
                      className="w-20 h-20 rounded-full items-center justify-center"
                      style={{ backgroundColor: '#FBBF24' }}
                    >
                      <Award color="#1E3A8A" size={40} />
                    </Box>
                    <Text style={{ color: '#FCD34D', fontSize: 14, fontWeight: '600', letterSpacing: 2 }}>
                      CERTIFICATE OF COMPLETION
                    </Text>
                  </VStack>

                  {/* Divider */}
                  <Box style={{ width: '100%', height: 1, backgroundColor: 'rgba(251, 191, 36, 0.3)' }} />

                  {/* Main Content */}
                  <VStack space="md" className="items-center w-full">
                    <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 14 }}>
                      This is to certify that
                    </Text>
                    
                    <Box style={{ paddingVertical: 8, paddingHorizontal: 24, borderBottomWidth: 2, borderBottomColor: '#FBBF24' }}>
                      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' }}>
                        {certificate.recipientName}
                      </Text>
                    </Box>

                    <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 14, textAlign: 'center', paddingHorizontal: 16 }}>
                      has successfully completed the course
                    </Text>

                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FBBF24', textAlign: 'center', paddingHorizontal: 16 }}>
                      {certificate.courseName}
                    </Text>

                    <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}>
                      Completed on {certificate.completionDate}
                    </Text>
                  </VStack>

                  {/* Divider */}
                  <Box style={{ width: '100%', height: 1, backgroundColor: 'rgba(251, 191, 36, 0.3)' }} />

                  {/* Footer */}
                  {/* <HStack className="justify-between items-end w-full px-4">
                    <VStack className="items-center">
                      <Box style={{ width: 96, height: 1, backgroundColor: '#FBBF24', marginBottom: 4 }} />
                      <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 10 }}>Instructor</Text>
                      <Text style={{ color: '#FFFFFF', fontSize: 12 }}>{certificate.instructor}</Text>
                    </VStack>*/
                    
                    <Box className="items-center">
                      <Shield color="#FBBF24" size={32} />
                    </Box>

                    /*<VStack className="items-center">
                      <Box style={{ width: 96, height: 1, backgroundColor: '#FBBF24', marginBottom: 4 }} />
                      <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 10 }}>Date</Text>
                      <Text style={{ color: '#FFFFFF', fontSize: 12 }}>{certificate.completionDate}</Text>
                    </VStack>
                  </HStack> */}

                  {/* Credential ID */}
                  <Text style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: 10, textAlign: 'center', marginTop: 8 }}>
                    Credential ID: {certificate.credentialId}
                  </Text>
                </VStack>
              </Box>
            </Box>

            {/* Action Buttons */}
            <VStack space="sm">
              <Button className="bg-blue-600">
                <Download color="white" size={20} />
                <ButtonText className="ml-2">Download Certificate</ButtonText>
              </Button>
              <Button className="bg-white border-2 border-blue-600">
                <Share2 color="#2563EB" size={20} />
                <ButtonText className="text-blue-600 ml-2">Share Certificate</ButtonText>
              </Button>
            </VStack>

            {/* Certificate Info */}
            <Box className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <VStack space="sm">
                <Text className="text-blue-900 font-semibold">About This Certificate</Text>
                <Text className="text-blue-800 text-sm">
                  This certificate verifies that you have completed all requirements for the course. 
                  You can download and share this certificate on professional networks.
                </Text>
              </VStack>
            </Box>

            {/* Empty State for More Certificates */}
            <Box className="p-6 bg-background-50 rounded-lg border border-outline-200">
              <VStack space="sm" className="items-center">
                <Award color="#9CA3AF" size={40} />
                <Text className="text-typography-500 text-center">
                  Complete more courses to earn additional certificates
                </Text>
              </VStack>
            </Box>
          </VStack>
        ) : (
          // Badges View
          <VStack space="lg" className="p-6">
            <Box className="rounded-lg p-4 border border-blue-200" style={{ backgroundColor: '#EFF6FF' }}>
              <HStack space="md" className="items-center">
                <Star color="#F59E0B" size={24} />
                <VStack className="flex-1">
                  <Text className="text-typography-900 font-semibold">
                    {badges.length} Badges Earned
                  </Text>
                  <Text className="text-typography-600 text-sm">
                    Keep learning to unlock more badges!
                  </Text>
                </VStack>
              </HStack>
            </Box>

            {/* Badges Grid - 2 per row */}
            <VStack space="md">
              {badges.reduce((rows: any[], badge, index) => {
                if (index % 2 === 0) {
                  rows.push([badge]);
                } else {
                  rows[rows.length - 1].push(badge);
                }
                return rows;
              }, []).map((row, rowIndex) => (
                <HStack key={rowIndex} space="md">
                  {row.map((badge: any) => (
                    <Box key={badge.id} className="flex-1">
                      <Pressable>
                        <Box
                          className="rounded-xl p-4 border-2"
                          style={{
                            borderColor: badge.courseColor,
                            backgroundColor: badge.courseColor + '10',
                            shadowColor: badge.courseColor,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 3,
                            height: 215
                            //aspectRatio: 1
                          }}
                        >
                          <VStack space="sm" className="items-center justify-center" style={{ flex: 1 }}>
                            {/* Badge Icon */}
                            <Box
                              className="w-16 h-16 rounded-full items-center justify-center"
                              style={{ backgroundColor: badge.courseColor }}
                            >
                              <Text className="text-3xl">{badge.icon}</Text>
                            </Box>

                            {/* Badge Title */}
                            <VStack space="xs" className="items-center">
                              <Text 
                                className="text-xs font-bold text-center"
                                style={{ color: badge.courseColor }}
                                numberOfLines={2}
                              >
                                {badge.title.split(' - ')[0]}
                              </Text>
                              <Text className="text-xs font-semibold text-center text-typography-900" numberOfLines={1}>
                                {badge.title.split(' - ')[1]}
                              </Text>
                            </VStack>

                            {/* Badge Description */}
                            <Text className="text-xs text-typography-600 text-center" numberOfLines={2}>
                              {badge.description}
                            </Text>

                            {/* Date Earned */}
                            <HStack space="xs" className="items-center">
                              <CheckCircle color={badge.courseColor} size={12} />
                              <Text className="text-xs text-typography-500">
                                {badge.earnedDate}
                              </Text>
                            </HStack>
                          </VStack>
                        </Box>
                      </Pressable>
                    </Box>
                  ))}
                  {/* Add empty space if odd number of badges in last row */}
                  {row.length === 1 && <Box className="flex-1" />}
                </HStack>
              ))}
            </VStack>

            {/* Locked Badges Preview */}
            <VStack space="md">
              <Heading size="lg" className="text-typography-900">
                Upcoming Badges
              </Heading>
              <HStack space="md">
                <Box className="flex-1 rounded-xl p-4 bg-background-100 border-2 border-dashed border-outline-300">
                  <VStack space="sm" className="items-center opacity-50">
                    <Box className="w-16 h-16 rounded-full items-center justify-center bg-background-200">
                      <Text className="text-3xl">🔒</Text>
                    </Box>
                    <Text className="text-xs font-semibold text-center text-typography-600">
                      UNODC - Unit 3
                    </Text>
                    <Text className="text-xs text-typography-500 text-center">
                      Complete the unit to unlock
                    </Text>
                  </VStack>
                </Box>

                <Box className="flex-1 rounded-xl p-4 bg-background-100 border-2 border-dashed border-outline-300">
                  <VStack space="sm" className="items-center opacity-50">
                    <Box className="w-16 h-16 rounded-full items-center justify-center bg-background-200">
                      <Text className="text-3xl">🔒</Text>
                    </Box>
                    <Text className="text-xs font-semibold text-center text-typography-600">
                      Public Sector - Unit 3
                    </Text>
                    <Text className="text-xs text-typography-500 text-center">
                      Complete the unit to unlock
                    </Text>
                  </VStack>
                </Box>
              </HStack>
            </VStack>

            {/* Badge Info */}
            <Box className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <VStack space="sm">
                <HStack space="sm" className="items-center">
                  <Star color="#9333EA" size={20} />
                  <Text className="text-purple-900 font-semibold">How to Earn Badges</Text>
                </HStack>
                <Text className="text-purple-800 text-sm">
                  Complete each unit in a course to earn a badge. Badges showcase your progress 
                  and mastery of specific topics in anti-corruption education.
                </Text>
              </VStack>
            </Box>
          </VStack>
        )}
      </ScrollView>
    </Box>
  );
}