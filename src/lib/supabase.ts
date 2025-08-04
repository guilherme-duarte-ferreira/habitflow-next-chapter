import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://daxjihbxntsidyksaclj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRheGppaGJ4bnRzaWR5a3NhY2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMDEwNDEsImV4cCI6MjA1MTU3NzA0MX0.WN3BcsBZQe5yM8L7xM2n_uJJuKjK2Pd-8YHNgLhpE7A';

export const supabase = createClient(supabaseUrl, supabaseKey);