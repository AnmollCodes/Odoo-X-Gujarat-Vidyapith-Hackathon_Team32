import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingCart, MapPin, QrCode, ShieldCheck, Star, Leaf, Calendar, Sprout } from "lucide-react";
import { Product } from "@shared/schema";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Add a staggered entrance animation based on index
  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        delay: index * 0.1 // Stagger effect
      }
    }
  };

  // Define badge animation
  const badgeVariants = {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.2
      }
    }
  };

  // Define button animations
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
    >
      <div className="relative overflow-hidden">
        {/* Gradient overlay that appears on hover */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        
        {/* Image with zoom effect on hover */}
        <motion.img 
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
          src={product.imageUrl || "https://placehold.co/300x200/e9e9e9/5fa058?text=No+Image"} 
          alt={product.name} 
          className="w-full h-52 object-cover transition-all"
        />
        
        {/* Animated verification badge */}
        {product?.isVerified && (
          <motion.div 
            className="absolute top-3 right-3 z-20 bg-primary-500 text-white text-xs font-bold uppercase rounded-full px-3 py-1 flex items-center"
            variants={badgeVariants}
            initial="initial"
            animate="animate"
          >
            <ShieldCheck className="h-3 w-3 mr-1" /> Verified
          </motion.div>
        )}
        
        {/* Farming method badge */}
        <motion.div 
          className="absolute bottom-3 left-3 z-20 bg-white/90 backdrop-blur-sm text-primary-700 text-xs font-medium rounded-full px-3 py-1 flex items-center"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Leaf className="h-3 w-3 mr-1" /> {product?.farmingMethod || "Natural Farming"}
        </motion.div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-sans font-semibold text-lg text-gray-800 group-hover:text-primary-600 transition-colors">
            {product?.name || "Product Name"}
          </h3>
          <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1">
            <Star className="text-yellow-500 mr-1 h-3 w-3" />
            <span className="text-sm font-medium">4.8</span>
          </div>
        </div>
        
        {/* Description with line clamp */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product?.description || "No description available"}
        </p>
        
        {/* Details with icons */}
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-xs text-gray-500">
            <MapPin className="h-3 w-3 mr-2 text-gray-400" />
            <span>{product?.location || "Unknown location"}</span>
          </div>
          
          {product?.harvestDate && (
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-2 text-gray-400" />
              <span>Harvested: {new Date(product.harvestDate).toLocaleDateString()}</span>
            </div>
          )}
          
          {product?.category && (
            <div className="flex items-center text-xs text-gray-500">
              <Sprout className="h-3 w-3 mr-2 text-gray-400" />
              <span>Category: {product.category}</span>
            </div>
          )}
        </div>
        
        {/* Animated price and action buttons */}
        <div className="flex justify-between items-center">
          <motion.div 
            className="text-primary-600 font-bold text-lg"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            ₹{product?.price || 0} <span className="text-xs text-gray-500 font-normal">/ {product?.unit || "unit"}</span>
          </motion.div>
          
          <div className="flex space-x-2">
            <Link href={`/verify?productId=${product?.id || 0}`}>
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="p-2 h-auto w-auto border-primary-200 hover:border-primary-400 hover:bg-primary-50 transition-colors"
                >
                  <QrCode className="h-4 w-4 text-primary-600" />
                </Button>
              </motion.div>
            </Link>
            
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button 
                size="icon" 
                className="p-2 h-auto w-auto bg-secondary-500 hover:bg-secondary-600"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
