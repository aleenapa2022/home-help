import React from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';

const Bookings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="mt-2 text-gray-600">
            Manage your service bookings and appointments
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <CalendarIcon className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Bookings Yet
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            You haven't made any bookings yet. Start by finding workers 
            and scheduling services that you need.
          </p>
          <a
            href="/workers"
            className="btn btn-primary"
          >
            Find Workers
          </a>
        </div>
      </div>
    </div>
  );
};

export default Bookings;