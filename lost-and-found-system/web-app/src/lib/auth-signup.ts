import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const unionId = formData.get("unionId") as string;
  const department = formData.get("department") as string;
  const phone = formData.get("phone") as string | null;

  // Validate required fields
  if (!email || !password || !first_name || !last_name || !unionId || !department) {
    throw new Error("All required fields must be filled");
  }

  // Check if user already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  await db.insert(users).values({
    email,
    password: hashedPassword,
    first_name,
    last_name,
    name: `${first_name} ${last_name}`,
    unionId,
    department,
    phone: phone || undefined,
    role: "user", // Default role
  });

  // Redirect to sign in
  return { success: true };
}
