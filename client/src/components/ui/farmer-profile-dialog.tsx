import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  ShieldCheck, 
  Award, 
  Clock, 
  Mail, 
  Hash, 
  Star, 
  ArrowRight, 
  CalendarDays,
  Leaf
} from "lucide-react";
import { Farmer, User } from "@shared/schema";
import { getQueryFn } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

interface FarmerProfileDialogProps {
  farmerId: number;
  isOpen: boolean;
  onClose: () => void;
}

export function FarmerProfileDialog({ farmerId, isOpen, onClose }: FarmerProfileDialogProps) {
  const [activeTab, setActiveTab] = useState<string>('profile');

  // Fetch farmer data
  const { data: farmerData, isLoading } = useQuery({
    queryKey: ['/api/farmers', farmerId],
    queryFn: getQueryFn<{farmer: Farmer; user: User}>({ on401: "returnNull" }),
    enabled: isOpen && !!farmerId
  });

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            {isLoading ? (
              <Skeleton className="h-7 w-48" />
            ) : (
              <span>{farmerData?.user?.name || "Farmer Profile"}</span>
            )}
            {farmerData?.farmer?.isVerified && (
              <Badge variant="outline" className="bg-primary-100 text-primary-800 hover:bg-primary-200 border-primary-200">
                <ShieldCheck className="mr-1 h-3 w-3" /> Verified
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {isLoading ? (
              <Skeleton className="h-4 w-full mt-2" />
            ) : (
              <span>{farmerData?.farmer?.farmName || "Natural Farmer"}</span>
            )}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="pt-4">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {isLoading ? (
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src={farmerData?.user?.profileImage || "https://placehold.co/200x200/e9e9e9/5fa058?text=F"} 
                    alt={farmerData?.user?.name || "Farmer"} 
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary-100"
                  />
                  <div>
                    <h3 className="text-xl font-medium">{farmerData?.user?.name}</h3>
                    <p className="text-gray-500">{farmerData?.farmer?.farmName}</p>
                  </div>
                </div>
              )}
              
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                </div>
              ) : (
                <>
                  <div className="bg-primary-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">About the Farmer</h4>
                    <p className="text-sm text-gray-700">
                      {farmerData?.farmer?.description || "No description available for this farmer."}
                    </p>
                  </div>
                
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <MapPin className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-gray-500">{farmerData?.user?.location || "Not specified"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <Clock className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Farming Since</p>
                        <p className="text-sm text-gray-500">{farmerData?.farmer?.farmerSince || "Not specified"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <Mail className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Contact</p>
                        <p className="text-sm text-gray-500">{farmerData?.user?.email || "Not available"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <Star className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Rating</p>
                        <p className="text-sm text-gray-500">
                          {farmerData?.farmer?.rating ? `${farmerData.farmer.rating}/5` : "Not rated yet"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <CalendarDays className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Experience</p>
                        <p className="text-sm text-gray-500">{farmerData?.farmer?.experience || "Not specified"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <Leaf className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Farming Type</p>
                        <p className="text-sm text-gray-500">Natural Farming</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="certifications" className="pt-4">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate={activeTab === "certifications" ? "visible" : "hidden"}
              className="space-y-4"
            >
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ) : farmerData?.farmer?.certifications && farmerData.farmer.certifications.length > 0 ? (
                <div className="space-y-3">
                  {farmerData.farmer.certifications.map((cert, index) => (
                    <div key={index} className="border rounded-lg p-4 flex items-start">
                      <div className="p-2 bg-green-50 rounded-full mr-4">
                        <Award className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{cert}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Verified natural farming certification
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-700">No certifications yet</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    This farmer has not uploaded any certifications
                  </p>
                </div>
              )}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="verification" className="pt-4">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate={activeTab === "verification" ? "visible" : "hidden"}
              className="space-y-4"
            >
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : farmerData?.farmer?.blockchainVerificationHash ? (
                <div className="space-y-3">
                  <div className="border rounded-lg p-4 bg-primary-50">
                    <h4 className="font-medium mb-2 flex items-center">
                      <ShieldCheck className="h-5 w-5 text-primary-600 mr-2" />
                      Blockchain Verification
                    </h4>
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-1">Verification Hash</p>
                      <p className="text-sm bg-white/80 p-2 rounded overflow-x-auto font-mono">
                        {farmerData.farmer.blockchainVerificationHash}
                      </p>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Network</p>
                        <p className="text-sm">Ethereum Mainnet</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <Badge className="mt-1 bg-green-100 text-green-800 hover:bg-green-200">
                          Verified
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Hash className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-700">Not verified on blockchain</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    This farmer has not completed blockchain verification yet
                  </p>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex sm:justify-between mt-6">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button asChild>
            <Link href={`/marketplace?farmerId=${farmerId}`}>
              View Products <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FarmerProfileDialog;