import { useLocalSearchParams, router } from 'expo-router';
import { Pressable, Dimensions } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { ChevronLeft, Download } from 'lucide-react-native';
import { WebView } from 'react-native-webview';

export default function PDFViewerScreen() {
  const { pdfUrl, title } = useLocalSearchParams();
  const { width, height } = Dimensions.get('window');
  
  // Extract Google Drive file ID from URL
  const getEmbedUrl = (url: string): string => {
    const fileIdMatch = url.match(/\/d\/(.+?)\//) || url.match(/id=(.+?)(&|$)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(pdfUrl as string);

  return (
    <Box className="flex-1 bg-white">
      {/* Header */}
      <Box className="pt-12 px-4 pb-4 bg-primary-500">
        <HStack space="md" className="items-center">
          <Pressable onPress={() => router.back()}>
            <ChevronLeft color="white" size={28} />
          </Pressable>
          <VStack className="flex-1">
            <Text className="text-white font-semibold">{title}</Text>
            <Text className="text-white/80 text-xs mt-1">Course Summary</Text>
          </VStack>
          <Download color="white" size={24} />
        </HStack>
      </Box>

      {/* PDF Viewer using WebView for Google Drive */}
      <Box className="flex-1">
        <WebView
          source={{ uri: embedUrl }}
          style={{ width, height: height - 140 }}
          javaScriptEnabled
          domStorageEnabled
        />
      </Box>

      {/* Bottom Controls */}
      <Box className="p-6 border-t border-outline-200">
        <Button
          onPress={() => router.back()}
          className="w-full"
        >
          <ButtonText>Mark as Complete & Continue</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
