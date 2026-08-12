import { Check, ShieldCheck, UserRound, Users } from 'lucide-react';

export const STRORED_USER_KEY = 'user';
export const ROLE_OPTIONS = [
  { value: 'staff', label: 'Staff', icon: Users, color: 'emerald' },
  { value: 'admin', label: 'Admin', icon: ShieldCheck, color: 'sky' },
  // { value: 'super_admin', label: 'Super Admin', icon: Sparkles, color: 'amber' },
] as const;

export const COUNTRY_OPTIONS = ['Egypt', 'Saudi Arabia', 'United Arab Emirates', 'United States', 'United Kingdom'];

export const STEPS = [
  { id: 1, label: 'Profile', icon: UserRound },
  { id: 2, label: 'Access', icon: ShieldCheck },
  { id: 3, label: 'Review', icon: Check },
] as const;
