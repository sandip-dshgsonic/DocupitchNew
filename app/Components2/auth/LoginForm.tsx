'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginForm() {
  const router = useRouter();
  const [isLoginWithEmail, setIsLoginWithEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [emailButtonText, setEmailButtonText] = useState("Continue with Email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginWithEmail(true);
    
    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/dashboard');
    } catch (error) {
      setEmailButtonText("Error sending email - try again?");
      console.error('Login error:', error);
    } finally {
      setIsLoginWithEmail(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <Image 
        src="/logo.png"
        alt="Docupitch Logo"
        width={100}
        height={100}
        className="m-2"
      />
      <Link href="/">
        <span className="text-2xl font-semibold text-gray-800">
          Welcome to Docupitch
        </span>
      </Link>
      <h3 className="text-sm text-gray-800">
        Share documents. Not attachments.
      </h3>

      <form className="w-full space-y-4 pt-8" onSubmit={handleSubmit}>
        <div>
          <label className="sr-only" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex h-10 w-full rounded-md border-0 bg-white px-3 py-2 text-sm text-gray-900 
                     ring-1 ring-gray-200 transition-colors file:border-0 file:bg-transparent 
                     file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none 
                     focus-visible:ring-1 focus-visible:ring-orange-500 disabled:cursor-not-allowed 
                     disabled:opacity-50"
            disabled={isLoginWithEmail}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoginWithEmail}
          className={`${
            isLoginWithEmail ? 'bg-orange-600' : 'bg-orange-500 hover:bg-orange-600'
          } w-full transform rounded-lg px-4 py-2 text-white transition-colors duration-300 
          ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 
          disabled:opacity-50`}
        >
          {isLoginWithEmail ? (
            <div className="flex items-center justify-center">
              <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Signing in...</span>
            </div>
          ) : (
            emailButtonText
          )}
        </button>
      </form>

      <p className="mt-6 text-xs text-gray-500">
        By clicking continue, you acknowledge that you have read and agree to Docupitch&apos;s{" "}
        <Link href="/terms-of-service" className="text-orange-600 underline hover:text-orange-700">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="text-orange-600 underline hover:text-orange-700">
          Privacy Policy
        </Link>.
      </p>
    </div>
  );
}