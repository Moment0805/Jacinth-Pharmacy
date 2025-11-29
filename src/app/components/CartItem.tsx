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
    <div className="flex gap-4 p-4 border-b border-gray-200">
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={productImage || '/placeholder-product.jpg'}
          alt={productName}
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 mb-2">{productName}</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border border-gray-300 rounded">
            <button
              onClick={() => handleQuantityChange(localQuantity - 1)}
              className="px-3 py-1 hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-4 py-1 min-w-[3rem] text-center">{localQuantity}</span>
            <button
              onClick={() => handleQuantityChange(localQuantity + 1)}
              className="px-3 py-1 hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <button
            onClick={() => onRemove(id)}
            className="text-red-600 hover:text-red-700 text-sm"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900">₦{(price * localQuantity).toLocaleString()}</p>
        <p className="text-sm text-gray-500">₦{price.toLocaleString()} each</p>
      </div>
    </div>
  );
}

