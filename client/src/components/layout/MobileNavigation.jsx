import React from "react";
import { Link, useLocation } from "wouter";
import { Calendar, Moon, BookOpen, Library } from "lucide-react";

const MobileNavigation = () => {
  const [location] = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-10">
      <div className="flex items-center justify-around">
        <Link href="/">
          <a className={`flex flex-col items-center py-2 px-4 ${location === '/' ? 'text-primary' : 'text-neutral-500'}`}>
            <Calendar className="h-5 w-5" />
            <span className="text-xs mt-1">Today</span>
          </a>
        </Link>
        
        <Link href="/meditation">
          <a className={`flex flex-col items-center py-2 px-4 ${location === '/meditation' ? 'text-primary' : 'text-neutral-500'}`}>
            <Moon className="h-5 w-5" />
            <span className="text-xs mt-1">Meditate</span>
          </a>
        </Link>
        
        <Link href="/journal">
          <a className={`flex flex-col items-center py-2 px-4 ${location === '/journal' ? 'text-primary' : 'text-neutral-500'}`}>
            <BookOpen className="h-5 w-5" />
            <span className="text-xs mt-1">Journal</span>
          </a>
        </Link>
        
        <Link href="/resources">
          <a className={`flex flex-col items-center py-2 px-4 ${location === '/resources' ? 'text-primary' : 'text-neutral-500'}`}>
            <Library className="h-5 w-5" />
            <span className="text-xs mt-1">Resources</span>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavigation;