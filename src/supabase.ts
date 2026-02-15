import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://erzlrmkzmqvlqimxvkwn.supabase.co'
const supabaseKey = 'sb_publishable_lchjLZX7ULiXnNKjRjxtcQ_T-IpHbKJ'

export const supabase = createClient(supabaseUrl, supabaseKey)
