import { Link } from "wouter";
import { useMindful } from "@/context/MindfulContext";
import { User, Activity, BookOpen, BarChart3 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

const Sidebar = () => {
  const { user, isLoading, stats } = useMindful();
  
  if (isLoading) {
    return (
      <aside className="hidden md:block w-64 mr-8">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center mb-6">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="ml-3 space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          
          <div className="mb-5 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-2.5 w-full rounded-full" />
            <Skeleton className="h-3 w-36" />
          </div>
          
          <div className="border-t border-neutral-200 pt-4 space-y-2">
            <Skeleton className="h-4 w-24" />
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        </div>
      </aside>
    );
  }
  
  if (!user) return null;
  
  const completedActivities = 2; // This would normally be calculated from state
  const totalActivities = 3;
  const progressPercentage = (completedActivities / totalActivities) * 100;
  
  return (
    <aside className="hidden md:block w-64 mr-8">
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center">
            <User className="h-6 w-6 text-neutral-500" />
          </div>
          <div className="ml-3">
            <p className="font-medium text-neutral-700">{user.displayName}</p>
            <p className="text-sm text-neutral-500">{user.streak}-day streak</p>
          </div>
        </div>
        
        <div className="mb-5">
          <h3 className="font-heading font-medium text-neutral-600 mb-3">Daily Progress</h3>
          <Progress value={progressPercentage} className="h-2.5 mb-1" />
          <p className="text-xs text-neutral-500">
            {completedActivities} of {totalActivities} daily activities completed
          </p>
        </div>

        <div className="border-t border-neutral-200 pt-4">
          <h3 className="font-heading font-medium text-neutral-600 mb-3">Quick Access</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/meditation">
                <a className="flex items-center text-neutral-600 hover:text-primary">
                  <Activity className="mr-2 h-4 w-4" />
                  <span>5-min Breathing</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/journal">
                <a className="flex items-center text-neutral-600 hover:text-primary">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Gratitude Journal</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/meditation">
                <a className="flex items-center text-neutral-600 hover:text-primary">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Body Scan</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
