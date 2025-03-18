import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, Award, Clock, ShieldCheck } from "lucide-react";
import { User, Farmer } from "@shared/schema";
import { FarmerProfileDialog } from "@/components/ui/farmer-profile-dialog";

interface FarmerCardProps {
  farmer: Farmer;
  user: User;
}

export function FarmerCard({ farmer, user }: FarmerCardProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-transform hover:shadow-lg hover:-translate-y-1">
        <div 
          className="h-40 bg-gradient-to-r from-primary-500/20 to-primary-600/20 relative cursor-pointer"
          onClick={() => setIsProfileOpen(true)}
        >
          <div className="absolute -bottom-10 left-6">
            <img 
              src={user?.profileImage || "https://placehold.co/300x300/e9e9e9/5fa058?text=No+Image"} 
              alt={user?.name || "Farmer"} 
              className="w-20 h-20 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>
        <div className="pt-12 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="cursor-pointer" onClick={() => setIsProfileOpen(true)}>
              <h3 className="font-sans font-semibold text-lg text-gray-800 hover:text-primary-600">
                {user?.name || "Farmer"}
              </h3>
              <p className="text-sm text-gray-500">{farmer?.farmName || "Natural Farmer"}</p>
            </div>
            {farmer?.isVerified && (
              <div className="bg-primary-50 text-primary-500 text-xs font-medium rounded-full px-3 py-1 flex items-center">
                <ShieldCheck className="h-3 w-3 mr-1" /> Verified
              </div>
            )}
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 ml-2">{user?.location || "Location not specified"}</span>
            </div>
            {farmer?.certifications && farmer.certifications.length > 0 && (
              <div className="flex items-center text-sm">
                <Award className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 ml-2">{farmer.certifications[0]}</span>
              </div>
            )}
            {farmer?.farmerSince && (
              <div className="flex items-center text-sm">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 ml-2">Farming since {farmer.farmerSince}</span>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setIsProfileOpen(true)}>
              View Profile
            </Button>
            <Button className="flex-1" asChild>
              <Link href={`/marketplace?farmerId=${farmer?.id || 0}`}>Shop Products</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <FarmerProfileDialog 
        farmerId={farmer.id} 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
}

export default FarmerCard;
