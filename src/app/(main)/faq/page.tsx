'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FAQAccordion from '../../components/FAQAccordion';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: '1',
    question: 'What is Jacinth Pharmacy and what makes it different from other pharmacies?',
    answer: 'Jacinth Pharmacy is an online pharmacy that makes healthcare simple, safe, and accessible. We provide fast, reliable access to authentic medications, prescriptions, telemedicine, and home care services. What sets us apart is our commitment to removing barriers to healthcare access, ensuring timely delivery, and providing a seamless platform for medication management.',
  },
  {
    id: '2',
    question: 'What products can I buy on Jacinth Pharmacy\'s website?',
    answer: 'You can purchase a wide range of pharmaceutical products including prescription medications, over-the-counter drugs, non-drug items like skincare products, vitamins, supplements, and other healthcare essentials. All our products are authentic and sourced from verified suppliers.',
  },
  {
    id: '3',
    question: 'How do I upload my prescription?',
    answer: 'You can upload your prescription through our "Upload Prescription" feature. Simply take a clear photo of your prescription or scan it, and upload it through our secure platform. Our team of licensed pharmacists will review it and process your order accordingly.',
  },
  {
    id: '4',
    question: 'Do you offer home delivery?',
    answer: 'Yes, we offer fast and reliable home delivery services. We provide door-to-door delivery to ensure your medications reach you safely and on time. Delivery options and fees may vary based on your location.',
  },
  {
    id: '5',
    question: 'What areas do you deliver to?',
    answer: 'We currently deliver nationwide across Nigeria. Our delivery network covers major cities and towns, ensuring that quality healthcare is accessible to everyone, regardless of location.',
  },
  {
    id: '6',
    question: 'What payment methods do you accept?',
    answer: 'We accept multiple payment methods including credit/debit cards (Visa, Mastercard), PayPal, bank transfers, and other secure payment options. All transactions are processed securely to protect your financial information.',
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="mt-6 md:mt-8">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl shadow-lg max-w-6xl mx-auto">
            <div className="absolute inset-0 z-0">
              <Image
                src="/happy-young-man-medical-mask-giving-you-shopping-bags-with-purchases-smiling-wishing-well-sta 1.svg"
                alt="Contact Us Background"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Green blur overlay */}
            <div className="absolute inset-0 z-10 bg-[#007539]/80 backdrop-blur-xs"></div>
            <div className="relative z-20 py-16 md:py-20">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">FAQs</h1>
                  <Link
                    href="/"
                    className="inline-block bg-white text-[#007539] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50 mt-6 md:mt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Search Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How Can We Help You?</h2>
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search FAQs....."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <svg
                  className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* FAQ List */}
            <FAQAccordion faqs={filteredFAQs} />

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No FAQs found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="mt-6 md:mt-8">
        <div className="container mx-auto px-4">
          <div className="bg-[#007539] rounded-3xl shadow-lg py-16 md:py-20 max-w-6xl mx-auto">
            <div className="max-w-3xl mx-auto text-center px-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Still Have Any Questions?</h2>
              <p className="text-lg mb-8 text-white">
                If still have questions or need more clarity, feel free to chat us up so we can respond to your needs.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-[#007539] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Chat Us Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

