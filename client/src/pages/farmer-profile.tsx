import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import ProductList from "@/components/ui/product-list";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Award, 
  Calendar, 
  ShieldCheck, 
  Star, 
  Link as LinkIcon,
  User as UserIcon,
  Phone,
  Mail
} from "lucide-react";
import { Farmer, User, Product } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { verifyFarmerOnBlockchain, type VerificationResult } from "@/lib/blockchain";
import { useState, useEffect } from "react";

interface FarmerProfileData {
  farmer: Farmer;
  user: User;
}

export default function FarmerProfile() {
  const { id } = useParams<{ id: string }>();
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Fetch farmer data
  const { data: farmerData, isLoading: isLoadingFarmer, error: farmerError } = useQuery<FarmerProfileData>({
    queryKey: [`/api/farmers/${id}`],
  });
  
  // Verify farmer on blockchain
  useEffect(() => {
    const verifyFarmer = async () => {
      if (farmerData && !verificationResult && !isVerifying) {
        setIsVerifying(true);
        try {
          const result = await verifyFarmerOnBlockchain(farmerData.farmer.id);
          setVerificationResult(result);
        } catch (error) {
          console.error("Error verifying farmer:", error);
        } finally {
          setIsVerifying(false);
        }
      }
    };
    
    verifyFarmer();
  }, [farmerData, verificationResult, isVerifying]);
  
  // Loading state
  if (isLoadingFarmer) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-primary-500/20 to-primary-600/20">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="relative p-6">
                <div className="absolute -top-16 left-6">
                  <Skeleton className="h-32 w-32 rounded-full border-4 border-white" />
                </div>
                <div className="pt-16">
                  <Skeleton className="h-8 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-1/4 mb-6" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Error state
  if (farmerError || !farmerData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
              <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Farmer Profile</h2>
              <p className="text-red-700 mb-4">
                We couldn't load this farmer's information. Please try again later.
              </p>
              <Button asChild>
                <Link href="/marketplace">Return to Marketplace</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const { farmer, user } = farmerData;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Farmer Profile Header */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="h-48 bg-gradient-to-r from-primary-500/20 to-primary-600/20 relative">
              {farmer.isVerified && (
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-primary-500 text-sm font-medium rounded-full px-4 py-1 flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-1" /> Verified Natural Farmer
                </div>
              )}
            </div>
            
            <div className="relative p-6">
              <div className="absolute -top-16 left-6">
                <img 
                  src={user.profileImage || "https://placehold.co/200x200/e9e9e9/5fa058?text=No+Image"} 
                  alt={user.name} 
                  className="h-32 w-32 rounded-full border-4 border-white object-cover"
                />
              </div>
              
              <div className="pt-16 pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                    <p className="text-gray-600">{farmer.farmName || "Natural Farmer"}</p>
                  </div>
                  <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
                    <Star className="text-yellow-500 h-4 w-4 mr-1" />
                    <span className="font-medium">{farmer.rating?.toFixed(1) || "New"}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {/* Location */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-700 mb-2">
                      <MapPin className="h-5 w-5 mr-2 text-primary-500" />
                      <h3 className="font-medium">Location</h3>
                    </div>
                    <p className="text-gray-600">{user.location || "Location not specified"}</p>
                  </div>
                  
                  {/* Certifications */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-700 mb-2">
                      <Award className="h-5 w-5 mr-2 text-primary-500" />
                      <h3 className="font-medium">Certifications</h3>
                    </div>
                    {farmer.certifications && farmer.certifications.length > 0 ? (
                      <ul className="text-gray-600 space-y-1">
                        {farmer.certifications.map((cert, index) => (
                          <li key={index}>{cert}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">No certifications listed</p>
                    )}
                  </div>
                  
                  {/* Experience */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-700 mb-2">
                      <Calendar className="h-5 w-5 mr-2 text-primary-500" />
                      <h3 className="font-medium">Experience</h3>
                    </div>
                    {farmer.farmerSince ? (
                      <p className="text-gray-600">Farming since {farmer.farmerSince}</p>
                    ) : (
                      <p className="text-gray-600">{farmer.experience || "Experience not specified"}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs for Products, About, and Blockchain Verification */}
          <Tabs defaultValue="products" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="verification">Blockchain Verification</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="mt-6">
              <ProductList 
                title={`Products by ${user.name}`} 
                farmerId={farmer.id} 
                showViewAll={false}
              />
            </TabsContent>
            
            <TabsContent value="about" className="mt-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">About the Farmer</h2>
                
                <div className="prose max-w-none text-gray-700">
                  <p>{farmer.description || "No description provided by the farmer."}</p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-medium mb-3 text-gray-800">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-5 w-5 mr-3 text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-5 w-5 mr-3 text-gray-400" />
                      <span>+91 9876543210</span> {/* This would be dynamic in a real app */}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <UserIcon className="h-5 w-5 mr-3 text-gray-400" />
                      <span>Member since {user.createdAt ? new Date(user.createdAt.toString()).getFullYear() : "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="verification" className="mt-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Blockchain Verification</h2>
                
                {isVerifying ? (
                  <div className="text-center py-8">
                    <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                    <p className="text-gray-500">Verifying farmer on blockchain...</p>
                  </div>
                ) : verificationResult?.isVerified ? (
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center space-x-3">
                      <div className="bg-green-500 text-white rounded-full p-2">
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-green-800 font-medium">Verified on Blockchain</h3>
                        <p className="text-sm text-green-700">
                          Last verified: {new Date(verificationResult.timestamp!).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="border border-gray-100 rounded-xl p-4">
                      <h3 className="font-medium mb-3 flex items-center">
                        <LinkIcon className="text-accent-500 mr-2 h-5 w-5" /> Blockchain Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-500">Transaction Hash</span>
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                            {verificationResult.transactionHash}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-500">Block Number</span>
                          <span className="font-medium">{verificationResult.blockNumber?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-500">Network</span>
                          <span className="font-medium">{verificationResult.network}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Verification Time</span>
                          <span className="font-medium">
                            {new Date(verificationResult.timestamp!).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-100 rounded-xl p-4">
                      <h3 className="font-medium mb-3">Certification Details</h3>
                      <div className="space-y-3">
                        {farmer.certifications?.map((cert, index) => (
                          <div key={index} className="flex items-start border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                            <Award className="h-5 w-5 mr-2 text-secondary-500 mt-0.5" />
                            <div>
                              <div className="font-medium">{cert}</div>
                              <div className="text-sm text-gray-500">Verified on blockchain</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Button variant="outline" asChild>
                        <a 
                          href={`https://etherscan.io/tx/${verificationResult.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LinkIcon className="mr-2 h-4 w-4" />
                          View on Etherscan
                        </a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                    <h3 className="text-lg font-medium text-yellow-800 mb-2">Not Verified</h3>
                    <p className="text-yellow-700 mb-4">
                      {verificationResult?.error || "This farmer's profile has not been verified on the blockchain yet."}
                    </p>
                    <Button>
                      Request Verification
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
