import Link from 'next/link';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  couponDiscount?: number;
  productDiscount?: number;
  onProceed?: () => void;
  proceedLabel?: string;
  showDeliveryOption?: boolean;
  deliveryOption?: 'door' | 'pickup';
  onDeliveryOptionChange?: (option: 'door' | 'pickup') => void;
}

export default function OrderSummary({
  subtotal,
  shipping,
  couponDiscount = 0,
  productDiscount = 0,
  onProceed,
  proceedLabel = 'Proceed to next',
  showDeliveryOption = false,
  deliveryOption = 'door',
  onDeliveryOptionChange,
}: OrderSummaryProps) {
  const total = subtotal + shipping - couponDiscount - productDiscount;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600 text-sm">
          <span>Sub total</span>
          <span>₦{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600 text-sm">
          <span>Shipping</span>
          <span>₦{shipping.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600 text-sm">
          <span>Coupon discount</span>
          <span className="text-red-600">- ₦{couponDiscount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600 text-sm">
          <span>Discount on product</span>
          <span className="text-red-600">- ₦{productDiscount.toLocaleString()}</span>
        </div>
      </div>

      {showDeliveryOption && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Delivery Option</h3>
          <div className="space-y-3">
            <label className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
              deliveryOption === 'door' ? 'border-2 border-green-600 bg-green-50' : 'border border-gray-300'
            }`}>
              <input
                type="radio"
                name="delivery"
                value="door"
                checked={deliveryOption === 'door'}
                onChange={() => onDeliveryOptionChange?.('door')}
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span className="font-medium text-sm">Door Delivery</span>
            </label>
            <label className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
              deliveryOption === 'pickup' ? 'border-2 border-green-600 bg-green-50' : 'border border-gray-300'
            }`}>
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={deliveryOption === 'pickup'}
                onChange={() => onDeliveryOptionChange?.('pickup')}
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span className="font-medium text-sm">Pickup</span>
            </label>
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-green-600">₦{total.toLocaleString()}</span>
        </div>
      </div>

      {onProceed && (
        <button
          onClick={onProceed}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors mb-4"
        >
          {proceedLabel}
        </button>
      )}

      <Link
        href="/products"
        className="block text-center text-gray-600 hover:text-green-600 transition-colors text-sm"
      >
        &lt; Continue Shopping
      </Link>
    </div>
  );
}

