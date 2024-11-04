import React from 'react';
import logo from '../../assets/logo.svg';
import Button from '../common/Button';

const Header: React.FC = () => {
  console.log('Logo:', logo); // Debug log to see if import works
  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-auto" />E
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                Get Started
              </button>
              <Button
                to="/"
                variant="primary"
                
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Home Page
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;