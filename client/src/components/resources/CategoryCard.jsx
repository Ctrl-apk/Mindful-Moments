import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Book, Video, Mic, Download, File } from 'lucide-react';

const CategoryCard = ({ type, count, onClick }) => {
  // Define category-specific properties
  const categories = {
    ARTICLE: {
      label: 'Articles',
      bgColor: 'bg-primary-light/10 hover:bg-primary-light/20 dark:bg-primary-dark/10 dark:hover:bg-primary-dark/20',
      iconBgColor: 'bg-primary-light/30 dark:bg-primary-dark/30',
      textColor: 'text-primary dark:text-primary-light',
      Icon: Book
    },
    VIDEO: {
      label: 'Videos',
      bgColor: 'bg-secondary-light/10 hover:bg-secondary-light/20 dark:bg-secondary-dark/10 dark:hover:bg-secondary-dark/20',
      iconBgColor: 'bg-secondary-light/30 dark:bg-secondary-dark/30',
      textColor: 'text-secondary-dark dark:text-secondary-light',
      Icon: Video
    },
    PODCAST: {
      label: 'Podcasts',
      bgColor: 'bg-accent-light/10 hover:bg-accent-light/20 dark:bg-accent-dark/10 dark:hover:bg-accent-dark/20',
      iconBgColor: 'bg-accent-light/30 dark:bg-accent-dark/30',
      textColor: 'text-accent-dark dark:text-accent-light',
      Icon: Mic
    },
    DOWNLOAD: {
      label: 'Downloads',
      bgColor: 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700',
      iconBgColor: 'bg-neutral-200 dark:bg-neutral-700',
      textColor: 'text-neutral-500 dark:text-neutral-400',
      Icon: Download
    }
  };
  
  // Default fallback if type is not found
  const defaultCategory = {
    label: type ? `${type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}s` : 'Resources',
    bgColor: 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700',
    iconBgColor: 'bg-neutral-200 dark:bg-neutral-700',
    textColor: 'text-neutral-500 dark:text-neutral-400',
    Icon: File
  };
  
  const { label, bgColor, iconBgColor, textColor, Icon } = categories[type] || defaultCategory;
  
  return (
    <Card 
      className={`${bgColor} rounded-lg p-4 text-center cursor-pointer transition-colors border-0 shadow-sm`}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className={`w-12 h-12 rounded-full ${iconBgColor} flex items-center justify-center mx-auto mb-3`}>
          <Icon className={`h-6 w-6 ${textColor}`} />
        </div>
        <h3 className="font-heading font-medium text-neutral-700 dark:text-neutral-200">{label}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{count} resources</p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;