import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import ProductCard from "@/components/ui/product-card";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Marketplace() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFarmerId, setSelectedFarmerId] = useState<number | null>(null);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
  // Parse URL parameters on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1]);
    const categoryParam = params.get("category");
    const farmerIdParam = params.get("farmerId");
    const searchParam = params.get("search");
    
    if (categoryParam) setSelectedCategory(categoryParam);
    if (farmerIdParam) setSelectedFarmerId(parseInt(farmerIdParam));
    if (searchParam) setSearchQuery(searchParam);
  }, [location]);
  
  // Construct the API URL based on filters
  const getApiUrl = () => {
    if (searchQuery) {
      return `/api/products/search?q=${encodeURIComponent(searchQuery)}`;
    }
    
    const queryParams = new URLSearchParams();
    if (selectedCategory) queryParams.append("category", selectedCategory);
    if (selectedFarmerId) queryParams.append("farmerId", selectedFarmerId.toString());
    
    return `/api/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  };
  
  // Fetch products based on filters
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: [getApiUrl()],
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Refresh the query with the new search term
    // In a real app, you might want to update the URL as well
  };
  
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedFarmerId(null);
    setSearchQuery("");
  };
  
  // Categories for filtering
  const categories = [
    "Vegetables",
    "Fruits",
    "Grains",
    "Spices",
    "Honey",
    "Dairy",
    "Millets"
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Natural Farming Marketplace</h1>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters - Sidebar */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-9 lg:hidden" 
                    onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                  >
                    {filterMenuOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
                
                <div className={`space-y-4 ${filterMenuOpen || window.innerWidth >= 1024 ? 'block' : 'hidden lg:block'}`}>
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                    <form onSubmit={handleSearch} className="relative">
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-8"
                      />
                      <Button 
                        type="submit" 
                        variant="ghost" 
                        size="sm" 
                        className="absolute right-0 top-0 h-full"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                  
                  {/* Categories */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`category-${category}`}
                            checked={selectedCategory === category}
                            onChange={() => 
                              setSelectedCategory(selectedCategory === category ? null : category)
                            }
                            className="h-4 w-4 text-primary-500 rounded focus:ring-primary-500"
                          />
                          <label 
                            htmlFor={`category-${category}`}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range (simplified for demo) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        className="w-1/2"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        className="w-1/2"
                      />
                    </div>
                  </div>
                  
                  {/* Filter actions */}
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={clearFilters}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="flex-grow">
              {/* Active filters display */}
              {(selectedCategory || selectedFarmerId || searchQuery) && (
                <div className="bg-white p-3 rounded-lg shadow-sm mb-4 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 mr-2">Active Filters:</span>
                  
                  {selectedCategory && (
                    <div className="bg-primary-50 text-primary-700 text-xs rounded-full px-3 py-1 flex items-center">
                      Category: {selectedCategory}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-4 w-4 ml-1 p-0" 
                        onClick={() => setSelectedCategory(null)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  
                  {selectedFarmerId && (
                    <div className="bg-primary-50 text-primary-700 text-xs rounded-full px-3 py-1 flex items-center">
                      Farmer ID: {selectedFarmerId}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-4 w-4 ml-1 p-0" 
                        onClick={() => setSelectedFarmerId(null)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  
                  {searchQuery && (
                    <div className="bg-primary-50 text-primary-700 text-xs rounded-full px-3 py-1 flex items-center">
                      Search: {searchQuery}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-4 w-4 ml-1 p-0" 
                        onClick={() => setSearchQuery("")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-auto" 
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                </div>
              )}
              
              {/* Products grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(6).fill(0).map((_, index) => (
                    <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                      <Skeleton className="w-full h-48" />
                      <div className="p-4">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-3" />
                        <Skeleton className="h-3 w-1/3 mb-4" />
                        <div className="flex justify-between items-center">
                          <Skeleton className="h-6 w-1/4" />
                          <div className="flex space-x-2">
                            <Skeleton className="h-8 w-8 rounded-lg" />
                            <Skeleton className="h-8 w-8 rounded-lg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                  Error loading products. Please try again later.
                </div>
              ) : products && products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className="text-gray-400 mb-4">
                    <Filter className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search criteria to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
