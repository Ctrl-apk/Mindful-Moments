import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ExternalLink, FileText, Video, Headphones, Download, File } from 'lucide-react';

const ResourceCard = ({ resource, featured = false }) => {
  const { title, description, type, duration, imageUrl, contentUrl } = resource;
  
  // Type-specific color
  const getTypeColor = (type) => {
    switch (type?.toUpperCase()) {
      case 'ARTICLE':
        return 'bg-secondary-light/20 text-secondary-dark dark:bg-secondary-dark/30 dark:text-secondary-light';
      case 'VIDEO':
        return 'bg-accent-light/20 text-accent-dark dark:bg-accent-dark/30 dark:text-accent-light';
      case 'PODCAST':
        return 'bg-primary-light/20 text-primary-dark dark:bg-primary-dark/30 dark:text-primary-light';
      case 'DOWNLOAD':
        return 'bg-neutral-200 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };
  
  // Get appropriate icon based on content type
  const getTypeIcon = (type, size = 24) => {
    switch (type?.toUpperCase()) {
      case 'ARTICLE':
        return <FileText size={size} className="text-secondary-dark dark:text-secondary-light" />;
      case 'VIDEO':
        return <Video size={size} className="text-accent-dark dark:text-accent-light" />;
      case 'PODCAST':
        return <Headphones size={size} className="text-primary dark:text-primary-light" />;
      case 'DOWNLOAD':
        return <Download size={size} className="text-neutral-500 dark:text-neutral-300" />;
      default:
        return <File size={size} className="text-neutral-500 dark:text-neutral-300" />;
    }
  };
  
  const handleResourceOpen = () => {
    if (contentUrl) {
      window.open(contentUrl, '_blank', 'noopener,noreferrer');
    } else {
      // If no content URL is provided, open a default resource based on type
      const defaultUrls = {
        'ARTICLE': 'https://www.mindful.org/how-to-meditate/',
        'VIDEO': 'https://www.youtube.com/watch?v=inpok4MKVLM',
        'PODCAST': 'https://www.youtube.com/watch?v=ZToicYcHIOU',
        'DOWNLOAD': 'https://mindfulnessexercises.com/free-mindfulness-exercises/'
      };
      
      window.open(defaultUrls[type?.toUpperCase()] || 'https://www.mindful.org', '_blank', 'noopener,noreferrer');
    }
  };
  
  // Featured resource layout
  if (featured) {
    return (
      <Card className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm overflow-hidden border-0">
        <div className="md:flex">
          <div className="md:w-1/3 h-48 md:h-auto bg-primary-light/20 dark:bg-primary-dark/20">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                {getTypeIcon(type, 48)}
              </div>
            )}
          </div>
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-heading font-semibold text-lg text-neutral-700 dark:text-neutral-200">{title}</h4>
              <Badge className={getTypeColor(type)}>{type}</Badge>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4 line-clamp-3">{description}</p>
            <div className="flex justify-between items-center">
              {duration && (
                <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{duration}</span>
                </div>
              )}
              <Button 
                className="bg-primary hover:bg-primary-dark text-white dark:bg-primary-dark dark:hover:bg-primary font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
                onClick={handleResourceOpen}
              >
                <span className="mr-1">Open</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  
  // Default compact resource layout
  return (
    <Card className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-4 flex h-full border-0">
      <div className="w-16 h-16 rounded bg-secondary-light/20 dark:bg-secondary-dark/20 mr-4 flex-shrink-0 flex items-center justify-center">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover rounded" 
          />
        ) : (
          getTypeIcon(type, 24)
        )}
      </div>
      <div className="flex-grow flex flex-col">
        <div className="flex justify-between items-start">
          <h4 className="font-heading font-semibold text-neutral-700 dark:text-neutral-200 line-clamp-1">{title}</h4>
          <Badge className={getTypeColor(type)}>{type}</Badge>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 my-1 flex-grow line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mt-1">
          {duration && (
            <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400">
              <Clock className="mr-1 h-3 w-3" />
              <span>{duration}</span>
            </div>
          )}
          <Button 
            size="sm" 
            className="text-xs py-1 px-2 bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary text-white rounded"
            onClick={handleResourceOpen}
          >
            Open
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ResourceCard;