import { createClient } from "@supabase/supabase-js";

const PREFIX = "storage:";
const EXPIRES_IN = 60 * 60 * 24 * 7;

function adminClient() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

export function isStorageRef(value: string | null | undefined): value is string {
  return typeof value === "string" && value.startsWith(PREFIX);
}

export function storagePath(value: string) {
  return value.slice(PREFIX.length);
}

export function toStorageRef(path: string) {
  return `${PREFIX}${path}`;
}

/**
 * Resolves internal storage references ("storage:<path>") to temporary signed URLs.
 * Plain http(s) URLs are returned untouched.
 */
export async function resolveMediaUrls(values: (string | null | undefined)[]) {
  const map = new Map<string, string | null>();
  const refs = Array.from(new Set(values.filter(isStorageRef).map(storagePath)));
  if (refs.length === 0) return map;

  const { data } = await adminClient().storage.from("midia").createSignedUrls(refs, EXPIRES_IN);
  for (const item of data ?? []) {
    if (item.path) map.set(toStorageRef(item.path), item.signedUrl ?? null);
  }
  return map;
}

export function applyMedia(map: Map<string, string | null>, value: string | null | undefined) {
  if (!value) return null;
  if (isStorageRef(value)) return map.get(value) ?? null;
  return value;
}
