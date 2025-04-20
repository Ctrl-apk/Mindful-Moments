import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertJournalEntrySchema, insertMeditationSessionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  
  // User routes
  app.get('/api/users/:id', async (req, res) => {
    const user = await storage.getUser(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  });
  
  app.put('/api/users/:id', async (req, res) => {
    const user = await storage.updateUser(parseInt(req.params.id), req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  });
  
  // Journal routes
  app.get('/api/journal/:userId', async (req, res) => {
    const entries = await storage.getJournalEntries(parseInt(req.params.userId));
    return res.json(entries);
  });
  
  app.post('/api/journal', async (req, res) => {
    try {
      const validatedData = insertJournalEntrySchema.parse(req.body);
      const entry = await storage.createJournalEntry(validatedData);
      return res.status(201).json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "An error occurred" });
    }
  });
  
  app.put('/api/journal/:id', async (req, res) => {
    const entry = await storage.updateJournalEntry(parseInt(req.params.id), req.body);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    return res.json(entry);
  });
  
  app.delete('/api/journal/:id', async (req, res) => {
    const success = await storage.deleteJournalEntry(parseInt(req.params.id));
    if (!success) {
      return res.status(404).json({ message: "Entry not found" });
    }
    return res.json({ message: "Entry deleted successfully" });
  });
  
  // Meditation routes
  app.get('/api/meditation/:userId', async (req, res) => {
    const sessions = await storage.getMeditationSessions(parseInt(req.params.userId));
    return res.json(sessions);
  });
  
  app.post('/api/meditation', async (req, res) => {
    try {
      const validatedData = insertMeditationSessionSchema.parse(req.body);
      const session = await storage.createMeditationSession(validatedData);
      return res.status(201).json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "An error occurred" });
    }
  });
  
  // Resource routes
  app.get('/api/resources', async (req, res) => {
    const { type, category } = req.query;
    
    if (type) {
      const resources = await storage.getResourcesByType(type as string);
      return res.json(resources);
    }
    
    if (category) {
      const resources = await storage.getResourcesByCategory(category as string);
      return res.json(resources);
    }
    
    const resources = await storage.getResources();
    return res.json(resources);
  });
  
  app.get('/api/resources/featured', async (req, res) => {
    const resources = await storage.getFeaturedResources();
    return res.json(resources);
  });
  
  app.get('/api/resources/:id', async (req, res) => {
    const resource = await storage.getResource(parseInt(req.params.id));
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    return res.json(resource);
  });
  
  // Quote routes
  app.get('/api/quotes/random', async (req, res) => {
    const quote = await storage.getRandomQuote();
    if (!quote) {
      return res.status(404).json({ message: "No quotes available" });
    }
    return res.json(quote);
  });
  
  app.get('/api/quotes', async (req, res) => {
    const quotes = await storage.getAllQuotes();
    return res.json(quotes);
  });

  const httpServer = createServer(app);
  return httpServer;
}
