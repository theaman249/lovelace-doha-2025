import { useState } from 'react';
import { ScrollView, Image } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { Search, BookOpen } from 'lucide-react-native';

// Mock course data
const courses = [
  {
    id: 1,
    name: 'Introduction to Corruption',
    banner: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
    units: 3,
    completedUnits: 3,
    instructor: 'Dr. Gracie Rhino',
    guideImage: 'https://drive.google.com/uc?export=view&id=1jXP01hETrzMgAGbwAMRoWTqtbERbRWqW',
    color: '#dd0979'
  },
  {
    id: 2,
    name: 'UNODC',
    banner: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    units: 3,
    completedUnits: 2,
    instructor: 'Prof. Gracie Elephant',
    guideImage: 'https://drive.google.com/uc?export=view&id=1ZOS0DoV1mnhtf_VaV1U6LfQxG8J2UAMv',
    color: '#004c84'
  },
  {
    id: 3,
    name: 'Public Sector Corruption',
    banner: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
    units: 4,
    completedUnits: 2,
    instructor: 'Col. Gracie Buffalo',
    guideImage: 'https://drive.google.com/uc?export=view&id=1c1aBBowVlNZnqoGsZDW0svgVaVKhR0c1',
    color: '#ec6411'
  },
  {
    id: 4,
    name: 'Corruption and Gender',
    banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    units: 3,
    completedUnits: 1,
    instructor: 'Sgt. Gracie Lion',
    guideImage: 'https://drive.google.com/uc?export=view&id=1LnSmzAm6ny1MpIQHY3S8kR25lTpfWMiQ', 
    color: '#289438'
  },
  {
    id: 5,
    name: 'Citizen Participation in Anti-Corruption',
    banner: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
    units: 3,
    completedUnits: 0,
    instructor: 'Prof. Gracie Leopard',
    guideImage: 'https://drive.google.com/uc?export=view&id=1bPApDp8Xue4bghpj62kRdvD9GWRRpPtw',
    color: '#e6331d'
  }
];

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  const getStatusBadge = (completed: number, total: number) => {
    if (completed === 0) return { text: 'Not Started', color: 'bg-gray-200 text-gray-700' };
    if (completed === total) return { text: 'Completed', color: 'bg-green-100 text-green-700' };
    return { text: 'In Progress', color: 'bg-blue-100 text-blue-700' };
  };

  return (
    <Box className="flex-1 bg-background-0">
      {/* Header */}
      <Box className="px-6 pt-12 pb-4 bg-primary-500">
        <VStack space="md">
          <Heading size="2xl" className="text-white">
            My Courses
          </Heading>
          <Text className="text-primary-100">
            {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} available
          </Text>
        </VStack>
      </Box>

      {/* Search Bar */}
      <Box className="px-6 py-4 bg-white border-b border-outline-200">
        <Input className="bg-background-50">
          <InputSlot className="pl-3">
            <InputIcon as={Search} className="text-typography-500" />
          </InputSlot>
          <InputField
            placeholder="Search your courses"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </Input>
      </Box>

      {/* Course List */}
      <ScrollView className="flex-1">
        <VStack space="lg" className="p-6 pb-20">
          {filteredCourses.map((course) => {
            const progress = getProgressPercentage(course.completedUnits, course.units);
            const status = getStatusBadge(course.completedUnits, course.units);

            return (
              <Box
                key={course.id}
                className=" rounded-xl overflow-hidden border border-outline-400 shadow-sm"
                style={{ borderColor: course.color }}
              >
                {/* Course Banner with Character Image */}
                <Box className="relative h-40">
                  <Image
                    source={{ uri: course.banner }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                  {/* Overlay gradient */}
                  <Box className="absolute inset-0 bg-black/20" />
                  
                  {/* Character/Guide Image */}
                  <Box 
                    className="absolute bottom-2 right-2 w-16 h-16 rounded-full overflow-hidden border-2"
                    style={{ borderColor: course.color}}
                    //style={{ backgroundColor: course.color }}
                  >
                    <Image
                      source={{ uri: course.guideImage }}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="cover"
                    />
                  </Box>

                  {/* Status Badge */}
                  <Box className="absolute top-2 left-2">
                    <Box className={`px-3 py-1 rounded-full ${status.color}`}>
                      <Text className="text-xs font-semibold">
                        {status.text}
                      </Text>
                    </Box>
                  </Box>
                </Box>

                {/* Course Details */}
                <VStack space="sm" className="p-4">
                  {/* Course Name */}
                  <Heading size="lg" className="text-typography-900">
                    {course.name}
                  </Heading>

                  {/* Instructor */}
                  <Text className="text-sm text-typography-600">
                    {course.instructor}
                  </Text>

                  {/* Units Info */}
                  <HStack space="sm" className="items-center mt-2">
                    <BookOpen size={16} color="#6B7280" />
                    <Text className="text-sm text-typography-700">
                      {course.completedUnits} of {course.units} units completed
                    </Text>
                  </HStack>

                  {/* Progress Bar */}
                  <VStack space="xs" className="mt-3">
                    <HStack className="justify-between items-center">
                      <Text className="text-xs text-typography-600">
                        Progress
                      </Text>
                      <Text className="text-xs font-semibold text-typography-900">
                        {progress}%
                      </Text>
                    </HStack>
                    <Box className="w-full h-2 bg-background-100 rounded-full overflow-hidden">
                      <Box
                        className="h-full rounded-full"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: course.color
                        }}
                      />
                    </Box>
                  </VStack>
                </VStack>
              </Box>
            );
          })}

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <Box className="py-12 items-center">
              <Text className="text-typography-500 text-center">
                No courses found matching "{searchQuery}"
              </Text>
            </Box>
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
}