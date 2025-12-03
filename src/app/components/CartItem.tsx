'use client';

import Image from 'next/image';
import { useState } from 'react';

interface CartItemProps {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({
  id,
  productName,
  productImage,
  price,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const [localQuantity, setLocalQuantity] = useState(quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setLocalQuantity(newQuantity);
    onUpdateQuantity(id, newQuantity);
  };

  return (
    <div className="flex gap-4 p-6">
      <div className="relative w-20 h-20 flex-shrink-0 bg-gray-50 rounded">
        <Image
          src={productImage || '/placeholder-product.jpg'}
          alt={productName}
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 mb-3 text-sm">{productName}</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(localQuantity - 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-gray-600 hover:text-gray-900"
            >
              -
            </button>
            <span className="w-12 text-center text-sm font-medium">{localQuantity}</span>
            <button
              onClick={() => handleQuantityChange(localQuantity + 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-gray-600 hover:text-gray-900"
            >
              +
            </button>
          </div>
          <button
            onClick={() => onRemove(id)}
            className="text-red-600 hover:text-red-700 text-sm text-left w-fit"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-semibold text-gray-900 text-base">₦{(price * localQuantity).toLocaleString()}</p>
      </div>
    </div>
  );
}

