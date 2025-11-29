'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductGrid from '../../components/ProductGrid';
import ProductFilters from '../../components/ProductFilters';
import Pagination from '../../components/Pagination';
import PromotionalBanner from '../../components/PromotionalBanner';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount?: number;
  images: string[];
  isFeatured?: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    // Fetch categories
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch(() => {});

    // Check for category from URL
    const categorySlug = searchParams.get('category');
    if (categorySlug) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/categories/${categorySlug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            setSelectedCategory(data.id);
          }
        })
        .catch(() => {});
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
      });

      if (selectedCategory) {
        params.append('categoryId', selectedCategory);
      }

      if (minPrice > 0) {
        params.append('minPrice', minPrice.toString());
      }

      if (maxPrice < 30000) {
        params.append('maxPrice', maxPrice.toString());
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/products?${params}`);
        const data = await res.json();
        if (data.data) {
          setProducts(data.data);
          setTotalPages(data.meta?.totalPages || 1);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, selectedCategory, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">
              Back home
            </Link>
            <span>/</span>
            <span className="text-gray-900">Shopping cart</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters
              categories={categories}
              selectedCategory={selectedCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onCategoryChange={setSelectedCategory}
              onPriceChange={(min, max) => {
                setMinPrice(min);
                setMaxPrice(max);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sort and Title */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="latest">Latest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading products...</p>
              </div>
            ) : (
              <>
                <ProductGrid products={products} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <PromotionalBanner />
    </div>
  );
}

