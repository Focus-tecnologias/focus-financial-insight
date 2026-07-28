import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lykwydydrctmjzcvugjd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_LtPtjXysCTL1qZB6E0VuvQ_CsZbTvUs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
