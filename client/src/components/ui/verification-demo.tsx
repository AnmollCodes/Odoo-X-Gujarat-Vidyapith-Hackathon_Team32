import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { QrCode, Check, Link as LinkIcon, UserCircle } from "lucide-react";

export function VerificationDemo() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-sans font-bold text-2xl md:text-4xl text-gray-800 mb-4">Verify Products in Seconds</h2>
          <p className="text-gray-600 mb-6">Our blockchain verification system makes it easy to trace a product's journey from farm to table, ensuring complete transparency.</p>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-primary-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">1</div>
              </div>
              <div>
                <h3 className="font-sans font-semibold text-lg text-gray-800 mb-2">Scan the QR Code</h3>
                <p className="text-gray-600">Use the AgriChain app or your phone camera to scan the product's QR code.</p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-primary-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">2</div>
              </div>
              <div>
                <h3 className="font-sans font-semibold text-lg text-gray-800 mb-2">View Blockchain Verification</h3>
                <p className="text-gray-600">Access immutable blockchain records showing certifications and farming practices.</p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-primary-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">3</div>
              </div>
              <div>
                <h3 className="font-sans font-semibold text-lg text-gray-800 mb-2">Explore Product Journey</h3>
                <p className="text-gray-600">See the complete supply chain journey from harvest to marketplace.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <Button 
              variant="default" 
              className="px-6 py-6 h-auto bg-secondary-500 hover:bg-secondary-600 text-white" 
              asChild
            >
              <Link href="/verify">
                <QrCode className="mr-2 h-5 w-5" /> Try QR Verification
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Verification Demo Mobile Device */}
        <div className="relative mx-auto max-w-xs md:max-w-sm">
          <div className="bg-gray-800 rounded-[3rem] p-3 shadow-xl w-full">
            <div className="bg-white rounded-[2.5rem] overflow-hidden h-[550px] relative">
              {/* Phone Notch */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex justify-center items-center rounded-b-lg z-10">
                <div className="w-20 h-4 bg-gray-800 rounded-b-lg"></div>
              </div>
              
              {/* App Screen Content */}
              <div className="pt-8 h-full overflow-hidden relative">
                {/* Product Verification Screen */}
                <div className="h-full bg-gray-50">
                  {/* App Header */}
                  <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-arrow-left text-gray-500"></i>
                      <span className="font-medium">Product Verification</span>
                    </div>
                    <i className="fas fa-ellipsis-v text-gray-500"></i>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4">
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <img src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716" alt="Wild Forest Honey" className="w-16 h-16 rounded-lg object-cover" />
                        <div>
                          <h3 className="font-semibold">Wild Forest Honey</h3>
                          <p className="text-xs text-gray-500">Batch: WFH2023-0892</p>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs border-t border-gray-100 pt-3">
                        <span className="text-gray-500">Harvest Date</span>
                        <span className="font-medium">15 June, 2023</span>
                      </div>
                    </div>
                    
                    {/* Verification Status */}
                    <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-4 flex items-center space-x-3">
                      <div className="bg-green-500 text-white rounded-full p-2">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-green-800 font-medium">Verified on Blockchain</h3>
                        <p className="text-xs text-green-700">Last verified: 2 hours ago</p>
                      </div>
                    </div>
                    
                    {/* Blockchain Info */}
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                      <h3 className="font-medium mb-3 flex items-center">
                        <LinkIcon className="text-accent-500 mr-2 h-4 w-4" /> Blockchain Details
                      </h3>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Transaction Hash</span>
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded">0x8a21...f92e</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Block Number</span>
                          <span className="font-medium">18,293,711</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Network</span>
                          <span className="font-medium">Ethereum</span>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-3 w-full py-2 text-xs bg-accent-50 text-accent-500">
                        View on Etherscan
                      </Button>
                    </div>
                    
                    {/* Farmer Info */}
                    <div className="bg-white rounded-xl shadow-sm p-4">
                      <h3 className="font-medium mb-3 flex items-center">
                        <UserCircle className="text-secondary-500 mr-2 h-4 w-4" /> Farmer Details
                      </h3>
                      <div className="flex items-center space-x-3 mb-3">
                        <img src="https://images.unsplash.com/photo-1591280063444-d3c514eb6e13" alt="Farmer Profile" className="w-12 h-12 rounded-full object-cover border-2 border-secondary-100" />
                        <div>
                          <h4 className="font-medium">Rajesh Kumar</h4>
                          <p className="text-xs text-gray-500">Coorg, Karnataka</p>
                        </div>
                        <div className="ml-auto bg-primary-50 text-primary-500 text-xs rounded-full px-2 py-1">
                          Certified
                        </div>
                      </div>
                      <Button variant="outline" className="mt-1 w-full py-2 text-xs border border-secondary-500 text-secondary-500">
                        View Farmer Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VerificationDemo;
