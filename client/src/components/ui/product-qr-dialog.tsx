import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode } from "@/components/ui/qr-code";
import { Leaf, Calendar, ShieldCheck, MapPin, Package, Tag, Clock, ArrowRight } from "lucide-react";
import { Product, Farmer, User } from "@shared/schema";
import { getQueryFn } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

interface ProductQrDialogProps {
  productId: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductQrDialog({ productId, isOpen, onClose }: ProductQrDialogProps) {
  const [activeTab, setActiveTab] = useState<'product' | 'verification'>('product');

  // Fetch product data
  const { data: productData, isLoading: productLoading } = useQuery({
    queryKey: ['/api/products', productId],
    queryFn: getQueryFn<{product: Product; farmer: Farmer; user: User}>({ on401: "returnNull" }),
    enabled: isOpen && !!productId
  });

  // Fetch verification data
  const { data: verifications, isLoading: verificationsLoading } = useQuery({
    queryKey: ['/api/verifications/entity', 'product', productId],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: isOpen && !!productId && activeTab === 'verification'
  });

  // Animation variants
  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary-500" />
            {productLoading ? (
              <Skeleton className="h-7 w-48" />
            ) : (
              <span>{productData?.product?.name || "Product Information"}</span>
            )}
          </DialogTitle>
          <DialogDescription>
            Scan this QR code to verify the authenticity of this product on the blockchain
          </DialogDescription>
        </DialogHeader>

        <div className="flex overflow-x-auto py-2 mb-4 border-b">
          <Button 
            variant={activeTab === 'product' ? "default" : "ghost"} 
            className="rounded-full text-sm mr-2"
            onClick={() => setActiveTab('product')}
          >
            Product Details
          </Button>
          <Button 
            variant={activeTab === 'verification' ? "default" : "ghost"} 
            className="rounded-full text-sm"
            onClick={() => setActiveTab('verification')}
          >
            Blockchain Verification
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'product' && (
            <motion.div
              key="product-tab"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              <div className="flex justify-center mb-6">
                <div className="flex flex-col items-center">
                  <QrCode 
                    data={`agrichain://product/${productId}`} 
                    size={180}
                    downloadable={true}
                  />
                </div>
              </div>
              
              {productLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <>
                  <p className="text-gray-700 text-sm">
                    {productData?.product?.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {productData?.product?.location || "Location not available"}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        ₹{productData?.product?.price} / {productData?.product?.unit}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Leaf className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {productData?.product?.farmingMethod || "Natural Farming"}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {productData?.product?.harvestDate 
                          ? new Date(productData.product.harvestDate).toLocaleDateString() 
                          : "Harvest date not available"}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Package className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        Standard packaging
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        Shelf life not specified
                      </span>
                    </div>
                  </div>
                  
                  {productData?.product?.isVerified && (
                    <div className="flex items-center my-4 p-2 bg-primary-50 rounded-lg">
                      <div className="mr-3 bg-primary-100 p-2 rounded-full">
                        <ShieldCheck className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary-700">
                          Blockchain Verified
                        </p>
                        <p className="text-xs text-primary-600">
                          This product has been verified on the blockchain for authenticity
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {productData?.farmer && (
                    <div className="border rounded-lg p-3 mt-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <img 
                            src={productData?.user?.profileImage || "https://placehold.co/100x100/e9e9e9/5fa058?text=F"} 
                            alt={productData?.user?.name || "Farmer"} 
                            className="w-10 h-10 rounded-full mr-3 object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{productData?.user?.name}</p>
                            <p className="text-xs text-gray-500">{productData?.farmer?.farmName}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs" asChild>
                          <Link href={`/farmer/${productData?.farmer?.id || 0}`}>
                            View Farmer <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
          
          {activeTab === 'verification' && (
            <motion.div
              key="verification-tab"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              <div className="flex justify-center mb-6">
                <div className="flex flex-col items-center">
                  <QrCode 
                    data={`agrichain://verify/${productId}`} 
                    size={150} 
                    downloadable={true}
                  />
                </div>
              </div>
              
              {verificationsLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ) : Array.isArray(verifications) && verifications.length > 0 ? (
                <div className="space-y-3">
                  {verifications.map((verification: any, index: number) => (
                    <div key={index} className="border rounded-lg p-3 relative">
                      <Badge className="absolute top-3 right-3 bg-green-100 text-green-800 hover:bg-green-200">
                        Block #{verification.blockNumber}
                      </Badge>
                      <h4 className="font-medium">Transaction Hash</h4>
                      <p className="text-xs bg-gray-100 p-2 rounded overflow-x-auto my-1 font-mono">
                        {verification.transactionHash}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                        <div>
                          <span className="text-gray-500 text-xs">Network</span>
                          <p>{verification.network}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-xs">Verified At</span>
                          <p>{new Date(verification.verifiedAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShieldCheck className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-700">No verifications yet</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    This product has not been verified on the blockchain
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <DialogFooter className="flex sm:justify-between mt-6">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button asChild>
            <Link href={`/product/${productId}`}>View Full Details</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProductQrDialog;