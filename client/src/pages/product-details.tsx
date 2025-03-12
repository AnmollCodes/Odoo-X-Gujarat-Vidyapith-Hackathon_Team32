import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QrCode from "@/components/ui/qr-code";
import { 
  Skeleton,
  Separator
} from "@/components/ui/skeleton";
import { 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Star, 
  Link as LinkIcon,
  Info, 
  ShoppingCart, 
  ArrowLeft,
  Award,
  Leaf,
  Check
} from "lucide-react";
import { Product, Farmer, User } from "@shared/schema";
import { useState, useEffect } from "react";
import { verifyProductOnBlockchain, type VerificationResult } from "@/lib/blockchain";
import ProductList from "@/components/ui/product-list";

// Types for the API responses
interface ProductDetailsData {
  product: Product;
  farmer: Farmer;
  user: User;
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Fetch product data with related farmer information
  const { data, isLoading, error } = useQuery<ProductDetailsData>({
    queryKey: [`/api/products/${id}`],
  });
  
  // Verify product on blockchain when data is loaded
  useEffect(() => {
    const verifyProduct = async () => {
      if (data?.product && !verificationResult && !isVerifying) {
        setIsVerifying(true);
        try {
          const result = await verifyProductOnBlockchain(data.product.id);
          setVerificationResult(result);
        } catch (error) {
          console.error("Error verifying product:", error);
        } finally {
          setIsVerifying(false);
        }
      }
    };
    
    verifyProduct();
  }, [data, verificationResult, isVerifying]);
  
