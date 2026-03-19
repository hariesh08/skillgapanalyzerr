// config.js

export const SUPABASE_URL = 'https://bjkvtrbzruzxuwhrrnao.supabase.co';
export const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqa3Z0cmJ6cnV6eHV3aHJybmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMzI5NTcsImV4cCI6MjA4ODYwODk1N30._Au9Krpl2HMewHqXXUI3rkehQ70j2RMiB-KEtHZq8Mo'; // Default Anon Key

// Initialize Supabase client
export const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
