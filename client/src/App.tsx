import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/home";
import Leaderboard from "@/pages/leaderboard";
import SolutionFinder from "@/pages/solution-finder";
import OrganizationProfilePage from "@/pages/organization/[id]";
import MethodologyPage from "@/pages/methodology";
import AboutPage from "@/pages/about";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/solution-finder" component={SolutionFinder} />
      <Route path="/methodology" component={MethodologyPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/organization/:id" component={OrganizationProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Router />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
