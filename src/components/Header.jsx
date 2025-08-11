import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, Moon, Sun, Search, ChevronDown, Menu, 
  User, Settings, LogOut, X, CheckCircle 
} from 'lucide-react';

// Custom hook for closing dropdowns when clicking outside
const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
};

const NotificationItem = ({ notification, darkMode, onMarkAsRead }) => {
  return (
    <div 
      className={`p-3 border-b ${
        darkMode 
          ? 'border-gray-700 hover:bg-gray-750' 
          : 'border-gray-100 hover:bg-gray-50'
      } ${!notification.read && (darkMode ? 'bg-gray-750' : 'bg-blue-50')}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{notification.title}</h4>
            {!notification.read && (
              <button 
                onClick={() => onMarkAsRead(notification.id)}
                className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Mark as read"
              >
                <CheckCircle size={16} className="text-green-500" />
              </button>
            )}
          </div>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {notification.description}
          </p>
        </div>
        <span className={`text-xs min-w-max ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {notification.time}
        </span>
      </div>
    </div>
  );
};

const ProfileDropdownItem = ({ icon: Icon, label, darkMode, onClick, isLogout }) => {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center px-4 py-2 text-sm ${
        darkMode 
          ? 'text-gray-300 hover:bg-gray-750' 
          : 'text-gray-700 hover:bg-gray-100'
      } ${isLogout ? (darkMode ? 'text-red-400' : 'text-red-600') : ''}`}
    >
      <Icon size={16} className="mr-3" /> 
      {label}
    </button>
  );
};

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New message', description: 'You have a new message from Alex', time: '2 min ago', read: false },
    { id: 2, title: 'System Update', description: 'Scheduled maintenance this weekend', time: '1 hour ago', read: true },
    { id: 3, title: 'Payment Received', description: '$2500 payment received from client', time: '3 hours ago', read: true },
  ]);
  
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  
  useClickOutside(notificationsRef, () => setNotificationsOpen(false));
  useClickOutside(profileRef, () => setProfileOpen(false));
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark', newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      setSearchQuery('');
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    document.body.classList.toggle('dark', savedMode);
  }, []);

  return (
    <header className={`${darkMode ? 'dark bg-gray-900' : 'bg-white'} shadow-md  transition-colors duration-300`}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-1">
          {/* Left: Welcome Text */}
          <div>
            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Welcome Admin,
            </h1>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          {/* Right: Search, Icons, Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <form 
              onSubmit={handleSearch}
              className={`relative transition-all duration-200 ${
                searchFocused ? 'w-80' : 'w-64'
              }`}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search..."
                className={`pl-10 pr-4 py-2 w-full rounded-full text-sm focus:outline-none transition-all ${
                  darkMode 
                    ? 'bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500' 
                    : 'bg-gray-100 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-300'
                }`}
                aria-label="Search"
              />
              <span className="absolute left-3 top-2.5">
                <Search size={18} className={darkMode ? "text-gray-400" : "text-gray-500"} />
              </span>
            </form>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                darkMode 
                  ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notification Bell */}
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={() => {
                  setProfileOpen(false);
                  setNotificationsOpen(!notificationsOpen);
                }}
                className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-200 text-gray-600'
                } transition-colors`}
                aria-label="Notifications"
                aria-haspopup="true"
                aria-expanded={notificationsOpen}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {/* Notification Dropdown */}
              {notificationsOpen && (
                <div 
                  className={`absolute right-0 mt-2 w-80 rounded-xl shadow-lg z-50 transform origin-top-right transition-transform duration-200 ${
                    darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className={`p-3 border-b flex justify-between items-center ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <h3 className="font-semibold flex items-center">
                      <Bell size={16} className="mr-2" />
                      Notifications
                      {unreadCount > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </h3>
                    <div className="flex space-x-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className={`text-xs px-2 py-1 rounded ${
                            darkMode 
                              ? 'text-indigo-400 hover:bg-gray-700' 
                              : 'text-indigo-600 hover:bg-gray-100'
                          }`}
                        >
                          Mark all as read
                        </button>
                      )}
                      <button
                        onClick={() => setNotificationsOpen(false)}
                        className={`p-1 rounded-full ${
                          darkMode 
                            ? 'text-gray-400 hover:bg-gray-700' 
                            : 'text-gray-500 hover:bg-gray-100'
                        }`}
                        aria-label="Close notifications"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <NotificationItem 
                          key={notification.id} 
                          notification={notification} 
                          darkMode={darkMode}
                          onMarkAsRead={markAsRead}
                        />
                      ))
                    ) : (
                      <div className="p-4 text-center">
                        <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                          No notifications
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={`p-3 text-center ${
                    darkMode ? 'bg-gray-800' : 'bg-gray-50'
                  }`}>
                    <button 
                      className={`text-sm font-medium ${
                        darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'
                      }`}
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => {
                  setNotificationsOpen(false);
                  setProfileOpen(!profileOpen);
                }}
                className="flex items-center space-x-2 group focus:outline-none"
                aria-label="Profile menu"
                aria-haspopup="true"
                aria-expanded={profileOpen}
              >
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/100?img=5"
                    alt="Admin User"
                    className="rounded-full w-10 h-10 border-2 border-transparent group-hover:border-indigo-500 transition-colors"
                  />
                  <span 
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                      darkMode ? 'bg-green-500 border border-gray-800' : 'bg-green-500 border border-white'
                    }`}
                    aria-label="Online status"
                  ></span>
                </div>
                <div className="text-left hidden lg:block">
                  <span className={`block text-sm font-medium ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>Admin User</span>
                  <span className={`block text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Administrator</span>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-200 ${
                    profileOpen ? 'rotate-180' : ''
                  } ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} 
                />
              </button>
              
              {/* Profile Dropdown */}
              {profileOpen && (
                <div 
                  className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg z-50 transform origin-top-right transition-transform duration-200 ${
                    darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="p-4 border-b dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://i.pravatar.cc/100?img=5"
                        alt="Admin User"
                        className="rounded-full w-10 h-10"
                      />
                      <div>
                        <p className="font-medium dark:text-white truncate max-w-[140px]">Admin User</p>
                        <p className="text-sm dark:text-gray-400 text-gray-500 truncate max-w-[140px]">
                          admin@campuscore.edu
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <ProfileDropdownItem 
                      icon={User} 
                      label="Profile" 
                      darkMode={darkMode} 
                    />
                    <ProfileDropdownItem 
                      icon={Settings} 
                      label="Settings" 
                      darkMode={darkMode} 
                    />
                  </div>
                  <div className={`py-2 border-t ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <ProfileDropdownItem 
                      icon={LogOut} 
                      label="Logout" 
                      darkMode={darkMode} 
                      isLogout={true} 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;