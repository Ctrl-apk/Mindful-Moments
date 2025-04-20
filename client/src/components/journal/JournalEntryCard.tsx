import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { JournalEntry } from 'server';
import { formatDistanceToNow } from 'date-fns';
import { MoreVertical, Edit, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface JournalEntryCardProps {
  entry: JournalEntry;
  onEdit?: (entry: JournalEntry) => void;
  onDelete?: (id: number) => void;
}

const JournalEntryCard = ({ entry, onEdit, onDelete }: JournalEntryCardProps) => {
  const { id, title, content, mood, date, tags } = entry;
  
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const formattedTime = new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  });
  
  const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
  
  // Determine mood style
  const getMoodStyle = (mood: string) => {
    switch (mood.toLowerCase()) {
      case 'great':
        return 'bg-accent-light/30 text-accent-dark';
      case 'good':
        return 'bg-primary-light/30 text-primary-dark';
      case 'neutral':
        return 'bg-neutral-200 text-neutral-600';
      case 'low':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };
  
  // Get mood icon
  const getMoodIcon = (mood: string) => {
    switch (mood.toLowerCase()) {
      case 'great':
        return '😃';
      case 'good':
        return '🙂';
      case 'neutral':
        return '😐';
      case 'low':
        return '😔';
      default:
        return '😶';
    }
  };
  
  return (
    <Card className={`bg-white rounded-lg shadow-sm p-5 mb-4 border-l-4 ${
      mood === 'great' ? 'border-accent' :
      mood === 'good' ? 'border-primary' :
      mood === 'neutral' ? 'border-gray-300' :
      'border-red-300'
    }`}>
      <CardContent className="p-0">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-heading font-semibold text-neutral-700">{title}</h4>
            <p className="text-sm text-neutral-500">{formattedDate} • {formattedTime} ({timeAgo})</p>
          </div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full ${getMoodStyle(mood)} flex items-center justify-center mr-2`}>
              {getMoodIcon(mood)}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-neutral-600">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit && onEdit(entry)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete && onDelete(id)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <p className="text-neutral-600 mb-4">{content}</p>
        
        {tags && tags.length > 0 && (
          <div className="flex items-center text-sm flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className={
                  index % 2 === 0 
                    ? 'bg-primary-light/20 text-primary-dark hover:bg-primary-light/30' 
                    : 'bg-secondary-light/20 text-secondary-dark hover:bg-secondary-light/30'
                }
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JournalEntryCard;
