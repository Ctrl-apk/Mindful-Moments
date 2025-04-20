import { Quote, Resource } from '@/types';

// API for fetching quotes
export const fetchQuote = async (): Promise<Quote> => {
  try {
    const response = await fetch('/api/quotes/random');
    
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
};

// API for fetching resources
export const fetchResources = async (): Promise<Resource[]> => {
  try {
    const response = await fetch('/api/resources');
    
    if (!response.ok) {
      throw new Error('Failed to fetch resources');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
};

// API for fetching featured resources
export const fetchFeaturedResources = async (): Promise<Resource[]> => {
  try {
    const response = await fetch('/api/resources/featured');
    
    if (!response.ok) {
      throw new Error('Failed to fetch featured resources');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching featured resources:', error);
    throw error;
  }
};

// API for fetching resources by type
export const fetchResourcesByType = async (type: string): Promise<Resource[]> => {
  try {
    const response = await fetch(`/api/resources?type=${type}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch resources by type');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching resources by type:', error);
    throw error;
  }
};

// API for fetching resources by category
export const fetchResourcesByCategory = async (category: string): Promise<Resource[]> => {
  try {
    const response = await fetch(`/api/resources?category=${category}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch resources by category');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching resources by category:', error);
    throw error;
  }
};

// API for saving a meditation session
export const saveMeditationSession = async (userId: number, duration: number, type: string) => {
  try {
    const response = await fetch('/api/meditation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        duration,
        type,
        completed: true
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save meditation session');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving meditation session:', error);
    throw error;
  }
};

// API for saving a journal entry
export const saveJournalEntry = async (
  userId: number, 
  title: string, 
  content: string, 
  mood: string,
  tags: string[]
) => {
  try {
    const response = await fetch('/api/journal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        title,
        content,
        mood,
        tags
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save journal entry');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving journal entry:', error);
    throw error;
  }
};
