import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ziqjyovobfttriebiiif.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppcWp5b3ZvYmZ0dHJpZWJpaWlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3ODg0MzcsImV4cCI6MjA3MzM2NDQzN30.UY9Z87EPITcU6pBrRVPZHw_6VFZJbhKJroz1CKpxbrQ';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
