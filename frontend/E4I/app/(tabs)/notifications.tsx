// FILE: app/(tabs)/notifications.tsx
import { useState } from 'react';
import { ScrollView, Pressable } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Award, Gift, BookOpen, AlertCircle, CheckCircle, Bell, Circle } from 'lucide-react-native';

// Notification types
interface Notification {
  id: number;
  type: 'certificate' | 'points' | 'course' | 'system' | 'achievement';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  icon: string;
  color: string;
}

// Mock notifications data
const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'certificate',
    title: 'Certificate Earned! 🎓',
    message: 'Congratulations! You\'ve earned your certificate for completing "Introduction to Corruption"',
    timestamp: '2 hours ago',
    isRead: false,
    icon: 'award',
    color: '#3B82F6'
  },
  {
    id: 2,
    type: 'points',
    title: 'Knowledge Token Redeemed',
    message: 'You\'ve successfully redeemed 50 KT(R) tokens. Your reward is being processed.',
    timestamp: '5 hours ago',
    isRead: false,
    icon: 'gift',
    color: '#F59E0B'
  },
  {
    id: 3,
    type: 'course',
    title: 'New Course Available',
    message: 'A new course "Advanced Anti-Corruption Strategies" is now available. Start learning today!',
    timestamp: '1 day ago',
    isRead: false,
    icon: 'book',
    color: '#10B981'
  },
  {
    id: 4,
    type: 'achievement',
    title: 'Badge Unlocked! 🏆',
    message: 'You\'ve unlocked the "UNODC Unit 1" badge. Keep up the great work!',
    timestamp: '1 day ago',
    isRead: true,
    icon: 'award',
    color: '#8B5CF6'
  },
  {
    id: 5,
    type: 'system',
    title: 'System Maintenance Scheduled',
    message: 'Scheduled maintenance will occur on Dec 20 at 2:00 AM. The system will be unavailable for approximately 1 hour.',
    timestamp: '2 days ago',
    isRead: true,
    icon: 'alert',
    color: '#EF4444'
  },
  {
    id: 6,
    type: 'points',
    title: 'Points Earned',
    message: 'You\'ve earned 25 points for completing the "Effects of Corruption" quiz with a score of 100%!',
    timestamp: '3 days ago',
    isRead: true,
    icon: 'gift',
    color: '#F59E0B'
  },
  {
    id: 7,
    type: 'course',
    title: 'Course Update',
    message: 'The "Public Sector Corruption" course has been updated with new video content and activities.',
    timestamp: '4 days ago',
    isRead: true,
    icon: 'book',
    color: '#10B981'
  },
  {
    id: 8,
    type: 'system',
    title: 'App Update Available',
    message: 'A new version of E4I is available. Update now to enjoy new features and improvements.',
    timestamp: '5 days ago',
    isRead: true,
    icon: 'alert',
    color: '#6366F1'
  }
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };

  const getIcon = (iconType: string, color: string) => {
    const iconSize = 24;
    switch (iconType) {
      case 'award':
        return <Award color={color} size={iconSize} />;
      case 'gift':
        return <Gift color={color} size={iconSize} />;
      case 'book':
        return <BookOpen color={color} size={iconSize} />;
      case 'alert':
        return <AlertCircle color={color} size={iconSize} />;
      default:
        return <Bell color={color} size={iconSize} />;
    }
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  return (
    <Box className="flex-1 bg-background-0">
      {/* Header */}
      <Box className="px-6 pt-12 pb-4 bg-primary-500">
        <VStack space="md">
          <HStack className="items-center justify-between">
            <Heading size="2xl" className="text-blue-400">
              Notifications
            </Heading>
            {unreadCount > 0 && (
              <Box
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: '#EF4444' }}
              >
                <Text className="text-white text-sm font-bold">
                  {unreadCount}
                </Text>
              </Box>
            )}
          </HStack>
          <Text className="text-primary-100">
            Stay updated with your learning journey
          </Text>
        </VStack>
      </Box>

      {/* Filter and Actions */}
      <Box className="bg-white border-b border-outline-200 px-6 py-3">
        <HStack className="items-center justify-between">
          <HStack space="sm">
            <Pressable onPress={() => setFilter('all')}>
              <Box
                className="px-4 py-2 rounded-full"
                style={{
                  backgroundColor: filter === 'all' ? '#3B82F6' : '#F3F4F6'
                }}
              >
                <Text
                  className="text-sm font-semibold"
                  style={{ color: filter === 'all' ? '#FFFFFF' : '#6B7280' }}
                >
                  All
                </Text>
              </Box>
            </Pressable>
            <Pressable onPress={() => setFilter('unread')}>
              <Box
                className="px-4 py-2 rounded-full"
                style={{
                  backgroundColor: filter === 'unread' ? '#3B82F6' : '#F3F4F6'
                }}
              >
                <Text
                  className="text-sm font-semibold"
                  style={{ color: filter === 'unread' ? '#FFFFFF' : '#6B7280' }}
                >
                  Unread
                </Text>
              </Box>
            </Pressable>
          </HStack>

          {unreadCount > 0 && (
            <Pressable onPress={markAllAsRead}>
              <HStack space="xs" className="items-center">
                <CheckCircle color="#3B82F6" size={16} />
                <Text className="text-sm font-semibold text-primary-600">
                  Mark all read
                </Text>
              </HStack>
            </Pressable>
          )}
        </HStack>
      </Box>

      {/* Notifications List */}
      <ScrollView className="flex-1">
        <VStack className="p-6" space="md">
          {filteredNotifications.length === 0 ? (
            <Box className="py-12 items-center">
              <Bell color="#9CA3AF" size={48} />
              <Text className="text-typography-500 text-center mt-4">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
              </Text>
            </Box>
          ) : (
            filteredNotifications.map((notification) => (
              <Pressable
                key={notification.id}
                onPress={() => markAsRead(notification.id)}
              >
                <Box
                  className="rounded-xl p-4 border"
                  style={{
                    backgroundColor: notification.isRead ? '#FFFFFF' : '#EFF6FF',
                    borderColor: notification.isRead ? '#E5E7EB' : '#BFDBFE',
                    borderWidth: 1
                  }}
                >
                  <HStack space="md">
                    {/* Icon */}
                    <Box
                      className="w-12 h-12 rounded-full items-center justify-center"
                      style={{ backgroundColor: notification.color + '20' }}
                    >
                      {getIcon(notification.icon, notification.color)}
                    </Box>

                    {/* Content */}
                    <VStack className="flex-1" space="xs">
                      <HStack className="items-center justify-between">
                        <Text className="text-sm font-bold text-typography-900 flex-1">
                          {notification.title}
                        </Text>
                        {!notification.isRead && (
                          <Circle
                            color="#3B82F6"
                            size={8}
                            fill="#3B82F6"
                          />
                        )}
                      </HStack>

                      <Text className="text-sm text-typography-600">
                        {notification.message}
                      </Text>

                      <Text className="text-xs text-typography-500 mt-1">
                        {notification.timestamp}
                      </Text>
                    </VStack>
                  </HStack>

                  {/* Action Button (if unread) */}
                  {!notification.isRead && (
                    <Box className="mt-3 pt-3" style={{ borderTopWidth: 1, borderTopColor: '#E5E7EB' }}>
                      <Pressable onPress={() => markAsRead(notification.id)}>
                        <HStack space="xs" className="items-center justify-center">
                          <CheckCircle color="#3B82F6" size={16} />
                          <Text className="text-sm font-semibold text-primary-600">
                            Mark as read
                          </Text>
                        </HStack>
                      </Pressable>
                    </Box>
                  )}
                </Box>
              </Pressable>
            ))
          )}
        </VStack>
      </ScrollView>

      {/* Bottom Info */}
      {filteredNotifications.length > 0 && (
        <Box className="p-4 bg-background-50 border-t border-outline-200">
          <Text className="text-xs text-typography-500 text-center">
            {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
          </Text>
        </Box>
      )}
    </Box>
  );
}