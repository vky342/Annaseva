import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DonationProvider } from "./store/DonationContext";
import { ThemeProvider } from "./store/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";

// Configure React Query with better caching and error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      retryDelay: attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000)
    }
  }
});

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin"></div>
  </div>
);

// ScrollToTop component to handle scrolling to top on page changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  
  return null;
};

// Use lazy loading for components to improve initial load time
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const RestaurantDashboard = lazy(() => import("./pages/RestaurantDashboard"));
const NGODashboard = lazy(() => import("./pages/NGODashboard"));
const NewDonation = lazy(() => import("./pages/NewDonation"));
const DonationDetails = lazy(() => import("./pages/DonationDetails"));
const DonationsList = lazy(() => import("./pages/DonationsList"));
const DonationHistory = lazy(() => import("./pages/DonationHistory"));
const AvailableDonations = lazy(() => import("./pages/AvailableDonations"));
const CollectionHistory = lazy(() => import("./pages/CollectionHistory"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));

// New page imports for footer pages
const About = lazy(() => import("./pages/About"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const FAQs = lazy(() => import("./pages/FAQs"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

const App = () => {
  const [userType, setUserType] = useState<"restaurant" | "ngo" | null>(() => {
    const savedUserType = localStorage.getItem("userType");
    return (savedUserType === "restaurant" || savedUserType === "ngo") 
      ? savedUserType 
      : null;
  });

  useEffect(() => {
    if (userType) {
      localStorage.setItem("userType", userType);
    } else {
      localStorage.removeItem("userType");
    }
  }, [userType]);

  const handleLogout = () => {
    setUserType(null);
  };

  const handleLogin = (type: "restaurant" | "ngo") => {
    setUserType(type);
  };

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider>
            <DonationProvider>
              <BrowserRouter>
                <ScrollToTop />
                <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors duration-200 overflow-fix">
                  <Navbar userType={userType} onLogout={handleLogout} />
                  <div className="pt-16 flex-grow">
                    <ErrorBoundary>
                      <Suspense fallback={<PageLoader />}>
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route 
                            path="/login" 
                            element={<Login onLogin={handleLogin} />} 
                          />
                          <Route 
                            path="/register" 
                            element={<Register onRegister={setUserType} />} 
                          />
                          <Route path="/dashboard/restaurant" element={<RestaurantDashboard />} />
                          <Route path="/dashboard/ngo" element={<NGODashboard />} />
                          
                          <Route path="/donations/new" element={<NewDonation />} />
                          <Route path="/donations" element={<DonationsList />} />
                          <Route path="/donations/history" element={<DonationHistory />} />
                          <Route path="/donations/:id" element={<DonationDetails userType={userType} />} />
                          
                          <Route path="/available-donations" element={<AvailableDonations />} />
                          <Route path="/collection-history" element={<CollectionHistory />} />
                          
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/settings" element={<Settings />} />
                          
                          <Route path="/about" element={<About />} />
                          <Route path="/how-it-works" element={<HowItWorks />} />
                          <Route path="/faqs" element={<FAQs />} />
                          <Route path="/blog" element={<Blog />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/privacy" element={<Privacy />} />
                          <Route path="/terms" element={<Terms />} />
                          
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </Suspense>
                    </ErrorBoundary>
                  </div>
                  <Footer />
                  <Toaster />
                  <Sonner />
                </div>
              </BrowserRouter>
            </DonationProvider>
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
