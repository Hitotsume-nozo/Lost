import { signUp } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function SignUpPage() {
  const session = await getServerSession();
  
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sage-light to-washi">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-xl border border-sumi-gray">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-ink-navy">Create Account</h1>
          <p className="mt-2 text-sm text-ink-slate">
            Join the Campus Lost & Found System
          </p>
        </div>

        <form
          className="mt-8 space-y-6"
          action={async (formData) => {
            "use server";
            await signUp(formData);
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-ink-charcoal">
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 border border-sumi-gray rounded-md shadow-sm focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
                placeholder="John"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-ink-charcoal">
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 border border-sumi-gray rounded-md shadow-sm focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
                placeholder="Doe"
              />
            </div>
          </div>

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
            <label htmlFor="unionId" className="block text-sm font-medium text-ink-charcoal">
              University ID
            </label>
            <input
              id="unionId"
              name="unionId"
              type="text"
              required
              className="mt-1 block w-full px-4 py-3 border border-sumi-gray rounded-md shadow-sm focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
              placeholder="102403XXXX"
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-ink-charcoal">
              Department
            </label>
            <select
              id="department"
              name="department"
              required
              className="mt-1 block w-full px-4 py-3 border border-sumi-gray rounded-md shadow-sm focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
            >
              <option value="">Select Department</option>
              <option value="CSE">Computer Science & Engineering</option>
              <option value="ECE">Electronics & Communication Engineering</option>
              <option value="EEE">Electrical & Electronics Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="CE">Civil Engineering</option>
              <option value="CHE">Chemical Engineering</option>
              <option value="MBA">Business Administration</option>
              <option value="MCA">Computer Applications</option>
              <option value="PHY">Physics</option>
              <option value="CHEM">Chemistry</option>
              <option value="MATH">Mathematics</option>
            </select>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-ink-charcoal">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              pattern="[0-9]{10}"
              className="mt-1 block w-full px-4 py-3 border border-sumi-gray rounded-md shadow-sm focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
              placeholder="9876543210"
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
              autoComplete="new-password"
              required
              minLength={8}
              className="mt-1 block w-full px-4 py-3 border border-sumi-gray rounded-md shadow-sm focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ink-navy hover:bg-ink-charcoal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage transition-all duration-200"
          >
            Create Account
          </button>
        </form>

        <div className="text-center">
          <a
            href="/sign-in"
            className="text-sm font-medium text-sage hover:text-sage-deep transition-colors"
          >
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
