import { 
  users, 
  journalEntries, 
  meditationSessions, 
  resources, 
  quotes,
  type User, 
  type InsertUser, 
  type JournalEntry, 
  type InsertJournalEntry,
  type MeditationSession,
  type InsertMeditationSession,
  type Resource,
  type InsertResource,
  type Quote,
  type InsertQuote
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // Journal methods
  getJournalEntries(userId: number): Promise<JournalEntry[]>;
  getJournalEntry(id: number): Promise<JournalEntry | undefined>;
  createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry>;
  updateJournalEntry(id: number, entry: Partial<JournalEntry>): Promise<JournalEntry | undefined>;
  deleteJournalEntry(id: number): Promise<boolean>;
  
  // Meditation methods
  getMeditationSessions(userId: number): Promise<MeditationSession[]>;
  createMeditationSession(session: InsertMeditationSession): Promise<MeditationSession>;
  
  // Resource methods
  getResources(): Promise<Resource[]>;
  getResourcesByType(type: string): Promise<Resource[]>;
  getResourcesByCategory(category: string): Promise<Resource[]>;
  getFeaturedResources(): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  
  // Quote methods
  getRandomQuote(): Promise<Quote | undefined>;
  getAllQuotes(): Promise<Quote[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private journalEntries: Map<number, JournalEntry>;
  private meditationSessions: Map<number, MeditationSession>;
  private resources: Map<number, Resource>;
  private quotes: Map<number, Quote>;
  
  private userId: number;
  private journalEntryId: number;
  private meditationSessionId: number;
  private resourceId: number;
  private quoteId: number;

  constructor() {
    this.users = new Map();
    this.journalEntries = new Map();
    this.meditationSessions = new Map();
    this.resources = new Map();
    this.quotes = new Map();
    
    this.userId = 1;
    this.journalEntryId = 1;
    this.meditationSessionId = 1;
    this.resourceId = 1;
    this.quoteId = 1;
    
    // Add some sample quotes
    this.createQuote({
      text: "The present moment is the only time over which we have dominion.",
      author: "Thich Nhat Hanh"
    });
    
    this.createQuote({
      text: "Mindfulness is not difficult, we just need to remember to do it.",
      author: "Sharon Salzberg"
    });
    
    this.createQuote({
      text: "The best way to capture moments is to pay attention. This is how we cultivate mindfulness.",
      author: "Jon Kabat-Zinn"
    });
    
    // Create sample resources
    this.createResource({
      title: "Meditation for Beginners",
      description: "A comprehensive guide to getting started with meditation practice.",
      type: "ARTICLE",
      category: "beginners",
      duration: "8 min read",
      imageUrl: "https://images.unsplash.com/photo-1529693662653-9d480530a697",
      contentUrl: "/resources/meditation-beginners",
      featured: false
    });
    
    this.createResource({
      title: "Mindful Movement Practice",
      description: "Learn gentle movements that can be incorporated into your mindfulness routine.",
      type: "VIDEO",
      category: "movement",
      duration: "15 min",
      imageUrl: null,
      contentUrl: "/resources/mindful-movement",
      featured: false
    });
    
    this.createResource({
      title: "The Mindful Brain",
      description: "Interview with a neuroscientist about the effects of mindfulness on brain health.",
      type: "PODCAST",
      category: "science",
      duration: "42 min",
      imageUrl: null,
      contentUrl: "/resources/mindful-brain",
      featured: false
    });
    
    this.createResource({
      title: "The Science of Mindfulness",
      description: "Discover the scientific research behind mindfulness practices and how they affect your brain and overall well-being. This comprehensive guide explains the neurological changes that occur with consistent mindfulness practice.",
      type: "ARTICLE",
      category: "science",
      duration: "10 min read",
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
      contentUrl: "/resources/science-mindfulness",
      featured: true
    });
    
    // Create sample user
    this.createUser({
      username: "alexmorgan",
      password: "password123",
      displayName: "Alex Morgan",
      email: "alex@example.com",
      bio: "I'm passionate about incorporating mindfulness into my daily life and managing stress through meditation.",
      mindfulnessLevel: "intermediate",
      streak: 7,
      darkMode: false,
      reminderEnabled: true,
      preferredSound: "nature",
      language: "english"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Journal methods
  async getJournalEntries(userId: number): Promise<JournalEntry[]> {
    return Array.from(this.journalEntries.values())
      .filter(entry => entry.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  async getJournalEntry(id: number): Promise<JournalEntry | undefined> {
    return this.journalEntries.get(id);
  }
  
  async createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry> {
    const id = this.journalEntryId++;
    const date = new Date();
    const journalEntry: JournalEntry = { ...entry, id, date };
    this.journalEntries.set(id, journalEntry);
    return journalEntry;
  }
  
  async updateJournalEntry(id: number, entryData: Partial<JournalEntry>): Promise<JournalEntry | undefined> {
    const entry = this.journalEntries.get(id);
    if (!entry) return undefined;
    
    const updatedEntry = { ...entry, ...entryData };
    this.journalEntries.set(id, updatedEntry);
    return updatedEntry;
  }
  
  async deleteJournalEntry(id: number): Promise<boolean> {
    return this.journalEntries.delete(id);
  }
  
  // Meditation methods
  async getMeditationSessions(userId: number): Promise<MeditationSession[]> {
    return Array.from(this.meditationSessions.values())
      .filter(session => session.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  async createMeditationSession(session: InsertMeditationSession): Promise<MeditationSession> {
    const id = this.meditationSessionId++;
    const date = new Date();
    const meditationSession: MeditationSession = { ...session, id, date };
    this.meditationSessions.set(id, meditationSession);
    return meditationSession;
  }
  
  // Resource methods
  async getResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }
  
  async getResourcesByType(type: string): Promise<Resource[]> {
    return Array.from(this.resources.values())
      .filter(resource => resource.type.toLowerCase() === type.toLowerCase());
  }
  
  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return Array.from(this.resources.values())
      .filter(resource => resource.category.toLowerCase() === category.toLowerCase());
  }
  
  async getFeaturedResources(): Promise<Resource[]> {
    return Array.from(this.resources.values())
      .filter(resource => resource.featured);
  }
  
  async getResource(id: number): Promise<Resource | undefined> {
    return this.resources.get(id);
  }
  
  private createResource(resource: InsertResource): Resource {
    const id = this.resourceId++;
    const newResource: Resource = { ...resource, id };
    this.resources.set(id, newResource);
    return newResource;
  }
  
  // Quote methods
  async getRandomQuote(): Promise<Quote | undefined> {
    const quotes = Array.from(this.quotes.values());
    if (quotes.length === 0) return undefined;
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
  
  async getAllQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }
  
  private createQuote(quote: InsertQuote): Quote {
    const id = this.quoteId++;
    const newQuote: Quote = { ...quote, id };
    this.quotes.set(id, newQuote);
    return newQuote;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  async getJournalEntries(userId: number): Promise<JournalEntry[]> {
    return await db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.userId, userId))
      .orderBy(desc(journalEntries.date));
  }

  async getJournalEntry(id: number): Promise<JournalEntry | undefined> {
    const [entry] = await db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.id, id));
    return entry || undefined;
  }

  async createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry> {
    const [journalEntry] = await db
      .insert(journalEntries)
      .values({ ...entry, date: new Date() })
      .returning();
    return journalEntry;
  }

  async updateJournalEntry(id: number, entryData: Partial<JournalEntry>): Promise<JournalEntry | undefined> {
    const [updatedEntry] = await db
      .update(journalEntries)
      .set(entryData)
      .where(eq(journalEntries.id, id))
      .returning();
    return updatedEntry;
  }

  async deleteJournalEntry(id: number): Promise<boolean> {
    const result = await db
      .delete(journalEntries)
      .where(eq(journalEntries.id, id))
      .returning();
    return result.length > 0;
  }

  async getMeditationSessions(userId: number): Promise<MeditationSession[]> {
    return await db
      .select()
      .from(meditationSessions)
      .where(eq(meditationSessions.userId, userId))
      .orderBy(desc(meditationSessions.date));
  }

  async createMeditationSession(session: InsertMeditationSession): Promise<MeditationSession> {
    const [meditationSession] = await db
      .insert(meditationSessions)
      .values({ ...session, date: new Date() })
      .returning();
    return meditationSession;
  }

  async getResources(): Promise<Resource[]> {
    return await db.select().from(resources);
  }

  async getResourcesByType(type: string): Promise<Resource[]> {
    return await db
      .select()
      .from(resources)
      .where(sql`LOWER(${resources.type}) = LOWER(${type})`);
  }

  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return await db
      .select()
      .from(resources)
      .where(sql`LOWER(${resources.category}) = LOWER(${category})`);
  }

  async getFeaturedResources(): Promise<Resource[]> {
    return await db
      .select()
      .from(resources)
      .where(eq(resources.featured, true));
  }

  async getResource(id: number): Promise<Resource | undefined> {
    const [resource] = await db
      .select()
      .from(resources)
      .where(eq(resources.id, id));
    return resource || undefined;
  }

  async getRandomQuote(): Promise<Quote | undefined> {
    const allQuotes = await db.select().from(quotes);
    if (allQuotes.length === 0) return undefined;
    
    const randomIndex = Math.floor(Math.random() * allQuotes.length);
    return allQuotes[randomIndex];
  }

  async getAllQuotes(): Promise<Quote[]> {
    return await db.select().from(quotes);
  }
}

// Function to seed the database with initial data if it's empty
async function seedDatabase() {
  try {
    // Check if users table already has data
    const existingUsers = await db.select().from(users);
    
    if (existingUsers.length === 0) {
      // Add a default user
      await db.insert(users).values({
        username: "alexmorgan",
        password: "password123",
        displayName: "Alex Morgan",
        email: "alex@example.com",
        bio: "Mindfulness practitioner and yoga enthusiast",
        mindfulnessLevel: "intermediate",
        streak: 7,
        darkMode: false,
        reminderEnabled: true,
        preferredSound: "rain",
        language: "en"
      });
      
      // Add resources with real external URLs
      await db.insert(resources).values([
        {
          title: "Meditation for Beginners",
          description: "A comprehensive guide to start your meditation practice.",
          type: "ARTICLE",
          category: "beginners",
          duration: "10 min read",
          contentUrl: "https://www.mindful.org/how-to-meditate/",
          featured: false
        },
        {
          title: "The Science of Mindfulness",
          description: "Learn about the latest research on how mindfulness affects your brain.",
          type: "ARTICLE",
          category: "science",
          duration: "15 min read",
          contentUrl: "https://www.mindful.org/the-science-of-mindfulness/",
          featured: true
        },
        {
          title: "Guided Sleep Meditation",
          description: "Fall asleep naturally with this calming guided meditation.",
          type: "VIDEO",
          category: "sleep",
          duration: "30 min",
          contentUrl: "https://www.youtube.com/watch?v=aEqlQvczMJQ",
          featured: false
        },
        {
          title: "Mindfulness for Anxiety Relief",
          description: "Simple techniques to manage anxiety and stress in daily life.",
          type: "ARTICLE",
          category: "anxiety",
          duration: "8 min read",
          contentUrl: "https://www.verywellmind.com/mindfulness-exercises-for-anxiety-relief-5116332",
          featured: false
        },
        {
          title: "Mindful Breathing Techniques",
          description: "Master various breathing methods to enhance your mindfulness practice.",
          type: "VIDEO",
          category: "techniques",
          duration: "20 min",
          contentUrl: "https://www.youtube.com/watch?v=w36E0xJ0bWE",
          featured: false
        }
      ]);
      
      // Add quotes
      await db.insert(quotes).values([
        {
          text: "The present moment is the only time over which we have dominion.",
          author: "Thich Nhat Hanh"
        },
        {
          text: "Mindfulness is not difficult, we just need to remember to do it.",
          author: "Sharon Salzberg"
        },
        {
          text: "The best way to capture moments is to pay attention. This is how we cultivate mindfulness.",
          author: "Jon Kabat-Zinn"
        },
        {
          text: "Be happy in the moment, that is enough. Each moment is all we need, not more.",
          author: "Mother Teresa"
        }
      ]);
      
      console.log("Database seeded successfully");
    } else {
      console.log("Database already contains data, skipping seed");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Initialize the database with seed data
seedDatabase().catch(console.error);

// Export DatabaseStorage instance (use PostgreSQL)
export const storage = new DatabaseStorage();