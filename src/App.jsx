import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Slider from "./components/slider";
import Production from "./components/production";
import GeneralMovieList from "./components/general-movie-list";
import Footer from "./components/Footer";
import SearchPage from "./components/search-page";
import WatchlistPage from "./components/watchlist-page";
import { WatchlistProvider } from "./components/watchlist-context";
import {
  AppContextProvider,
  useAppContext,
} from "./components/app-context-provider";
import EmailCapture from "./components/email-capture";
import SubscribePage from "./components/subscribe-page";
import PricingPage from "./components/price-page";
import LoginPage from "./components/login-page";
import movieCacheService from "./services/movie-cache-service";

// Enhanced Storage Service for Auth State
class AuthStorageService {
  constructor() {
    this.AUTH_KEY = "app_auth_state";
    this.EMAIL_KEY = "app_user_email";
    this.PLAN_KEY = "app_selected_plan";
  }

  saveAuthState(isAuthenticated, email = "", plan = "") {
    try {
      sessionStorage.setItem(this.AUTH_KEY, isAuthenticated.toString());
      if (email) sessionStorage.setItem(this.EMAIL_KEY, email);
      if (plan) sessionStorage.setItem(this.PLAN_KEY, plan);
    } catch (error) {
      console.warn("Failed to save auth state:", error);
    }
  }

  loadAuthState() {
    try {
      const isAuthenticated = sessionStorage.getItem(this.AUTH_KEY) === "true";
      const email = sessionStorage.getItem(this.EMAIL_KEY) || "";
      const plan = sessionStorage.getItem(this.PLAN_KEY) || "";

      return { isAuthenticated, email, plan };
    } catch (error) {
      console.warn("Failed to load auth state:", error);
      return { isAuthenticated: false, email: "", plan: "" };
    }
  }

  clearAuthState() {
    try {
      sessionStorage.removeItem(this.AUTH_KEY);
      sessionStorage.removeItem(this.EMAIL_KEY);
      sessionStorage.removeItem(this.PLAN_KEY);
    } catch (error) {
      console.warn("Failed to clear auth state:", error);
    }
  }
}

const authStorage = new AuthStorageService();

// HomePage Component
function HomePage() {
  const { preloadHomePageData, homePageLoaded, isInitialLoading } =
    useAppContext();

  useEffect(() => {
    // Load data using the enhanced preloadHomePageData which handles caching
    preloadHomePageData();
  }, [preloadHomePageData]);

  return (
    <>
      <Slider />
      <Production />
      <div id="movie-list-section">
        <GeneralMovieList />
      </div>
      <Footer />
    </>
  );
}

// LoadingPage Component
function LoadingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Loading Movies...</h2>
        <p className="text-gray-400">Please wait a few seconds</p>
      </div>
    </div>
  );
}

// WatchPage Component
function WatchPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Watch Movie</h1>
        <p>Movie player will be displayed here</p>
      </div>
    </div>
  );
}

// NotFoundPage Component
function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl">Page not found</p>
      </div>
    </div>
  );
}

// PricingPageWrapper Component
function PricingPageWrapper() {
  const navigate = useNavigate();

  const handleBackToMain = () => {
    navigate("/");
  };

  const handlePlanSelect = (plan) => {
    console.log("Selected plan:", plan);
    navigate("/");
  };

  return (
    <PricingPage
      onPlanSelect={handlePlanSelect}
      onBackToMain={handleBackToMain}
      showBackButton={true}
    />
  );
}

// AppRoutes
function AppRoutes() {
  const location = useLocation();
  const { homePageLoaded, isInitialLoading } = useAppContext();

  // Check if we have cached data to determine loading state
  const shouldShowLoading =
    location.pathname === "/" && !homePageLoaded && isInitialLoading;

  if (shouldShowLoading) {
    return <LoadingPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<Navigate to="/" replace />} />
      <Route path="/watch/:id" element={<WatchPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/watchlist" element={<WatchlistPage />} />
      <Route path="/subscription" element={<PricingPageWrapper />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

// AuthWrapper - Enhanced version with improved storage
function AuthWrapper({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authStep, setAuthStep] = useState("login");
  const [userEmail, setUserEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize movie cache and auth state on mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize movie cache service
        await movieCacheService.init();

        // Load auth state
        const authState = authStorage.loadAuthState();
        setIsAuthenticated(authState.isAuthenticated);
        setUserEmail(authState.email);
        setSelectedPlan(authState.plan);

        // Set initial auth step
        if (!authState.isAuthenticated) {
          setAuthStep(authState.email ? "login" : "email");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing app:", error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Handle email submission from EmailCapture
  const handleEmailSubmit = (email) => {
    setUserEmail(email);
    setAuthStep("login");
    authStorage.saveAuthState(false, email);
  };

  // Handle plan selection
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setAuthStep("subscribe");
    authStorage.saveAuthState(false, userEmail, plan);
  };

  // Handle subscription completion
  const handleSubscribeComplete = () => {
    setIsAuthenticated(true);
    authStorage.saveAuthState(true, userEmail, selectedPlan);
    navigate("/");
  };

  // Handle login from LoginPage
  const handleLogin = () => {
    setIsAuthenticated(true);
    authStorage.saveAuthState(true, userEmail, selectedPlan);
    navigate("/");
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
    setSelectedPlan("");
    setAuthStep("login");

    // Clear auth state
    authStorage.clearAuthState();

    navigate("/");
  };

  // Handle subscription navigation from Header
  const handleSubscriptionNavigate = () => {
    navigate("/subscription");
  };

  // Function to handle scroll to movie list
  const handleScrollToMovieList = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const movieListElement = document.getElementById("movie-list-section");
        if (movieListElement) {
          movieListElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } else {
      const movieListElement = document.getElementById("movie-list-section");
      if (movieListElement) {
        movieListElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  // If user is not authenticated, show auth flow
  if (!isAuthenticated) {
    switch (authStep) {
      case "email":
        return (
          <EmailCapture
            onEmailSubmit={handleEmailSubmit}
            initialEmail={userEmail}
          />
        );
      case "pricing":
        return (
          <PricingPage
            onPlanSelect={handlePlanSelect}
            userEmail={userEmail}
            selectedPlan={selectedPlan}
          />
        );
      case "subscribe":
        return (
          <SubscribePage
            onSubscribeComplete={handleSubscribeComplete}
            userEmail={userEmail}
            selectedPlan={selectedPlan}
          />
        );
      case "login":
      default:
        return (
          <LoginPage
            onLogin={handleLogin}
            userEmail={userEmail}
            selectedPlan={selectedPlan}
          />
        );
    }
  }

  // If authenticated, show main app with header
  return (
    <>
      <Header
        onLogout={handleLogout}
        onScrollToMovieList={handleScrollToMovieList}
        onSubscriptionNavigate={handleSubscriptionNavigate}
        userEmail={userEmail}
      />
      {children}
    </>
  );
}

// AppContent (inside Providers)
function AppContent() {
  return (
    <AppContextProvider>
      <WatchlistProvider>
        <AuthWrapper>
          <AppRoutes />
        </AuthWrapper>
      </WatchlistProvider>
    </AppContextProvider>
  );
}

// Final Exported App
function App() {
  return <AppContent />;
}

export default App;
