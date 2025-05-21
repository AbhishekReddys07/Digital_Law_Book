import { create } from 'zustand';
import { User } from '../types';
import { users } from '../data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user with matching email (in a real app, we'd verify password too)
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      set({ user, isAuthenticated: true, isLoading: false });
      return true;
    } else {
      set({ isLoading: false });
      return false;
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));