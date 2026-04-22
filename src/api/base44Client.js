import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iaedslcmhsmgbnpogevh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhZWRzbGNtaHNtZ2JucG9nZXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4OTA3MDYsImV4cCI6MjA5MjQ2NjcwNn0.lYOy1jvN5bpIX_ISAvd0g4cSP6iY5ala221zfkpJXtY'

export const supabase = createClient(supabaseUrl, supabaseKey)
