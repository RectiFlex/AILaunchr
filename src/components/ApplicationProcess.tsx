import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Users, Rocket, Shield } from 'lucide-react';

const steps = [
  {
    icon: <ClipboardCheck className="w-8 h-8" />,
    title: 'Submit Application',
    description: 'Fill out our comprehensive application form detailing your project vision and goals'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Review Process',
    description: 'Our team reviews your application and performs necessary due diligence'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Team Interview',
    description: 'Selected projects proceed to a team interview and technical assessment'
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: 'Platform Access',
    description: 'Approved projects receive full access to our AI-powered launchpad platform'
  }
];

const ApplicationProcess = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Application Process
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Join our exclusive community of innovative blockchain projects through our
            selective application process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 rounded-2xl bg-gradient-to-br from-purple-900/50 to-transparent border border-purple-800/50 hover:border-purple-600/50 transition-all"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-purple-600/30" />
              )}
              <div className="text-purple-500 mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationProcess;