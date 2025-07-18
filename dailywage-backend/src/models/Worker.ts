import mongoose, { Schema, Types } from 'mongoose';
import { IWorker } from '../types';

const workerSchema = new Schema<IWorker>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  services: [{
    type: String,
    required: true,
    enum: [
      'Electrical Work',
      'Plumbing',
      'House Cleaning',
      'Gardening',
      'Painting',
      'Appliance Repair',
      'Carpentry',
      'Masonry',
      'Tile Work',
      'AC Repair',
      'Computer Repair',
      'Moving & Packing',
      'Other'
    ]
  }],
  skills: [{
    type: String,
    required: true,
    trim: true
  }],
  experience: {
    type: Number,
    required: [true, 'Experience is required'],
    min: [0, 'Experience cannot be negative'],
    max: [50, 'Experience cannot exceed 50 years']
  },
  hourlyRate: {
    type: Number,
    required: [true, 'Hourly rate is required'],
    min: [50, 'Hourly rate must be at least ₹50'],
    max: [5000, 'Hourly rate cannot exceed ₹5000']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalRatings: {
    type: Number,
    default: 0,
    min: 0
  },
  totalJobs: {
    type: Number,
    default: 0,
    min: 0
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verificationDocuments: [{
    type: String
  }],
  availability: [{
    type: Schema.Types.ObjectId,
    ref: 'Availability'
  }],
  profilePicture: {
    type: String,
    default: null
  },
  documents: [{
    type: String
  }],
  languages: [{
    type: String,
    required: true,
    enum: ['Hindi', 'English', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati', 'Urdu', 'Kannada', 'Malayalam', 'Punjabi', 'Other']
  }],
  workRadius: {
    type: Number,
    required: [true, 'Work radius is required'],
    min: [1, 'Work radius must be at least 1 km'],
    max: [100, 'Work radius cannot exceed 100 km'],
    default: 10
  },
  emergencyContact: {
    name: {
      type: String,
      required: [true, 'Emergency contact name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Emergency contact phone is required'],
      match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
    },
    relation: {
      type: String,
      required: [true, 'Emergency contact relation is required'],
      trim: true
    }
  },
  bankDetails: {
    accountNumber: {
      type: String,
      trim: true
    },
    ifscCode: {
      type: String,
      trim: true,
      uppercase: true
    },
    bankName: {
      type: String,
      trim: true
    },
    accountHolderName: {
      type: String,
      trim: true
    }
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete (ret as any).__v;
      return ret;
    }
  }
});

// Indexes for performance
workerSchema.index({ userId: 1 });
workerSchema.index({ services: 1 });
workerSchema.index({ rating: -1 });
workerSchema.index({ hourlyRate: 1 });
workerSchema.index({ verificationStatus: 1 });
workerSchema.index({ experience: -1 });

// Compound indexes
workerSchema.index({ services: 1, rating: -1 });
workerSchema.index({ hourlyRate: 1, rating: -1 });

// Virtual for verification badge
workerSchema.virtual('verificationBadge').get(function(this: IWorker) {
  return this.verificationStatus === 'verified';
});

// Method to update rating
workerSchema.methods.updateRating = async function(newRating: number): Promise<void> {
  const totalScore = this.rating * this.totalRatings + newRating;
  this.totalRatings += 1;
  this.rating = Math.round((totalScore / this.totalRatings) * 10) / 10;
  await this.save();
};

// Method to increment job count
workerSchema.methods.incrementJobCount = async function(): Promise<void> {
  this.totalJobs += 1;
  await this.save();
};

// Method to check if worker is available for booking
workerSchema.methods.isAvailableForService = function(serviceType: string): boolean {
  return this.services.includes(serviceType) && this.verificationStatus === 'verified';
};

// Static method to find workers by service and location
workerSchema.statics.findByServiceAndLocation = function(
  service: string, 
  city: string, 
  state?: string
) {
  const query: any = {
    services: service,
    verificationStatus: 'verified'
  };

  return this.find(query)
    .populate('userId', 'name email phone city state avatar isVerified')
    .sort({ rating: -1, totalJobs: -1 });
};

// Static method to get top rated workers
workerSchema.statics.getTopRated = function(limit: number = 10) {
  return this.find({ verificationStatus: 'verified' })
    .populate('userId', 'name email phone city state avatar isVerified')
    .sort({ rating: -1, totalRatings: -1 })
    .limit(limit);
};

const Worker = mongoose.model<IWorker>('Worker', workerSchema);

export default Worker;