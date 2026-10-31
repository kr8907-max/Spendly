import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const DEFAULT_CATEGORIES = [
  { categoryName: "Food & Drinks", description: "Meals, snacks, and eating out", icon: "🍽️", color: "#F59E0B", isCustom: false },
  { categoryName: "Coffee & Tea", description: "Coffee, tea, and quick drinks", icon: "☕", color: "#C084FC", isCustom: false },
  { categoryName: "Transportation", description: "Fuel, transit, rideshares, and travel", icon: "🚇", color: "#60A5FA", isCustom: false },
  { categoryName: "Shopping", description: "General purchases and retail spend", icon: "🛍️", color: "#FB7185", isCustom: false },
  { categoryName: "Entertainment", description: "Movies, games, events, and fun", icon: "🎉", color: "#A78BFA", isCustom: false },
  { categoryName: "Groceries", description: "Household groceries and essentials", icon: "🛒", color: "#34D399", isCustom: false },
  { categoryName: "Education", description: "Courses, books, and learning", icon: "📚", color: "#38BDF8", isCustom: false },
  { categoryName: "Health", description: "Medical, wellness, and pharmacy spend", icon: "💊", color: "#F87171", isCustom: false },
  { categoryName: "Bills", description: "Utilities, rent, and recurring bills", icon: "🧾", color: "#FBBF24", isCustom: false },
  { categoryName: "Subscriptions", description: "Streaming, services, and memberships", icon: "📦", color: "#818CF8", isCustom: false },
  { categoryName: "Personal Care", description: "Hair, grooming, and lifestyle care", icon: "✨", color: "#F9A8D4", isCustom: false },
  { categoryName: "Other", description: "Miscellaneous or uncategorized expenses", icon: "🧩", color: "#94A3B8", isCustom: false },
] as const;

export type RegisterInput = z.infer<typeof registerSchema>;
