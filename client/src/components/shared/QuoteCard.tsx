import { Quote } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface QuoteCardProps {
  quote: Quote | null;
  isLoading: boolean;
}

const QuoteCard = ({ quote, isLoading }: QuoteCardProps) => {
  if (isLoading) {
    return (
      <Card className="quote-card bg-white rounded-lg shadow-sm p-6 border-l-4 border-accent">
        <CardContent className="p-0">
          <div className="flex">
            <div className="text-4xl text-accent mr-4">"</div>
            <div className="w-full">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!quote) return null;

  return (
    <Card className="quote-card bg-white rounded-lg shadow-sm p-6 border-l-4 border-accent hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="flex">
          <div className="text-4xl text-accent mr-4">"</div>
          <div>
            <p className="text-neutral-600 italic mb-3">{quote.text}</p>
            <p className="text-neutral-500 font-medium text-sm">- {quote.author}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
