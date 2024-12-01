import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from './ui/Button';

const plans = [
  {
    name: 'Starter',
    price: '499',
    features: [
      'AI-powered contract analysis',
      'Basic security audits',
      'Up to 5 deployments/month',
      'Community support'
    ]
  },
  {
    name: 'Pro',
    price: '999',
    popular: true,
    features: [
      'Advanced AI optimization',
      'Comprehensive security audits',
      'Unlimited deployments',
      'Priority support',
      'Custom contract templates',
      'API access'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Full platform customization',
      'Dedicated AI resources',
      'Custom security rules',
      'Dedicated support team',
      'SLA guarantees',
      'On-premise deployment'
    ]
  }
];

const Pricing = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Choose the perfect plan for your blockchain journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative p-8 rounded-2xl border ${
                plan.popular
                  ? 'border-purple-500 bg-gradient-to-br from-purple-900/50 to-transparent'
                  : 'border-purple-800/30 bg-gradient-to-br from-purple-900/20 to-transparent'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-gray-400">/month</span>}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-purple-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                className="w-full"
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;