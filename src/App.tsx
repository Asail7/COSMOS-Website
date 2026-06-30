import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { LanguageProvider } from "./context/LanguageContext";
import { Layout } from "./components/Layout";

import Home from "./pages/Home";
import SolarSystem from "./pages/SolarSystem";
import PlanetDetail from "./pages/PlanetDetail";
import Galaxies from "./pages/Galaxies";
import Stars from "./pages/Stars";
import BlackHoles from "./pages/BlackHoles";
import Missions from "./pages/Missions";
import UniverseTimeline from "./pages/UniverseTimeline";
import Quiz from "./pages/Quiz";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/solar-system" component={SolarSystem} />
        <Route path="/planets/:id" component={PlanetDetail} />
        <Route path="/galaxies" component={Galaxies} />
        <Route path="/stars" component={Stars} />
        <Route path="/black-holes" component={BlackHoles} />
        <Route path="/missions" component={Missions} />
        <Route path="/universe-timeline" component={UniverseTimeline} />
        <Route path="/quiz" component={Quiz} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
