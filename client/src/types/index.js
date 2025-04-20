// // User related types
// export type User = {
//   id: number;
//   username: string;
//   displayName: string;
//   email?: string;
//   bio?: string;
//   mindfulnessLevel: string;
//   streak: number;
//   darkMode: boolean;
//   reminderEnabled: boolean;
//   preferredSound: string;
//   language: string;
// };

// // Journal related types
// export type JournalEntry = {
//   id: number;
//   userId: number;
//   title: string;
//   content: string;
//   mood: string;
//   date: string;
//   tags: string[];
// };

// export type CreateJournalEntryInput = {
//   userId: number;
//   title: string;
//   content: string;
//   mood: string;
//   tags: string[];
// };

// // Meditation related types
// export type MeditationSession = {
//   id: number;
//   userId: number;
//   duration: number;
//   type: string;
//   completed: boolean;
//   date: string;
// };

// export type CreateMeditationSessionInput = {
//   userId: number;
//   duration: number;
//   type: string;
//   completed: boolean;
// };

// // Resource related types
// export type Resource = {
//   id: number;
//   title: string;
//   description: string;
//   type: string;
//   category: string;
//   duration?: string;
//   imageUrl?: string | null;
//   contentUrl?: string;
//   featured: boolean;
// };

// export type ResourceCategory = 'ARTICLE' | 'VIDEO' | 'PODCAST' | 'DOWNLOAD';

// // Quote related types
// export type Quote = {
//   id: number;
//   text: string;
//   author: string;
// };

// // Stats and tracking types
// export type MoodData = {
//   date: string;
//   mood: string;
//   value: number;
// };

// export type MeditationStats = {
//   totalMinutes: number;
//   percentChange: number;
//   sessions: number;
// };

// export type JournalStats = {
//   totalEntries: number;
//   percentChange: number;
// };

// export type MoodStats = {
//   trend: string;
//   weeklyData: MoodData[];
// };

// // Context types
// export interface MindfulContextType {
//   user: User | null;
//   isLoading: boolean;
//   quotes: {
//     dailyQuote: Quote | null;
//     isLoading: boolean;
//   };
//   stats: {
//     meditation: MeditationStats;
//     journal: JournalStats;
//     mood: MoodStats;
//   };
//   journalEntries: JournalEntry[];
//   meditationSessions: MeditationSession[];
//   resources: {
//     featured: Resource[];
//     recommended: Resource[];
//     allResources: Resource[];
//     isLoading: boolean;
//   };
//   updateUserPreferences: (preferences: Partial<User>) => Promise<void>;
//   createJournalEntry: (entry: CreateJournalEntryInput) => Promise<void>;
//   createMeditationSession: (session: CreateMeditationSessionInput) => Promise<void>;
//   updateMood: (mood: string) => void;
// }
// User related types (structure reference only)
export const User = {
  id: 0,
  username: '',
  displayName: '',
  email: '',
  bio: '',
  mindfulnessLevel: '',
  streak: 0,
  darkMode: false,
  reminderEnabled: false,
  preferredSound: '',
  language: '',
};

// Journal related types
export const JournalEntry = {
  id: 0,
  userId: 0,
  title: '',
  content: '',
  mood: '',
  date: '',
  tags: [],
};

export const CreateJournalEntryInput = {
  userId: 0,
  title: '',
  content: '',
  mood: '',
  tags: [],
};

// Meditation related types
export const MeditationSession = {
  id: 0,
  userId: 0,
  duration: 0,
  type: '',
  completed: false,
  date: '',
};

export const CreateMeditationSessionInput = {
  userId: 0,
  duration: 0,
  type: '',
  completed: false,
};

// Resource related types
export const Resource = {
  id: 0,
  title: '',
  description: '',
  type: '',
  category: '',
  duration: '',
  imageUrl: '',
  contentUrl: '',
  featured: false,
};

export const ResourceCategory = ['ARTICLE', 'VIDEO', 'PODCAST', 'DOWNLOAD'];

// Quote related types
export const Quote = {
  id: 0,
  text: '',
  author: '',
};

// Stats and tracking types
export const MoodData = {
  date: '',
  mood: '',
  value: 0,
};

export const MeditationStats = {
  totalMinutes: 0,
  percentChange: 0,
  sessions: 0,
};

export const JournalStats = {
  totalEntries: 0,
  percentChange: 0,
};

export const MoodStats = {
  trend: '',
  weeklyData: [MoodData],
};

// Context types (structure only)
export const MindfulContextType = {
  user: null,
  isLoading: false,
  quotes: {
    dailyQuote: null,
    isLoading: false,
  },
  stats: {
    meditation: MeditationStats,
    journal: JournalStats,
    mood: MoodStats,
  },
  journalEntries: [],
  meditationSessions: [],
  resources: {
    featured: [],
    recommended: [],
    allResources: [],
    isLoading: false,
  },
  updateUserPreferences: async (preferences) => {},
  createJournalEntry: async (entry) => {},
  createMeditationSession: async (session) => {},
  updateMood: (mood) => {},
};
