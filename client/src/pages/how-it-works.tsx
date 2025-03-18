import { Link } from "wouter";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  QrCode, 
  ShieldCheck, 
  Leaf, 
  FileText, 
  ShoppingCart,
  Users,
  ArrowRight,
  Clock,
  Search,
  Check,
  Download,
  HelpCircle
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Transforming Trust in Natural Farming
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Discover how AgriChain uses blockchain technology to create transparency 
              between farmers and consumers, revolutionizing the natural food market.
            </p>
            <Button size="lg" asChild>
              <Link href="#platform-overview">Learn More</Link>
            </Button>
          </div>
        </section>

        {/* Platform Overview */}
        <section id="platform-overview" className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Platform at a Glance
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                AgriChain bridges the gap between conscious consumers and natural farmers 
                through three core components.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Component 1 */}
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Blockchain Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Our immutable blockchain records verify farming practices, creating 
                    trust and transparency. Each verification is permanent, timestamped, 
                    and cannot be altered.
                  </p>
                </CardContent>
              </Card>
              
              {/* Component 2 */}
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Digital Marketplace</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Our marketplace connects consumers directly with farmers, enabling 
                    the discovery and purchase of verified natural products with detailed 
                    information about origin and practices.
                  </p>
                </CardContent>
              </Card>
              
              {/* Component 3 */}
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <QrCode className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>QR Traceability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Every product features a unique QR code that consumers can scan to 
                    view the complete journey from farm to table, including verification 
                    details and farmer information.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Verification Process */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                How Our Verification Works
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our rigorous verification process ensures authenticity and builds trust in natural farming practices.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <ol className="relative border-l border-primary-200 pl-8">
                  <li className="mb-10">
                    <div className="absolute -left-4 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center">1</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Farmer Application</h3>
                    <p className="text-gray-700 mb-2">
                      Farmers submit detailed information about their growing practices, 
                      including cultivation methods, inputs used, and sustainability measures.
                    </p>
                  </li>
                  
                  <li className="mb-10">
                    <div className="absolute -left-4 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center">2</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Documentation Review</h3>
                    <p className="text-gray-700 mb-2">
                      Our agricultural experts review submitted documentation, including 
                      any existing certifications, farm records, and practice descriptions.
                    </p>
                  </li>
                  
                  <li className="mb-10">
                    <div className="absolute -left-4 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center">3</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Verification Process</h3>
                    <p className="text-gray-700 mb-2">
                      Depending on the farm's scale and location, verification may include 
                      virtual farm tours, in-person visits, or partnerships with local 
                      verification agencies.
                    </p>
                  </li>
                  
                  <li className="mb-10">
                    <div className="absolute -left-4 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center">4</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Blockchain Recording</h3>
                    <p className="text-gray-700 mb-2">
                      Once verified, the farm's information is encoded into a permanent 
                      blockchain record, creating an immutable verification timestamp that 
                      cannot be altered.
                    </p>
                  </li>
                  
                  <li>
                    <div className="absolute -left-4 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center">5</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">QR Code Generation</h3>
                    <p className="text-gray-700 mb-2">
                      The farm and its products receive unique QR codes linked to the blockchain 
                      verification, allowing consumers to access the complete verification details.
                    </p>
                  </li>
                </ol>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What We Verify</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <Leaf className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Growing Practices</h4>
                      <p className="text-gray-700">Use of natural inputs, avoidance of synthetic chemicals, 
                      and sustainable cultivation methods</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Documentation</h4>
                      <p className="text-gray-700">Farm records, existing certifications, and compliance 
                      with local regulations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">History & Experience</h4>
                      <p className="text-gray-700">Farming experience, consistency in practices, and 
                      commitment to natural methods</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Community Feedback</h4>
                      <p className="text-gray-700">Reputation among local communities and existing 
                      customer testimonials</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="text-center">
                  <Button size="lg" asChild>
                    <Link href="/register">Apply for Verification</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consumer Experience */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                The Consumer Experience
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Discover how consumers use AgriChain to find, verify, and purchase authentic natural products.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Discover</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    <li className="flex">
                      <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
                      <p className="text-gray-700">Browse marketplace by product category, farming method, or location</p>
                    </li>
                    <li className="flex">
                      <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
                      <p className="text-gray-700">Explore farmer profiles with detailed information about their practices</p>
                    </li>
                    <li className="flex">
                      <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
                      <p className="text-gray-700">Read reviews and ratings from other customers</p>
                    </li>
                  </ol>
                </CardContent>
              </Card>
              
              {/* Step 2 */}
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Verify</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    <li className="flex">
                      <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
                      <p className="text-gray-700">View detailed verification status and blockchain records</p>
                    </li>
                    <li className="flex">
                      <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
                      <p className="text-gray-700">Scan product QR code to see complete traceability information</p>
                    </li>
                    <li className="flex">
                      <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
                      <p className="text-gray-700">Understand growing methods, harvesting, and handling practices</p>
                    </li>
                  </ol>
                </CardContent>
              </Card>
              
              {/* Step 3 */}
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Purchase</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    <li className="flex">
                      <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
                      <p className="text-gray-700">Add verified products to your cart with confidence</p>
                    </li>
                    <li className="flex">
                      <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
                      <p className="text-gray-700">Choose from multiple secure payment options</p>
                    </li>
                    <li className="flex">
                      <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
                      <p className="text-gray-700">Track your order and communicate directly with farmers</p>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* QR Code Demo */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                  Scan to Verify
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Every product on AgriChain comes with a unique QR code that 
                  reveals the complete story behind your purchase.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Smartphone className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900">Simple Scanning</h3>
                      <p className="text-gray-700">
                        Use your smartphone camera or our app to scan any AgriChain QR code, 
                        either online or on physical product packaging.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <ShieldCheck className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900">Instant Verification</h3>
                      <p className="text-gray-700">
                        Immediately see blockchain verification details, including timestamped 
                        records and verification status.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FileText className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900">Complete Information</h3>
                      <p className="text-gray-700">
                        Access detailed information about farming practices, harvesting 
                        methods, and handling processes.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900">Farmer Connection</h3>
                      <p className="text-gray-700">
                        Learn about the farmer behind your product, including their story, 
                        philosophy, and commitment to natural farming.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button asChild>
                    <Link href="/verify">Try Demo Verification</Link>
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Sample QR Code</h3>
                  <div className="bg-gray-100 p-6 rounded-lg mb-4 flex items-center justify-center">
                    <QrCode className="h-48 w-48" />
                  </div>
                  <p className="text-gray-700 mb-4">
                    Scan this QR code to see how our verification system works.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/verify"><Download className="mr-2 h-4 w-4" /> Download Sample</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Get answers to common questions about our platform, verification process, and marketplace.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How is blockchain used in your verification process?</AccordionTrigger>
                  <AccordionContent>
                    We use blockchain technology to create permanent, tamper-proof records of farm 
                    verifications. When a farm passes our verification process, the verification 
                    details are recorded as a transaction on the blockchain, creating an immutable 
                    timestamp that cannot be altered. This provides a trustworthy record that consumers 
                    can easily verify by scanning product QR codes or viewing blockchain records directly 
                    on our platform.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is AgriChain a certification standard like organic certification?</AccordionTrigger>
                  <AccordionContent>
                    AgriChain is not a replacement for formal certifications like organic or 
                    biodynamic. Rather, we provide a verification system that can work alongside 
                    existing certifications or independently for farms using natural methods that 
                    may not have formal certification. Our blockchain verification confirms the 
                    natural practices being used and provides transparency to consumers, regardless 
                    of certification status. We often note when farms have formal certifications in 
                    their profile.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>How do you verify farms in remote locations?</AccordionTrigger>
                  <AccordionContent>
                    For remote farms, we use a combination of approaches: virtual verification through 
                    video calls where farmers demonstrate their practices, documentation review including 
                    photographs and records, partnerships with local agricultural extension services or NGOs 
                    who can conduct physical verification, and community testimonials from neighboring farms 
                    or customers. Our verification process is adaptable to different situations while 
                    maintaining high standards.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I trust that products are actually from verified farms?</AccordionTrigger>
                  <AccordionContent>
                    Yes. Our system includes several safeguards: unique QR codes for each product batch that 
                    are generated only for verified farmers, blockchain records that track production quantities 
                    to prevent counterfeiting, regular production updates required from farmers, and a 
                    community monitoring system where consumers can report concerns. If any inconsistencies 
                    are detected, we investigate immediately and may conduct re-verification.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>How do you handle payments and delivery?</AccordionTrigger>
                  <AccordionContent>
                    We offer multiple secure payment options including credit/debit cards, digital wallets, 
                    and region-specific payment methods. Payments are held securely until orders are confirmed 
                    delivered. For delivery, options vary by location and farmer preference: some farmers offer 
                    local delivery or pickup, while others partner with shipping services. Delivery options and 
                    costs are clearly displayed before checkout, and customers can track their orders through 
                    our platform.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger>What happens if I'm not satisfied with my purchase?</AccordionTrigger>
                  <AccordionContent>
                    We have a fair resolution process. First, we encourage direct communication between 
                    consumers and farmers to resolve issues. If this doesn't work, our customer support 
                    team will mediate. For quality issues, we may request photographs or other evidence. 
                    If a product doesn't meet the promised standards, we offer refunds or replacements. 
                    We take all feedback seriously and use it to maintain the integrity of our marketplace.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-8 text-center">
                <Button variant="outline" asChild>
                  <Link href="/about"><HelpCircle className="mr-2 h-4 w-4" /> More Questions? Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Experience Transparency?</h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Join AgriChain today to discover verified natural products and connect 
              directly with the farmers who grow them.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">Create an Account <ArrowRight className="ml-2 h-4 w-4" /></Link>
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