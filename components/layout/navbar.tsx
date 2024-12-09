// components/layout/navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle scroll to add background and border to navbar
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 100) {
        navbar?.classList.add('bg-white/80', 'border-b', 'border-gray-200', 'backdrop-blur-md');
      } else {
        navbar?.classList.remove('bg-white/80', 'border-b', 'border-gray-200', 'backdrop-blur-md');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu handling
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  return (
    <>
      <nav
        id="navbar"
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-xl font-semibold text-primary">AI Compass</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/experts" className="text-gray-600 hover:text-primary transition-colors">
                Find Experts
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-primary transition-colors">
                Pricing
              </Link>

              <SignedIn>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <SignedOut>
                <Link
                  href="/sign-in"
                  className="bg-white text-primary px-4 py-2 rounded-full border border-primary hover:bg-primary hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
                >
                  Get Started
                </Link>
              </SignedOut>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute top-16 inset-x-0 bg-white shadow-lg rounded-b-2xl transition-transform duration-300 ${
            isOpen ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-full opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/experts"
              className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Find Experts
            </Link>
            <Link
              href="/pricing"
              className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>

            <SignedIn>
              <Link
                href="/dashboard"
                className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <div className="px-3 py-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>

            <SignedOut>
              <Link
                href="/sign-in"
                className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="block px-3 py-2 text-primary hover:text-primary/90 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </SignedOut>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;