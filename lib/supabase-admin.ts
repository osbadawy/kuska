import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL;

const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl) {
  throw new Error(
    "SUPABASE_URL is not configured."
  );
}

if (!supabaseSecretKey) {
  throw new Error(
    "SUPABASE_SECRET_KEY is not configured."
  );
}

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseSecretKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

export const NUTRITION_BUCKET =
  process.env.SUPABASE_NUTRITION_BUCKET ||
  "nutrition";

export const WORKOUT_BUCKET =
  process.env.SUPABASE_WORKOUT_BUCKET ||
  "workouts";

export const RUNNING_BUCKET =
  process.env.SUPABASE_RUNNING_BUCKET ||
  "running";  