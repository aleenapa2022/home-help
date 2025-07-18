import React from 'react';
import { Link } from 'react-router-dom';
import {
  WrenchScrewdriverIcon,
  BoltIcon,
  HomeIcon,
  SparklesIcon,
  PaintBrushIcon,
  CogIcon,
  UserGroupIcon,
  StarIcon,
  ClockIcon,
  ShieldCheckIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  const services = [
    {
      icon: BoltIcon,
      name: 'Electrical Work',
      description: 'Licensed electricians for repairs, installations, and maintenance',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: WrenchScrewdriverIcon,
      name: 'Plumbing',
      description: 'Professional plumbers for all your water and drainage needs',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: SparklesIcon,
      name: 'House Cleaning',
      description: 'Reliable cleaning services for homes and offices',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: HomeIcon,
      name: 'Gardening',
      description: 'Expert gardeners to maintain your green spaces',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: PaintBrushIcon,
      name: 'Painting',
      description: 'Skilled painters for interior and exterior projects',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      icon: CogIcon,
      name: 'Appliance Repair',
      description: 'Fix and maintain household appliances',
      color: 'bg-gray-100 text-gray-600',
    },
  ];

  const features = [
    {
      icon: UserGroupIcon,
      title: 'Verified Workers',
      description: 'All workers are background-checked and skill-verified for your safety and peace of mind.',
    },
    {
      icon: ClockIcon,
      title: 'Flexible Scheduling',
      description: 'Book services at your convenience with real-time availability updates.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure Payments',
      description: 'Safe and secure payment processing with transparent pricing.',
    },
    {
      icon: PhoneIcon,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you whenever needed.',
    },
  ];

  const stats = [
    { label: 'Active Workers', value: '2,500+' },
    { label: 'Jobs Completed', value: '15,000+' },
    { label: 'Happy Customers', value: '8,000+' },
    { label: 'Cities Covered', value: '25+' },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Homeowner',
      image: '/api/placeholder/60/60',
      content: 'Found an excellent electrician through DailyWageConnect. Quick, professional, and affordable!',
      rating: 5,
    },
    {
      name: 'Rajesh Kumar',
      role: 'Worker',
      image: '/api/placeholder/60/60',
      content: 'This platform changed my life. I now have steady work and can support my family better.',
      rating: 5,
    },
    {
      name: 'Meera Patel',
      role: 'Homeowner',
      image: '/api/placeholder/60/60',
      content: 'The booking system is so easy to use. I can schedule cleaning services with just a few clicks.',
      rating: 5,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connect with Skilled
              <span className="block text-primary-200">Daily-Wage Workers</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Find reliable electricians, plumbers, cleaners, and more in your neighborhood. 
              Empowering workers, serving families.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/workers"
                className="btn btn-secondary text-lg px-8 py-3 bg-white text-primary-700 hover:bg-gray-100"
              >
                Find Workers
              </Link>
              <Link
                to="/signup?type=worker"
                className="btn text-lg px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary-700 transition-all duration-200"
              >
                Join as Worker
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From electrical work to house cleaning, find skilled workers for all your household needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="card card-hover p-6 text-center group cursor-pointer"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${service.color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DailyWageConnect?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to creating a safe, reliable, and efficient platform for both workers and customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-primary-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting help is just a few clicks away
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Search & Browse</h3>
              <p className="text-gray-600">
                Find workers by service type, location, and availability. View profiles, ratings, and reviews.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Book & Schedule</h3>
              <p className="text-gray-600">
                Select your preferred worker, choose a time slot, and describe your requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Work Done</h3>
              <p className="text-gray-600">
                The worker arrives on time, completes the job, and you pay securely through the platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Rental Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Need Tools Too?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Browse our extensive collection of tools available for rent. From drilling machines to safety equipment, 
                get everything you need for your project.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span className="text-gray-700">Quality tools from verified vendors</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span className="text-gray-700">Flexible rental periods</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span className="text-gray-700">Delivery and pickup available</span>
                </li>
              </ul>
              <Link
                to="/tools"
                className="btn btn-primary text-lg px-6 py-3"
              >
                Browse Tools
              </Link>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg p-8 text-center">
                <WrenchScrewdriverIcon className="h-24 w-24 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Tools Available
                </h3>
                <p className="text-gray-600">
                  Drilling machines, ladders, safety gear, and much more
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What People Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our community of workers and customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and workers on DailyWageConnect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup?type=customer"
              className="btn text-lg px-8 py-3 bg-white text-primary-700 hover:bg-gray-100"
            >
              Find Workers
            </Link>
            <Link
              to="/signup?type=worker"
              className="btn text-lg px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary-700 transition-all duration-200"
            >
              Join as Worker
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;