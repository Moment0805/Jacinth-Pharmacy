'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CheckoutProgress from '../components/CheckoutProgress';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import ProductGrid from '../components/ProductGrid';
import { api, handleApiResponse, getErrorMessage } from '@/app/lib/api';
import { toast } from '../components/Toast';
import { mockProducts } from '@/app/lib/mockProducts';

interface CartItemData {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    discount?: number;
    images: string[];
  };
  quantity: number;
}

interface Cart {
  id: string;
  items: CartItemData[];
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await api.getCart();
        const cartData = await handleApiResponse(cartResponse);
        setCart(cartData);
      } catch (error: any) {
        if (error.statusCode === 401) {
          router.push('/auth/login');
        } else {
          toast.error('Failed to load cart');
        }
      } finally {
        setLoading(false);
      }

      // Fetch recommended products
      try {
        const productsResponse = await api.getProducts({ limit: '5' });
        const productsData = await handleApiResponse(productsResponse);
        if (productsData.data) {
          setRecommendedProducts(productsData.data);
        }
      } catch (error) {
        // Silently fail for recommended products
      }
    };

    fetchData();
  }, [router]);

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    try {
      const response = await api.updateCartItem(itemId, quantity);
      const updatedCart = await handleApiResponse(response);
      setCart(updatedCart);
      toast.success('Cart updated');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      const response = await api.removeCartItem(itemId);
      const updatedCart = await handleApiResponse(response);
      setCart(updatedCart);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const calculateSubtotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, item) => {
      const price = Number(item.product.price);
      const discount = Number(item.product.discount || 0);
      const discountedPrice = price * (1 - discount / 100);
      return sum + discountedPrice * item.quantity;
    }, 0);
  };

  const handleProceed = () => {
    router.push('/checkout/payment');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading cart...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen">
        <CheckoutProgress currentStep="cart" />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link
            href="/products"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = calculateSubtotal();

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

      {/* Progress Indicator */}
      <CheckoutProgress currentStep="cart" />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Cart Summary</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    productId={item.productId}
                    productName={item.product.name}
                    productImage={item.product.images?.[0] || ''}
                    price={Number(item.product.price) * (1 - Number(item.product.discount || 0) / 100)}
                    quantity={item.quantity}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              shipping={0}
              couponDiscount={0}
              productDiscount={0}
              onProceed={handleProceed}
            />
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recommended with your order</h2>
            <Link href="/products" className="text-green-600 hover:text-green-700 font-semibold">
              View All
            </Link>
          </div>
          {recommendedProducts.length > 0 ? (
            <ProductGrid products={recommendedProducts} />
          ) : (
            <ProductGrid products={mockProducts.slice(0, 5)} />
          )}
        </div>
      </section>
    </div>
  );
}

