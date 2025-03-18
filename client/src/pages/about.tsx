import { Link } from "wouter";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  GlobeLock, 
  Leaf, 
  BarChart3, 
  Users, 
  CheckCircle2 
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              About AgriChain
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6 md:mb-8 max-w-3xl mx-auto">
              Revolutionizing the natural farming market with transparent, blockchain-verified traceability.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/marketplace">Explore Marketplace</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/register">Join Our Community</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-6">
                  At AgriChain, we're on a mission to transform the natural farming ecosystem by connecting 
                  farmers directly with conscious consumers through blockchain technology. We believe in a 
                  world where the journey of your food is as transparent as it is sustainable.
                </p>
                <p className="text-gray-700 mb-6">
                  We empower farmers by providing them with technology to authenticate their growing 
                  practices, and we enable consumers to verify the source, quality, and sustainability 
                  of their purchases with just a scan.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                    <p className="text-gray-700">Creating a marketplace built on trust and transparency</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                    <p className="text-gray-700">Supporting sustainable and natural farming practices</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                    <p className="text-gray-700">Ensuring fair compensation for quality produce</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <div className="bg-gradient-to-br from-primary to-green-700 h-full w-full p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
                  <p className="mb-6">
                    A world where every purchase supports sustainable agriculture, where farmers receive 
                    fair compensation, and where consumers make informed choices.
                  </p>
                  <h3 className="text-2xl font-bold mb-6">Our Values</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <Leaf className="h-6 w-6 mr-2" />
                      <span>Sustainability</span>
                    </li>
                    <li className="flex items-center">
                      <ShieldCheck className="h-6 w-6 mr-2" />
                      <span>Transparency</span>
                    </li>
                    <li className="flex items-center">
                      <Users className="h-6 w-6 mr-2" />
                      <span>Community</span>
                    </li>
                    <li className="flex items-center">
                      <GlobeLock className="h-6 w-6 mr-2" />
                      <span>Integrity</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
              AgriChain was founded by a team of agriculture experts, blockchain enthusiasts, and 
              sustainability advocates passionate about transforming the food system.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-gray-300 to-gray-200 flex items-center justify-center">
                  <Users className="h-24 w-24 text-gray-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Dr. Ajay Sharma</h3>
                  <p className="text-primary mb-4">Founder & Agricultural Scientist</p>
                  <p className="text-gray-700">
                    With 15+ years in sustainable farming practices, Dr. Sharma leads our agricultural 
                    verification protocols and farmer outreach programs.
                  </p>
                </div>
              </div>
              
              {/* Team Member 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-gray-300 to-gray-200 flex items-center justify-center">
                  <Users className="h-24 w-24 text-gray-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Priya Mehta</h3>
                  <p className="text-primary mb-4">CTO & Blockchain Specialist</p>
                  <p className="text-gray-700">
                    Priya brings her expertise in blockchain technology to create transparent and 
                    tamper-proof verification systems for agricultural products.
                  </p>
                </div>
              </div>
              
              {/* Team Member 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-gray-300 to-gray-200 flex items-center justify-center">
                  <Users className="h-24 w-24 text-gray-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Raj Patel</h3>
                  <p className="text-primary mb-4">Head of Farmer Relations</p>
                  <p className="text-gray-700">
                    Having grown up on a family farm, Raj understands the challenges farmers face
                    and works to ensure our platform meets their needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">Our Impact</h2>
            <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto text-center">
              Since our launch, we've been steadily growing our impact across India's agricultural landscape.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
                <p className="text-gray-700">Farmers Onboarded</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
                <p className="text-gray-700">Products Verified</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GlobeLock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">15</h3>
                <p className="text-gray-700">States Covered</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">30%</h3>
                <p className="text-gray-700">Avg. Increase in Farmer Income</p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Whether you're a farmer looking to showcase your natural growing practices, a consumer 
              searching for authentic products, or an organization wanting to partner with us - 
              we'd love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">Create an Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-primary" asChild>
                <Link href="/marketplace">Explore Products</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}