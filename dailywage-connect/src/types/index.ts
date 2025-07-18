export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  type: 'customer' | 'worker';
  avatar?: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface Worker extends User {
  type: 'worker';
  services: string[];
  experience: number;
  rating: number;
  reviews: Review[];
  availability: Availability[];
  skills: string[];
  verificationBadge: boolean;
  hourlyRate: number;
  description: string;
  profilePicture?: string;
}

export interface Customer extends User {
  type: 'customer';
  savedWorkers: string[];
  preferences: CustomerPreferences;
}

export interface CustomerPreferences {
  preferredServices: string[];
  maxBudget: number;
  preferredTimeSlots: string[];
  notificationSettings: NotificationSettings;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  bookingReminders: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  averagePrice: number;
  icon: string;
  estimatedDuration: number; // in hours
}

export type ServiceCategory = 
  | 'electrical'
  | 'plumbing'
  | 'cleaning'
  | 'gardening'
  | 'carpentry'
  | 'painting'
  | 'appliance-repair'
  | 'other';

export interface Booking {
  id: string;
  customerId: string;
  workerId: string;
  serviceId: string;
  date: Date;
  timeSlot: string;
  status: BookingStatus;
  description: string;
  estimatedCost: number;
  actualCost?: number;
  rating?: number;
  review?: string;
  tools?: ToolRental[];
  createdAt: Date;
  updatedAt: Date;
}

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'rejected';

export interface Availability {
  id: string;
  workerId: string;
  date: Date;
  timeSlots: TimeSlot[];
  isAvailable: boolean;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  isBooked: boolean;
  bookingId?: string;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  workerId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  pricePerDay: number;
  pricePerHour: number;
  ownerId: string;
  images: string[];
  availability: ToolAvailability[];
  condition: 'new' | 'good' | 'fair' | 'poor';
  specifications: Record<string, string>;
}

export type ToolCategory = 
  | 'drilling'
  | 'cutting'
  | 'measuring'
  | 'safety'
  | 'electrical'
  | 'plumbing'
  | 'gardening'
  | 'cleaning'
  | 'other';

export interface ToolAvailability {
  date: Date;
  isAvailable: boolean;
  bookedSlots: ToolBookingSlot[];
}

export interface ToolBookingSlot {
  startTime: string;
  endTime: string;
  rentalId: string;
}

export interface ToolRental {
  id: string;
  toolId: string;
  renterId: string;
  startDate: Date;
  endDate: Date;
  totalCost: number;
  status: 'pending' | 'confirmed' | 'active' | 'returned' | 'cancelled';
  returnCondition?: string;
  securityDeposit: number;
  bookingId?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export type NotificationType = 
  | 'booking-request'
  | 'booking-confirmed'
  | 'booking-cancelled'
  | 'booking-reminder'
  | 'tool-rental'
  | 'review-request'
  | 'system-update';

export interface SearchFilters {
  services?: string[];
  location?: string;
  radius?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  availability?: {
    date: Date;
    timeSlot: string;
  };
  experience?: number;
  verifiedOnly?: boolean;
}

export interface WorkerSearchResult {
  worker: Worker;
  distance?: number;
  averageResponseTime?: number;
  nextAvailableSlot?: {
    date: Date;
    timeSlot: string;
  };
}