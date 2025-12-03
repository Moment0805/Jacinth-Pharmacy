interface CheckoutProgressProps {
  currentStep: 'cart' | 'shipping' | 'payment';
}

export default function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const steps = [
    { id: 'cart', label: 'Cart' },
    { id: 'shipping', label: 'Shipping and Billing' },
    { id: 'payment', label: 'Payment' },
  ];

  const getStepIndex = (step: string) => {
    return steps.findIndex((s) => s.id === step);
  };

  const currentIndex = getStepIndex(currentStep);

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 py-8">
          {steps.map((step, index) => {
            // Cart page: cart is completed (index 0), shipping is current (index 1)
            // Shipping page: cart is completed (index 0), shipping is current (index 1)
            // Payment page: cart and shipping completed, payment is current
            const isCompleted = index < currentIndex || (currentStep === 'cart' && index === 0);
            const isCurrent = index === currentIndex && !(currentStep === 'cart' && index === 0);

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      isCompleted && !isCurrent
                        ? 'bg-green-600 text-white'
                        : isCurrent
                        ? 'bg-gray-200 text-gray-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {isCompleted && !isCurrent ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`mt-2 text-sm ${
                      isCurrent ? 'text-gray-900 font-medium' : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-4 transition-colors ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

