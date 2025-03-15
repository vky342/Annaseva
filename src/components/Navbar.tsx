
import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, Moon, Sun, X, Home, Package, Settings, User, History } from "lucide-react";
import { useTheme } from "@/store/ThemeContext";

const Navbar = ({ userType, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Memoize toggle handlers to prevent unnecessary re-renders
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const handleLogout = useCallback(() => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  }, [onLogout, navigate]);

  const handleLogoClick = useCallback((e) => {
    e.preventDefault();
    if (onLogout && userType) {
      onLogout();
    }
    navigate('/');
  }, [userType, onLogout, navigate]);

  // Close menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Add scroll listener with throttling to improve performance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        if (!isScrolled) setIsScrolled(true);
      } else {
        if (isScrolled) setIsScrolled(false);
      }
    };

    // Throttle scroll event for better performance
    let scrollTimeout;
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null;
        }, 100);
      }
    };

    window.addEventListener('scroll', throttledScroll);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isScrolled]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' 
        : 'bg-white dark:bg-gray-900'
      } border-b border-gray-200 dark:border-gray-800`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <a href="/" onClick={handleLogoClick} className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">Annaseva</span>
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full w-10 h-10"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-amber-300" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700" />
              )}
            </Button>
            
            {userType ? (
              // When user is logged in, show dashboard, donations, and logout
              <>
                <Link to={`/dashboard/${userType}`}>
                  <Button variant="ghost" className="rounded-full">Dashboard</Button>
                </Link>
                <Link to={userType === "restaurant" ? "/donations" : "/available-donations"}>
                  <Button variant="ghost" className="rounded-full">
                    {userType === "restaurant" ? "My Donations" : "Available Food"}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              // When user is NOT logged in, show login and register
              <>
                <Link to="/login">
                  <Button variant="ghost" className="rounded-full">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" className="bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-sm hover:shadow">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button 
            className="md:hidden rounded-full w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900" 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu - optimized rendering */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800 animate-fade-in">
            <div className="flex justify-end pb-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full w-9 h-9"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
            
            {userType ? (
              /* Logged-in Mobile Menu */
              <div className="grid grid-cols-2 gap-3 px-2">
                <Link to={`/dashboard/${userType}`}>
                  <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-lg border-gray-200 dark:border-gray-700">
                    <Home className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                    <span>Dashboard</span>
                  </Button>
                </Link>
                
                <Link to={userType === "restaurant" ? "/donations" : "/available-donations"}>
                  <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-lg border-gray-200 dark:border-gray-700">
                    <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <span>{userType === "restaurant" ? "My Donations" : "Available Food"}</span>
                  </Button>
                </Link>
                
                <Link to="/profile">
                  <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-lg border-gray-200 dark:border-gray-700">
                    <User className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    <span>Profile</span>
                  </Button>
                </Link>
                
                <Link to={userType === "restaurant" ? "/donations/history" : "/collection-history"}>
                  <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-lg border-gray-200 dark:border-gray-700">
                    <History className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    <span>{userType === "restaurant" ? "History" : "Collections"}</span>
                  </Button>
                </Link>
                
                <Link to="/settings">
                  <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-lg border-gray-200 dark:border-gray-700">
                    <Settings className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                    <span>Settings</span>
                  </Button>
                </Link>
                
                <Button
                  variant="outline"
                  className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-lg border-gray-200 dark:border-gray-700 text-red-600 dark:text-red-400"
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  <LogOut className="h-6 w-6" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              /* Non-logged-in Mobile Menu */
              <div className="flex flex-col space-y-3 px-2">
                <Link to="/login">
                  <Button variant="ghost" className="w-full justify-start rounded-lg">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" className="w-full justify-start bg-brand-600 hover:bg-brand-700 rounded-lg">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export { Navbar };
