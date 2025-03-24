import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tbcqrlrgetvgxzialkex.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiY3FybHJnZXR2Z3h6aWFsa2V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxMzQ1NjUsImV4cCI6MjA1NTcxMDU2NX0.O7pzrPwGQmU3i-L6EHTh26H5G6iR_tyDN1d_-rtGFDg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
