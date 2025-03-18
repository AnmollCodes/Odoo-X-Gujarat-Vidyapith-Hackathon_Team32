import { useState } from "react";
import { Link } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send
} from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  userType: z.enum(["consumer", "farmer", "business", "other"]),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      userType: "consumer",
    },
  });

  function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call to submit contact form
    setTimeout(() => {
      console.log("Contact form submitted:", data);
      
      setIsSubmitting(false);
      setSubmitted(true);
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-0 max-w-3xl mx-auto">
              Have a question, suggestion, or want to join the AgriChain network? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid md:grid-cols-12 gap-8">
              {/* Contact Information */}
              <div className="md:col-span-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Our Location</h3>
                      <p className="text-gray-700">
                        123 AgriTech Park, Suite 101<br />
                        Bengaluru, Karnataka 560001<br />
                        India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Phone</h3>
                      <p className="text-gray-700">
                        General: +91 80 1234 5678<br />
                        Farmer Support: +91 80 1234 5679<br />
                        Consumer Support: +91 80 1234 5680
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Email</h3>
                      <p className="text-gray-700">
                        General: info@agrichain.com<br />
                        Farmer Support: farmers@agrichain.com<br />
                        Consumer Support: help@agrichain.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Working Hours</h3>
                      <p className="text-gray-700">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-primary-50 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">Join Our Network</h3>
                  <p className="text-gray-700 mb-4">
                    Looking to become a verified natural farmer or business partner?
                  </p>
                  <Button asChild>
                    <Link href="/register">Register Now</Link>
                  </Button>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="md:col-span-8 bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                
                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Send className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-700 mb-4">
                      Your message has been sent successfully. We'll get back to you as soon as possible.
                    </p>
                    <Button onClick={() => {
                      setSubmitted(false);
                      form.reset();
                    }}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Your email address" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="userType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>I am a</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select user type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="consumer">Consumer</SelectItem>
                                  <SelectItem value="farmer">Farmer</SelectItem>
                                  <SelectItem value="business">Business</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                This helps us direct your inquiry to the right team.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="What is your message about?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please provide details about your inquiry..." 
                                className="min-h-32" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full md:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="pb-16 md:pb-24 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Visit Us</h2>
            
            <div className="bg-gray-300 h-96 rounded-lg overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-700">
                  Map view would be integrated here in a production environment
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Find quick answers to common questions before reaching out.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">How quickly will I receive a response?</h3>
                <p className="text-gray-700">
                  We strive to respond to all inquiries within 24-48 business hours. 
                  For urgent matters, please contact our support phone line for immediate assistance.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">How can I apply to be a verified farmer?</h3>
                <p className="text-gray-700">
                  Register an account, select "Farmer" as your account type, and complete the 
                  verification application. Our team will guide you through the verification process.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">How do I report an issue with an order?</h3>
                <p className="text-gray-700">
                  The fastest way to resolve order issues is through your account dashboard. 
                  Go to "My Orders," find the order in question, and click "Report Issue."
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Do you offer partnership opportunities?</h3>
                <p className="text-gray-700">
                  Yes! We're always looking for strategic partners. Please specify "Business Partnership" 
                  in your contact form subject for these inquiries.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-700 mb-4">
                Can't find what you're looking for? Reach out to our support team directly.
              </p>
              <Button asChild>
                <a href="mailto:support@agrichain.com">Email Support Team</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}