import { Link } from "wouter";
import { useMindful } from "@/context/MindfulContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import QuoteCard from "@/components/shared/QuoteCard";
import Sidebar from "@/components/layout/Sidebar";
import { Leaf, ChevronRight, Timer, BookOpen, Sun, ArrowUp, Minus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const { 
    quotes, 
    user, 
    isLoading, 
    stats, 
    resources
  } = useMindful();
  
  // Function to render mood trend chart
  const renderMoodChart = () => {
    const weekdays = stats.mood.weeklyData;
    
    return (
      <div className="flex items-center justify-between space-x-1">
        {weekdays.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={`h-${day.value} w-6 ${
                day.mood === 'neutral' ? 'bg-neutral-300' :
                day.mood === 'medium' ? 'bg-primary-light/50' :
                day.mood === 'good' ? 'bg-primary-light/70' :
                day.mood === 'great' ? 'bg-primary' :
                'bg-neutral-300'
              } rounded-full mb-1`}
              style={{ height: `${day.value * 4}px` }}
            ></div>
            <span className="text-xs text-neutral-500">{day.date}</span>
          </div>
        ))}
      </div>
    );
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 md:flex">
        <Sidebar />
        <div className="flex-1">
          <section className="mb-8">
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="h-40 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                  <Skeleton className="w-12 h-12 rounded-full" />
                </div>
                <Skeleton className="h-10 w-40 mt-4" />
              </div>
            </div>
          </section>
          
          {/* Skeleton for stats section */}
          <section className="mb-8">
            <Skeleton className="h-8 w-36 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-5">
                  <div className="flex justify-between items-start mb-3">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="w-10 h-10 rounded-full" />
                  </div>
                  <Skeleton className="h-8 w-20 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </section>
          
          {/* Skeleton for recommendations */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-40 bg-secondary-light/30"></div>
                  <div className="p-4">
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4 mb-3" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Skeleton for quote */}
          <section>
            <Skeleton className="h-8 w-36 mb-4" />
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
          </section>
        </div>
      </div>
    );
  }
  
  if (!user) return null;
  
  return (
    <>
      <div className="md:hidden bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-10">
        <div className="flex overflow-x-auto whitespace-nowrap">
          <button className="flex-1 px-4 py-3 text-primary border-b-2 border-primary font-medium">
            <div className="flex flex-col items-center">
              <Calendar className="h-5 w-5" />
              <span className="text-xs mt-1">Today</span>
            </div>
          </button>
          <Link href="/meditation">
            <a className="flex-1 px-4 py-3 text-neutral-500 font-medium">
              <div className="flex flex-col items-center">
                <Moon className="h-5 w-5" />
                <span className="text-xs mt-1">Meditate</span>
              </div>
            </a>
          </Link>
          <Link href="/journal">
            <a className="flex-1 px-4 py-3 text-neutral-500 font-medium">
              <div className="flex flex-col items-center">
                <BookOpen className="h-5 w-5" />
                <span className="text-xs mt-1">Journal</span>
              </div>
            </a>
          </Link>
          <Link href="/resources">
            <a className="flex-1 px-4 py-3 text-neutral-500 font-medium">
              <div className="flex flex-col items-center">
                <Library className="h-5 w-5" />
                <span className="text-xs mt-1">Resources</span>
              </div>
            </a>
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6 md:flex">
        <Sidebar />
        
        <div className="flex-1">
          {/* Today's Focus */}
          <section className="mb-8">
            <h2 className="font-heading text-2xl font-semibold text-neutral-700 mb-4">Today's Focus</h2>
            <Card className="bg-white rounded-lg shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-primary">DAILY MINDFULNESS</p>
                      <h3 className="font-heading text-xl font-semibold mt-1 mb-2">Mindful Breathing</h3>
                      <p className="text-neutral-600 mb-4">Take 5 minutes to center yourself with this guided breathing exercise.</p>
                    </div>
                    <div className="bg-primary-light/20 rounded-full p-3">
                      <Leaf className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <Link href="/meditation">
                    <a>
                      <Button className="bg-primary hover:bg-primary-dark text-white font-medium py-2.5 px-4 rounded-lg transition-colors w-full md:w-auto">
                        Start Exercise
                      </Button>
                    </a>
                  </Link>
                </div>
                <div className="bg-neutral-100 px-6 py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <Timer className="h-4 w-4 text-neutral-500 mr-1" />
                    <span className="text-sm text-neutral-500">5 minutes</span>
                  </div>
                  <div className="flex items-center">
                    <button className="text-neutral-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Mindfulness Stats */}
          <section className="mb-8">
            <h2 className="font-heading text-2xl font-semibold text-neutral-700 mb-4">Your Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white rounded-lg shadow-sm p-5">
                <CardContent className="p-0">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-heading font-semibold text-neutral-600">Meditation</h3>
                    <div className="bg-primary-light/20 rounded-full p-2">
                      <Moon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-neutral-700 mb-1">
                    {stats.meditation.totalMinutes}<span className="text-lg font-normal"> mins</span>
                  </p>
                  <p className="text-sm text-neutral-500">This week</p>
                  <div className="mt-3 flex items-center text-success text-sm">
                    <ArrowUp className="h-4 w-4" />
                    <span className="ml-1">{stats.meditation.percentChange}% from last week</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white rounded-lg shadow-sm p-5">
                <CardContent className="p-0">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-heading font-semibold text-neutral-600">Journal Entries</h3>
                    <div className="bg-secondary-light/20 rounded-full p-2">
                      <BookOpen className="h-5 w-5 text-secondary-dark" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-neutral-700 mb-1">
                    {stats.journal.totalEntries}
                  </p>
                  <p className="text-sm text-neutral-500">This week</p>
                  <div className="mt-3 flex items-center text-neutral-500 text-sm">
                    <Minus className="h-4 w-4" />
                    <span className="ml-1">Same as last week</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white rounded-lg shadow-sm p-5">
                <CardContent className="p-0">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-heading font-semibold text-neutral-600">Mood Trend</h3>
                    <div className="bg-accent-light/20 rounded-full p-2">
                      <Sun className="h-5 w-5 text-accent-dark" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-neutral-700 mb-1">{stats.mood.trend}</p>
                  <p className="text-sm text-neutral-500">Overall trend</p>
                  <div className="mt-3">
                    {renderMoodChart()}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Recommended For You */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-heading text-2xl font-semibold text-neutral-700">Recommended For You</h2>
              <Link href="/resources">
                <a className="text-primary font-medium text-sm flex items-center">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.recommended.map((resource) => (
                <Card key={resource.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-40 bg-secondary-light/30 relative">
                    {resource.imageUrl ? (
                      <img 
                        src={resource.imageUrl} 
                        alt={resource.title} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full bg-primary-light/30 flex items-center justify-center">
                        {resource.type === 'ARTICLE' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                            <polygon points="23 7 16 12 23 17 23 7"></polygon>
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                          </svg>
                        )}
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                      <span className="text-white text-sm font-medium">{resource.type}</span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-heading font-semibold text-lg mb-2">{resource.title}</h3>
                    <p className="text-neutral-600 text-sm mb-3">{resource.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-500 flex items-center">
                        <Timer className="mr-1 h-4 w-4" />
                        {resource.duration}
                      </span>
                      <Button className="bg-primary hover:bg-primary-dark text-white text-sm py-1.5 px-3 rounded-lg transition-colors">
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Quote of the Day */}
          <section>
            <h2 className="font-heading text-2xl font-semibold text-neutral-700 mb-4">Daily Wisdom</h2>
            <QuoteCard quote={quotes.dailyQuote} isLoading={quotes.isLoading} />
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
