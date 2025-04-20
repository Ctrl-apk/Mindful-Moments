import { createContext, useState, useEffect, useContext } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Initial values for context
const initialStats = {
  meditation: {
    totalMinutes: 0,
    percentChange: 0,
    sessions: 0
  },
  journal: {
    totalEntries: 0,
    percentChange: 0
  },
  mood: {
    trend: 'Positive',
    weeklyData: [
      { date: 'M', mood: 'medium', value: 10 },
      { date: 'T', mood: 'great', value: 16 },
      { date: 'W', mood: 'good', value: 12 },
      { date: 'T', mood: 'medium', value: 8 },
      { date: 'F', mood: 'great', value: 14 },
      { date: 'S', mood: 'good', value: 10 },
      { date: 'S', mood: 'neutral', value: 6 }
    ]
  }
};

// Create context
export const MindfulContext = createContext(undefined);

// Provider component
export const MindfulProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(initialStats);
  
  // Fetch user data
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ['/api/users/1'],
    retry: false,
    refetchOnWindowFocus: false,
  });
  
  // Fetch quote data
  const { data: quoteData, isLoading: quoteLoading } = useQuery({
    queryKey: ['/api/quotes/random'],
    retry: false,
    refetchOnWindowFocus: false,
  });
  
  // Fetch journal entries
  const { data: journalData = [] } = useQuery({
    queryKey: ['/api/journal/1'],
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!user,
  });
  
  // Fetch meditation sessions
  const { data: meditationData = [] } = useQuery({
    queryKey: ['/api/meditation/1'],
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!user,
  });
  
  // Fetch resources
  const { data: resourcesData = [], isLoading: resourcesLoading } = useQuery({
    queryKey: ['/api/resources'],
    retry: false,
    refetchOnWindowFocus: false,
  });
  
  // Fetch featured resources
  const { data: featuredResourcesData = [] } = useQuery({
    queryKey: ['/api/resources/featured'],
    retry: false,
    refetchOnWindowFocus: false,
  });
  
  // Set user data when it loads
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);
  
  // Calculate statistics when data changes
  useEffect(() => {
    if (meditationData && meditationData.length > 0) {
      // Calculate meditation stats
      const totalMinutes = meditationData.reduce((total, session) => total + session.duration, 0);
      const percentChange = 12; // This would normally be calculated from historical data
      
      setStats(prev => ({
        ...prev,
        meditation: {
          totalMinutes,
          percentChange,
          sessions: meditationData.length
        }
      }));
    }
    
    if (journalData) {
      // Calculate journal stats
      setStats(prev => ({
        ...prev,
        journal: {
          totalEntries: journalData.length,
          percentChange: 0 // No change
        }
      }));
    }
  }, [meditationData, journalData]);
  
  // Function to update user preferences
  const updateUserPreferences = async (preferences) => {
    if (!user) return;
    
    try {
      const response = await apiRequest('PUT', `/api/users/${user.id}`, preferences);
      const updatedUser = await response.json();
      setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: [`/api/users/${user.id}`] });
    } catch (error) {
      console.error('Error updating user preferences:', error);
    }
  };
  
  // Function to create a journal entry
  const createJournalEntry = async (entry) => {
    try {
      await apiRequest('POST', '/api/journal', entry);
      queryClient.invalidateQueries({ queryKey: ['/api/journal/1'] });
    } catch (error) {
      console.error('Error creating journal entry:', error);
    }
  };
  
  // Function to create a meditation session
  const createMeditationSession = async (session) => {
    try {
      await apiRequest('POST', '/api/meditation', session);
      queryClient.invalidateQueries({ queryKey: ['/api/meditation/1'] });
    } catch (error) {
      console.error('Error creating meditation session:', error);
    }
  };
  
  // Function to update mood
  const updateMood = (mood) => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
    const moodValue = getMoodValue(mood);
    
    // Update mood data for today
    const updatedWeeklyData = stats.mood.weeklyData.map(day => {
      if (day.date === today) {
        return { ...day, mood, value: moodValue };
      }
      return day;
    });
    
    // Calculate overall trend
    const trend = calculateMoodTrend(updatedWeeklyData);
    
    setStats(prev => ({
      ...prev,
      mood: {
        trend,
        weeklyData: updatedWeeklyData
      }
    }));
  };
  
  // Helper function to get numeric value for mood
  const getMoodValue = (mood) => {
    switch (mood.toLowerCase()) {
      case 'great':
        return 16;
      case 'good':
        return 12;
      case 'medium':
        return 10;
      case 'low':
        return 6;
      case 'neutral':
      default:
        return 8;
    }
  };
  
  // Helper function to calculate mood trend
  const calculateMoodTrend = (weeklyData) => {
    const sum = weeklyData.reduce((total, day) => total + day.value, 0);
    const average = sum / weeklyData.length;
    
    if (average >= 12) return 'Positive';
    if (average >= 9) return 'Good';
    if (average >= 7) return 'Neutral';
    return 'Needs Attention';
  };
  
  // Filter resources for recommended content
  const recommendedResources = resourcesData.slice(0, 2);
  
  return (
    <MindfulContext.Provider 
      value={{
        user,
        isLoading: userLoading,
        quotes: {
          dailyQuote: quoteData || null,
          isLoading: quoteLoading
        },
        stats,
        journalEntries: journalData,
        meditationSessions: meditationData,
        resources: {
          featured: featuredResourcesData,
          recommended: recommendedResources,
          allResources: resourcesData,
          isLoading: resourcesLoading
        },
        updateUserPreferences,
        createJournalEntry,
        createMeditationSession,
        updateMood
      }}
    >
      {children}
    </MindfulContext.Provider>
  );
};

// Custom hook to use the context
export const useMindful = () => {
  const context = useContext(MindfulContext);
  if (context === undefined) {
    throw new Error('useMindful must be used within a MindfulProvider');
  }
  return context;
};