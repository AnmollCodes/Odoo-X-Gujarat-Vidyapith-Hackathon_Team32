import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingCart, MapPin, QrCode, ShieldCheck, Star } from "lucide-react";
import { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <img 
          src={product.imageUrl || "https://placehold.co/300x200/e9e9e9/5fa058?text=No+Image"} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        {product.isVerified && (
          <div className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-bold uppercase rounded-full px-3 py-1 flex items-center">
            <ShieldCheck className="h-3 w-3 mr-1" /> Verified
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-sans font-semibold text-lg text-gray-800">{product.name}</h3>
          <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1">
            <Star className="text-yellow-500 mr-1 h-3 w-3" />
            <span className="text-sm font-medium">4.8</span> {/* This would be dynamic in a real app */}
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{product.location}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-primary-500 font-bold">
            ₹{product.price} <span className="text-xs text-gray-500 font-normal">/ {product.unit}</span>
          </div>
          <div className="flex space-x-2">
            <Link href={`/verify?productId=${product.id}`}>
              <Button variant="outline" size="icon" className="p-2 h-auto w-auto">
                <QrCode className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="icon" className="p-2 h-auto w-auto">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
