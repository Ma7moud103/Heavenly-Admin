export const spaCategories = [
  { name: 'Massage', count: 6, accent: 'from-amber-400/20 to-amber-500/5' },
  { name: 'Facial', count: 4, accent: 'from-emerald-400/20 to-emerald-500/5' },
  { name: 'Sauna', count: 2, accent: 'from-sky-400/20 to-sky-500/5' },
  { name: 'Wellness', count: 5, accent: 'from-rose-400/20 to-rose-500/5' },
];

export const spaServices = [
  {
    name: 'Swedish Massage',
    category: 'Massage',
    duration: '60 min',
    price: '900',
    description: 'A gentle, restorative treatment for relaxation and circulation.',
  },
  {
    name: 'Deep Tissue Release',
    category: 'Massage',
    duration: '75 min',
    price: '1200',
    description: 'Focused pressure work for tension relief and muscular recovery.',
  },
  {
    name: 'Hydra Glow Facial',
    category: 'Facial',
    duration: '45 min',
    price: '780',
    description: 'A refreshing facial designed to hydrate, brighten, and calm skin.',
  },
  {
    name: 'Signature Sauna Ritual',
    category: 'Sauna',
    duration: '30 min',
    price: '420',
    description: 'Warm detox session with a calm, private resort atmosphere.',
  },
];

export const spaPackages = [
  {
    name: 'Relax Package',
    price: '1,500',
    description: 'A balanced escape with massage, facial, and recovery time.',
    services: ['Swedish Massage', 'Hydra Glow Facial', 'Signature Sauna Ritual'],
  },
  {
    name: 'Couples Retreat',
    price: '2,600',
    description: 'A shared wellness experience for two guests.',
    services: ['Deep Tissue Release', 'Hydra Glow Facial', 'Tea Lounge Access'],
  },
  {
    name: 'Reset Journey',
    price: '1,950',
    description: 'Perfect for stress relief, glow-up sessions, and soft recovery.',
    services: ['Swedish Massage', 'Signature Sauna Ritual', 'Scalp Ritual'],
  },
];

export const spaTherapists = [
  { name: 'Mona Hassan', specialty: 'Massage Therapy', shift: '09:00 - 17:00', status: 'Available' },
  { name: 'Sarah El-Sayed', specialty: 'Facial & Skin Care', shift: '10:00 - 18:00', status: 'Booked' },
  { name: 'Youssef Adel', specialty: 'Recovery & Sauna', shift: '12:00 - 20:00', status: 'Available' },
  { name: 'Lina Omar', specialty: 'Wellness Packages', shift: '08:00 - 16:00', status: 'On Break' },
];

export const spaCustomers = [
  { name: 'Amira Saleh', type: 'Hotel Guest', phone: '+20 100 111 2222', email: 'amira@hotel.com' },
  { name: 'Nour Adel', type: 'External Customer', phone: '+20 100 333 4444', email: 'nour@email.com' },
  { name: 'Mina Fahmy', type: 'Hotel Guest', phone: '+20 100 555 6666', email: 'mina@hotel.com' },
];

export const spaBookings = [
  { customer: 'Amira Saleh', service: 'Swedish Massage', therapist: 'Mona Hassan', slot: '10:00', status: 'Confirmed', total: '900' },
  { customer: 'Nour Adel', service: 'Relax Package', therapist: 'Sarah El-Sayed', slot: '13:00', status: 'Pending', total: '1,500' },
  { customer: 'Mina Fahmy', service: 'Hydra Glow Facial', therapist: 'Lina Omar', slot: '16:00', status: 'Checked In', total: '780' },
];

export const bookingSteps = [
  'Choose customer type',
  'Select service or package',
  'Assign therapist',
  'Pick a dynamic time slot',
];

export const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '16:00'];
