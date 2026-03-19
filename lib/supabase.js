import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};
const supabaseUrl = env.VITE_SUPABASE_URL || "https://cprisxrrmkziuvzrltdc.supabase.co";
const supabaseKey = env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwcmlzeHJybWt6aXV2enJsdGRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5Mjk0MjcsImV4cCI6MjA4OTUwNTQyN30.c4dKtDHaT9bjYY06wPAZP1Omrndi5POCkT4Qds0zKMg";

export const supabase = createClient(supabaseUrl, supabaseKey);
