import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "What is included in the free trial?",
    answer:
      "The free trial includes full access to all features for 14 days, no credit card required.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription anytime from your account settings without any penalties.",
  },
  {
    question: "Do you offer discounts for annual plans?",
    answer:
      "Yes, we offer discounts on annual subscriptions. Please check our pricing page for current offers.",
  },
  {
    question: "Is my data secure on your platform?",
    answer:
      "Absolutely. We use industry-standard encryption and security practices to protect your data.",
  },
  {
    question: "Can I change my plan after I’ve subscribed?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time from your account dashboard.",
  },
  {
    question: "Do you offer support for onboarding new users?",
    answer:
      "Yes, we provide onboarding support and tutorials to help your team get started quickly.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row gap-12">
      {/* Left side text */}
      <div className="md:w-1/2">
        <p className="text-sm font-mono uppercase text-blue-600 mb-2">
          Got questions?
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Everything You Need to Know, All in One Place
        </h2>
        <p className="text-gray-600 max-w-md">
          Discover quick and comprehensive answers to common questions about our platform, services, and features.
        </p>
      </div>

      {/* Right side FAQ accordion */}
      <div className="md:w-1/2 space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border-b border-gray-200 pb-4 cursor-pointer"
            onClick={() => toggleFAQ(idx)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">{faq.question}</h3>
              {openIndex === idx ? (
                <FiMinus className="text-blue-600" size={20} />
              ) : (
                <FiPlus className="text-blue-600" size={20} />
              )}
            </div>
            {openIndex === idx && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
