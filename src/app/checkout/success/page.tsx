'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { api, handleApiResponse, getErrorMessage } from '@/app/lib/api';

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  items: Array<{
    id: string;
    product: {
      name: string;
    };
    quantity: number;
    price: number;
  }>;
  [key: string]: unknown;
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get('reference');
      const provider = searchParams.get('provider') || 'PAYSTACK';
      
      if (!reference) {
        setError('Payment reference not found');
        setVerifying(false);
        return;
      }

      try {
        const response = await api.verifyPayment({ reference, provider });
        const data = await handleApiResponse<{ order: Order; status: string }>(response);
        
        if (data.order) {
          setOrder(data.order);
        }
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Verifying payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {error && !order ? (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Verification Failed</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/orders"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View Orders
              </Link>
              <Link
                href="/products"
                className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        ) : order ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We&apos;ve received your order and it&apos;s being processed.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Order ID</p>
              <p className="text-lg font-semibold text-gray-900">#{order.id}</p>
            </div>
            <div className="flex gap-4 justify-center">
              <Link
                href="/orders"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View Orders
              </Link>
              <Link
                href="/products"
                className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Verification</h1>
            <p className="text-gray-600 mb-6">
              We&apos;re verifying your payment. Please check your email for order confirmation.
            </p>
            <Link
              href="/orders"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View Orders
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}

