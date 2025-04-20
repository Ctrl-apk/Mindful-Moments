import { Link, useLocation } from "wouter";
import { useMindful } from "@/context/MindfulContext";
import { Bell, Leaf, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Header = () => {
  const [location] = useLocation();
  const { user, isLoading } = useMindful();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            <Leaf className="h-5 w-5" />
          </div>
          <h1 className="font-heading ml-2 text-xl font-semibold text-neutral-600">MindfulMe</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/">
            <a className={`font-medium ${location === '/' ? 'text-primary' : 'text-neutral-600 hover:text-primary'}`}>
              Today
            </a>
          </Link>
          <Link href="/meditation">
            <a className={`font-medium ${location === '/meditation' ? 'text-primary' : 'text-neutral-600 hover:text-primary'}`}>
              Meditation
            </a>
          </Link>
          <Link href="/journal">
            <a className={`font-medium ${location === '/journal' ? 'text-primary' : 'text-neutral-600 hover:text-primary'}`}>
              Journal
            </a>
          </Link>
          <Link href="/resources">
            <a className={`font-medium ${location === '/resources' ? 'text-primary' : 'text-neutral-600 hover:text-primary'}`}>
              Resources
            </a>
          </Link>
        </div>
        
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="p-2 rounded-full hover:bg-neutral-100">
            <Bell className="h-5 w-5 text-neutral-500" />
          </Button>
          
          {isLoading ? (
            <Skeleton className="ml-3 w-8 h-8 rounded-full" />
          ) : (
            <Link href="/settings">
              <a className="ml-3">
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center hover:bg-neutral-300 transition-colors">
                  <User className="h-4 w-4 text-neutral-500" />
                </div>
              </a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