  // Handle quantity changes
  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));
  
  // Format date
  const formatDate = (dateString?: Date | string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Skeleton className="h-6 w-24" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Image Skeleton */}
              <div>
                <Skeleton className="w-full aspect-square rounded-xl" />
              </div>
              
              {/* Product Info Skeleton */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-5 w-1/2 mb-6" />
                
                <Skeleton className="h-6 w-1/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                
                <Skeleton className="h-10 w-full mb-6" />
                
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
                
                <div className="mt-8 flex space-x-4">
                  <Skeleton className="h-12 w-1/3" />
                  <Skeleton className="h-12 w-2/3" />
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
  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
              <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Product</h2>
              <p className="text-red-700 mb-4">
                We couldn't load this product's information. Please try again later.
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
  
  const { product, farmer, user } = data;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="p-0 h-auto">
              <Link href="/marketplace">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Link>
            </Button>
          </div>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Product Image */}
            <div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="relative">
                  <img 
                    src={product.imageUrl || "https://placehold.co/800x800/e9e9e9/5fa058?text=No+Image"} 
                    alt={product.name} 
                    className="w-full object-cover rounded-lg aspect-square"
                  />
                  
                  {product.isVerified && (
                    <div className="absolute top-4 right-4 bg-primary-500 text-white text-xs font-bold uppercase rounded-full px-3 py-1 flex items-center">
                      <ShieldCheck className="h-3 w-3 mr-1" /> Verified
                    </div>
                  )}
                </div>
                
                {/* Certification Tags */}
                {product.certifications && product.certifications.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.certifications.map((cert, index) => (
                      <div key={index} className="bg-green-50 text-green-700 text-xs rounded-full px-3 py-1 flex items-center">
                        <Award className="h-3 w-3 mr-1" /> {cert}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{product.name}</h1>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-gray-600">{product.location}</span>
                  <div className="ml-4 flex items-center bg-gray-100 rounded-lg px-2 py-1">
                    <Star className="text-yellow-500 mr-1 h-3 w-3" />
                    <span className="text-sm font-medium">4.8</span> {/* This would be dynamic in a real app */}
                  </div>
                </div>
              </div>
              
              <div className="text-primary-500 text-2xl font-bold mb-4">
                ₹{product.price} <span className="text-sm text-gray-500 font-normal">/ {product.unit}</span>
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              {/* Product Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Farming Method</span>
                  <span className="font-medium">{product.farmingMethod}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Harvest Date</span>
                  <span className="font-medium">{formatDate(product.harvestDate)}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Farmer</span>
                  <Link href={`/farmer/${farmer.id}`}>
                    <a className="font-medium text-primary-500 hover:underline">{user.name}</a>
                  </Link>
                </div>
              </div>
              
              {/* Product Actions */}
              <div className="flex items-center mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mr-4">
                  <button 
                    onClick={decreaseQuantity}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600"
                  >
                    -
                  </button>
                  <div className="px-4 py-2">{quantity}</div>
                  <button 
                    onClick={increaseQuantity}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600"
                  >
                    +
                  </button>
                </div>
                
                <Button className="flex-1" size="lg">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
              
              {/* Blockchain Verification Status */}
              {isVerifying ? (
                <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div>
                    <p className="font-medium">Verifying on blockchain...</p>
                    <p className="text-xs text-gray-500">Please wait while we check the verification status</p>
                  </div>
                </div>
              ) : verificationResult?.isVerified ? (
                <div className="bg-green-50 p-4 rounded-lg flex items-center space-x-3">
                  <div className="bg-green-500 text-white rounded-full p-2">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Blockchain Verified</p>
                    <p className="text-xs text-green-700">
                      Verified on {verificationResult.network} at block #{verificationResult.blockNumber}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 p-4 rounded-lg flex items-center space-x-3">
                  <div className="bg-yellow-500 text-white rounded-full p-2">
                    <Info className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-yellow-800">Verification Pending</p>
                    <p className="text-xs text-yellow-700">
                      {verificationResult?.error || "This product has not been verified on the blockchain yet."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Tabs for more product information */}
          <Tabs defaultValue="details" className="mb-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="farmer">Farmer Information</TabsTrigger>
              <TabsTrigger value="verification">Blockchain Verification</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">About {product.name}</h2>
                
                <div className="prose max-w-none text-gray-700 mb-6">
                  <p>{product.description}</p>
                  <p>This {product.name} is grown using {product.farmingMethod} in the farms of {product.location}.</p>
                </div>
                
                {product.certifications && product.certifications.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="font-medium mb-3 text-gray-800">Certifications</h3>
                    <div className="space-y-3">
                      {product.certifications.map((cert, index) => (
                        <div key={index} className="flex items-start">
                          <Award className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                          <div>
                            <div className="font-medium">{cert}</div>
                            <div className="text-sm text-gray-500">
                              Verified natural farming certification
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-medium mb-3 text-gray-800">Farming Practices</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Leaf className="h-5 w-5 mr-2 text-primary-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Natural Farming Methods</div>
                        <div className="text-sm text-gray-500">
                          No chemical pesticides or fertilizers
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Quality Controlled</div>
                        <div className="text-sm text-gray-500">
                          Each product is inspected for quality
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="farmer" className="mt-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start space-x-4 mb-6">
                  <img 
                    src={user.profileImage || "https://placehold.co/100x100/e9e9e9/5fa058?text=No+Image"} 
                    alt={user.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                    <p className="text-gray-600">{farmer.farmName || "Natural Farmer"}</p>
                    <Link href={`/farmer/${farmer.id}`}>
                      <a className="text-primary-500 text-sm hover:underline mt-1 inline-block">
                        View Full Profile
                      </a>
                    </Link>
                  </div>
                  
                  {farmer.isVerified && (
                    <div className="ml-auto bg-primary-50 text-primary-500 text-xs font-medium rounded-full px-3 py-1 flex items-center">
                      <ShieldCheck className="h-3 w-3 mr-1" /> Verified
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-gray-700 mb-1">
                      <MapPin className="h-4 w-4 mr-2 text-primary-500" />
                      <h3 className="font-medium text-sm">Location</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{user.location || "Location not specified"}</p>
                  </div>
                  
                  {farmer.certifications && farmer.certifications.length > 0 && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-gray-700 mb-1">
                        <Award className="h-4 w-4 mr-2 text-primary-500" />
                        <h3 className="font-medium text-sm">Certifications</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{farmer.certifications[0]}</p>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-gray-700 mb-1">
                      <Calendar className="h-4 w-4 mr-2 text-primary-500" />
                      <h3 className="font-medium text-sm">Experience</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {farmer.farmerSince ? `Farming since ${farmer.farmerSince}` : farmer.experience || "Experience not specified"}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-medium mb-3 text-gray-800">About the Farmer</h3>
                  <p className="text-gray-700 mb-4">
                    {farmer.description || `${user.name} is a dedicated natural farmer based in ${user.location || "India"}. They specialize in producing high-quality natural farm products using sustainable farming practices.`}
                  </p>
                  
                  <Button asChild>
                    <Link href={`/farmer/${farmer.id}`}>
                      View All Products from this Farmer
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="verification" className="mt-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Blockchain Verification</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    {isVerifying ? (
                      <div className="text-center py-8">
                        <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                        <p className="text-gray-500">Verifying product on blockchain...</p>
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
                          {verificationResult?.error || "This product has not been verified on the blockchain yet."}
                        </p>
                        <Button>
                          Request Verification
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {/* QR Code Section */}
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="font-medium mb-4 text-gray-800">Product QR Code</h3>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <QrCode 
                        data={`product_${product.id}_verification`} 
                        size={200}
                      />
                    </div>
                    <p className="mt-4 text-sm text-gray-500 max-w-xs text-center">
                      Scan this QR code with the AgriChain app to verify this product's authenticity on the blockchain.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Similar Products */}
          <ProductList 
            title="Similar Products" 
            category={product.category}
            limit={4}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
