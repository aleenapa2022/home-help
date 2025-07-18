import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  userType: 'customer' | 'worker';
  isVerified: boolean;
  isActive: boolean;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  updateLastLogin(): Promise<void>;
  isUserVerified(): boolean;
}

export interface IWorker extends Document {
  _id: string;
  userId: any;
  services: string[];
  skills: string[];
  experience: number;
  hourlyRate: number;
  description: string;
  rating: number;
  totalRatings: number;
  totalJobs: number;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verificationDocuments: string[];
  availability: IAvailability[];
  profilePicture?: string;
  documents: string[];
  languages: string[];
  workRadius: number; // in kilometers
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    accountHolderName: string;
  };
  createdAt: Date;
  updatedAt: Date;
  updateRating(newRating: number): Promise<void>;
  incrementJobCount(): Promise<void>;
  isAvailableForService(serviceType: string): boolean;
}

export interface ICustomer extends Document {
  _id: string;
  userId: string;
  preferences: {
    preferredServices: string[];
    maxBudget: number;
    preferredTimeSlots: string[];
    preferredLanguages: string[];
  };
  savedWorkers: string[];
  notificationSettings: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    bookingReminders: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IBooking extends Document {
  _id: string;
  customerId: string;
  workerId: string;
  serviceType: string;
  title: string;
  description: string;
  scheduledDate: Date;
  timeSlot: string;
  estimatedHours: number;
  estimatedCost: number;
  actualCost?: number;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'rejected';
  customerLocation: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  workDetails?: {
    startTime?: Date;
    endTime?: Date;
    actualHours?: number;
    materials?: string[];
    notes?: string;
  };
  tools?: string[]; // Tool rental IDs
  rating?: number;
  review?: string;
  images?: string[];
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAvailability extends Document {
  _id: string;
  workerId: string;
  date: Date;
  timeSlots: {
    startTime: string;
    endTime: string;
    isBooked: boolean;
    bookingId?: string;
  }[];
  isAvailable: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview extends Document {
  _id: string;
  bookingId: string;
  customerId: string;
  workerId: string;
  rating: number;
  comment: string;
  images?: string[];
  isVisible: boolean;
  response?: {
    comment: string;
    respondedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ITool extends Document {
  _id: string;
  ownerId: string; // Worker or vendor ID
  ownerType: 'worker' | 'vendor';
  name: string;
  description: string;
  category: string;
  brand?: string;
  modelName?: string;
  condition: 'new' | 'good' | 'fair' | 'poor';
  pricePerHour: number;
  pricePerDay: number;
  securityDeposit: number;
  images: string[];
  specifications: Record<string, string>;
  availability: Date[];
  location: {
    address: string;
    city: string;
    state: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  deliveryAvailable: boolean;
  deliveryCharges?: number;
  isActive: boolean;
  totalRentals: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IToolRental extends Document {
  _id: string;
  toolId: string;
  renterId: string;
  startDate: Date;
  endDate: Date;
  totalHours: number;
  totalCost: number;
  securityDeposit: number;
  status: 'pending' | 'confirmed' | 'active' | 'returned' | 'cancelled';
  deliveryAddress?: string;
  deliveryCharges?: number;
  bookingId?: string; // If rented as part of a service booking
  returnCondition?: string;
  damageCharges?: number;
  refundAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface INotification extends Document {
  _id: string;
  userId: string;
  type: 'booking' | 'payment' | 'review' | 'tool' | 'system' | 'promotion';
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  readAt?: Date;
  actionUrl?: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IService extends Document {
  _id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  averagePrice: number;
  estimatedDuration: number; // in hours
  skillsRequired: string[];
  toolsRequired?: string[];
  isActive: boolean;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPayment extends Document {
  _id: string;
  bookingId?: string;
  toolRentalId?: string;
  payerId: string;
  payeeId: string;
  amount: number;
  platformFee: number;
  totalAmount: number;
  paymentMethod: 'cash' | 'online' | 'upi' | 'card';
  paymentGateway?: string;
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  refundAmount?: number;
  refundReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Request/Response types
export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  userType: 'customer' | 'worker';
}

export interface WorkerProfileRequest {
  services: string[];
  skills: string[];
  experience: number;
  hourlyRate: number;
  description: string;
  languages: string[];
  workRadius: number;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
}

export interface BookingRequest {
  workerId: string;
  serviceType: string;
  title: string;
  description: string;
  scheduledDate: string;
  timeSlot: string;
  estimatedHours: number;
  customerLocation: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  tools?: string[];
}

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
    date: string;
    timeSlot: string;
  };
  experience?: number;
  verifiedOnly?: boolean;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// JWT Payload
export interface JWTPayload {
  userId: string;
  email: string;
  userType: 'customer' | 'worker';
  iat?: number;
  exp?: number;
}