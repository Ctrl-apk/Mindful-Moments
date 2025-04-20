import { useState } from 'react';
import { useMindful } from '@/context/MindfulContext';
import { Button } from '@/components/ui/button';
import { Frown, Meh, Smile, Sun, AlertCircle } from 'lucide-react';

interface MoodSelectorProps {
  onSelect: (mood: string) => void;
  initialMood?: string;
}

const MoodSelector = ({ onSelect, initialMood }: MoodSelectorProps) => {
  const [selectedMood, setSelectedMood] = useState(initialMood || '');
  const { updateMood } = useMindful();
  
  const moods = [
    { id: 'low', label: 'Low', icon: Frown, hoverClass: 'hover:bg-error/20', activeClass: 'bg-error/20' },
    { id: 'neutral', label: 'Neutral', icon: Meh, hoverClass: 'hover:bg-neutral-200', activeClass: 'bg-neutral-200' },
    { id: 'good', label: 'Good', icon: Smile, hoverClass: 'hover:bg-primary-light/30', activeClass: 'bg-primary-light/30' },
    { id: 'great', label: 'Great', icon: Sun, hoverClass: 'hover:bg-accent-light/30', activeClass: 'bg-accent-light/30' }
  ];
  
  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    onSelect(mood);
    updateMood(mood);
  };
  
  return (
    <div className="flex justify-between max-w-md mx-auto">
      {moods.map(({ id, label, icon: Icon, hoverClass, activeClass }) => (
        <Button 
          key={id}
          variant="ghost"
          className="flex flex-col items-center bg-transparent hover:bg-transparent"
          onClick={() => handleMoodSelect(id)}
        >
          <div className={`w-14 h-14 rounded-full bg-neutral-100 ${hoverClass} flex items-center justify-center mb-2 transition-colors ${selectedMood === id ? activeClass : ''}`}>
            <Icon className={`text-2xl ${
              selectedMood === id 
                ? id === 'low' 
                  ? 'text-error' 
                  : id === 'neutral' 
                    ? 'text-neutral-500' 
                    : id === 'good' 
                      ? 'text-primary' 
                      : 'text-accent-dark'
                : 'text-neutral-500'
            }`} />
          </div>
          <span className="text-sm text-neutral-600">{label}</span>
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;
