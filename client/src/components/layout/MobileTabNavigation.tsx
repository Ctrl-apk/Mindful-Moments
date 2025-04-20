import { Link, useLocation } from "wouter";
import { Calendar, Moon, BookOpen, Library } from "lucide-react";

const MobileTabNavigation = () => {
  const [location] = useLocation();

  return (
    <div className="md:hidden bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-10">
      <div className="flex overflow-x-auto whitespace-nowrap">
        <Link href="/">
          <a className={`flex-1 px-4 py-3 font-medium ${location === '/' ? 'text-primary border-b-2 border-primary' : 'text-neutral-500'}`}>
            <div className="flex flex-col items-center">
              <Calendar className="h-5 w-5" />
              <span className="text-xs mt-1">Today</span>
            </div>
          </a>
        </Link>
        
        <Link href="/meditation">
          <a className={`flex-1 px-4 py-3 font-medium ${location === '/meditation' ? 'text-primary border-b-2 border-primary' : 'text-neutral-500'}`}>
            <div className="flex flex-col items-center">
              <Moon className="h-5 w-5" />
              <span className="text-xs mt-1">Meditate</span>
            </div>
          </a>
        </Link>
        
        <Link href="/journal">
          <a className={`flex-1 px-4 py-3 font-medium ${location === '/journal' ? 'text-primary border-b-2 border-primary' : 'text-neutral-500'}`}>
            <div className="flex flex-col items-center">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs mt-1">Journal</span>
            </div>
          </a>
        </Link>
        
        <Link href="/resources">
          <a className={`flex-1 px-4 py-3 font-medium ${location === '/resources' ? 'text-primary border-b-2 border-primary' : 'text-neutral-500'}`}>
            <div className="flex flex-col items-center">
              <Library className="h-5 w-5" />
              <span className="text-xs mt-1">Resources</span>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MobileTabNavigation;
