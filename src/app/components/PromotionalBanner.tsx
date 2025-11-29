import Link from 'next/link';

export default function PromotionalBanner() {
  return (
    <div className="relative bg-gradient-to-r from-green-600 to-green-700 overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <div className="inline-block bg-white text-green-600 text-xs font-semibold px-3 py-1 rounded mb-4">
              Best Discounts
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get the best quality products at the lowest prices
            </h2>
            <Link
              href="/products"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors mt-6"
            >
              Start Shopping
            </Link>
          </div>
          <div className="relative h-64 md:h-80">
            <div className="absolute inset-0 bg-gradient-to-l from-green-600/50 to-transparent z-10"></div>
            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Promotional Image</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

