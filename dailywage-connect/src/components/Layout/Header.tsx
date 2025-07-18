import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon, 
  BellIcon, 
  UserCircleIcon,
  MagnifyingGlassIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import { useAppContext } from '../../context/AppContext';
import NotificationDropdown from './NotificationDropdown';
import UserDropdown from './UserDropdown';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { state } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Find Workers', href: '/workers', current: location.pathname === '/workers' },
    { name: 'Browse Tools', href: '/tools', current: location.pathname === '/tools' },
    { name: 'My Bookings', href: '/bookings', current: location.pathname === '/bookings' },
    { name: 'How It Works', href: '/how-it-works', current: location.pathname === '/how-it-works' },
  ];

  const workerNavigation = [
    { name: 'Dashboard', href: '/worker/dashboard', current: location.pathname === '/worker/dashboard' },
    { name: 'My Schedule', href: '/worker/schedule', current: location.pathname === '/worker/schedule' },
    { name: 'Earnings', href: '/worker/earnings', current: location.pathname === '/worker/earnings' },
    { name: 'My Tools', href: '/worker/tools', current: location.pathname === '/worker/tools' },
  ];

  const currentNavigation = state.user?.type === 'worker' ? workerNavigation : navigation;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <WrenchScrewdriverIcon className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">DailyWageConnect</span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="search"
                  type="text"
                  placeholder="Search for services, workers, or tools..."
                  className={`
                    block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                    bg-white placeholder-gray-500 focus:outline-none focus:ring-2 
                    focus:ring-primary-500 focus:border-primary-500 transition-all duration-200
                    ${isSearchFocused ? 'shadow-lg' : 'shadow-sm'}
                  `}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {currentNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${item.current
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {state.isAuthenticated ? (
              <>
                {/* Notifications */}
                <NotificationDropdown />

                {/* User Menu */}
                <UserDropdown />
              </>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="search"
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {currentNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium
                  ${item.current
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }
                `}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {!state.isAuthenticated && (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;