import { Link } from "wouter";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  LineChart, 
  Users, 
  ShieldCheck, 
  QrCode, 
  TrendingUp,
  Settings,
  CheckCircle2,
  ArrowRight
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

export default function ForFarmers() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  Grow Your Market Reach with Blockchain Trust
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                  Join hundreds of natural farmers who are expanding their customer base, 
                  increasing profits, and proudly showcasing their sustainable practices through 
                  blockchain-verified traceability.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/register">Join as a Farmer</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#benefits">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">30% Average Increase</h3>
                    <p className="text-gray-600">in farmer revenue after joining AgriChain</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  <li className="flex">
                    <CheckCircle2 className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Direct access to conscious consumers</span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Premium pricing for verified natural products</span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Quick and simple verification process</span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Build a trusted brand and loyal customer base</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                How AgriChain Benefits Farmers
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our platform is designed specifically to address the challenges faced by 
                natural farmers, bringing your products to market with the trust and transparency they deserve.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Blockchain Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Authenticate your farming practices with immutable blockchain records that 
                    provide undeniable proof of your natural and sustainable methods.
                  </p>
                </CardContent>
              </Card>
              
              {/* Benefit 2 */}
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Direct Consumer Connection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Connect directly with conscious consumers who value sustainable products and 
                    are willing to pay premium prices for authentic, naturally-grown produce.
                  </p>
                </CardContent>
              </Card>
              
              {/* Benefit 3 */}
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Data-Driven Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Gain valuable insights into consumer preferences, buying patterns, and 
                    market trends to optimize your product offerings and pricing strategy.
                  </p>
                </CardContent>
              </Card>
              
              {/* Benefit 4 */}
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <QrCode className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>QR Code Marketing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Leverage scannable QR codes on your products to tell your unique story and 
                    showcase your farming practices, building customer loyalty and trust.
                  </p>
                </CardContent>
              </Card>
              
              {/* Benefit 5 */}
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Sustainability Recognition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Get recognized for your sustainable farming practices, contributing to 
                    environmental conservation while building a premium brand identity.
                  </p>
                </CardContent>
              </Card>
              
              {/* Benefit 6 */}
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Simple Management Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Access user-friendly dashboard tools to manage your product listings, 
                    track sales, and communicate with customers - all in one place.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              How It Works
            </h2>
            <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto text-center">
              Joining AgriChain as a farmer is simple and straightforward. Follow these steps to get started.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="bg-white rounded-lg shadow-md p-6 relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-3">Sign Up</h3>
                <p className="text-gray-700 mb-3">
                  Create your account with basic information about you and your farm.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Provide farm name and location</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Upload farm photos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Describe your farming practices</span>
                  </li>
                </ul>
              </div>
              
              {/* Step 2 */}
              <div className="bg-white rounded-lg shadow-md p-6 relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-3">Verification</h3>
                <p className="text-gray-700 mb-3">
                  Complete our verification process to authenticate your natural farming methods.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Submit farming documentation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Virtual or in-person farm inspection</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Receive blockchain verification</span>
                  </li>
                </ul>
              </div>
              
              {/* Step 3 */}
              <div className="bg-white rounded-lg shadow-md p-6 relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-3">List Products</h3>
                <p className="text-gray-700 mb-3">
                  Add your products to the marketplace with details that highlight their quality.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Upload product images</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Set pricing and availability</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Describe growing methods</span>
                  </li>
                </ul>
              </div>
              
              {/* Step 4 */}
              <div className="bg-white rounded-lg shadow-md p-6 relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-3">Start Selling</h3>
                <p className="text-gray-700 mb-3">
                  Connect with customers and manage orders through your dashboard.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Receive notifications for new orders</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Track sales and inventory</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">Build your customer base</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link href="/register">Get Started Today <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto text-center">
              Have questions about joining AgriChain? Find answers to common questions below.
            </p>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What defines "natural farming" for verification?</AccordionTrigger>
                  <AccordionContent>
                    Natural farming in our context refers to agricultural practices that prioritize 
                    sustainability, minimal chemical inputs, and ecological harmony. We verify farms based on 
                    criteria including avoidance of synthetic pesticides/fertilizers, soil health management, 
                    water conservation methods, and biodiversity enhancement. Our verification process accommodates 
                    various approaches including organic, biodynamic, permaculture, and traditional methods.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>How much does it cost to join AgriChain?</AccordionTrigger>
                  <AccordionContent>
                    Basic registration on AgriChain is free, which allows you to create a profile and become 
                    visible in our farmer directory. We offer tiered subscription plans for enhanced features:
                    a percentage-based commission model for marketplace sales, with discounted rates for annual
                    subscribers. We're committed to keeping our platform accessible to farms of all sizes, with
                    special considerations for small family farms.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>How does the blockchain verification process work?</AccordionTrigger>
                  <AccordionContent>
                    Our blockchain verification creates a permanent, tamper-proof record of your farm and products. 
                    The process involves documenting your farming practices, conducting verification checks (which 
                    may be remote or in-person depending on your location), and recording this information on the 
                    blockchain. Each product receives a unique QR code linked to this verification data, allowing 
                    consumers to trace its origin and farming methods. The entire process typically takes 2-3 weeks.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>What payment methods do you support?</AccordionTrigger>
                  <AccordionContent>
                    We support a wide range of payment methods to facilitate transactions between farmers and consumers.
                    These include standard credit/debit cards, digital wallets (Google Pay, Apple Pay), bank transfers,
                    and region-specific options like UPI in India. Payments are processed securely and funds are 
                    transferred to farmers on a weekly basis with detailed transaction reports. We handle payment 
                    processing to make selling easier for farmers.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I handle logistics and shipping?</AccordionTrigger>
                  <AccordionContent>
                    You have flexibility in managing your product delivery. Options include: setting your own 
                    delivery radius and fees, arranging farm pickup options, or using our integrated shipping 
                    partners who specialize in transporting fresh produce. Many farmers choose a hybrid approach, 
                    offering local delivery/pickup and shipping options for more distant customers. Our dashboard 
                    provides tools to manage all logistics settings.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger>What support does AgriChain provide to farmers?</AccordionTrigger>
                  <AccordionContent>
                    We provide comprehensive support including: a dedicated farmer success team, technical 
                    assistance with the platform, marketing support to highlight your products, educational 
                    resources on sustainable farming practices, and community forums to connect with other 
                    farmers. We also regularly organize online and offline events to promote our farmers and 
                    facilitate knowledge sharing within our network.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              What Farmers Say About Us
            </h2>
            <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto text-center">
              Hear from farmers who have transformed their businesses with AgriChain.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                    <div className="ml-4">
                      <h3 className="font-bold text-gray-900">Rajesh Patel</h3>
                      <p className="text-sm text-gray-500">Organic Vegetable Farmer, Gujarat</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "Since joining AgriChain, my customer base has expanded beyond my local market. 
                    The blockchain verification has given my organic practices credibility, and customers 
                    are willing to pay premium prices because they trust my products."
                  </p>
                </CardContent>
              </Card>
              
              {/* Testimonial 2 */}
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                    <div className="ml-4">
                      <h3 className="font-bold text-gray-900">Lakshmi Devi</h3>
                      <p className="text-sm text-gray-500">Millet Farmer, Karnataka</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "The QR code system has transformed how I market my millets. Urban customers 
                    love scanning the code and seeing our traditional farming methods. My revenue 
                    has increased by 40% in just six months on the platform."
                  </p>
                </CardContent>
              </Card>
              
              {/* Testimonial 3 */}
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                    <div className="ml-4">
                      <h3 className="font-bold text-gray-900">Amir Khan</h3>
                      <p className="text-sm text-gray-500">Fruit Orchard Owner, Himachal Pradesh</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "The dashboard analytics have helped me understand which of my fruit varieties 
                    are most popular. I've been able to adjust my planting and pricing strategy based 
                    on real customer data, maximizing my orchard's profitability."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Grow Your Farm Business?</h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Join hundreds of farmers who are expanding their reach, building consumer trust, 
              and increasing their profits with AgriChain's blockchain verification platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">Register Your Farm</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-primary" asChild>
                <Link href="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}