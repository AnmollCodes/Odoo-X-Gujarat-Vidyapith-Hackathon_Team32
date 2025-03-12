import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, ShoppingBasket, QrCode, Leaf } from "lucide-react";

export function CallToAction() {
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-sans font-bold text-3xl md:text-4xl mb-6">Start Your Blockchain-Verified Journey Today</h2>
            <p className="text-gray-300 mb-8 text-lg">Join thousands of farmers and consumers who are building a more transparent and fair agricultural ecosystem.</p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                className="px-6 py-6 h-auto bg-primary-500 hover:bg-primary-600 text-white" 
                asChild
              >
                <Link href="/register?role=farmer">
                  Register as a Farmer
                </Link>
              </Button>
              <Button 
                size="lg" 
                className="px-6 py-6 h-auto bg-white text-gray-900 hover:bg-gray-100" 
                asChild
              >
                <Link href="/marketplace">
                  Shop as a Consumer
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="text-primary-500 mb-3">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-sans font-semibold text-xl mb-2">1,200+</h3>
              <p className="text-gray-400">Verified Farmers</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="text-secondary-500 mb-3">
                <ShoppingBasket className="h-8 w-8" />
              </div>
              <h3 className="font-sans font-semibold text-xl mb-2">15,000+</h3>
              <p className="text-gray-400">Products Sold</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="text-accent-500 mb-3">
                <QrCode className="h-8 w-8" />
              </div>
              <h3 className="font-sans font-semibold text-xl mb-2">50,000+</h3>
              <p className="text-gray-400">QR Verifications</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="text-green-500 mb-3">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="font-sans font-semibold text-xl mb-2">20+</h3>
              <p className="text-gray-400">Regions Covered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
