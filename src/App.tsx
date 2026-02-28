import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu";
import Register from "./pages/Register";
import SelectPilot from "./pages/SelectPilot";
import ChapterSelect from "./pages/ChapterSelect";
import LevelSelect from "./pages/LevelSelect";
import Gameplay from "./pages/Gameplay";
import FreeTyping from "./pages/FreeTyping";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/register" element={<Register />} />
          <Route path="/select-pilot" element={<SelectPilot />} />
          <Route path="/chapters" element={<ChapterSelect />} />
          <Route path="/levels/:chapterId" element={<LevelSelect />} />
          <Route path="/play/:chapterId/:levelId" element={<Gameplay />} />
          <Route path="/free-typing" element={<FreeTyping />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
