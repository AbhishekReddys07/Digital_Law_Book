import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book, Menu, X, Search, User, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/authStore';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Book className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-serif font-bold text-navy-900">Digital Law Book</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/laws"
                className="border-transparent text-gray-500 hover:border-primary-500 hover:text-navy-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Laws
              </Link>
              <Link
                to="/search"
                className="border-transparent text-gray-500 hover:border-primary-500 hover:text-navy-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Search
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/bookmarks"
                    className="border-transparent text-gray-500 hover:border-primary-500 hover:text-navy-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Bookmarks
                  </Link>
                  <Link
                    to="/annotations"
                    className="border-transparent text-gray-500 hover:border-primary-500 hover:text-navy-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Annotations
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-600">
                    Welcome, {user?.name}
                  </span>
                  <Button 
                    variant="ghost" 
                    leftIcon={<LogOut className="h-4 w-4" />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" size="sm">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/laws"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-500 hover:text-navy-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Laws
          </Link>
          <Link
            to="/search"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-500 hover:text-navy-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Search
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to="/bookmarks"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-500 hover:text-navy-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Bookmarks
              </Link>
              <Link
                to="/annotations"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-500 hover:text-navy-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Annotations
              </Link>
            </>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {isAuthenticated ? (
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                {user?.avatarUrl ? (
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.avatarUrl}
                    alt={`${user.name}'s avatar`}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                )}
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.name}</div>
                <div className="text-sm font-medium text-gray-500">{user?.email}</div>
              </div>
              <button
                onClick={handleLogout}
                className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <span className="sr-only">Logout</span>
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3 px-4">
              <Link
                to="/login"
                className="block text-center px-4 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-navy-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-center px-4 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};