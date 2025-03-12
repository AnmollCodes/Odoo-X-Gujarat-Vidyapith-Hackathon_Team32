import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import QrScanner from "@/components/ui/qr-scanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  QrCode, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Link as LinkIcon, 
  UserCircle, 
  Calendar,
  Check,
  X,
  Loader
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Product, Farmer, User, Verification } from "@shared/schema";
import { verifyProductOnBlockchain, VerificationResult } from "@/lib/blockchain";

export default function Verify() {
  const [, setLocation] = useLocation();
  const [productId, setProductId] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Parse location query params for productId
  const params = new URLSearchParams(window.location.search);
  const queryProductId = params.get("productId");
  
  // If productId is provided in URL and we haven't set it yet, use it
  if (queryProductId && !productId && !scannedData) {
    setProductId(queryProductId);
    // Trigger verification automatically
    handleVerify(queryProductId);
  }
  
  // Fetch product data if we have a scanned product ID
  const extractProductId = (data: string): string | null => {
    // Expected format: product_123_verification
    const match = data.match(/product_(\d+)_verification/);
    return match ? match[1] : null;
  };
  
  const { data: productData, isLoading: isLoadingProduct } = useQuery<{
    product: Product;
    farmer: Farmer;
    user: User;
    verifications: Verification[];
  }>({
    queryKey: [`/api/products/${extractProductId(scannedData || '')}`],
    enabled: !!scannedData && !!extractProductId(scannedData),
  });
  
  // Handle QR code scan
  const handleScan = (data: string) => {
    setScannedData(data);
    
    const productId = extractProductId(data);
    if (productId) {
      setProductId(productId);
      handleVerify(productId);
    } else {
      toast({
        title: "Invalid QR Code",
        description: "This QR code doesn't contain valid product verification data.",
        variant: "destructive"
      });
    }
  };
  
  // Handle manual verification
  const handleVerify = async (id: string = productId) => {
    if (!id) {
      toast({
        title: "No Product ID",
        description: "Please enter a product ID to verify.",
        variant: "destructive"
      });
      return;
    }
    
    setIsVerifying(true);
    try {
      const result = await verifyProductOnBlockchain(parseInt(id));
      setVerificationResult(result);
      
      if (result.isVerified) {
        toast({
          title: "Verification Successful",
          description: "This product has been verified on the blockchain.",
          variant: "default"
        });
      } else {
        toast({
          title: "Verification Failed",
          description: result.error || "This product could not be verified on the blockchain.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error verifying product:", error);
      toast({
        title: "Verification Error",
        description: "An error occurred while trying to verify this product.",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };
  
  // Navigate to product page
  const viewProduct = () => {
    if (productId) {
      setLocation(`/product/${productId}`);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Blockchain Verification</h1>
              <p className="text-gray-600">
                Verify the authenticity of natural farming products using our blockchain technology.
              </p>
            </div>
            
            <Tabs defaultValue="scan" className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="scan">
                  <QrCode className="mr-2 h-4 w-4" />
                  Scan QR Code
                </TabsTrigger>
                <TabsTrigger value="manual">
                  <Search className="mr-2 h-4 w-4" />
                  Enter Product ID
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="scan" className="mt-4">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Scan Product QR Code</h2>
                  <QrScanner onScan={handleScan} />
                </div>
              </TabsContent>
              
              <TabsContent value="manual" className="mt-4">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Enter Product ID</h2>
                  <div className="flex space-x-2 mb-4">
                    <Input 
                      type="text" 
                      placeholder="Enter product ID" 
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                    <Button 
                      onClick={() => handleVerify()}
                      disabled={isVerifying || !productId}
                    >
                      {isVerifying ? <Loader className="h-4 w-4 animate-spin" /> : "Verify"}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    Enter the product ID found on the product label or packaging.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Verification Results */}
            {(verificationResult || isLoadingProduct) && (
              <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Verification Results</h2>
                
                {isLoadingProduct ? (
                  <div className="text-center py-8">
                    <Loader className="h-8 w-8 mx-auto mb-4 animate-spin text-primary-500" />
                    <p className="text-gray-600">Loading product information...</p>
                  </div>
                ) : productData ? (
                  <div className="space-y-6">
                    {/* Verification Status */}
                    <div className={`border rounded-xl p-4 flex items-center space-x-3 ${
                      verificationResult?.isVerified 
                        ? "bg-green-50 border-green-100" 
                        : "bg-red-50 border-red-100"
                    }`}>
                      <div className={`${
                        verificationResult?.isVerified
                          ? "bg-green-500" 
                          : "bg-red-500"
                      } text-white rounded-full p-2`}>
                        {verificationResult?.isVerified 
                          ? <Check className="h-6 w-6" /> 
                          : <X className="h-6 w-6" />
                        }
                      </div>
                      <div>
                        <h3 className={`${
                          verificationResult?.isVerified
                            ? "text-green-800" 
                            : "text-red-800"
                        } font-medium`}>
                          {verificationResult?.isVerified 
                            ? "Product Verified on Blockchain" 
                            : "Product Verification Failed"
                          }
                        </h3>
                        <p className={`text-sm ${
                          verificationResult?.isVerified
                            ? "text-green-700" 
                            : "text-red-700"
                        }`}>
                          {verificationResult?.isVerified 
                            ? `Verified on ${verificationResult.network} at block #${verificationResult.blockNumber}`
                            : verificationResult?.error || "This product could not be verified on the blockchain."
                          }
                        </p>
                      </div>
                    </div>
                    
                    {/* Product Information */}
                    <div className="border border-gray-100 rounded-xl p-4">
                      <div className="flex items-center mb-4">
                        <img 
                          src={productData.product.imageUrl || "https://placehold.co/80x80/e9e9e9/5fa058?text=No+Image"} 
                          alt={productData.product.name} 
                          className="w-16 h-16 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">{productData.product.name}</h3>
                          <p className="text-sm text-gray-500">ID: {productData.product.id}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="ml-auto"
                          onClick={viewProduct}
                        >
                          View Product <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-500">Price</span>
                          <span className="font-medium">₹{productData.product.price} / {productData.product.unit}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-500">Category</span>
                          <span className="font-medium">{productData.product.category}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-500">Farming Method</span>
                          <span className="font-medium">{productData.product.farmingMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Harvest Date</span>
                          <span className="font-medium">
                            {productData.product.harvestDate 
                              ? new Date(productData.product.harvestDate).toLocaleDateString() 
                              : "Not specified"
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Blockchain Information */}
                    {verificationResult?.isVerified && (
                      <div className="border border-gray-100 rounded-xl p-4">
                        <h3 className="font-medium mb-3 flex items-center">
                          <LinkIcon className="text-accent-500 mr-2 h-5 w-5" /> Blockchain Details
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Transaction Hash</span>
                            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
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
                              {verificationResult.timestamp
                                ? new Date(verificationResult.timestamp).toLocaleString()
                                : "Unknown"
                              }
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                          <Button variant="outline" size="sm" asChild>
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
                    )}
                    
                    {/* Farmer Information */}
                    <div className="border border-gray-100 rounded-xl p-4">
                      <h3 className="font-medium mb-3 flex items-center">
                        <UserCircle className="text-secondary-500 mr-2 h-5 w-5" /> Farmer Details
                      </h3>
                      <div className="flex items-center space-x-3 mb-3">
                        <img 
                          src={productData.user.profileImage || "https://placehold.co/100x100/e9e9e9/5fa058?text=No+Image"} 
                          alt={productData.user.name} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-secondary-100"
                        />
                        <div>
                          <h4 className="font-medium">{productData.user.name}</h4>
                          <p className="text-xs text-gray-500">{productData.user.location}</p>
                        </div>
                        {productData.farmer.isVerified && (
                          <div className="ml-auto bg-primary-50 text-primary-500 text-xs rounded-full px-2 py-1">
                            <ShieldCheck className="h-3 w-3 inline mr-1" /> Certified
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-2 space-y-2 text-sm">
                        {productData.farmer.certifications && productData.farmer.certifications.length > 0 && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Certifications</span>
                            <span className="font-medium">{productData.farmer.certifications.join(", ")}</span>
                          </div>
                        )}
                        {productData.farmer.farmerSince && (
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Farming Since</span>
                            <span className="font-medium">{productData.farmer.farmerSince}</span>
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-3"
                        asChild
                      >
                        <a href={`/farmer/${productData.farmer.id}`}>
                          View Farmer Profile
                        </a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                    <h3 className="text-lg font-medium text-yellow-800 mb-2">Product Not Found</h3>
                    <p className="text-yellow-700 mb-4">
                      We couldn't find a product with the given ID. Please check the ID and try again.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* How Verification Works */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">How Blockchain Verification Works</h2>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">1</div>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-lg text-gray-800 mb-2">Scan the QR Code</h3>
                    <p className="text-gray-600">Every verified product has a unique QR code that links to its blockchain record.</p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">2</div>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-lg text-gray-800 mb-2">Verify on Blockchain</h3>
                    <p className="text-gray-600">Our system checks the immutable blockchain record to confirm authenticity.</p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">3</div>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-lg text-gray-800 mb-2">View Product Details</h3>
                    <p className="text-gray-600">Access complete information about the product, including its origin and farming methods.</p>
                  </div>
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
