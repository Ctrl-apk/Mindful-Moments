import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name").notNull(),
  email: text("email"),
  bio: text("bio"),
  mindfulnessLevel: text("mindfulness_level").default("beginner"),
  streak: integer("streak").default(0),
  darkMode: boolean("dark_mode").default(false),
  reminderEnabled: boolean("reminder_enabled").default(true),
  preferredSound: text("preferred_sound").default("nature"),
  language: text("language").default("english"),
});

// Journal entries table
export const journalEntries = pgTable("journal_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  mood: text("mood").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  tags: text("tags").array(),
});

// Meditation sessions table
export const meditationSessions = pgTable("meditation_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  duration: integer("duration").notNull(),
  type: text("type").notNull(),
  completed: boolean("completed").default(true),
  date: timestamp("date").defaultNow().notNull(),
});

// Resources table
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  category: text("category").notNull(),
  duration: text("duration"),
  imageUrl: text("image_url"),
  contentUrl: text("content_url"),
  featured: boolean("featured").default(false),
});

// Quotes table
export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  author: text("author").notNull(),
});

// User schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  email: true,
  bio: true,
  mindfulnessLevel: true,
  streak: true,
  darkMode: true,
  reminderEnabled: true,
  preferredSound: true,
  language: true,
});

// Journal entry schemas
export const insertJournalEntrySchema = createInsertSchema(journalEntries).pick({
  userId: true,
  title: true,
  content: true,
  mood: true,
  tags: true,
});

// Meditation session schemas
export const insertMeditationSessionSchema = createInsertSchema(meditationSessions).pick({
  userId: true,
  duration: true,
  type: true,
  completed: true,
});

// Resource schemas
export const insertResourceSchema = createInsertSchema(resources).pick({
  title: true,
  description: true,
  type: true,
  category: true,
  duration: true,
  imageUrl: true,
  contentUrl: true,
  featured: true,
});

// Quote schemas
export const insertQuoteSchema = createInsertSchema(quotes).pick({
  text: true,
  author: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertJournalEntry = z.infer<typeof insertJournalEntrySchema>;
export type JournalEntry = typeof journalEntries.$inferSelect;

export type InsertMeditationSession = z.infer<typeof insertMeditationSessionSchema>;
export type MeditationSession = typeof meditationSessions.$inferSelect;

export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resources.$inferSelect;

export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Quote = typeof quotes.$inferSelect;
