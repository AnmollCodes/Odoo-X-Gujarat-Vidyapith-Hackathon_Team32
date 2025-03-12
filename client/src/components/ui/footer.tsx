import { Link } from "wouter";
import { 
  Leaf, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Mail, 
  Phone 
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-primary-500">
                <Leaf className="h-6 w-6" />
              </div>
              <div className="font-sans font-bold text-xl">
                <span className="text-primary-500">Agri</span>Chain
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Revolutionizing the natural farming market with blockchain-verified transparency.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/marketplace">
                  <a className="text-gray-400 hover:text-white transition-colors">Marketplace</a>
                </Link>
              </li>
              <li>
                <Link href="/#for-farmers">
                  <a className="text-gray-400 hover:text-white transition-colors">For Farmers</a>
                </Link>
              </li>
              <li>
                <Link href="/marketplace">
                  <a className="text-gray-400 hover:text-white transition-colors">For Consumers</a>
                </Link>
              </li>
              <li>
                <Link href="/verify">
                  <a className="text-gray-400 hover:text-white transition-colors">Blockchain Verification</a>
                </Link>
              </li>
              <li>
                <Link href="/verify">
                  <a className="text-gray-400 hover:text-white transition-colors">QR Code System</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <a className="text-gray-400 hover:text-white transition-colors">Our Story</a>
                </Link>
              </li>
              <li>
                <Link href="/team">
                  <a className="text-gray-400 hover:text-white transition-colors">Team</a>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <a className="text-gray-400 hover:text-white transition-colors">Careers</a>
                </Link>
              </li>
              <li>
                <Link href="/press">
                  <a className="text-gray-400 hover:text-white transition-colors">Press</a>
                </Link>
              </li>
              <li>
                <Link href="/partners">
                  <a className="text-gray-400 hover:text-white transition-colors">Partners</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-1 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">123 AgriTech Park, Bangalore, India 560001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">contact@agrichain.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">+91 1800-123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} AgriChain. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy">
                <a className="text-gray-500 text-sm hover:text-gray-400 transition-colors">Privacy Policy</a>
              </Link>
              <Link href="/terms">
                <a className="text-gray-500 text-sm hover:text-gray-400 transition-colors">Terms of Service</a>
              </Link>
              <Link href="/cookies">
                <a className="text-gray-500 text-sm hover:text-gray-400 transition-colors">Cookie Policy</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
