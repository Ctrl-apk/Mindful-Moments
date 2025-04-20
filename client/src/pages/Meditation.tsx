import { useState } from 'react';
import { useMindful } from '@/context/MindfulContext';
import MeditationTimer from '@/components/meditation/MeditationTimer';
import MeditationCard from '@/components/meditation/MeditationCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

const Meditation = () => {
  const { resources } = useMindful();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter meditation resources by category
  const filteredResources = selectedCategory === 'all' 
    ? resources.allResources
    : resources.allResources.filter(r => r.category.toLowerCase() === selectedCategory.toLowerCase());
  
  // Sample meditation data for presentation (would come from API in production)
  const guidedMeditations = [
    {
      id: 1,
      title: 'Forest Bathing',
      description: 'Immerse yourself in the healing atmosphere of a forest.',
      type: 'guided',
      category: 'NATURE',
      duration: '15 minutes',
      imageUrl: 'https://images.unsplash.com/photo-1591228127791-8e2eaef098d3'
    },
    {
      id: 2,
      title: 'Body Scan',
      description: 'Increase awareness of your body and release tension.',
      type: 'guided',
      category: 'FOCUS',
      duration: '10 minutes',
      imageUrl: 'https://images.unsplash.com/photo-1519834070468-58330dc81614'
    },
    {
      id: 3,
      title: 'Before Sleep',
      description: 'Calm your mind and prepare for restful sleep.',
      type: 'guided',
      category: 'SLEEP',
      duration: '20 minutes',
      imageUrl: 'https://images.unsplash.com/photo-1501139083538-0139583c060f'
    }
  ];
  
  if (resources.isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Skeleton className="h-8 w-48 mb-6" />
        
        {/* Skeleton for timer section */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative mb-6">
                <Skeleton className="w-64 h-64 rounded-full" />
              </div>
              <div className="flex space-x-3 mb-6">
                {[1, 2, 3, 4].map(i => (
                  <Skeleton key={i} className="w-12 h-12 rounded-full" />
                ))}
              </div>
              <div className="flex space-x-4">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Skeleton for guided meditations */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <Card key={i}>
                <div className="h-40 bg-primary-light/20" />
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="font-heading text-2xl font-semibold text-neutral-700 mb-6">Meditation Library</h2>
      
      {/* Timer Section */}
      <section className="mb-8">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-xl font-semibold text-neutral-700">Meditation Timer</CardTitle>
          </CardHeader>
          <CardContent>
            <MeditationTimer />
          </CardContent>
        </Card>
      </section>
      
      {/* Guided Meditations */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-heading text-xl font-semibold text-neutral-700">Guided Meditations</h3>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="sleep">Sleep</SelectItem>
              <SelectItem value="stress">Stress</SelectItem>
              <SelectItem value="focus">Focus</SelectItem>
              <SelectItem value="anxiety">Anxiety</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {guidedMeditations.map(meditation => (
            <MeditationCard
              key={meditation.id}
              title={meditation.title}
              category={meditation.category}
              description={meditation.description}
              duration={meditation.duration}
              imageUrl={meditation.imageUrl}
              onClick={() => console.log(`Starting meditation: ${meditation.title}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Meditation;
