import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserCircleIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  CalendarIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import { useAppContext } from '../../context/AppContext';

const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { state, logout } = useAppContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const userMenuItems = [
    {
      name: 'Profile',
      href: '/profile',
      icon: UserIcon,
    },
    {
      name: 'My Bookings',
      href: '/bookings',
      icon: CalendarIcon,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: CogIcon,
    },
  ];

  const workerMenuItems = [
    {
      name: 'Dashboard',
      href: '/worker/dashboard',
      icon: UserIcon,
    },
    {
      name: 'My Schedule',
      href: '/worker/schedule',
      icon: CalendarIcon,
    },
    {
      name: 'Earnings',
      href: '/worker/earnings',
      icon: CreditCardIcon,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: CogIcon,
    },
  ];

  const menuItems = state.user?.type === 'worker' ? workerMenuItems : userMenuItems;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center space-x-2 p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {state.user?.avatar ? (
          <img
            src={state.user.avatar}
            alt={state.user.name}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <UserCircleIcon className="h-8 w-8" />
        )}
        <span className="hidden sm:block text-sm font-medium text-gray-700">
          {state.user?.name}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* User Info Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              {state.user?.avatar ? (
                <img
                  src={state.user.avatar}
                  alt={state.user?.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="h-10 w-10 text-gray-400" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {state.user?.name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {state.user?.email}
                </p>
                {state.user?.type === 'worker' && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 mt-1">
                    Worker
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3 text-gray-400" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-gray-200 py-2">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;