'use client';

import { useSession } from 'next-auth/react';
import { Navbar } from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-ink-navy mb-6">
            Centralized Campus Lost & Found
          </h1>
          <p className="text-xl text-ink-slate mb-8 max-w-3xl mx-auto">
            A pure SQL backend implementation with PL/SQL automation for efficient item recovery 
            at Thapar Institute of Engineering & Technology
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => router.push('/items')}
              className="px-8 py-3 bg-sage hover:bg-sage-deep text-white rounded-md font-medium transition"
            >
              Browse Items
            </button>
            {!session && (
              <button
                onClick={() => router.push('/login')}
                className="px-8 py-3 bg-ink-navy hover:bg-ink-charcoal text-white rounded-md font-medium transition"
              >
                Get Started
              </button>
            )}
            {session && (
              <button
                onClick={() => router.push('/dashboard')}
                className="px-8 py-3 bg-ink-navy hover:bg-ink-charcoal text-white rounded-md font-medium transition"
              >
                Go to Dashboard
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-washi p-6 rounded-lg shadow-md">
              <div className="text-sage-deep text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-ink-navy mb-2">Search Items</h3>
              <p className="text-ink-slate">
                Browse through hundreds of lost and found items with advanced filtering options
              </p>
            </div>
            
            <div className="bg-washi p-6 rounded-lg shadow-md">
              <div className="text-sage-deep text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-ink-navy mb-2">Instant Claims</h3>
              <p className="text-ink-slate">
                Submit claims with proof of ownership and track verification status in real-time
              </p>
            </div>
            
            <div className="bg-washi p-6 rounded-lg shadow-md">
              <div className="text-sage-deep text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-ink-navy mb-2">Secure & Verified</h3>
              <p className="text-ink-slate">
                Database-level enforcement ensures data integrity and prevents fraudulent claims
              </p>
            </div>
          </div>

          <div className="mt-16 p-6 bg-gold-faint rounded-lg border-l-4 border-gold-leaf">
            <p className="text-ink-charcoal italic">
              "The system achieves a qualitatively higher standard of data integrity by migrating 
              business logic from the application layer into the RDBMS."
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
