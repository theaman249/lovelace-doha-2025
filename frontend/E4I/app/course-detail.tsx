import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Image, Pressable } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { ChevronLeft, PlayCircle, CheckCircle, Lock, ChevronDown, ChevronUp } from 'lucide-react-native';

// Types
interface ContentItem {
  id: number;
  type: 'intro_video' | 'unit_video' | 'mid_review' | 'activity' | 'summary_pdf' | 'outro_video';
  title: string;
  videoUrl?: string;
  pdfUrl?: string;
  duration?: string;
  completed: boolean;
}

interface CourseStructure {
  id: number;
  courseName: string;
  contents: ContentItem[];
}

interface Course {
  id: number;
  name: string;
  banner: string;
  units: number;
  completedUnits: number;
  instructor: string;
  guideImage: string;
  color: string;
}

// Mock course data (same as courses.tsx)
const courses = [
  {
    id: 1,
    name: 'Introduction to Corruption',
    banner: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
    units: 3,
    completedUnits: 3,
    instructor: 'Det. Gracie Lion',
    guideImage: 'https://drive.google.com/uc?export=view&id=1LnSmzAm6ny1MpIQHY3S8kR25lTpfWMiQ ',
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
    instructor: 'Dr. Gracie Rhino',
    guideImage: 'https://drive.google.com/uc?export=view&id=1jXP01hETrzMgAGbwAMRoWTqtbERbRWqW', 
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

// Mock course structure data with proper typing - Based on curriculum
const courseStructures: Record<number, CourseStructure> = {
  1: { // Introduction to Corruption
    id: 1,
    courseName: 'Introduction to Corruption',
    contents: [
      { id: 1, type: 'intro_video', title: 'Welcome to Introduction to Corruption', videoUrl: 'https://drive.google.com/uc?export=view&id=11T4TfCgQ_UvjDbM7LTjG1WLv6fYZwZKl', duration: '0:08', completed: true }, //https://drive.google.com/file/d//view?usp=sharing
      { id: 2, type: 'unit_video', title: 'Unit 1: Definition of Corruption (UNCAC)', videoUrl: 'https://drive.google.com/uc?export=view&id=1SMKANfdTznsKWuZQ2g6_Sgsnzt4KGwhL', duration: '5:31', completed: true }, //https://drive.google.com/file/d//view?usp=sharing
      { id: 3, type: 'unit_video', title: 'Unit 2: Acts of Corruption', videoUrl: 'https://drive.google.com/uc?export=view&id=1JwZKpusfMtlaNzZMDV1PNQ3NETL0LmEa', duration: '6:39', completed: true }, //https://drive.google.com/file/d//view?usp=sharing
      { id: 4, type: 'mid_review', title: 'Mid-Course Review', videoUrl: 'https://drive.google.com/uc?export=view&id=1BdYmDvrTtt2cqyLU66JaZOF8Zowd_wZ6', duration: '0:08', completed: true }, //https://drive.google.com/file/d//view?usp=sharing
      { id: 5, type: 'activity', title: 'Task: Match Column A and B - Identify Acts', completed: true },
      { id: 6, type: 'unit_video', title: 'Unit 3: Effects of Corruption', videoUrl: 'https://drive.google.com/uc?export=view&id=1hhzwm6dqlhY8aIYc0y8GsfaAMvhNjHXf', duration: '5:56', completed: true }, //https://drive.google.com/file/d//view?usp=sharing
      { id: 7, type: 'activity', title: 'Task: Scenario Analysis Quiz', completed: true },
      { id: 8, type: 'summary_pdf', title: 'Course Summary Infographic', pdfUrl: 'https://drive.google.com/uc?export=view&id=1sIpvugpJtZ80UIMz0_G1ir4-I8IbQyC4', completed: true }, //https://drive.google.com/file/d//view?usp=sharing
      { id: 9, type: 'outro_video', title: 'Course Completion & Next Steps', videoUrl: 'https://drive.google.com/uc?export=view&id=1H6cEUBJUia9xhaZVbhshHg3ifJ5RQfEL', duration: '0:08', completed: true } //https://drive.google.com/file/d//view?usp=sharing
    ]
  },
  2: { // UNODC
    id: 2,
    courseName: 'UNODC',
    contents: [
      { id: 1, type: 'intro_video', title: 'Welcome to UNODC Course', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_7', duration: '5:30', completed: true },
      { id: 2, type: 'unit_video', title: 'Unit 1: What is UNODC', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_8', duration: '9:00', completed: true },
      { id: 3, type: 'unit_video', title: 'Unit 2: Fighting Illegal Drugs', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_9', duration: '11:30', completed: true },
      { id: 4, type: 'mid_review', title: 'Mid-Course Review', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_10', duration: '5:00', completed: true },
      { id: 5, type: 'activity', title: 'Task: UNODC Quiz', completed: true },
      { id: 6, type: 'unit_video', title: 'Unit 3: Stopping Crime and Corruption', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_11', duration: '10:45', completed: false },
      { id: 7, type: 'activity', title: 'Task: Match Column A and B', completed: false },
      { id: 8, type: 'summary_pdf', title: 'Course Summary Infographic', pdfUrl: 'https://drive.google.com/uc?export=view&id=PDF_ID_2', completed: false },
      { id: 9, type: 'outro_video', title: 'Course Wrap-Up', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_12', duration: '4:00', completed: false }
    ]
  },
  3: { // Public Sector Corruption
    id: 3,
    courseName: 'Public Sector Corruption',
    contents: [
      { id: 1, type: 'intro_video', title: 'Welcome to Public Sector Corruption', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_13', duration: '5:45', completed: true },
      { id: 2, type: 'unit_video', title: 'Unit 1: What is Public Sector Corruption', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_14', duration: '8:30', completed: true },
      { id: 3, type: 'unit_video', title: 'Unit 2: Causes and Principal Agents', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_15', duration: '12:00', completed: true },
      { id: 4, type: 'mid_review', title: 'Mid-Course Review', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_16', duration: '5:30', completed: true },
      { id: 5, type: 'activity', title: 'Task: Choose Your Destiny', completed: true },
      { id: 6, type: 'unit_video', title: 'Unit 3: Negative Effects', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_17', duration: '10:00', completed: false },
      { id: 7, type: 'unit_video', title: 'Unit 4: Preventive Measures', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_18', duration: '11:30', completed: false },
      { id: 8, type: 'activity', title: 'Task: Quiz - Public Sector Analysis', completed: false },
      { id: 9, type: 'summary_pdf', title: 'Course Summary Infographic', pdfUrl: 'https://drive.google.com/uc?export=view&id=PDF_ID_3', completed: false },
      { id: 10, type: 'outro_video', title: 'Course Summary', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_19', duration: '4:15', completed: false }
    ]
  },
  4: { // Corruption and Gender
    id: 4,
    courseName: 'Corruption and Gender',
    contents: [
      { id: 1, type: 'intro_video', title: 'Welcome to Corruption and Gender', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_20', duration: '5:30', completed: true },
      { id: 2, type: 'unit_video', title: 'Unit 1: What is Corruption and Gender', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_21', duration: '9:30', completed: true },
      { id: 3, type: 'unit_video', title: 'Unit 2: The Gender-Corruption Nexus', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_22', duration: '12:00', completed: false },
      { id: 4, type: 'mid_review', title: 'Mid-Course Review', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_23', duration: '5:00', completed: false },
      { id: 5, type: 'activity', title: 'Task: Drag and Drop Activity', completed: false },
      { id: 6, type: 'unit_video', title: 'Unit 3: Negative Effects on Women', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_24', duration: '10:30', completed: false },
      { id: 7, type: 'activity', title: 'Task: Fill in the Blanks', completed: false },
      { id: 8, type: 'summary_pdf', title: 'Course Summary Infographic', pdfUrl: 'https://drive.google.com/uc?export=view&id=PDF_ID_4', completed: false },
      { id: 9, type: 'outro_video', title: 'Course Conclusion', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_25', duration: '4:00', completed: false }
    ]
  },
  5: { // Citizen Participation
    id: 5,
    courseName: 'Citizen Participation in Anti-Corruption',
    contents: [
      { id: 1, type: 'intro_video', title: 'Welcome to Citizen Participation', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_26', duration: '5:15', completed: false },
      { id: 2, type: 'unit_video', title: 'Unit 1: Social Accountability', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_27', duration: '9:00', completed: false },
      { id: 3, type: 'unit_video', title: 'Unit 2: Role of Civil Society and Media', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_28', duration: '11:30', completed: false },
      { id: 4, type: 'mid_review', title: 'Mid-Course Review', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_29', duration: '5:00', completed: false },
      { id: 5, type: 'activity', title: 'Task: Choose Your Destiny', completed: false },
      { id: 6, type: 'unit_video', title: 'Unit 3: Tools and Technologies', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_30', duration: '12:00', completed: false },
      { id: 7, type: 'activity', title: 'Task: Fill in the Blanks - Reporting Tools', completed: false },
      { id: 8, type: 'summary_pdf', title: 'Course Summary Infographic', pdfUrl: 'https://drive.google.com/uc?export=view&id=PDF_ID_5', completed: false },
      { id: 9, type: 'outro_video', title: 'Final Remarks', videoUrl: 'https://drive.google.com/uc?export=view&id=VIDEO_ID_31', duration: '4:30', completed: false }
    ]
  }
};
export default function CourseDetailScreen() {
  const { courseId } = useLocalSearchParams();
  const course = courses.find(c => c.id === Number(courseId));
  const courseStructure = courseStructures[Number(courseId)];
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  if (!course || !courseStructure) {
    return (
      <Box className="flex-1 justify-center items-center">
        <Text>Course not found</Text>
      </Box>
    );
  }

  const toggleSection = (contentId: number) => {
    setExpandedSections(prev => 
      prev.includes(contentId) 
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    );
  };

  const getContentIcon = (type: string): string => {
    switch (type) {
      case 'intro_video':
        return '🎬';
      case 'unit_video':
        return '📹';
      case 'mid_review':
        return '🔄';
      case 'activity':
        return '📝';
      case 'summary_pdf':
        return '📄';
      case 'outro_video':
        return '🎓';
      default:
        return '▶️';
    }
  };

  const getContentLabel = (type: string): string => {
    switch (type) {
      case 'intro_video':
        return 'Introduction';
      case 'unit_video':
        return 'Unit Video';
      case 'mid_review':
        return 'Mid-Review';
      case 'activity':
        return 'Activity';
      case 'summary_pdf':
        return 'Summary';
      case 'outro_video':
        return 'Conclusion';
      default:
        return 'Content';
    }
  };

  return (
    <Box className="flex-1 bg-background-0">
      {/* Header with Course Banner */}
      <Box className="relative">
        <Image
          source={{ uri: course.banner }}
          style={{ width: '100%', height: 200 }}
          resizeMode="cover"
        />
        <Box className="absolute inset-0 bg-black/40" />
        
        {/* Back Button */}
        <Pressable
          onPress={() => router.back()}
          className="absolute top-12 left-4 p-2 bg-black/50 rounded-full"
        >
          <ChevronLeft color="white" size={24} />
        </Pressable>

        {/* Course Title Overlay */}
        <Box className="absolute bottom-0 left-0 right-0 p-6">
          <HStack space="md" className="items-center mb-2">
            <Box
              className="w-12 h-12 rounded-full overflow-hidden border-2"
              style={{ borderColor: course.color }}
            >
              <Image
                source={{ uri: course.guideImage }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </Box>
            <VStack>
              <Heading size="xl" className="text-white">
                {course.name}
              </Heading>
              <Text className="text-white/80 text-sm">{course.instructor}</Text>
            </VStack>
          </HStack>
        </Box>
      </Box>

      {/* Course Content List */}
      <ScrollView className="flex-1"
         style={{ backgroundColor: course.color + 70 }}
      >
        <VStack space="md" className="p-6">
          {courseStructure.contents.map((content: ContentItem, index: number) => {
            const isExpanded = expandedSections.includes(content.id);
            
            return (
              <Box key={content.id} className="bg-white rounded-xl overflow-hidden border border-outline-200">
                {/* Content Header - Clickable */}
                <Pressable
                  onPress={() => {
                    if (content.type === 'activity') {
                      router.push({
                        pathname: '/activity',
                        params: {
                          courseId: courseId as string,
                          contentId: content.id.toString(),
                          title: content.title
                        }
                      });
                    } else if (content.type === 'summary_pdf') {
                      router.push({
                        pathname: '/pdf-viewer',
                        params: {
                          pdfUrl: content.pdfUrl || '',
                          title: content.title,
                          courseId: courseId as string,
                          contentId: content.id.toString()
                        }
                      });
                    } else {
                      router.push({
                        pathname: '/video-player',
                        params: {
                          videoUrl: content.videoUrl || '',
                          title: content.title,
                          courseId: courseId as string,
                          contentId: content.id.toString()
                        }
                      });
                    }
                  }}
                >
                  <HStack
                    space="md"
                    className="items-center p-4"
                    style={{
                      backgroundColor: content.completed ? '#F0FDF4' : '#FFFFFF'
                    }}
                  >
                    {/* Icon */}
                    <Box
                      className="w-12 h-12 rounded-full items-center justify-center"
                      style={{ backgroundColor: content.completed ? course.color : '#F3F4F6' }}
                    >
                      <Text className="text-2xl">{getContentIcon(content.type)}</Text>
                    </Box>

                    {/* Content Info */}
                    <VStack className="flex-1">
                      <Text className="text-xs font-medium uppercase" style={{ color: course.color }}>
                        {getContentLabel(content.type)}
                      </Text>
                      <Text className="text-sm font-semibold text-typography-900 mt-1">
                        {content.title}
                      </Text>
                      {content.duration && (
                        <Text className="text-xs text-typography-500 mt-1">
                          ⏱️ {content.duration}
                        </Text>
                      )}
                    </VStack>

                    {/* Status Icon */}
                    {content.completed ? (
                      <CheckCircle color={course.color} size={24} />
                    ) : (
                      <PlayCircle color="#9CA3AF" size={24} />
                    )}
                  </HStack>
                </Pressable>
              </Box>
            );
          })}
        </VStack>
      </ScrollView>
    </Box>
  );
}
