import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  authService,
  UserProfile,
  LoginData,
  RegisterData,
} from "../services/authService";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginData) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          // Try to get current user from API
          const currentUser = await authService.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
          } else {
            // If API call fails, try to get from localStorage
            const storedUser = authService.getStoredUser();
            setUser(storedUser);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        // If there's an error, clear auth state
        await authService.logout();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Login user
   */
  const login = async (credentials: LoginData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);

      if (response.success && response.data) {
        setUser(response.data.user);
        // toast
        return true;
      }

      // toast.error(response.message || "Login failed");
      return false;
    } catch (error: any) {
      const errorMessage = error.message || "Login failed. Please try again.";
      // toast.error(errorMessage);
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register new user
   */
  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.register(userData);

      if (response.success && response.data) {
        setUser(response.data.user);
        // toast.success(response.message || "Registration successful!");
        return true;
      }

      // toast.error(response.message || "Registration failed");
      return false;
    } catch (error: any) {
      const errorMessage =
        error.message || "Registration failed. Please try again.";
      // toast.error(errorMessage);
      console.error("Registration error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
      // toast.info("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API call fails, clear local state
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update user profile from server
   */
  const updateUser = async (): Promise<void> => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      console.error("Update user error:", error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use auth context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
