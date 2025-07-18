import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  MapPinIcon,
  ClockIcon,
  CheckBadgeIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { Worker } from '../types';

const Workers: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [loading, setLoading] = useState(true);

  const services = [
    'All Services',
    'Electrical Work',
    'Plumbing',
    'House Cleaning',
    'Gardening',
    'Painting',
    'Appliance Repair',
    'Carpentry',
  ];

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockWorkers: Worker[] = [
      {
        id: '1',
        name: 'Ramesh Kumar',
        email: 'ramesh@example.com',
        phone: '+91 9876543210',
        address: 'Andheri, Mumbai',
        type: 'worker',
        avatar: '/api/placeholder/80/80',
        isVerified: true,
        createdAt: new Date(),
        services: ['Electrical Work', 'Appliance Repair'],
        experience: 8,
        rating: 4.8,
        reviews: [],
        availability: [],
        skills: ['Wiring', 'Installation', 'Repair'],
        verificationBadge: true,
        hourlyRate: 300,
        description: 'Experienced electrician with 8+ years of experience. Specializes in home wiring and appliance repairs.',
        profilePicture: '/api/placeholder/80/80',
      },
      {
        id: '2',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '+91 9876543211',
        address: 'Bandra, Mumbai',
        type: 'worker',
        avatar: '/api/placeholder/80/80',
        isVerified: true,
        createdAt: new Date(),
        services: ['House Cleaning'],
        experience: 5,
        rating: 4.9,
        reviews: [],
        availability: [],
        skills: ['Deep Cleaning', 'Kitchen Cleaning', 'Bathroom Cleaning'],
        verificationBadge: true,
        hourlyRate: 250,
        description: 'Professional house cleaner with attention to detail. Available for regular and deep cleaning services.',
        profilePicture: '/api/placeholder/80/80',
      },
      {
        id: '3',
        name: 'Suresh Patel',
        email: 'suresh@example.com',
        phone: '+91 9876543212',
        address: 'Powai, Mumbai',
        type: 'worker',
        avatar: '/api/placeholder/80/80',
        isVerified: true,
        createdAt: new Date(),
        services: ['Plumbing'],
        experience: 12,
        rating: 4.7,
        reviews: [],
        availability: [],
        skills: ['Pipe Repair', 'Installation', 'Leak Fixing'],
        verificationBadge: true,
        hourlyRate: 350,
        description: 'Master plumber with 12 years of experience. Expert in all types of plumbing work.',
        profilePicture: '/api/placeholder/80/80',
      },
      {
        id: '4',
        name: 'Maya Singh',
        email: 'maya@example.com',
        phone: '+91 9876543213',
        address: 'Juhu, Mumbai',
        type: 'worker',
        avatar: '/api/placeholder/80/80',
        isVerified: true,
        createdAt: new Date(),
        services: ['Gardening'],
        experience: 6,
        rating: 4.6,
        reviews: [],
        availability: [],
        skills: ['Landscaping', 'Plant Care', 'Garden Maintenance'],
        verificationBadge: false,
        hourlyRate: 200,
        description: 'Passionate gardener who loves creating beautiful outdoor spaces.',
        profilePicture: '/api/placeholder/80/80',
      },
    ];

    setTimeout(() => {
      setWorkers(mockWorkers);
      setFilteredWorkers(mockWorkers);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = workers;

    // Filter by service
    if (selectedService && selectedService !== 'All Services') {
      filtered = filtered.filter(worker =>
        worker.services.includes(selectedService)
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(worker =>
        worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.services.some(service =>
          service.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        worker.skills.some(skill =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sort workers
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'price-low':
          return a.hourlyRate - b.hourlyRate;
        case 'price-high':
          return b.hourlyRate - a.hourlyRate;
        default:
          return 0;
      }
    });

    setFilteredWorkers(filtered);
  }, [workers, searchTerm, selectedService, sortBy]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= Math.floor(rating) ? (
              <StarIconSolid className="h-4 w-4 text-yellow-400" />
            ) : star === Math.ceil(rating) && rating % 1 !== 0 ? (
              <div className="relative">
                <StarIcon className="h-4 w-4 text-gray-300" />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${(rating % 1) * 100}%` }}
                >
                  <StarIconSolid className="h-4 w-4 text-yellow-400" />
                </div>
              </div>
            ) : (
              <StarIcon className="h-4 w-4 text-gray-300" />
            )}
          </span>
        ))}
        <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading workers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Find Workers</h1>
          <p className="mt-2 text-gray-600">
            Connect with skilled daily-wage workers in your area
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, service, or skill..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 input"
                />
              </div>
            </div>

            {/* Service Filter */}
            <div>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="input"
              >
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input"
              >
                <option value="rating">Sort by Rating</option>
                <option value="experience">Sort by Experience</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
            <div key={worker.id} className="card card-hover">
              <div className="p-6">
                {/* Worker Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    {worker.avatar ? (
                      <img
                        src={worker.avatar}
                        alt={worker.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    ) : (
                      <UserIcon className="h-16 w-16 text-gray-400 bg-gray-100 rounded-full p-2" />
                    )}
                    {worker.verificationBadge && (
                      <CheckBadgeIcon className="absolute -bottom-1 -right-1 h-6 w-6 text-blue-500 bg-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {worker.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{worker.address}</span>
                    </div>
                    {renderStars(worker.rating)}
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {worker.services.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {worker.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{worker.experience} years exp.</span>
                  </div>
                  <div className="font-semibold text-gray-900">
                    ₹{worker.hourlyRate}/hour
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    to={`/workers/${worker.id}`}
                    className="btn btn-primary flex-1 text-center text-sm"
                  >
                    View Profile
                  </Link>
                  <Link
                    to={`/book/${worker.id}`}
                    className="btn btn-secondary flex-1 text-center text-sm"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredWorkers.length === 0 && (
          <div className="text-center py-12">
            <UserIcon className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No workers found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all available workers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workers;