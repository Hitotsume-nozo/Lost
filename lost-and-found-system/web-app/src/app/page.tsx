import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, LogIn, UserPlus } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-light/30 to-white">
      {/* Header */}
      <header className="border-b border-ink-slate/20 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-sage flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-ink-navy">Lost & Found</h1>
              <p className="text-xs text-ink-slate">Campus Centralized System</p>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/items">
              <Button variant="ghost" className="text-ink-charcoal">
                <Search className="w-4 h-4 mr-2" />
                Browse Items
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="outline" className="border-ink-navy text-ink-navy hover:bg-ink-navy hover:text-white">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-sage hover:bg-sage-deep text-white">
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-faint text-gold-leaf text-sm font-medium mb-6">
            ✨ AI-Ready Database Architecture
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-ink-navy mb-6 leading-tight">
            Find What You've Lost.<br />
            Return What You've Found.
          </h2>
          
          <p className="text-xl text-ink-slate mb-10 max-w-2xl mx-auto leading-relaxed">
            A centralized campus-wide system for reporting and claiming lost items. 
            Powered by a robust database backend with automated workflows and real-time tracking.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/items">
              <Button size="lg" className="bg-sage hover:bg-sage-deep text-white px-8 py-6 text-lg">
                <Search className="w-5 h-5 mr-2" />
                Search Lost Items
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="lg" variant="outline" className="border-ink-navy text-ink-navy hover:bg-ink-navy hover:text-white px-8 py-6 text-lg">
                <UserPlus className="w-5 h-5 mr-2" />
                Report an Item
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            <div className="p-6 rounded-xl border border-ink-slate/20 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-sage-light flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-sage-deep" />
              </div>
              <h3 className="text-lg font-semibold text-ink-navy mb-2">Centralized Search</h3>
              <p className="text-ink-slate text-sm">
                Search across all departments and locations from one unified interface.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-ink-slate/20 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gold-faint flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gold-leaf" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-ink-navy mb-2">Verified Claims</h3>
              <p className="text-ink-slate text-sm">
                Secure ownership verification with admin approval workflow.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-ink-slate/20 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-ink-slate/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-ink-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-ink-navy mb-2">Complete Audit Trail</h3>
              <p className="text-ink-slate text-sm">
                Every action is logged for transparency and accountability.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 p-8 rounded-2xl bg-ink-navy text-white">
            <h3 className="text-2xl font-bold mb-6">System Capabilities</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-gold-leaf mb-1">3NF</div>
                <div className="text-sm text-ink-slate">Normalized Schema</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-leaf mb-1">ACID</div>
                <div className="text-sm text-ink-slate">Transaction Safety</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-leaf mb-1">7+</div>
                <div className="text-sm text-ink-slate">Stored Procedures</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-leaf mb-1">AI</div>
                <div className="text-sm text-ink-slate">Ready Architecture</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-ink-slate/20 bg-white mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-ink-slate text-sm mb-4 md:mb-0">
              © 2024 Campus Lost & Found. Built by Hitotsume-Nozo.
            </div>
            <div className="flex items-center space-x-6 text-sm text-ink-slate">
              <Link href="/items" className="hover:text-sage transition-colors">Browse Items</Link>
              <Link href="/sign-in" className="hover:text-sage transition-colors">Sign In</Link>
              <Link href="/sign-up" className="hover:text-sage transition-colors">Register</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
