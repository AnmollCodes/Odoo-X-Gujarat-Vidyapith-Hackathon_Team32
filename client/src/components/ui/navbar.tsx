import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X, QrCode } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-primary-500">
              <Leaf className="w-6 h-6" />
            </div>
            <div className="font-sans font-bold text-xl lg:text-2xl text-gray-800">
              <span className="text-primary-500">Agri</span>Chain
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/marketplace">
              <a className={`font-medium ${location === "/marketplace" ? "text-primary-500" : "text-gray-700 hover:text-primary-500"} transition-colors`}>
                Marketplace
              </a>
            </Link>
            <Link href="/how-it-works">
              <a className={`font-medium ${location === "/how-it-works" ? "text-primary-500" : "text-gray-700 hover:text-primary-500"} transition-colors`}>
                How It Works
              </a>
            </Link>
            <Link href="/for-farmers">
              <a className={`font-medium ${location === "/for-farmers" ? "text-primary-500" : "text-gray-700 hover:text-primary-500"} transition-colors`}>
                For Farmers
              </a>
            </Link>
            <Link href="/about">
              <a className={`font-medium ${location === "/about" ? "text-primary-500" : "text-gray-700 hover:text-primary-500"} transition-colors`}>
                About Us
              </a>
            </Link>
            <Link href="/contact">
              <a className={`font-medium ${location === "/contact" ? "text-primary-500" : "text-gray-700 hover:text-primary-500"} transition-colors`}>
                Contact
              </a>
            </Link>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="hidden md:inline-flex" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            
            <Button className="hidden md:inline-flex" asChild>
              <Link href="/register">Register</Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            
            <Button 
              variant="default" 
              size="icon" 
              className="bg-secondary-500 hover:bg-secondary-600 rounded-full" 
              asChild
            >
              <Link href="/verify">
                <QrCode className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-2 space-y-3">
            <Link href="/marketplace">
              <a 
                className="block py-2 px-4 font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-500 rounded-lg"
                onClick={closeMobileMenu}
              >
                Marketplace
              </a>
            </Link>
            <Link href="/how-it-works">
              <a 
                className="block py-2 px-4 font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-500 rounded-lg"
                onClick={closeMobileMenu}
              >
                How It Works
              </a>
            </Link>
            <Link href="/for-farmers">
              <a 
                className="block py-2 px-4 font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-500 rounded-lg"
                onClick={closeMobileMenu}
              >
                For Farmers
              </a>
            </Link>
            <Link href="/about">
              <a 
                className="block py-2 px-4 font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-500 rounded-lg"
                onClick={closeMobileMenu}
              >
                About Us
              </a>
            </Link>
            <Link href="/contact">
              <a 
                className="block py-2 px-4 font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-500 rounded-lg"
                onClick={closeMobileMenu}
              >
                Contact
              </a>
            </Link>
            <div className="flex space-x-2 px-4 py-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link href="/sign-in">
                  <span onClick={closeMobileMenu}>Sign In</span>
                </Link>
              </Button>
              <Button className="flex-1" asChild>
                <Link href="/register">
                  <span onClick={closeMobileMenu}>Register</span>
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
