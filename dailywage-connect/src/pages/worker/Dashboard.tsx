import React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Worker Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage your jobs, schedule, and earnings
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ChartBarIcon className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Worker Dashboard Coming Soon
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're building a comprehensive dashboard where workers can manage their 
            availability, track earnings, view job requests, and communicate with customers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;