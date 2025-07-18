import { Request, Response } from 'express';
import Worker from '../models/Worker';
import User from '../models/User';
import { ApiResponse, SearchFilters, PaginationQuery } from '../types';

// Get all workers with filters and pagination
export const getWorkers = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      services,
      location,
      radius = 50,
      minPrice,
      maxPrice,
      rating,
      experience,
      verifiedOnly,
      page = 1,
      limit = 12,
      sort = 'rating',
      order = 'desc'
    } = req.query;

    // Build query
    const query: any = {
      verificationStatus: 'verified'
    };

    // Service filter
    if (services) {
      const serviceArray = Array.isArray(services) ? services : [services];
      query.services = { $in: serviceArray };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.hourlyRate = {};
      if (minPrice) query.hourlyRate.$gte = Number(minPrice);
      if (maxPrice) query.hourlyRate.$lte = Number(maxPrice);
    }

    // Rating filter
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    // Experience filter
    if (experience) {
      query.experience = { $gte: Number(experience) };
    }

    // Verification filter
    if (verifiedOnly === 'true') {
      query.verificationStatus = 'verified';
    }

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Sort configuration
    const sortConfig: any = {};
    sortConfig[sort as string] = order === 'desc' ? -1 : 1;

    // Execute query with population
    const workers = await Worker.find(query)
      .populate('userId', 'name email phone city state avatar isVerified createdAt')
      .sort(sortConfig)
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total count for pagination
    const totalWorkers = await Worker.countDocuments(query);
    const totalPages = Math.ceil(totalWorkers / limitNum);

    // Location-based filtering (if location is provided)
    let filteredWorkers = workers;
    if (location) {
      // In a real application, you would use geospatial queries
      // For now, we'll filter by city/state
      filteredWorkers = workers.filter((worker: any) => {
        const userLocation = `${worker.userId.city} ${worker.userId.state}`.toLowerCase();
        return userLocation.includes(location.toString().toLowerCase());
      });
    }

    // Transform data for response
    const transformedWorkers = filteredWorkers.map((worker: any) => ({
      id: worker._id,
      name: worker.userId.name,
      email: worker.userId.email,
      phone: worker.userId.phone,
      address: `${worker.userId.city}, ${worker.userId.state}`,
      city: worker.userId.city,
      state: worker.userId.state,
      avatar: worker.userId.avatar,
      isVerified: worker.userId.isVerified,
      services: worker.services,
      skills: worker.skills,
      experience: worker.experience,
      hourlyRate: worker.hourlyRate,
      description: worker.description,
      rating: worker.rating,
      totalRatings: worker.totalRatings,
      totalJobs: worker.totalJobs,
      verificationBadge: worker.verificationStatus === 'verified',
      languages: worker.languages,
      workRadius: worker.workRadius,
      profilePicture: worker.profilePicture,
      createdAt: worker.userId.createdAt
    }));

    res.status(200).json({
      success: true,
      message: 'Workers retrieved successfully',
      data: transformedWorkers,
      pagination: {
        total: totalWorkers,
        page: pageNum,
        limit: limitNum,
        totalPages
      }
    } as ApiResponse);

  } catch (error: any) {
    console.error('Get workers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve workers',
      error: error.message
    } as ApiResponse);
  }
};

// Get worker by ID
export const getWorkerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const worker = await Worker.findById(id)
      .populate('userId', 'name email phone city state avatar isVerified createdAt');

    if (!worker) {
      res.status(404).json({
        success: false,
        message: 'Worker not found'
      } as ApiResponse);
      return;
    }

    // Transform data for response
    const transformedWorker = {
      id: worker._id,
      name: (worker.userId as any).name,
      email: (worker.userId as any).email,
      phone: (worker.userId as any).phone,
      address: `${(worker.userId as any).city}, ${(worker.userId as any).state}`,
      city: (worker.userId as any).city,
      state: (worker.userId as any).state,
      avatar: (worker.userId as any).avatar,
      isVerified: (worker.userId as any).isVerified,
      services: worker.services,
      skills: worker.skills,
      experience: worker.experience,
      hourlyRate: worker.hourlyRate,
      description: worker.description,
      rating: worker.rating,
      totalRatings: worker.totalRatings,
      totalJobs: worker.totalJobs,
      verificationBadge: worker.verificationStatus === 'verified',
      verificationStatus: worker.verificationStatus,
      languages: worker.languages,
      workRadius: worker.workRadius,
      profilePicture: worker.profilePicture,
      emergencyContact: worker.emergencyContact,
      createdAt: (worker.userId as any).createdAt,
      updatedAt: worker.updatedAt
    };

    res.status(200).json({
      success: true,
      message: 'Worker retrieved successfully',
      data: transformedWorker
    } as ApiResponse);

  } catch (error: any) {
    console.error('Get worker by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve worker',
      error: error.message
    } as ApiResponse);
  }
};

// Update worker profile (for authenticated workers)
export const updateWorkerProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const updateData = req.body;

    // Find worker profile
    const worker = await Worker.findOne({ userId });
    if (!worker) {
      res.status(404).json({
        success: false,
        message: 'Worker profile not found'
      } as ApiResponse);
      return;
    }

    // Update worker profile
    Object.assign(worker, updateData);
    await worker.save();

    res.status(200).json({
      success: true,
      message: 'Worker profile updated successfully',
      data: worker
    } as ApiResponse);

  } catch (error: any) {
    console.error('Update worker profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update worker profile',
      error: error.message
    } as ApiResponse);
  }
};

