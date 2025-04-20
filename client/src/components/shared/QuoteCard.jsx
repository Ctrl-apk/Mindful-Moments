import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const QuoteCard = ({ quote, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-accent">
        <div className="flex">
          <div className="text-4xl text-accent mr-4">"</div>
          <div className="w-full">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-accent quote-card">
      <div className="flex">
        <div className="text-4xl text-accent mr-4">"</div>
        <div>
          <p className="text-lg text-neutral-700 mb-2">{quote?.text || 'Mindfulness isn\'t difficult, we just need to remember to do it.'}</p>
          <p className="text-sm text-neutral-500">— {quote?.author || 'Sharon Salzberg'}</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;