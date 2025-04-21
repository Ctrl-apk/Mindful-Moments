import { useState } from 'react';
import { useMindful } from '@/context/MindfulContext';
import MoodSelector from '@/components/journal/MoodSelector';
import JournalEntryCard from '@/components/journal/JournalEntryCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Journal = () => {
  const { user, journalEntries, createJournalEntry } = useMindful();
  const [mood, setMood] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [editingEntry, setEditingEntry] = useState(null);

  const sortedEntries = [...journalEntries].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (sortOrder === 'newest') return dateB - dateA;
    if (sortOrder === 'oldest') return dateA - dateB;
    if (sortOrder === 'mood') {
      const moodOrder = { 'great': 0, 'good': 1, 'neutral': 2, 'low': 3 };
      return moodOrder[a.mood] - moodOrder[b.mood];
    }
    return 0;
  });

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !mood) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!user) return;
    try {
      const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      await createJournalEntry({ userId: user.id, title, content, mood, tags: tagArray });
      setTitle('');
      setContent('');
      setTags('');
      setMood('');
      setError('');
      setIsDialogOpen(false);
    } catch (err) {
      console.error('Error creating journal entry:', err);
      setError('An error occurred. Please try again.');
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setTitle(entry.title);
    setContent(entry.content);
    setMood(entry.mood);
    setTags(entry.tags.join(', '));
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    console.log(`Deleting entry with ID: ${id}`);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <section className="mb-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-64" />
            </CardHeader>
            <CardContent className="flex justify-between max-w-md mx-auto">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex flex-col items-center">
                  <Skeleton className="w-14 h-14 rounded-full mb-2" />
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        {[1, 2].map(i => (
          <div key={i} className="mb-4">
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-2xl font-semibold text-neutral-700">Mindfulness Journal</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center">
              <Plus className="mr-1 h-4 w-4" />
              New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Journal Entry</DialogTitle>
              <DialogDescription>Record your thoughts, feelings, and reflections.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Entry title" className="mt-1" />
              </div>
              <div>
                <Label>How are you feeling?</Label>
                <div className="mt-2">
                  <MoodSelector onSelect={setMood} initialMood={mood} />
                </div>
              </div>
              <div>
                <Label htmlFor="content">Journal Entry</Label>
                <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your thoughts here..." className="mt-1" rows={6} />
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Gratitude, Morning, Work..." className="mt-1" />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>Save Entry</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <section className="mb-8">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-xl font-semibold text-neutral-700">How are you feeling today?</CardTitle>
          </CardHeader>
          <CardContent>
            <MoodSelector onSelect={setMood} />
          </CardContent>
        </Card>
      </section>
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-heading text-xl font-semibold text-neutral-700">Your Entries</h3>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="mood">By Mood</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {sortedEntries.length === 0 ? (
          <Card className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-neutral-600">No journal entries yet. Create your first entry to get started!</p>
          </Card>
        ) : (
          sortedEntries.map(entry => (
            <JournalEntryCard key={entry.id} entry={entry} onEdit={handleEdit} onDelete={handleDelete} />
          ))
        )}
      </section>
    </div>
  );
};

export default Journal;