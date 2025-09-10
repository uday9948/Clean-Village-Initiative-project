import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'user' | 'official';

interface User {
  id: string;
  username: string;
  role: UserRole;
  email: string;
  fullName: string;
  phoneNumber: string;
  district?: string;
  village?: string;
  dateRegistered: Date;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (userData: SignupData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface SignupData {
  username: string;
  password: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: UserRole;
  district?: string;
  village?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database - in production, this would be in a real database
const mockUsers: User[] = [
  {
    id: '1',
    username: 'john_user',
    role: 'user',
    email: 'john@example.com',
    fullName: 'John Doe',
    phoneNumber: '+91 9876543210',
    village: 'Warangal Rural',
    dateRegistered: new Date('2024-01-15'),
  },
  {
    id: '2',
    username: 'official_kumar',
    role: 'official',
    email: 'kumar@gov.in',
    fullName: 'Kumar Reddy',
    phoneNumber: '+91 9876543211',
    district: 'Warangal',
    dateRegistered: new Date('2024-01-10'),
  },
];

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get all users from localStorage and mock users
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const allUsers = [...mockUsers, ...storedUsers];
    
    const foundUser = allUsers.find(u => u.username === username && u.role === role);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const signup = async (userData: SignupData): Promise<{ success: boolean; message: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Get existing users from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const allUsers = [...mockUsers, ...storedUsers];
      
      // Check if username already exists
      const existingUser = allUsers.find(u => u.username === userData.username);
      if (existingUser) {
        return { success: false, message: 'Username already exists. Please choose a different username.' };
      }
      
      // Check if email already exists
      const existingEmail = allUsers.find(u => u.email === userData.email);
      if (existingEmail) {
        return { success: false, message: 'Email already registered. Please use a different email or try logging in.' };
      }
      
      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        username: userData.username,
        email: userData.email,
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        role: userData.role,
        district: userData.district,
        village: userData.village,
        dateRegistered: new Date(),
      };
      
      // Save to localStorage
      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      
      return { success: true, message: 'Account created successfully! You can now log in.' };
    } catch (error) {
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};