'use client';

import { useState, useEffect } from 'react';
import { CreditCard, Lock, Check, ArrowLeft, User, Mail, Building, MapPin, AlertCircle } from 'lucide-react';

// TypeScript interfaces
interface User {
  name: string;
  email: string;
  company: string;
}

interface Plan {
  name: string;
  price: number;
  period: string;
  features: string[];
  priceId: string; // Stripe Price ID
}

interface BillingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface LoginFormProps {
  onLogin: (user: User) => void;
  onClose: () => void;
}

interface BillingFormProps {
  selectedPlan: string;
  user: User;
  onBack: () => void;
}

// Mock authentication hook
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = () => {
      const mockUser: User = {
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Acme Startup'
      };
      const loggedIn = Math.random() > 0.5;
      setIsLoggedIn(loggedIn);
      setUser(loggedIn ? mockUser : null);
      setLoading(false);
    };
    
    setTimeout(checkAuth, 1000);
  }, []);

  return { isLoggedIn, user, loading, setIsLoggedIn, setUser };
};

// Updated plans with Stripe Price IDs
const plans: Record<string, Plan> = {
  starter: {
    name: 'Starter',
    price: 0,
    period: 'month',
    features: ['1 active deck', '2 links', '10 views', 'Basic analytics'],
    priceId: 'price_starter_monthly' // Replace with actual Stripe Price ID
  },
  growth: {
    name: 'Growth',
    price: 29,
    period: 'month',
    features: ['5 active decks', 'Unlimited links', 'Unlimited views', 'Advanced analytics', 'Email support'],
    priceId: 'price_growth_monthly' // Replace with actual Stripe Price ID
  },
  scale: {
    name: 'Scale',
    price: 99,
    period: 'month',
    features: ['Unlimited decks', 'AI insights', 'Advanced security', 'Premium support', 'Custom branding'],
    priceId: 'price_scale_monthly' // Replace with actual Stripe Price ID
  }
};

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      onLogin({
        name: 'John Doe',
        email: email,
        company: 'Acme Startup'
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

const BillingForm: React.FC<BillingFormProps> = ({ selectedPlan, user, onBack }) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'manual'>('stripe');

  const plan = plans[selectedPlan];

  // Simulate Stripe integration
  const handleStripeCheckout = async () => {
    setProcessing(true);
    setError('');

    try {
      // In your actual implementation, this would be:
      /*
      const stripe = await getStripe();
      if (!stripe) throw new Error('Stripe failed to initialize');

      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: plan.priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/billing?plan=${selectedPlan}`,
        customerEmail: user.email,
        clientReferenceId: user.email,
      });

      if (error) {
        setError(error.message || 'Payment failed');
        setProcessing(false);
      }
      */

      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      setProcessing(false);
      setSuccess(true);
    } catch (err) {
      setError('Payment processing failed. Please try again.');
      setProcessing(false);
    }
  };

  const createPaymentIntent = async () => {
    try {
      // In your actual implementation:
      /*
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          customerEmail: user.email,
          customerName: user.name,
        }),
      });

      const { clientSecret, error } = await response.json();
      
      if (error) {
        setError(error);
        return;
      }

      return clientSecret;
      */
      
      // Mock response for demo
      return 'pi_mock_client_secret';
    } catch (err) {
      setError('Failed to create payment intent');
      throw err;
    }
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to {plan.name}!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Your subscription has been activated successfully. You can now access all {plan.name} features.
        </p>
        <div className="space-y-3">
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Go to Dashboard
          </button>
          <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Download Receipt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 sticky top-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{plan.name} Plan</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Monthly subscription</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    ${plan.price}/{plan.period}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">Included Features:</h5>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${plan.price}/{plan.period}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Billed monthly • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {/* Account Information */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 text-orange-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Account Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <CreditCard className="w-5 h-5 text-orange-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Method</h3>
              </div>

              <div className="space-y-4">
                {/* Stripe Checkout Option */}
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'stripe' 
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                  onClick={() => setPaymentMethod('stripe')}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Stripe Checkout (Recommended)</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Secure payment processing with credit card, Apple Pay, Google Pay, and more
                      </p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      paymentMethod === 'stripe'
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {paymentMethod === 'stripe' && (
                        <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Manual Payment Option */}
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'manual' 
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                  onClick={() => setPaymentMethod('manual')}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Manual Payment Form</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Enter payment details manually (for demo purposes)
                      </p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      paymentMethod === 'manual'
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {paymentMethod === 'manual' && (
                        <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                  <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center">
                <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  Your payment information is secured with bank-level encryption and processed by Stripe, a PCI-compliant payment processor.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={onBack}
                className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Plans
              </button>
              
              {paymentMethod === 'stripe' ? (
                <button
                  onClick={handleStripeCheckout}
                  disabled={processing}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    `Continue with Stripe - $${plan.price}/${plan.period}`
                  )}
                </button>
              ) : (
                <button
                  onClick={() => setSuccess(true)}
                  disabled={processing}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Complete Payment - $${plan.price}/${plan.period}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getPlanFromUrl = () => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('plan') || 'growth';
  }
  return 'growth';
};

export default function BillingPage() {
  const { isLoggedIn, user, loading, setIsLoggedIn, setUser } = useAuth();
  const [selectedPlan] = useState(getPlanFromUrl());
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      setShowLogin(true);
    }
  }, [loading, isLoggedIn]);

  const handleLogin = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowLogin(false);
  };

  const handleBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">DocuPitch</span>
            </div>
            {isLoggedIn && user && (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoggedIn && user ? (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Complete Your Subscription
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Choose your preferred payment method to unlock all {plans[selectedPlan]?.name} features
              </p>
            </div>
            <BillingForm 
              selectedPlan={selectedPlan} 
              user={user} 
              onBack={handleBack}
            />
          </div>
        ) : !loading && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Sign in to continue
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Please sign in to your account to proceed with your {plans[selectedPlan]?.name} subscription.
              </p>
              <button
                onClick={() => setShowLogin(true)}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        {/* Login Modal */}
        {showLogin && (
          <LoginForm 
            onLogin={handleLogin} 
            onClose={() => setShowLogin(false)} 
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-orange-500 rounded"></div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">DocuPitch</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© 2025 DocuPitch. All rights reserved. • Secure payments powered by Stripe</p>
          </div>
        </div>
      </footer>
    </div>
  );
}