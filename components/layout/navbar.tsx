// app/components/layout/navbar.tsx
"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isSignedIn } = useUser()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-colors duration-200 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg border-b' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">AI Compass</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-4">
                <NavigationMenuItem className="list-none">
                  <Link href="/experts" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                    Find Experts
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="list-none">
                  <Link href="/features" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                    Features
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="list-none">
                  <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {!isSignedIn ? (
                <>
                  <SignInButton mode="modal">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button variant="default" size="sm">
                      Get Started
                    </Button>
                  </SignUpButton>
                </>
              ) : (
                <Link href="/dashboard">
                  <Button variant="default" size="sm" className="text-white">
                    Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-lg border-b">
          <Link
            href="/experts"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Find Experts
          </Link>
          <Link
            href="/features"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>
          {!isSignedIn && (
            <div className="px-3 py-2 space-y-2">
              <SignInButton mode="modal">
                <Button variant="ghost" className="w-full justify-center">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="default" className="w-full justify-center">
                  Get Started
                </Button>
              </SignUpButton>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar