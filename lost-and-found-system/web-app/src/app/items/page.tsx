import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getItems, getCategories } from "@/lib/items";

interface PageProps {
  searchParams: {
    category?: string;
    status?: string;
    location?: string;
    search?: string;
    page?: string;
  };
}

export default async function ItemsPage({ searchParams }: PageProps) {
  const session = await getServerSession();
  
  const itemsData = await getItems({
    category: searchParams.category,
    status: searchParams.status,
    location: searchParams.location,
    search: searchParams.search,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: 12,
  });

  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-washi">
      {/* Header */}
      <div className="bg-ink-navy text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Browse Items</h1>
          <p className="mt-2 text-sage-light opacity-90">
            Search and filter lost & found items across campus
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-ink-navy mb-4">Filters</h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink-charcoal mb-2">
                    Search
                  </label>
                  <input
                    type="text"
                    name="search"
                    defaultValue={searchParams.search}
                    placeholder="Keywords..."
                    className="w-full px-3 py-2 border border-sumi-gray rounded-md focus:ring-2 focus:ring-sage focus:border-sage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-charcoal mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={searchParams.category}
                    className="w-full px-3 py-2 border border-sumi-gray rounded-md focus:ring-2 focus:ring-sage focus:border-sage"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-charcoal mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={searchParams.status}
                    className="w-full px-3 py-2 border border-sumi-gray rounded-md focus:ring-2 focus:ring-sage focus:border-sage"
                  >
                    <option value="">All Statuses</option>
                    <option value="Found">Found</option>
                    <option value="Lost">Lost</option>
                    <option value="Claimed">Claimed</option>
                    <option value="Returned">Returned</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-charcoal mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={searchParams.location}
                    placeholder="e.g., Library, Block A"
                    className="w-full px-3 py-2 border border-sumi-gray rounded-md focus:ring-2 focus:ring-sage focus:border-sage"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-ink-navy text-white py-2 px-4 rounded-md hover:bg-ink-charcoal transition-colors"
                >
                  Apply Filters
                </button>
              </form>
            </div>
          </aside>

          {/* Items Grid */}
          <main className="lg:col-span-3">
            {itemsData.items.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-ink-slate text-lg">No items found matching your criteria.</p>
                <a
                  href="/items"
                  className="inline-block mt-4 text-sage hover:text-sage-deep font-medium"
                >
                  Clear all filters
                </a>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {itemsData.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {item.image && (
                        <div className="h-48 bg-sumi-gray overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.description}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-sage bg-sage-light px-2 py-1 rounded">
                            {item.categoryName || item.category}
                          </span>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded ${
                              item.status === "Found"
                                ? "text-sage bg-sage-light"
                                : item.status === "Claimed"
                                ? "text-ink-navy bg-gold-faint"
                                : item.status === "Returned"
                                ? "text-white bg-sage-deep"
                                : "text-ink-slate bg-sumi-gray"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <h3 className="font-semibold text-ink-navy mb-2 line-clamp-2">
                          {item.description}
                        </h3>
                        <div className="space-y-1 text-sm text-ink-slate">
                          {item.color && (
                            <p>
                              <span className="font-medium">Color:</span> {item.color}
                            </p>
                          )}
                          {item.brand && (
                            <p>
                              <span className="font-medium">Brand:</span> {item.brand}
                            </p>
                          )}
                          <p>
                            <span className="font-medium">Location:</span> {item.location_found}
                          </p>
                          <p className="text-xs">
                            <span className="font-medium">Reported:</span>{" "}
                            {new Date(item.date_reported).toLocaleDateString()}
                          </p>
                        </div>
                        <a
                          href={`/items/${item.id}`}
                          className="mt-4 block w-full text-center bg-ink-navy text-white py-2 px-4 rounded-md hover:bg-ink-charcoal transition-colors text-sm font-medium"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {itemsData.pagination.totalPages > 1 && (
                  <div className="mt-8 flex justify-center items-center space-x-2">
                    {itemsData.pagination.page > 1 && (
                      <a
                        href={`?${new URLSearchParams({
                          ...searchParams,
                          page: String(itemsData.pagination.page - 1),
                        }).toString()}`}
                        className="px-4 py-2 bg-white border border-sumi-gray rounded-md hover:bg-sumi-gray transition-colors"
                      >
                        Previous
                      </a>
                    )}

                    <span className="text-ink-slate">
                      Page {itemsData.pagination.page} of {itemsData.pagination.totalPages}
                    </span>

                    {itemsData.pagination.page < itemsData.pagination.totalPages && (
                      <a
                        href={`?${new URLSearchParams({
                          ...searchParams,
                          page: String(itemsData.pagination.page + 1),
                        }).toString()}`}
                        className="px-4 py-2 bg-white border border-sumi-gray rounded-md hover:bg-sumi-gray transition-colors"
                      >
                        Next
                      </a>
                    )}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
