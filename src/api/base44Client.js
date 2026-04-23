import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iaedslcmhsmgbnpogevh.supabase.co'
const supabaseKey = 'sb_publishable_SiYQoekblKmCYNobyochtw_j3-hy4Ep'

export const supabase = createClient(supabaseUrl, supabaseKey)
