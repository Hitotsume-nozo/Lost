import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Home, Search, PlusCircle, User, LogOut, Shield } from 'lucide-react';

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-ink-navy text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-sage-light">
              Lost & Found
            </Link>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/" className="flex items-center px-3 py-2 rounded-md hover:bg-sage-deep transition">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
              <Link href="/items" className="flex items-center px-3 py-2 rounded-md hover:bg-sage-deep transition">
                <Search className="w-4 h-4 mr-2" />
                Browse Items
              </Link>
              {session && (
                <Link href="/dashboard" className="flex items-center px-3 py-2 rounded-md hover:bg-sage-deep transition">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              )}
              {session?.user?.role === 'admin' && (
                <Link href="/admin" className="flex items-center px-3 py-2 rounded-md hover:bg-sage-deep transition">
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-sm text-sage-light">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="flex items-center px-3 py-2 rounded-md hover:bg-sage-deep transition"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-sage hover:bg-sage-deep rounded-md transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
