import { useQuery } from "@tanstack/react-query";
import { Farmer, User } from "@shared/schema";
import FarmerCard from "./farmer-card";
import { Skeleton } from "@/components/ui/skeleton";

interface FarmerData extends Farmer {
  user: User;
}

export function FarmerList() {
  const { data: farmers, isLoading, error } = useQuery<FarmerData[]>({
    queryKey: ["/api/farmers"],
  });

  // Loading skeletons for the farmer cards
  if (isLoading) {
    return (
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-2xl md:text-4xl text-gray-800 mb-4">Meet Our Verified Farmers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Every farmer on our platform is thoroughly verified to ensure they follow sustainable natural farming practices.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                <Skeleton className="h-40 w-full" />
                <div className="p-6 pt-12 relative">
                  <div className="absolute -top-10 left-6">
                    <Skeleton className="w-20 h-20 rounded-full border-4 border-white" />
                  </div>
                  <Skeleton className="h-6 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-6" />
                  <div className="space-y-3 mb-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="flex space-x-2 mt-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-2xl md:text-4xl text-gray-800 mb-4">Meet Our Verified Farmers</h2>
          </div>
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            Error loading farmers. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  // No farmers available
  if (!farmers || farmers.length === 0) {
    return (
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-2xl md:text-4xl text-gray-800 mb-4">Meet Our Verified Farmers</h2>
          </div>
          <div className="bg-gray-100 text-gray-700 p-8 rounded-lg text-center">
            No farmers available at this time.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-sans font-bold text-2xl md:text-4xl text-gray-800 mb-4">Meet Our Verified Farmers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Every farmer on our platform is thoroughly verified to ensure they follow sustainable natural farming practices.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {farmers.map((farmerData) => (
            <FarmerCard key={farmerData.id} farmer={farmerData} user={farmerData.user} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FarmerList;
