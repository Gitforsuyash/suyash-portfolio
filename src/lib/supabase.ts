// Optional Supabase backend. Activates ONLY when both env vars are present
// (set them in .env.local locally and in Vercel → Settings → Env Vars).
// When unset, the whole app behaves exactly as before (local-only admin).
const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(URL && KEY);

const TABLE = "site_content";
const ROW_ID = 1;

let _client: any = null;
async function client() {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured");
  if (_client) return _client;
  // dynamic import so supabase-js is only fetched when actually used
  const { createClient } = await import("@supabase/supabase-js");
  _client = createClient(URL as string, KEY as string);
  return _client;
}

/** Read the single content row (public — anyone can read). */
export async function fetchContent(): Promise<Record<string, unknown> | null> {
  const c = await client();
  const { data, error } = await c
    .from(TABLE)
    .select("content")
    .eq("id", ROW_ID)
    .maybeSingle();
  if (error) throw error;
  return (data?.content as Record<string, unknown>) ?? null;
}

/** Write the content row (requires an authenticated admin via RLS). */
export async function saveContent(content: unknown): Promise<void> {
  const c = await client();
  const { error } = await c
    .from(TABLE)
    .upsert({ id: ROW_ID, content, updated_at: new Date().toISOString() });
  if (error) throw error;
}

export async function signIn(email: string, password: string): Promise<void> {
  const c = await client();
  const { error } = await c.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signOut(): Promise<void> {
  const c = await client();
  await c.auth.signOut();
}

export async function currentEmail(): Promise<string | null> {
  const c = await client();
  const { data } = await c.auth.getSession();
  return data?.session?.user?.email ?? null;
}
