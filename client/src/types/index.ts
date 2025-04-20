// User related types
export type User = {
  id: number;
  username: string;
  displayName: string;
  email?: string;
  bio?: string;
  mindfulnessLevel: string;
  streak: number;
  darkMode: boolean;
  reminderEnabled: boolean;
  preferredSound: string;
  language: string;
};

// Journal related types
export type JournalEntry = {
  id: number;
  userId: number;
  title: string;
  content: string;
  mood: string;
  date: string;
  tags: string[];
};

export type CreateJournalEntryInput = {
  userId: number;
  title: string;
  content: string;
  mood: string;
  tags: string[];
};

// Meditation related types
export type MeditationSession = {
  id: number;
  userId: number;
  duration: number;
  type: string;
  completed: boolean;
  date: string;
};

export type CreateMeditationSessionInput = {
  userId: number;
  duration: number;
  type: string;
  completed: boolean;
};

// Resource related types
export type Resource = {
  id: number;
  title: string;
  description: string;
  type: string;
  category: string;
  duration?: string;
  imageUrl?: string | null;
  contentUrl?: string;
  featured: boolean;
};

export type ResourceCategory = 'ARTICLE' | 'VIDEO' | 'PODCAST' | 'DOWNLOAD';

// Quote related types
export type Quote = {
  id: number;
  text: string;
  author: string;
};

// Stats and tracking types
export type MoodData = {
  date: string;
  mood: string;
  value: number;
};

export type MeditationStats = {
  totalMinutes: number;
  percentChange: number;
  sessions: number;
};

export type JournalStats = {
  totalEntries: number;
  percentChange: number;
};

export type MoodStats = {
  trend: string;
  weeklyData: MoodData[];
};

// Context types
export interface MindfulContextType {
  user: User | null;
  isLoading: boolean;
  quotes: {
    dailyQuote: Quote | null;
    isLoading: boolean;
  };
  stats: {
    meditation: MeditationStats;
    journal: JournalStats;
    mood: MoodStats;
  };
  journalEntries: JournalEntry[];
  meditationSessions: MeditationSession[];
  resources: {
    featured: Resource[];
    recommended: Resource[];
    allResources: Resource[];
    isLoading: boolean;
  };
  updateUserPreferences: (preferences: Partial<User>) => Promise<void>;
  createJournalEntry: (entry: CreateJournalEntryInput) => Promise<void>;
  createMeditationSession: (session: CreateMeditationSessionInput) => Promise<void>;
  updateMood: (mood: string) => void;
}
