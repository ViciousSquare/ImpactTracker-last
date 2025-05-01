import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/home";
import Leaderboard from "@/pages/leaderboard";
import SolutionFinder from "@/pages/solution-finder";
import OrganizationProfilePage from "@/pages/organization/[id]";
import MethodologyPage from "@/pages/methodology";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/solution-finder" component={SolutionFinder} />
      <Route path="/organization/:id" component={OrganizationProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