// Get worker profile for authenticated worker
export const getMyProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;

    const worker = await Worker.findOne({ userId })
      .populate('userId', 'name email phone city state avatar isVerified');

    if (!worker) {
      res.status(404).json({
        success: false,
        message: 'Worker profile not found'
      } as ApiResponse);
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Worker profile retrieved successfully',
      data: worker
    } as ApiResponse);

  } catch (error: any) {
    console.error('Get my profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve worker profile',
      error: error.message
    } as ApiResponse);
  }
};

// Get workers by service type
export const getWorkersByService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { service } = req.params;
    const { city, state, page = 1, limit = 12 } = req.query;

    const query: any = {
      services: service,
      verificationStatus: 'verified'
    };

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const workers = await Worker.find(query)
      .populate({
        path: 'userId',
        match: city || state ? {
          ...(city && { city: city as string }),
          ...(state && { state: state as string })
        } : {},
        select: 'name email phone city state avatar isVerified'
      })
      .sort({ rating: -1, totalJobs: -1 })
      .skip(skip)
      .limit(limitNum);

    // Filter out workers where populate didn't match
    const filteredWorkers = workers.filter(worker => worker.userId);

    const totalWorkers = await Worker.countDocuments(query);

    res.status(200).json({
      success: true,
      message: `Workers for ${service} retrieved successfully`,
      data: filteredWorkers,
      pagination: {
        total: totalWorkers,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalWorkers / limitNum)
      }
    } as ApiResponse);

  } catch (error: any) {
    console.error('Get workers by service error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve workers by service',
      error: error.message
    } as ApiResponse);
  }
};

// Get top rated workers
export const getTopRatedWorkers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit = 10 } = req.query;

    const workers = await Worker.find({
      verificationStatus: 'verified',
      rating: { $gte: 4.0 },
      totalRatings: { $gte: 5 }
    })
      .populate('userId', 'name email phone city state avatar isVerified')
      .sort({ rating: -1, totalRatings: -1 })
      .limit(parseInt(limit as string));

    res.status(200).json({
      success: true,
      message: 'Top rated workers retrieved successfully',
      data: workers
    } as ApiResponse);

  } catch (error: any) {
    console.error('Get top rated workers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve top rated workers',
      error: error.message
    } as ApiResponse);
  }
};

// Search workers by name or skills
export const searchWorkers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q, page = 1, limit = 12 } = req.query;

    if (!q) {
      res.status(400).json({
        success: false,
        message: 'Search query is required'
      } as ApiResponse);
      return;
    }

    const searchRegex = new RegExp(q as string, 'i');

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Search in worker skills and description
    const workerQuery = {
      verificationStatus: 'verified',
      $or: [
        { skills: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { services: { $regex: searchRegex } }
      ]
    };

    // Also search in user names
    const users = await User.find({
      name: { $regex: searchRegex },
      userType: 'worker'
    }).select('_id');

    const userIds = users.map(user => user._id);

    const workers = await Worker.find({
      $or: [
        workerQuery,
        { userId: { $in: userIds } }
      ]
    })
      .populate('userId', 'name email phone city state avatar isVerified')
      .sort({ rating: -1, totalJobs: -1 })
      .skip(skip)
      .limit(limitNum);

    const totalWorkers = await Worker.countDocuments({
      $or: [
        workerQuery,
        { userId: { $in: userIds } }
      ]
    });

    res.status(200).json({
      success: true,
      message: 'Workers search completed successfully',
      data: workers,
      pagination: {
        total: totalWorkers,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalWorkers / limitNum)
      }
    } as ApiResponse);

  } catch (error: any) {
    console.error('Search workers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search workers',
      error: error.message
    } as ApiResponse);
  }
};

// Get worker statistics (for worker dashboard)
export const getWorkerStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;

    const worker = await Worker.findOne({ userId });
    if (!worker) {
      res.status(404).json({
        success: false,
        message: 'Worker profile not found'
      } as ApiResponse);
      return;
    }

    // Calculate additional stats
    const stats = {
      totalJobs: worker.totalJobs,
      rating: worker.rating,
      totalRatings: worker.totalRatings,
      hourlyRate: worker.hourlyRate,
      verificationStatus: worker.verificationStatus,
      profileCompleteness: calculateProfileCompleteness(worker),
      // Add more stats as needed
    };

    res.status(200).json({
      success: true,
      message: 'Worker statistics retrieved successfully',
      data: stats
    } as ApiResponse);

  } catch (error: any) {
    console.error('Get worker stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve worker statistics',
      error: error.message
    } as ApiResponse);
  }
};

// Helper function to calculate profile completeness
function calculateProfileCompleteness(worker: any): number {
  let completeness = 0;
  const fields = [
    'services',
    'skills',
    'experience',
    'hourlyRate',
    'description',
    'languages',
    'emergencyContact.name',
    'emergencyContact.phone',
    'emergencyContact.relation'
  ];

  fields.forEach(field => {
    const fieldValue = field.includes('.') 
      ? field.split('.').reduce((obj, key) => obj && obj[key], worker)
      : worker[field];
    
    if (fieldValue && (Array.isArray(fieldValue) ? fieldValue.length > 0 : fieldValue)) {
      completeness += 1;
    }
  });

  return Math.round((completeness / fields.length) * 100);
}