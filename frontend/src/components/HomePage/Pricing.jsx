import React, { useState } from 'react';

const EnterpriseContactModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          {!submitted ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-cyan-600">Looking for Enterprise plans?</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">Contact us for a quote tailored to your organization's needs.</p>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Work Email*</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    placeholder="yourname@company.com"
                    required
                  />
                  {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : null}
                    {isSubmitting ? "Submitting..." : "Request Enterprise Quote"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Thank you for your interest!</h3>
              <p className="text-gray-600 mb-4">Our enterprise sales team will contact you within 1-2 business days.</p>
              <button
                onClick={onClose}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-cyan-600 bg-white border border-cyan-300 rounded-md hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// This is the updated Pricing component that includes the modal functionality
const Pricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <section id="pricing">
      <div className="min-h-screen bg-white text-gray-800 p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-12 text-black">
          Flexible Pricing Options
        </h1>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Enterprise Plan */}
          <div className="rounded-lg bg-white border border-cyan-200 shadow-md p-6 flex flex-col h-full">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-cyan-500 mb-2">
                Enterprise
              </h2>
              <p className="text-sm text-gray-600">
                Custom solutions for large organizations
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">
                  $Contact us{" "}
                  <span 
                    className="text-xs text-cyan-500 cursor-pointer hover:underline"
                    onClick={openModal}
                  >
                    Click here
                  </span>
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-8 flex-grow">
              <div className="flex items-start">
                <svg
                  className="h-5 w-5 text-cyan-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Unlimited team members</span>
              </div>
              <div className="flex items-start">
                <svg
                  className="h-5 w-5 text-cyan-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Unlimited concurrent training</span>
              </div>
              <div className="flex items-start">
                <svg
                  className="h-5 w-5 text-cyan-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Custom model development</span>
              </div>
              <div className="flex items-start">
                <svg
                  className="h-5 w-5 text-cyan-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>24/7 premium support</span>
              </div>
              <div className="flex items-start">
                <svg
                  className="h-5 w-5 text-cyan-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Security compliance features</span>
              </div>
              <div className="flex items-start">
                <svg
                  className="h-5 w-5 text-cyan-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Custom SLAs</span>
              </div>
            </div>

            <button 
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 w-full"
              onClick={openModal}
            >
              Contact Sales
            </button>
          </div>

          {/* Pay As You Go Plan */}
          <div className="rounded-lg bg-white border border-cyan-200 shadow-md p-6 flex flex-col h-full">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-cyan-500 mb-2">
                Pay As You Go
              </h2>
              <p className="text-sm text-gray-600">
                Flexible pricing for any project size
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">$2.29</span>
                <span className="text-gray-600 ml-1">/calls</span>
              </div>
              <p className="text-sm text-gray-600">
                No subscription, pay only for what you use
              </p>
            </div>

            <div className="space-y-3 mb-8 flex-grow">
              <div className="flex items-start">
                <svg
                  className="h-5 w-5 text-cyan-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No monthly commitment</span>
              </div>
              <div className="flex items-start">
                <svg
                  className="h-5 w-5 text-cyan-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Access to all public models</span>
              </div>
              <div className="flex items-start">
                <svg
                  className="h-5 w-5 text-cyan-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Standard inference speed</span>
              </div>

              <div className="flex items-start">
                <svg
                  className="h-5 w-5 text-cyan-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Community support via forums</span>
              </div>
              <div className="flex items-start">
                <svg
                  className="h-5 w-5 text-cyan-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Transparent usage dashboard</span>
              </div>
            </div>

            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 w-full">
              Get Started Free
            </button>
          </div>
        </div>
        
        <EnterpriseContactModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </section>
  );
};

export default Pricing;