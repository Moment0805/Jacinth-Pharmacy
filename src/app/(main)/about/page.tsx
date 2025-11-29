import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* About Us Hero Section */}
      <section className="mt-6 md:mt-8">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl shadow-lg max-w-8xl mx-auto">
            <div className="absolute inset-0 z-0">
              <Image
                src="/Best of Jacinth.svg"
                alt="Best of Jacinth"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Green blur overlay */}
            <div className="absolute inset-0 z-10 bg-[#007539]/80 "></div>
            <div className="relative z-20 py-16 md:py-20">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-yellow-400">About Us</h1>
                  <p className="text-lg md:text-xl mb-8 text-white">
                    Jacinth Pharmacy makes healthcare simple, safe, and within your reach. From prescriptions to telemedicine and home care, we provide fast, reliable access to the care and medicines you need so you spend less time waiting and more time living well.
                  </p>
                  <div className="flex flex-col items-center gap-4">
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
        </div>
      </section>
      
<section>
  <div className='flex justify-center items-center mt-2'>
    <p className="text-black text-sm ">
                      If you have more questions?{' '}
                      <Link href="/contact" className="text-green-600 hover:text-green-400 font-semibold underline">
                        Contact Us
                      </Link>
                    </p>
  </div>
</section>
      {/* Our Story Section */}
      <section className="mt-6 md:mt-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-[#007539] text-white py-16 md:py-20 rounded-3xl shadow-lg">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">Our Story</h2>
              <p className="text-lg leading-relaxed text-white">
                Jacinth Pharmacy began with one vision: to remove the barriers that make healthcare stressful and out of reach for many people. We saw the challenges long queues, difficulty accessing medicines, and limited options for timely care and we set out to make things different.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do & How We Are Doing It */}
      <section className="py-16 md:py-20 bg-white mt-6 md:mt-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* What We Do */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-[#007539] mb-4">What We Do</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We simplify access to authentic meds for both individuals and businesses through a seamless platform, sourcing, delivery, and everything in between.
              </p>
              <ul className="space-y-3">
                {[
                  'Seamless medication management',
                  'Timely delivery',
                  'Convenience',
                  'Accessibility',
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-[#007539] flex-shrink-0 mt-0.5"
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
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How We Are Doing It */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-[#007539] mb-4">How We Are Doing It</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We&apos;re not just another online pharmacy. With innovation and convenience at the core, we&apos;re simplifying the way you access medication and Pharmaceutical care.
              </p>
              <ul className="space-y-3">
                {[
                  'Guaranteed Medication Access',
                  'Nationwide pharmacy network',
                  'Convenience',
                  'Fast, reliable delivery',
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-[#007539] flex-shrink-0 mt-0.5"
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
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-10 md:mt-12">
            <Link
              href="/contact"
              className="inline-block bg-[#007539] hover:bg-[#005a2a] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Book A Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Get the Best Quality Products Section */}
      <section className="mt-6 md:mt-8">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl shadow-lg max-w-6xl mx-auto">
            <div className="absolute inset-0 z-0">
              <Image
                src="/happy-young-man-medical-mask-giving-you-shopping-bags-with-purchases-smiling-wishing-well-sta 1.svg"
                alt="Shopping bags"
                fill
                className="object-cover"
              />
            </div>
            {/* Green overlay */}
            <div className="absolute inset-0 z-10"></div>
            <div className="relative z-20 py-16 md:py-20">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded mb-4">
                    Best Discounts
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    Get the best quality products at the lowest prices
                  </h2>
                  <Link
                    href="/products"
                    className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

