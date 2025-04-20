import { Card, CardContent } from '@/components/ui/card';
import { Book, Video, Mic, Download } from 'lucide-react';

interface CategoryCardProps {
  type: 'ARTICLE' | 'VIDEO' | 'PODCAST' | 'DOWNLOAD';
  count: number;
  onClick?: () => void;
}

const CategoryCard = ({ type, count, onClick }: CategoryCardProps) => {
  // Define category-specific properties
  const categories = {
    ARTICLE: {
      label: 'Articles',
      bgColor: 'bg-primary-light/10 hover:bg-primary-light/20',
      iconBgColor: 'bg-primary-light/30',
      textColor: 'text-primary',
      Icon: Book
    },
    VIDEO: {
      label: 'Videos',
      bgColor: 'bg-secondary-light/10 hover:bg-secondary-light/20',
      iconBgColor: 'bg-secondary-light/30',
      textColor: 'text-secondary-dark',
      Icon: Video
    },
    PODCAST: {
      label: 'Podcasts',
      bgColor: 'bg-accent-light/10 hover:bg-accent-light/20',
      iconBgColor: 'bg-accent-light/30',
      textColor: 'text-accent-dark',
      Icon: Mic
    },
    DOWNLOAD: {
      label: 'Downloads',
      bgColor: 'bg-neutral-100 hover:bg-neutral-200',
      iconBgColor: 'bg-neutral-200',
      textColor: 'text-neutral-500',
      Icon: Download
    }
  };
  
  const { label, bgColor, iconBgColor, textColor, Icon } = categories[type];
  
  return (
    <Card 
      className={`${bgColor} rounded-lg p-4 text-center cursor-pointer transition-colors`}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className={`w-12 h-12 rounded-full ${iconBgColor} flex items-center justify-center mx-auto mb-3`}>
          <Icon className={`text-xl ${textColor}`} />
        </div>
        <h3 className="font-heading font-medium text-neutral-700">{label}</h3>
        <p className="text-sm text-neutral-500 mt-1">{count} resources</p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
