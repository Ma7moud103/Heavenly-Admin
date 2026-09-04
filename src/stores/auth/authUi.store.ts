import type { RegisterStepId } from '@/interfaces/IRegisterForm';
import { create } from 'zustand';

interface AuthState {
  step: RegisterStepId;
  setStep: (step: RegisterStepId) => void;
  nextStep: () => void;
  prevStep: () => void;
  totalSteps: number;
  resetSteps: () => void;
  showPassword: boolean;
  setShowPassword: () => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  showPassword: false,
  setShowPassword: () =>
    set((state) => ({
      showPassword: !state.showPassword,
    })),
  showConfirmPassword: false,
  setShowConfirmPassword: () =>
    set((state) => ({
      showConfirmPassword: !state.showConfirmPassword,
    })),
  step: 1,
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, state.totalSteps) as RegisterStepId })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) as RegisterStepId })),
  totalSteps: 3,
  resetSteps: () => set({ step: 1 }),
}));
