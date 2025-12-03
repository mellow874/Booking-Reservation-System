// supabase.js
import { createClient } from "@supabase/supabase-js";
import "dotenv/config"; // Load .env variables

// Create Supabase client using server-side service role key
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
