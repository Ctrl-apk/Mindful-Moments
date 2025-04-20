
# MindfulMe - Cultivate Daily Mindfulness

A full-stack mindfulness application built with React and Express that helps users practice meditation, journal their thoughts, and track their mindfulness journey.

## Features

- **Meditation Timer**: Guided meditation sessions with customizable durations
- **Mindfulness Journal**: Record thoughts, feelings and reflections
- **Resource Library**: Access to articles, videos and podcasts about mindfulness
- **Mood Tracking**: Monitor your emotional wellbeing over time
- **Progress Statistics**: View your meditation and journaling progress

## Tech Stack

- Frontend: React, TypeScript, TailwindCSS
- Backend: Express.js
- Database: PostgreSQL with Drizzle ORM
- State Management: React Query
- UI Components: Radix UI, Shadcn/ui

## Getting Started

1. Fork this template on Replit
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Environment Variables Setup

This application requires two important environment variables:

### 1. Database URL
The application needs a PostgreSQL database connection URL. To set this up:

1. In your workspace, click on "Tools" in the sidebar
2. Select "Secrets"
3. Click "+ New Secret"
4. Add a new secret with:
   - Key: `DATABASE_URL`
   - Value: Your PostgreSQL connection string in the format:
     ```
     postgresql://username:password@host:port/database
     ```

### 2. Session Secret
For secure session management:

1. Stay in the "Secrets" tool
2. Click "+ New Secret"
3. Add a new secret with:
   - Key: `SESSION_SECRET`
   - Value: A secure random string (at least 32 characters)

Note: Never commit these secrets directly in your code.

### For Users Forking This Project

When you fork this project, you'll need to:

1. Set up your own database.
2. Add your own `SESSION_SECRET` in the Secrets tool
3. The `DATABASE_URL` will be seen in your database.
The application will not start properly without these environment variables configured.

## Project Structure

- `client/`: Frontend React application
- `server/`: Express backend
- `shared/`: Shared types and schemas
- `components/`: Reusable React components
- `context/`: React context providers
- `pages/`: Main application pages

## Development

The application runs in development mode with hot reloading enabled. The frontend dev server runs on port 5173 and the backend API on port 5000.

