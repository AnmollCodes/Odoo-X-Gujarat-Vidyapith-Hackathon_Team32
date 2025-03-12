import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Leaf, Shield, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const headlines = [
    "Transparency from Farm to Table with Blockchain",
    "Revolutionizing Natural Farming with AgriChain",
    "Trust, Verify, Connect with Real Farmers"
  ];
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Auto-rotate headlines
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % headlines.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(`/marketplace?search=${encodeURIComponent(searchQuery)}`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  const floatingIconVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section ref={ref} className="relative bg-gradient-to-tr from-primary-700 via-primary-600 to-primary-500 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full opacity-30">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        <motion.div 
          className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-4 py-16 md:py-24 relative z-10"
      >
        <div className="max-w-3xl mx-auto md:mx-0">
          {/* Floating icons */}
          <div className="absolute right-10 top-0 md:right-40 md:top-10 hidden md:block">
            <motion.div 
              variants={floatingIconVariants}
              animate="animate"
              className="bg-white/20 backdrop-blur-lg p-3 rounded-full"
            >
              <Leaf className="h-8 w-8 text-white" />
            </motion.div>
          </div>
          
          <div className="absolute right-20 bottom-10 hidden md:block">
            <motion.div 
              variants={floatingIconVariants}
              animate="animate"
              className="bg-white/20 backdrop-blur-lg p-3 rounded-full"
              style={{ animationDelay: "0.5s" }}
            >
              <Shield className="h-8 w-8 text-white" />
            </motion.div>
          </div>
          
          <div className="absolute right-60 top-40 hidden md:block">
            <motion.div 
              variants={floatingIconVariants}
              animate="animate"
              className="bg-white/20 backdrop-blur-lg p-3 rounded-full"
              style={{ animationDelay: "1s" }}
            >
              <RefreshCw className="h-8 w-8 text-white" />
            </motion.div>
          </div>
          
          {/* Headline with animation */}
          <motion.div variants={itemVariants} className="relative h-24 md:h-32 mb-4">
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100,
                  damping: 15
                }}
                className="font-sans font-bold text-3xl md:text-5xl leading-tight absolute"
              >
                {headlines[activeIndex]}
              </motion.h1>
            </AnimatePresence>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl opacity-90 mb-8"
          >
            Connect directly with verified natural farmers. Every product's journey is transparent and traceable, ensuring authenticity and fair pricing.
          </motion.p>
          
          {/* Search Section with animation */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-xl shadow-2xl border border-white/20"
          >
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search for natural products..."
                    className="w-full py-3 pl-10 pr-4 rounded-lg border-0 bg-white/80 backdrop-blur-sm text-gray-800 focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute left-3 top-3 text-gray-400">
                    <Search className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <div>
                <Button 
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Find Products
                </Button>
              </div>
            </form>
          </motion.div>
          
          {/* Product categories with animation */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center gap-3 text-sm"
          >
            {[
              { name: "Organic Vegetables", category: "Vegetables" },
              { name: "Natural Honey", category: "Honey" },
              { name: "Millets", category: "Millets" },
              { name: "Spices", category: "Spices" }
            ].map((item, index) => (
              <Link key={index} href={`/marketplace?category=${item.category}`}>
                <motion.a 
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/30 transition-colors shadow-md flex items-center"
                >
                  <span className="mr-1">•</span> {item.name}
                </motion.a>
              </Link>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
