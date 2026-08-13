import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function SignInPage() {
  const session = await getServerSession();
  
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sage-light to-washi">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl border border-sumi-gray">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-ink-navy">Sign In</h1>
          <p className="mt-2 text-sm text-ink-slate">
            Access your Lost & Found dashboard
          </p>
        </div>

        <form
          className="mt-8 space-y-6"
          action={async (formData) => {
            "use server";
            await signIn("credentials", formData);
          }}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink-charcoal">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-sumi-gray rounded-md shadow-sm focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
                placeholder="you@thapar.edu"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ink-charcoal">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-4 py-3 border border-sumi-gray rounded-md shadow-sm focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ink-navy hover:bg-ink-charcoal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage transition-all duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="text-center">
          <a
            href="/sign-up"
            className="text-sm font-medium text-sage hover:text-sage-deep transition-colors"
          >
            Don't have an account? Create one
          </a>
        </div>

        <div className="mt-6 p-4 bg-gold-faint rounded-md border border-gold-leaf/20">
          <p className="text-xs text-ink-slate text-center">
            <strong>Demo Credentials:</strong><br />
            Admin: admin@tiet.ac.in / admin123<br />
            User: student@tiet.ac.in / student123
          </p>
        </div>
      </div>
    </div>
  );
}
