import { QuoteIcon } from "lucide-react";

export function Testimonials() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h2 className="font-sans font-bold text-2xl md:text-4xl text-gray-800 mb-4">What Our Users Say</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Discover how AgriChain is transforming the natural farming ecosystem for both farmers and consumers.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Farmer Testimonial */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl p-8 shadow-lg relative">
          <div className="text-primary-200 opacity-30 absolute top-6 left-6">
            <QuoteIcon className="h-12 w-12" />
          </div>
          
          <div className="relative z-10">
            <p className="text-lg mb-6 leading-relaxed">
              "Since joining AgriChain, my products have reached more consumers directly. I've seen a 30% increase in earnings, and I now have complete control over my pricing. The blockchain verification gives my customers confidence in my natural farming practices."
            </p>
            
            <div className="flex items-center">
              <img src="https://images.unsplash.com/photo-1591280063444-d3c514eb6e13" alt="Rajesh Kumar" className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-white" />
              <div>
                <h4 className="font-medium">Rajesh Kumar</h4>
                <p className="text-sm opacity-80">Natural Honey Farmer, Coorg</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Consumer Testimonial */}
        <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 text-white rounded-xl p-8 shadow-lg relative">
          <div className="text-secondary-200 opacity-30 absolute top-6 left-6">
            <QuoteIcon className="h-12 w-12" />
          </div>
          
          <div className="relative z-10">
            <p className="text-lg mb-6 leading-relaxed">
              "I feel more confident about buying organic products now. With AgriChain, I can see the entire history of my food and know exactly where it's coming from. Being able to verify the authenticity through blockchain gives me peace of mind about what I'm feeding my family."
            </p>
            
            <div className="flex items-center">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" alt="Priya Sharma" className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-white" />
              <div>
                <h4 className="font-medium">Priya Sharma</h4>
                <p className="text-sm opacity-80">Health-Conscious Consumer, Bangalore</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
