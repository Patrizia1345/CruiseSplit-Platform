import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client.
 * Use in Client Components ("use client").
 * isSingleton ensures one shared instance per browser tab.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { isSingleton: true }
  );
}
