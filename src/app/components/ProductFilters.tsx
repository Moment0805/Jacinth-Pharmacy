'use client';

import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory?: string;
  minPrice: number;
  maxPrice: number;
  onCategoryChange: (categoryId: string) => void;
  onPriceChange: (min: number, max: number) => void;
}

export default function ProductFilters({
  categories,
  selectedCategory,
  minPrice,
  maxPrice,
  onCategoryChange,
  onPriceChange,
}: ProductFiltersProps) {
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  const handleFilter = () => {
    onPriceChange(localMinPrice, localMaxPrice);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      {/* Price Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Price filter</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Min price</label>
              <input
                type="number"
                value={localMinPrice}
                onChange={(e) => setLocalMinPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Max price</label>
              <input
                type="number"
                value={localMaxPrice}
                onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="30000"
              />
            </div>
          </div>
          <div className="relative">
            <input
              type="range"
              min={0}
              max={30000}
              value={localMaxPrice}
              onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>
          <p className="text-sm text-gray-600">
            Price: ₦{localMinPrice.toLocaleString()} - ₦{localMaxPrice.toLocaleString()}
          </p>
          <button
            onClick={handleFilter}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Product Categories */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Categories</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategory === category.id}
                onChange={() => onCategoryChange(selectedCategory === category.id ? '' : category.id)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

