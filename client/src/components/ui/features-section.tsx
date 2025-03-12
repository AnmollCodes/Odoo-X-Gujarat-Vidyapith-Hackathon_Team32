import { 
  CheckCircle, 
  QrCode, 
  Handshake 
} from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16" id="how-it-works">
      <div className="text-center mb-12">
        <h2 className="font-sans font-bold text-2xl md:text-4xl text-gray-800 mb-4">How AgriChain Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Our blockchain-powered platform ensures transparency and trust between farmers and consumers.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="bg-primary-50 text-primary-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6" />
          </div>
          <h3 className="font-sans font-semibold text-lg mb-3 text-gray-800">Blockchain Verification</h3>
          <p className="text-gray-600">Every farmer and product is verified on blockchain, ensuring authenticity that cannot be tampered with.</p>
        </div>
        
        {/* Feature 2 */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="bg-secondary-50 text-secondary-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <QrCode className="h-6 w-6" />
          </div>
          <h3 className="font-sans font-semibold text-lg mb-3 text-gray-800">QR Code Traceability</h3>
          <p className="text-gray-600">Scan product QR codes to instantly access information about origin, farming methods, and certifications.</p>
        </div>
        
        {/* Feature 3 */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="bg-accent-50 text-accent-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Handshake className="h-6 w-6" />
          </div>
          <h3 className="font-sans font-semibold text-lg mb-3 text-gray-800">Direct Marketplace</h3>
          <p className="text-gray-600">Connect directly with farmers, eliminating middlemen and ensuring fair pricing for all parties.</p>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
