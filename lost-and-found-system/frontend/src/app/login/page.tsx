'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-md mx-auto px-4 py-12">
        <div className="bg-washi p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-ink-navy mb-2">Welcome Back</h1>
          <p className="text-ink-slate mb-8">Sign in to access your dashboard</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink-charcoal mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-sumi-gray rounded-md focus:ring-2 focus:ring-sage focus:border-transparent"
                placeholder="you@thapar.edu"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ink-charcoal mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-sumi-gray rounded-md focus:ring-2 focus:ring-sage focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-sage hover:bg-sage-deep text-white rounded-md font-medium transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-ink-slate">
            Don't have an account?{' '}
            <Link href="/register" className="text-sage hover:underline">
              Register here
            </Link>
          </div>

          <div className="mt-6 p-4 bg-gold-faint rounded-md">
            <p className="text-xs text-ink-charcoal">
              <strong>Demo Credentials:</strong><br/>
              Admin: admin@thapar.edu / password<br/>
              User: student@thapar.edu / password
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
