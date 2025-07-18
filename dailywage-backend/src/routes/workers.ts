import express from 'express';
import {
  getWorkers,
  getWorkerById,
  updateWorkerProfile,
  getMyProfile,
  getWorkersByService,
  getTopRatedWorkers,
  searchWorkers,
  getWorkerStats
} from '../controllers/workerController';
import { auth, workerAuth, optionalAuth } from '../middleware/auth';
import {
  validateWorkerProfile,
  validateSearch,
  validatePagination,
  validateObjectId
} from '../middleware/validation';

const router = express.Router();

// Public routes
router.get('/', ...validateSearch, ...validatePagination, getWorkers);
router.get('/top-rated', getTopRatedWorkers);
router.get('/search', ...validateSearch, ...validatePagination, searchWorkers);
router.get('/service/:service', ...validatePagination, getWorkersByService);
router.get('/:id', ...validateObjectId('id'), getWorkerById);

// Worker-only routes
router.get('/me/profile', auth, workerAuth, getMyProfile);
router.put('/me/profile', auth, workerAuth, ...validateWorkerProfile, updateWorkerProfile);
router.get('/me/stats', auth, workerAuth, getWorkerStats);

export default router;