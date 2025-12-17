'use client'

import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'

type Plan = {
  name: string
  monthlyPrice: number
  description: string
  badge?: string
  features: string[]
  highlighted?: boolean
}

const plans: Plan[] = [
  {
    name: 'Basic',
    monthlyPrice: 19,
    description: 'Essential tools for small teams',
    features: [
      'Unlimited tasks',
      'Up to 3 boards',
      'Unlimited docs',
      'Unlimited chat',
      'Up to 5 integrations',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    monthlyPrice: 49,
    description: 'Advanced features for fast growing teams',
    badge: 'Most Popular',
    highlighted: true,
    features: [
      'Unlimited tasks',
      'Unlimited boards',
      'Unlimited docs',
      'Unlimited chat',
      'Unlimited integrations',
      'Advanced analytics',
      'Priority email support',
    ],
  },
  {
    name: 'Enterprise',
    monthlyPrice: 89,
    description: 'Custom features for the enterprises',
    features: [
      'All Pro features',
      'SSO',
      'Custom SLA',
      'Custom MSA',
      'Migration support',
      'Private support channel',
      'Priority email support',
    ],
  },
]

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  const getPrice = (price: number) =>
    billing === 'yearly' ? Math.floor(price * 0.8) : price

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Pricing plans
          </p>
          <h2 className="mt-2 text-4xl font-bold text-gray-900">
            Simple pricing, powerful features
          </h2>
          <p className="mt-3 text-gray-500">
            Free 30-day trial, no credit card required.
          </p>

          {/* Toggle */}
          <div className="mt-6 inline-flex rounded-full bg-gray-100 p-1">
            {(['monthly', 'yearly'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setBilling(type)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  billing === type
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-500'
                }`}
              >
                {type === 'monthly' ? 'Monthly' : 'Yearly '}
                {type === 'yearly' && (
                  <span className="font-semibold text-blue-600">
                    (20% OFF)
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 transition ${
                plan.highlighted
                  ? 'border-blue-600/40 bg-blue-50/50 shadow-lg'
                  : 'border-gray-200 bg-white shadow-sm'
              }`}
            >
              {plan.badge && (
                <span className="absolute right-6 top-6 shadow-sm rounded-xs bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                  {plan.badge}
                </span>
              )}

              <h3 className="text-xl font-semibold text-gray-900">
                {plan.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {plan.description}
              </p>

              <div className="mt-6 flex items-end gap-1">
                <span className="text-4xl font-bold text-gray-900">
                  ${getPrice(plan.monthlyPrice)}
                </span>
                <span className="text-sm text-gray-500">/ month</span>
              </div>

              {/* Features */}
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <FaCheck className="mt-1 text-green-500" />
                    <span className="text-sm text-gray-700">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`mt-8 w-full rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                Start for free →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
