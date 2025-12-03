'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import FAQAccordion from '../components/FAQAccordion';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount?: number;
  images: string[];
  isFeatured?: boolean;
  isNew?: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

// Mock data for categories (moved outside component to avoid re-creation)
const mockCategories: Category[] = [
  { id: '1', name: 'Meats & Seafood', slug: 'meats-seafood', image: '/05.svg' },
  { id: '2', name: 'Baby & Pregnancy', slug: 'baby-pregnancy', image: '/07.svg' },
  { id: '3', name: 'Cosmetics', slug: 'cosmetics', image: '/09.svg' },
  { id: '4', name: 'Antibiotics', slug: 'antibiotics', image: '/05.svg' },
  { id: '5', name: 'Baby Foods', slug: 'baby-foods', image: '/07.svg' },
  { id: '6', name: 'Food & Drinks', slug: 'food-drinks', image: '/09.svg' },
  { id: '7', name: 'Cough Syrup', slug: 'cough-syrup', image: '/05.svg' },
  { id: '8', name: 'Antimalaria', slug: 'antimalaria', image: '/07.svg' },
];

// Mock data for products (moved outside component to avoid re-creation)
const mockProducts: Product[] = [
    {
      id: '1',
      name: 'AMATEM SOFTGEL - Artemether 20/120 mg',
      slug: 'amatem-softgel',
      price: 5000,
      discount: 15,
      images: ['/drug.png'],
      isFeatured: true,
      isNew: true,
    },
    {
      id: '2',
      name: 'Paracetamol 500mg Tablets',
      slug: 'paracetamol-500mg',
      price: 1200,
      discount: 10,
      images: ['/drug.png'],
      isFeatured: false,
      isNew: true,
    },
    {
      id: '3',
      name: 'Vitamin C 1000mg',
      slug: 'vitamin-c-1000mg',
      price: 3500,
      discount: 0,
      images: ['/drug.png'],
      isFeatured: true,
      isNew: false,
    },
    {
      id: '4',
      name: 'Amoxicillin 500mg Capsules',
      slug: 'amoxicillin-500mg',
      price: 2800,
      discount: 20,
      images: ['/drug.png'],
      isFeatured: false,
      isNew: true,
    },
    {
      id: '5',
      name: 'Ibuprofen 400mg',
      slug: 'ibuprofen-400mg',
      price: 1500,
      discount: 5,
      images: ['/drug.png'],
      isFeatured: false,
      isNew: false,
    },
    {
      id: '6',
      name: 'Multivitamin Complex',
      slug: 'multivitamin-complex',
      price: 4500,
      discount: 0,
      images: ['/drug.png'],
      isFeatured: true,
      isNew: false,
    },
    {
      id: '7',
      name: 'Aspirin 100mg',
      slug: 'aspirin-100mg',
      price: 800,
      discount: 0,
      images: ['/drug.png'],
      isFeatured: false,
      isNew: true,
    },
    {
      id: '8',
      name: 'Calcium Supplements',
      slug: 'calcium-supplements',
      price: 3200,
      discount: 12,
      images: ['/drug.png'],
      isFeatured: false,
      isNew: false,
    },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [discountProducts] = useState<Product[]>(mockProducts.slice(0, 8));
  const [newArrivals] = useState<Product[]>(mockProducts.slice(0, 6));
  const [categories] = useState<Category[]>(mockCategories);
  const [loading] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Carousel */}
      <section className="relative bg-white overflow-hidden mt-6 md:mt-8">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl shadow-lg max-w-6xl mx-auto">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9] flex items-center justify-center">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/banner 1.svg"
                  alt="Hero Banner"
                  fill
                  className="object-contain"
                  priority
                  sizes="100vw"
                />
              </div>
              
              {/* Content Overlay - Centered */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative z-10 max-w-3xl mx-auto px-8 md:px-12 text-center"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4"
                >
                  Your medicine, delivered
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-sm md:text-md lg:text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
                >
                  We have prepared special discounts for you on organic breakfast products.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex justify-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/products"
                      className="inline-block bg-green-700 hover:bg-green-800 text-white px-4  md:px-10 md:py-4 rounded-full font-semibold transition-colors"
                    >
                      Shop Now
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Carousel arrows */}
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>

              {/* Carousel indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get The Best Of Jacinth At A Click */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="py-12 bg-white mt-6 md:mt-8"
      >
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center"
          >
            Get The Best Of Jacinth At A Click
          </motion.h2>

          {/* Top Grid - 2 Columns */}
          <div className="grid md:grid-cols-2 gap-6 mb-6 max-w-6xl mx-auto">
            {/* Top Left - Image Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="relative w-full h-64 md:h-80 rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            >
              <Image
                src="/Best of Jacinth.svg"
                alt="Best of Jacinth"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Top Right - Speak to a pharmacist Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Speak to a pharmacist</h3>
              <p className="text-gray-700 mb-6">
                Buy genuine prescription medications online from trusted, licensed pharmacies.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-fit"
                >
                  Chat & Consult
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Section - Get the best quality products */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.01 }}
            className="relative overflow-hidden rounded-3xl shadow-lg max-w-6xl mx-auto mt-6"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="/happy-young-man-medical-mask-giving-you-shopping-bags-with-purchases-smiling-wishing-well-sta 1.svg"
                alt="Shopping bags"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 bg-[#007539]/5 p-8 md:p-12">
              <div className="max-w-2xl">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded mb-4"
                >
                  Best Discounts
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-6"
                >
                  Get the best quality products at the lowest prices
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/products"
                    className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Start Shopping
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Categories */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="py-12 bg-white mt-6 md:mt-8"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-6"
          >
            <h2 className="text-3xl font-bold text-gray-900">Our Categories</h2>
            <Link href="/products" className="text-green-600 hover:text-green-700 font-semibold">
              View All →
            </Link>
          </motion.div>
          <div className="relative">
            <div className="flex gap-8 m-8 overflow-x-auto pb-4 scrollbar-hide scroll-smooth" id="categories-scroll">
              {/* Display 5 categories with images */}
              {categories.slice(0, 5).map((category, index) => {
                // Map first 3 categories to specific images, others use placeholder or API image
                const categoryImages = ['/05.svg', '/07.svg', '/09.svg'];
                const imageSrc = category.image || (index < 3 ? categoryImages[index] : '/05.svg');
                
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                  >
                    <Link
                      href={`/products?category=${category.slug}`}
                      className="flex-shrink-0 w-32 text-center group"
                    >
                      <motion.div
                        whileHover={{ rotate: 5 }}
                        className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-3 group-hover:bg-green-50 transition-colors border-2 border-gray-100 group-hover:border-green-200 shadow-md"
                      >
                        <Image
                          src={imageSrc}
                          alt={category.name}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </motion.div>
                      <p className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                        {category.name}
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
              {/* If less than 5 categories, show placeholders */}
              {categories.length < 5 && Array.from({ length: 5 - categories.length }).map((_, index) => (
                <div key={`placeholder-${index}`} className="flex-shrink-0 w-32 text-center">
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-3 shadow-md">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-400">Category</p>
                </div>
              ))}
            </div>
            {/* Navigation arrows */}
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                const scroll = document.getElementById('categories-scroll');
                if (scroll) scroll.scrollBy({ left: -200, behavior: 'smooth' });
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                const scroll = document.getElementById('categories-scroll');
                if (scroll) scroll.scrollBy({ left: 200, behavior: 'smooth' });
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Discount Deals */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="py-12 bg-gray-50 mt-6 md:mt-8"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-6"
          >
            <h2 className="text-3xl font-bold text-gray-900">Discount Deals</h2>
            <Link href="/products" className="text-green-600 hover:text-green-700 font-semibold">
              View All →
            </Link>
          </motion.div>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              discountProducts.map((product, index) => (
                <div key={product.id} className="flex-shrink-0 w-64">
                  <ProductCard {...product} index={index} />
                </div>
              ))
            )}
          </div>
        </div>
      </motion.section>

      {/* Mid-page Promotional Banners */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="py-12 bg-white mt-6 md:mt-8"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="h-48 bg-orange-500 rounded-2xl shadow-lg"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="h-48 bg-[#007539] rounded-2xl shadow-lg"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="h-48 bg-white border-2 border-gray-200 rounded-2xl shadow-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-500">Promotional Content</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* New Arrival */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="py-12 bg-gray-50 mt-6 md:mt-8"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-6"
          >
            <h2 className="text-3xl font-bold text-gray-900">New Arrival</h2>
            <Link href="/products" className="text-green-600 hover:text-green-700 font-semibold">
              View All →
            </Link>
          </motion.div>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              newArrivals.map((product, index) => (
                <div key={product.id} className="flex-shrink-0 w-64">
                  <ProductCard {...product} index={index} />
                </div>
              ))
            )}
          </div>
        </div>
      </motion.section>

      {/* Most Popular Categories */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="py-12 mb-8 bg-white mt-6 md:mt-8"
      >
        <div className="container mx-auto px-4">
          <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.01 }}
        className="bg-[#029047] rounded-3xl shadow-lg p-8 md:p-12 text-white mb-8 max-w-6xl mx-auto relative pb-56"
          >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Most Popular Categories</h2>
            <p className="text-green-100 text-lg">
          Shop from the favorites everyone&apos;s talking about the most trusted categories chosen by our customers every day.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
          href="/products"
          className="mt-4 md:mt-0 inline-block bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
            >
          Shop Now!
            </Link>
          </motion.div>
        </div>

        <div className="mt-7 absolute -bottom-32 left-4 right-4 max-w-6xl mx-auto flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
          {categories.slice(0, 6).map((category, index) => {
            const categoryImages = ['/05.svg', '/07.svg', '/09.svg'];
            const imageSrc = category.image || (index < 3 ? categoryImages[index] : '/05.svg');
            
            return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.05 }}
          >
            <Link
              href={`/products?category=${category.slug}`}
              className="flex-shrink-0"
            >
              <div className="w-44 h-44 bg-gray-50 rounded-2xl flex flex-col items-center justify-center gap-3">
            <div className="w-32 h-32 flex items-center justify-center">
              <Image
                src={imageSrc}
                alt={category.name}
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <p className="text-center text-sm font-medium text-gray-700 px-2">{category.name}</p>
              </div>
            </Link>
          </motion.div>
            );
          })}
        </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Frequently Asked Questions */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="py-16 mt-6 md:mt-8"
      >
        <div className="container mx-auto px-4 mt-24">
          <div className=" mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-10 text-center"
        >
          Frequently Asked Questions
        </motion.h2>
            <FAQAccordion faqs={[
              {
                id: '1',
                question: "What is Jacinth Pharmacy and what makes it different from other pharmacies?",
                answer: "Jacinth Pharmacy is an online pharmacy that makes healthcare simple, safe, and accessible. We provide fast, reliable access to authentic medications, prescriptions, telemedicine, and home care services. What sets us apart is our commitment to removing barriers to healthcare access, ensuring timely delivery, and providing a seamless platform for medication management."
              },
              {
                id: '2',
                question: "Where is Jacinth Pharmacy located and how can I contact you?",
                answer: "Address: No 5, Zartech Transformer, Oke-Alaro Street, Extension, Oluyole, Ibadan 200261, Nigeria\nSales Number: 08187122408\nCustomer Care Numbers: 02015150550, 02015150551, 02015150552"
              },
              {
                id: '3',
                question: "What is Jacinth's phone number?",
                answer: "You can reach us at Sales Number: 08187122408 or Customer Care Numbers: 02015150550, 02015150551, 02015150552"
              },
              {
                id: '4',
                question: "What products can I buy on Jacinth Pharmacy's website?",
                answer: "You can purchase a wide range of pharmaceutical products including prescription medications, over-the-counter drugs, non-drug items like skincare products, vitamins, supplements, and other healthcare essentials. All our products are authentic and sourced from verified suppliers."
              }
            ]} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/faq"
                  className="inline-block bg-green-700 hover:bg-green-800 text-white mt-3 mb-12 px-8 py-3 rounded-full font-semibold transition-colors"
                >
                  Read all FAQs
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
