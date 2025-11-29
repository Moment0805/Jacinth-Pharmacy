'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount?: number;
  images: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  index?: number;
}

export default function ProductCard({ name, slug, price, discount = 0, images, isFeatured, isNew, index = 0 }: ProductCardProps) {
  const discountedPrice = price * (1 - discount / 100);
  const imageUrl = images && images.length > 0 ? images[0] : '/placeholder-product.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow border border-gray-100"
    >
      <Link href={`/products/${slug}`}>
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
            />
          </motion.div>
          {isNew && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded font-semibold"
            >
              New
            </motion.span>
          )}
          {discount > 0 && !isNew && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold"
            >
              Sale
            </motion.span>
          )}
          {isFeatured && !discount && !isNew && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded"
            >
              Featured
            </motion.span>
          )}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-green-50 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.button>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            {discount > 0 ? (
              <>
                <span className="text-lg font-bold text-green-600">
                  ₦{discountedPrice.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₦{price.toLocaleString()}
                </span>
                <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                  -{discount}%
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ₦{price.toLocaleString()}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Add to Cart
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
}

