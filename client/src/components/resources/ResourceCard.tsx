import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { Resource } from 'server';

interface ResourceCardProps {
  resource: Resource;
  featured?: boolean;
}

const ResourceCard = ({ resource, featured = false }: ResourceCardProps) => {
  const { title, description, type, duration, imageUrl } = resource;
  
  // Type-specific color
  const getTypeColor = (type: string) => {
    switch (type.toUpperCase()) {
      case 'ARTICLE':
        return 'bg-secondary-light/20 text-secondary-dark';
      case 'VIDEO':
        return 'bg-accent-light/20 text-accent-dark';
      case 'PODCAST':
        return 'bg-primary-light/20 text-primary-dark';
      case 'DOWNLOAD':
        return 'bg-neutral-200 text-neutral-500';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Featured resource layout
  if (featured) {
    return (
      <Card className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 h-48 md:h-auto bg-primary-light/20">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary-light/20">
                {type === 'ARTICLE' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                  </svg>
                ) : type === 'VIDEO' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-dark">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                  </svg>
                )}
              </div>
            )}
          </div>
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-heading font-semibold text-lg text-neutral-700">{title}</h4>
              <Badge className={getTypeColor(type)}>{type}</Badge>
            </div>
            <p className="text-neutral-600 mb-4">{description}</p>
            <div className="flex justify-between items-center">
              {duration && (
                <div className="flex items-center text-sm text-neutral-500">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{duration}</span>
                </div>
              )}
              <Button className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Read Now
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  
  // Default compact resource layout
  return (
    <Card className="bg-white rounded-lg shadow-sm p-4 flex h-full">
      <div className="w-16 h-16 rounded bg-secondary-light/20 mr-4 flex-shrink-0 flex items-center justify-center">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover rounded" 
          />
        ) : (
          type === 'ARTICLE' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary-dark">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
            </svg>
          ) : type === 'VIDEO' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-dark">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
            </svg>
          )
        )}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h4 className="font-heading font-semibold text-neutral-700">{title}</h4>
          <Badge className={getTypeColor(type)}>{type}</Badge>
        </div>
        <p className="text-sm text-neutral-600 my-1">{description}</p>
        {duration && (
          <div className="flex items-center text-xs text-neutral-500">
            <Clock className="mr-1 h-3 w-3" />
            <span>{duration}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ResourceCard;
