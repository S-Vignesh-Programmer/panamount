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

// Auth storage utility
class AuthStorageService {
  constructor() {
    this.AUTH_KEY = "app_auth_state";
    this.EMAIL_KEY = "app_user_email";
    this.PLAN_KEY = "app_selected_plan";
  }

  saveAuthState(isAuthenticated, email = "", plan = "") {
    try {
      localStorage.setItem(this.AUTH_KEY, isAuthenticated.toString());
      if (email) localStorage.setItem(this.EMAIL_KEY, email);
      if (plan) localStorage.setItem(this.PLAN_KEY, plan);
    } catch (error) {
      console.warn("Failed to save auth state:", error);
    }
  }

  loadAuthState() {
    try {
      const isAuthenticated = localStorage.getItem(this.AUTH_KEY) === "true";
      const email = localStorage.getItem(this.EMAIL_KEY) || "";
      const plan = localStorage.getItem(this.PLAN_KEY) || "";
      return { isAuthenticated, email, plan };
    } catch (error) {
      console.warn("Failed to load auth state:", error);
      return { isAuthenticated: false, email: "", plan: "" };
    }
  }

  clearAuthState() {
    try {
      localStorage.removeItem(this.AUTH_KEY);
      localStorage.removeItem(this.EMAIL_KEY);
      localStorage.removeItem(this.PLAN_KEY);
    } catch (error) {
      console.warn("Failed to clear auth state:", error);
    }
  }
}

const authStorage = new AuthStorageService();

function HomePage() {
  const { preloadHomePageData, homePageLoaded, isInitialLoading } =
    useAppContext();

  useEffect(() => {
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

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Page not found</p>
        <button
          onClick={() => navigate("/", { replace: true })}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

function PricingPageWrapper() {
  const navigate = useNavigate();

  return (
    <PricingPage
      onPlanSelect={(plan) => {
        console.log("Selected plan:", plan);
        navigate("/");
      }}
      onBackToMain={() => navigate("/")}
      showBackButton={true}
    />
  );
}

function AppRoutes() {
  const location = useLocation();
  const { homePageLoaded, isInitialLoading } = useAppContext();

  const shouldShowLoading =
    location.pathname === "/" && !homePageLoaded && isInitialLoading;

  if (shouldShowLoading) return <LoadingPage />;

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

function AuthWrapper({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authStep, setAuthStep] = useState("login");
  const [userEmail, setUserEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await movieCacheService.init();
        const authState = authStorage.loadAuthState();
        setIsAuthenticated(authState.isAuthenticated);
        setUserEmail(authState.email);
        setSelectedPlan(authState.plan);

        if (!authState.isAuthenticated) {
          setAuthStep(authState.email ? "login" : "email");
        }
      } catch (error) {
        console.error("Error initializing app:", error);
        setIsAuthenticated(false);
        setAuthStep("login");
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) return <LoadingPage />;

  if (!isAuthenticated) {
    switch (authStep) {
      case "email":
        return (
          <EmailCapture
            onEmailSubmit={(email) => {
              setUserEmail(email);
              setAuthStep("login");
              authStorage.saveAuthState(false, email);
            }}
            initialEmail={userEmail}
          />
        );
      case "pricing":
        return (
          <PricingPage
            onPlanSelect={(plan) => {
              setSelectedPlan(plan);
              setAuthStep("subscribe");
              authStorage.saveAuthState(false, userEmail, plan);
            }}
            userEmail={userEmail}
            selectedPlan={selectedPlan}
          />
        );
      case "subscribe":
        return (
          <SubscribePage
            onSubscribeComplete={() => {
              setIsAuthenticated(true);
              authStorage.saveAuthState(true, userEmail, selectedPlan);
              navigate("/");
            }}
            userEmail={userEmail}
            selectedPlan={selectedPlan}
          />
        );
      case "login":
      default:
        return (
          <LoginPage
            onLogin={() => {
              setIsAuthenticated(true);
              authStorage.saveAuthState(true, userEmail, selectedPlan);
              navigate("/");
            }}
            userEmail={userEmail}
            selectedPlan={selectedPlan}
          />
        );
    }
  }

  return (
    <>
      <Header
        onLogout={() => {
          setIsAuthenticated(false);
          setUserEmail("");
          setSelectedPlan("");
          setAuthStep("login");
          authStorage.clearAuthState();
          navigate("/");
        }}
        onScrollToMovieList={() => {
          if (window.location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
              document
                .getElementById("movie-list-section")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
          } else {
            document
              .getElementById("movie-list-section")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
        onSubscriptionNavigate={() => navigate("/subscription")}
        userEmail={userEmail}
      />
      {children}
    </>
  );
}

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

// ✅ FINAL App function (no <BrowserRouter> here!)
function App() {
  return <AppContent />;
}

export default App;
