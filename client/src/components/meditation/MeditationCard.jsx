import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Play, Clock } from "lucide-react";

const MeditationCard = ({
  title,
  category,
  description,
  duration,
  imageUrl,
  onClick
}) => {
  const categoryColors = {
    'NATURE': 'bg-secondary-light/30 text-secondary-dark',
    'FOCUS': 'bg-primary-light/30 text-primary-dark',
    'SLEEP': 'bg-accent-light/30 text-accent-dark',
    'STRESS': 'bg-red-100 text-red-800',
    'ANXIETY': 'bg-blue-100 text-blue-800',
    'BEGINNER': 'bg-purple-100 text-purple-800'
  };
  
  const categoryColor = categoryColors[category.toUpperCase()] || 'bg-gray-100 text-gray-800';
  
  return (
    <Card className="bg-white rounded-lg shadow-sm overflow-hidden h-full flex flex-col">
      <div className="h-40 bg-primary-light/20 relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary-light/20">
            <Play className="h-8 w-8 text-secondary" />
          </div>
        )}
        <button 
          className="absolute inset-0 m-auto w-12 h-12 bg-white/80 rounded-full shadow flex items-center justify-center"
          onClick={onClick}
        >
          <Play className="text-primary h-5 w-5" />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-heading font-semibold">{title}</h4>
          <Badge className={categoryColor}>{category}</Badge>
        </div>
        <p className="text-neutral-600 text-sm mb-3 flex-grow">{description}</p>
        <div className="flex items-center text-sm text-neutral-500">
          <Clock className="mr-1 h-4 w-4" />
          <span>{duration}</span>
        </div>
      </div>
    </Card>
  );
};

export default MeditationCard;