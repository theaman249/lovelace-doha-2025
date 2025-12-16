import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, useSegments } from 'expo-router';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Check authentication status on mount
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(tabs)';
    const inCoursePages = segments[0] === 'course-detail' || segments[0] === 'video-player' || segments[0] === 'activity' || segments[0] === 'pdf-viewer';

    if (!isAuthenticated && inAuthGroup) {
      // User is not authenticated but trying to access protected routes
      router.replace('/login');
    } else if (isAuthenticated && !inAuthGroup && !inCoursePages) {
      // User is authenticated but on auth screen
      router.replace('/(tabs)/courses');
    }
  }, [isAuthenticated, segments, isLoading]);

  const checkAuthStatus = async () => {
    try {
      // TODO: Check AsyncStorage or secure store for auth token
      // const token = await AsyncStorage.getItem('authToken');
      // setIsAuthenticated(!!token);
      setIsAuthenticated(false); // Default to false for now
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implement actual API call
      console.log('Login:', { email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Store token in AsyncStorage
      // await AsyncStorage.setItem('authToken', 'your-token');
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // TODO: Clear token from AsyncStorage
      // await AsyncStorage.removeItem('authToken');
      
      setIsAuthenticated(false);
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // TODO: Implement actual API call
      console.log('Register:', { name, email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Store token in AsyncStorage
      // await AsyncStorage.setItem('authToken', 'your-token');
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};