import type { RegisterStepId } from '@/utils/register/registerValidation';
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  step: RegisterStepId;
  setStep: (step: RegisterStepId) => void;
  nextStep: () => void;
  prevStep: () => void;
  totalSteps: number;
  canGoNext: boolean;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  step: 1,
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, state.totalSteps) as RegisterStepId })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) as RegisterStepId })),
  totalSteps: 3,
  canGoNext: false,
}));
