import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";
import Index from "./pages/Index";
import AIDetection from "./pages/AIDetection";
import NewsVerification from "./pages/NewsVerification";
import Education from "./pages/Education";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 750);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ai-detection" element={<AIDetection />} />
            <Route path="/news-verification" element={<NewsVerification />} />
            <Route path="/education" element={<Education />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="truthguard-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <AppContent />
        </HashRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
