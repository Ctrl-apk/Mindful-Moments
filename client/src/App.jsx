import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MindfulProvider } from "./context/MindfulContext";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/Home";
import Meditation from "@/pages/Meditation";
import Journal from "@/pages/Journal";
import Resources from "@/pages/Resources";
import Settings from "@/pages/Settings";

// Layout components
import Header from "@/components/layout/Header";
import MobileNavigation from "@/components/layout/MobileNavigation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/meditation" component={Meditation} />
      <Route path="/journal" component={Journal} />
      <Route path="/resources" component={Resources} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MindfulProvider>
        <TooltipProvider>
          <Toaster />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Router />
            </main>
            <MobileNavigation />
          </div>
        </TooltipProvider>
      </MindfulProvider>
    </QueryClientProvider>
  );
}

export default App;