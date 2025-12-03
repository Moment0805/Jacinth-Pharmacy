'use client';

import { useState } from 'react';
import Image from 'next/image';
import ProductModal from './ProductModal';

interface ProductCardProps {
  id: string;
  productId?: string; // UUID for backend compatibility
  name: string;
  slug: string;
  price: number;
  discount?: number;
  images: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  index?: number;
  description?: string;
  stock?: number;
}

export default function ProductCard({ 
  id,
  productId,
  name, 
  slug, 
  price, 
  discount = 0, 
  images, 
  isFeatured, 
  isNew, 
  index = 0,
  description,
  stock = 50,
}: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const discountedPrice = price * (1 - discount / 100);
  const imageUrl = images && images.length > 0 ? images[0] : '/drug.png';

  return (
    <>
      <div 
        className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
      >
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-50">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors z-10"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
            {name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            {discount > 0 ? (
              <>
                <span className="text-base font-semibold text-gray-900">
                  ₦{discountedPrice.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  ₦{price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-base font-semibold text-gray-900">
                ₦{price.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <ProductModal
        product={{
          id,
          productId,
          name,
          price,
          discount,
          images,
          description,
          stock,
        }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

