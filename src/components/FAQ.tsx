import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, Sparkles, Shield, Zap, Users, FileText, Clock, Brain, Heart, CheckCircle } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: HelpCircle,
      gradient: 'from-red-500 to-pink-600',
      questions: [
        {
          question: 'How does ECG Buddy work?',
          answer: 'ECG Buddy uses advanced AI algorithms trained on millions of ECG patterns to analyze your cardiac data. Simply upload your ECG file, and our system processes it in under 30 seconds, providing detailed analysis including rhythm classification, abnormality detection, and clinical recommendations.',
          highlights: ['AI-powered analysis', 'Under 30 seconds', 'Clinical recommendations']
        },
        {
          question: 'What ECG file formats are supported?',
          answer: 'We support all major ECG formats including PDF, XML, SCP-ECG, DICOM, and HL7 FHIR. Our system can also process images (PNG, JPG) of ECG printouts using advanced OCR technology.',
          highlights: ['PDF, XML, SCP-ECG', 'DICOM, HL7 FHIR', 'Image processing']
        },
        {
          question: 'Is ECG Buddy HIPAA compliant?',
          answer: 'Yes, ECG Buddy is fully HIPAA compliant with end-to-end encryption, secure data transmission, and comprehensive audit trails. All patient data is encrypted both in transit and at rest using AES-256 encryption.',
          highlights: ['HIPAA compliant', 'End-to-end encryption', 'AES-256 security']
        }
      ]
    },
    {
      title: 'Features & Accuracy',
      icon: Brain,
      gradient: 'from-pink-500 to-red-600',
      questions: [
        {
          question: 'How accurate is the AI analysis?',
          answer: 'Our AI model achieves 99.2% accuracy in clinical validation studies, trained on over 1 million ECG samples from leading medical institutions. The system is continuously updated with new data to maintain peak performance.',
          highlights: ['99.2% accuracy', '1M+ training samples', 'Continuous updates']
        },
        {
          question: 'Can I integrate ECG Buddy with my EMR system?',
          answer: 'Yes, we offer seamless integration with 200+ EMR systems including Epic, Cerner, and Allscripts. Our API supports HL7 FHIR standards and can be customized for your specific workflow requirements.',
          highlights: ['200+ EMR systems', 'HL7 FHIR support', 'Custom workflows']
        },
        {
          question: 'Does it work offline?',
          answer: 'Our mobile and desktop apps support offline analysis for emergency situations. The AI model runs locally on your device, ensuring you can analyze ECGs even without internet connectivity.',
          highlights: ['Offline capability', 'Local AI processing', 'Emergency ready']
        }
      ]
    },
    {
      title: 'Pricing & Plans',
      icon: Sparkles,
      gradient: 'from-orange-500 to-red-500',
      questions: [
        {
          question: 'Is there a free trial?',
          answer: 'Yes, we offer a 14-day free trial with full access to all features. No credit card required. You can analyze up to 100 ECGs during the trial period.',
          highlights: ['14-day free trial', 'No credit card', '100 ECG analyses']
        },
        {
          question: 'What are the pricing plans?',
          answer: 'We offer flexible pricing: Starter ($29/month for individuals), Professional ($99/month for small teams), and Enterprise (custom pricing for large organizations). All plans include unlimited analyses and 24/7 support.',
          highlights: ['Starter $29/month', 'Professional $99/month', 'Enterprise custom']
        },
        {
          question: 'Do you offer volume discounts?',
          answer: 'Yes, we provide significant discounts for high-volume users and enterprise customers. Contact our sales team for custom pricing based on your analysis volume and specific requirements.',
          highlights: ['Volume discounts', 'Enterprise pricing', 'Custom solutions']
        }
      ]
    },
    {
      title: 'Support & Security',
      icon: Shield,
      gradient: 'from-rose-500 to-red-600',
      questions: [
        {
          question: 'What support do you provide?',
          answer: '24/7 technical support via chat, email, and phone. We also offer onboarding assistance, training sessions, and dedicated account managers for enterprise customers.',
          highlights: ['24/7 support', 'Multiple channels', 'Dedicated managers']
        },
        {
          question: 'How is my data protected?',
          answer: 'We use bank-level security with SOC 2 Type II compliance, regular security audits, and zero-trust architecture. Data is automatically deleted after your specified retention period.',
          highlights: ['SOC 2 Type II', 'Zero-trust security', 'Auto data deletion']
        },
        {
          question: 'Can I export my analysis results?',
          answer: 'Yes, you can export results in multiple formats including PDF reports, structured data (JSON/XML), and direct integration with your EMR system. All exports maintain full audit trails.',
          highlights: ['Multiple formats', 'PDF reports', 'EMR integration']
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const answerVariants = {
    hidden: { 
      opacity: 0, 
      maxHeight: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1, 
      maxHeight: 1000,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="faq-section" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-white to-pink-50/20"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 63, 74, 0.15) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-red-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-2xl border border-red-100/50 rounded-full px-6 py-3 mb-8 shadow-[0_8px_32px_rgba(255,63,74,0.08)]">
            <HelpCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-slate-700">Frequently Asked Questions</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
              Got questions?
            </span>
            <span className="block bg-gradient-to-r from-red-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
              We have answers
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
            Everything you need to know about ECG Buddy, from getting started 
            to advanced features and enterprise solutions.
          </p>
        </motion.div>

        {/* FAQ Categories with Glassy Hover */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={categoryVariants}
              className="relative bg-white/40 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(255,63,74,0.08)] hover:shadow-[0_20px_60px_rgba(255,63,74,0.15)] transition-all duration-500 group overflow-hidden"
            >
              {/* Glassy hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
              
              {/* Category Header */}
              <div className="relative flex items-center space-x-4 mb-8">
                <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">{category.title}</h3>
                  <div className={`h-1 w-20 bg-gradient-to-r ${category.gradient} rounded-full mt-2`}></div>
                </div>
              </div>

              {/* Questions */}
              <div className="relative space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 10 + faqIndex; // Unique index across all categories
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <motion.div
                      key={faqIndex}
                      variants={itemVariants}
                      className="bg-white/30 backdrop-blur-sm border border-red-100/40 rounded-2xl overflow-hidden hover:bg-white/50 transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full p-6 text-left flex items-center justify-between group"
                      >
                        <span className="font-semibold text-slate-800 group-hover:text-slate-900 transition-colors pr-4">
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="flex-shrink-0"
                        >
                          {isOpen ? (
                            <Minus className="w-5 h-5 text-red-600" />
                          ) : (
                            <Plus className="w-5 h-5 text-slate-500 group-hover:text-red-600 transition-colors" />
                          )}
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            variants={answerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              <div className="text-slate-600 leading-relaxed mb-4">
                                {faq.answer}
                              </div>
                              
                              {/* Highlights */}
                              <div className="flex flex-wrap gap-2">
                                {faq.highlights.map((highlight, highlightIndex) => (
                                  <motion.span
                                    key={highlightIndex}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ 
                                      delay: highlightIndex * 0.1,
                                      duration: 0.3,
                                      ease: "easeOut"
                                    }}
                                    className="inline-flex items-center space-x-1 bg-red-100/50 backdrop-blur-sm border border-red-200/50 rounded-full px-3 py-1 text-xs font-medium text-red-700"
                                  >
                                    <CheckCircle className="w-3 h-3" />
                                    <span>{highlight}</span>
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA with Glassy Hover */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="relative bg-white/30 backdrop-blur-2xl border border-red-100/50 rounded-3xl p-12 max-w-4xl mx-auto shadow-[0_20px_70px_rgba(255,63,74,0.1)] hover:shadow-[0_30px_90px_rgba(255,63,74,0.15)] transition-all duration-700 group overflow-hidden">
            {/* Glassy hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-red-100/50 backdrop-blur-sm border border-red-200/50 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">Still have questions?</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 group-hover:text-slate-900 transition-colors duration-300">
                We're here to help
              </h3>
              
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Can't find what you're looking for? Our support team is available 24/7 
                to answer any questions about ECG Buddy.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-gradient-to-r from-red-500 via-red-600 to-pink-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-[0_8px_32px_rgba(255,63,74,0.3)] hover:shadow-[0_12px_40px_rgba(255,63,74,0.4)] transition-all duration-500 overflow-hidden group"
                >
                  {/* Glassy hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                  <span className="relative z-10">Contact Support</span>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-slate-600 hover:text-slate-800 font-medium transition-colors duration-300"
                >
                  Schedule a demo
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;