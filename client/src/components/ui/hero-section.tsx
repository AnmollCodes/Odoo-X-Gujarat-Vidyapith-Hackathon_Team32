import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(`/marketplace?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className="relative bg-gradient-to-r from-primary-500 to-primary-700 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-sans font-bold text-3xl md:text-5xl leading-tight mb-4">
            Transparency from Farm to Table with Blockchain
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Connect directly with verified natural farmers. Every product's journey is transparent and traceable, ensuring authenticity and fair pricing.
          </p>
          
          {/* Search Section */}
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search for natural products..."
                    className="w-full py-3 pl-10 pr-4 rounded-lg border-0 focus:ring-2 focus:ring-primary-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute left-3 top-3 text-gray-400">
                    <Search className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <div>
                <Button 
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white"
                >
                  Find Products
                </Button>
              </div>
            </form>
          </div>
          
          {/* Product categories */}
          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
            <Link href="/marketplace?category=Vegetables">
              <a className="bg-white/20 rounded-full px-3 py-1 hover:bg-white/30 transition-colors">
                Organic Vegetables
              </a>
            </Link>
            <Link href="/marketplace?category=Honey">
              <a className="bg-white/20 rounded-full px-3 py-1 hover:bg-white/30 transition-colors">
                Natural Honey
              </a>
            </Link>
            <Link href="/marketplace?category=Millets">
              <a className="bg-white/20 rounded-full px-3 py-1 hover:bg-white/30 transition-colors">
                Millets
              </a>
            </Link>
            <Link href="/marketplace?category=Spices">
              <a className="bg-white/20 rounded-full px-3 py-1 hover:bg-white/30 transition-colors">
                Spices
              </a>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Pattern Background */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full -mr-24 -mt-24"></div>
        <div className="absolute right-48 bottom-0 w-64 h-64 bg-white rounded-full -mb-20"></div>
      </div>
    </section>
  );
}

export default HeroSection;
