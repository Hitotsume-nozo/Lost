'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '@/components/Navbar';
import { Search, Filter } from 'lucide-react';
import Link from 'next/link';

interface Item {
  id: number;
  category: string;
  description: string;
  color: string | null;
  brand: string | null;
  locationFound: string | null;
  dateReported: string | null;
  status: string;
  image: string | null;
  reportedByName: string | null;
  reportedByDepartment: string | null;
}

export default function ItemsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ['items', search, status, category, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(status && { status }),
        ...(category && { category }),
      });

      const response = await fetch(`/api/items?${params}`);
      if (!response.ok) throw new Error('Failed to fetch items');
      return response.json();
    },
  });

  const items: Item[] = data?.data || [];
  const pagination = data?.pagination;

  const categories = ['Electronics', 'Clothing', 'Books', 'Accessories', 'Sports', 'Other'];
  const statuses = ['Found', 'Lost', 'Claimed', 'Returned'];

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-ink-navy mb-2">Browse Items</h1>
          <p className="text-ink-slate">Search and filter through lost and found items</p>
        </div>

        {/* Filters */}
        <div className="bg-washi p-6 rounded-lg shadow-md mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-slate w-5 h-5" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by description, color, brand..."
                  className="w-full pl-10 pr-4 py-3 border border-sumi-gray rounded-md focus:ring-2 focus:ring-sage focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 border border-sumi-gray rounded-md focus:ring-2 focus:ring-sage focus:border-transparent"
              >
                <option value="">All Statuses</option>
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-sumi-gray rounded-md focus:ring-2 focus:ring-sage focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sage"></div>
            <p className="mt-4 text-ink-slate">Loading items...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-red-700">Error loading items. Please try again.</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-washi rounded-lg">
            <p className="text-ink-slate text-lg">No items found matching your criteria</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Link href={`/item/${item.id}`} key={item.id}>
                  <div className="bg-white border border-sumi-gray rounded-lg p-4 hover:shadow-lg transition cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Found' ? 'bg-sage-light text-sage-deep' :
                        item.status === 'Claimed' ? 'bg-gold-faint text-gold-leaf' :
                        item.status === 'Returned' ? 'bg-ink-slate text-white' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-xs text-ink-slate">{item.category}</span>
                    </div>
                    
                    <h3 className="font-bold text-ink-navy mb-2 line-clamp-2">
                      {item.description}
                    </h3>
                    
                    {(item.color || item.brand) && (
                      <div className="text-sm text-ink-slate mb-2">
                        {item.color && <span>{item.color}</span>}
                        {item.color && item.brand && <span> • </span>}
                        {item.brand && <span>{item.brand}</span>}
                      </div>
                    )}
                    
                    {item.locationFound && (
                      <p className="text-sm text-ink-slate mb-3">
                        📍 {item.locationFound}
                      </p>
                    )}
                    
                    <div className="text-xs text-ink-slate pt-3 border-t border-sumi-gray">
                      {item.dateReported 
                        ? new Date(item.dateReported).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        : 'Date unknown'
                      }
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-8">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-ink-navy text-white rounded-md disabled:opacity-50 hover:bg-ink-charcoal transition"
                >
                  Previous
                </button>
                <span className="text-ink-slate">
                  Page {page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
                  disabled={page === pagination.totalPages}
                  className="px-4 py-2 bg-ink-navy text-white rounded-md disabled:opacity-50 hover:bg-ink-charcoal transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
