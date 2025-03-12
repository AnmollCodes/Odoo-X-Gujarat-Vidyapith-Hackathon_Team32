import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Product } from "@shared/schema";
import ProductCard from "./product-card";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductListProps {
  title?: string;
  showViewAll?: boolean;
  farmerId?: number;
  category?: string;
  limit?: number;
}

export function ProductList({ 
  title = "Featured Products", 
  showViewAll = true,
  farmerId,
  category,
  limit = 4
}: ProductListProps) {
  const queryString = new URLSearchParams();
  
  if (farmerId) queryString.append('farmerId', farmerId.toString());
  if (category) queryString.append('category', category);
  
  const apiUrl = `/api/products${queryString.toString() ? `?${queryString.toString()}` : ''}`;
  
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: [apiUrl],
  });

  const limitedProducts = products?.slice(0, limit);

  // Loading skeletons for the product cards
  if (isLoading) {
    return (
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-sans font-bold text-2xl md:text-3xl text-gray-800">{title}</h2>
            {showViewAll && (
              <Link href="/marketplace">
                <a className="text-primary-500 hover:text-primary-600 font-medium flex items-center">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Link>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(limit).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                <Skeleton className="w-full h-48" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-3 w-1/3 mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-1/4" />
                    <div className="flex space-x-2">
                      <Skeleton className="h-8 w-8 rounded-lg" />
                      <Skeleton className="h-8 w-8 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-sans font-bold text-2xl md:text-3xl text-gray-800">{title}</h2>
          </div>
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            Error loading products. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  // No products available
  if (!products || products.length === 0) {
    return (
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-sans font-bold text-2xl md:text-3xl text-gray-800">{title}</h2>
          </div>
          <div className="bg-gray-100 text-gray-700 p-8 rounded-lg text-center">
            No products available at this time.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-sans font-bold text-2xl md:text-3xl text-gray-800">{title}</h2>
          {showViewAll && (
            <Link href="/marketplace">
              <a className="text-primary-500 hover:text-primary-600 font-medium flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {limitedProducts?.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <a className="block">
                <ProductCard product={product} />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
