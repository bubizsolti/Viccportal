import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kgsybjdmbpufucdvvvpb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnc3liamRtYnB1ZnVjZHZ2dnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwNzc5OTUsImV4cCI6MjA0ODY1Mzk5NX0.1ji2U75AbU0_qD1iXosgHKgTPIY18LTHMkDZEi9nS1k'

export const supabase = createClient(supabaseUrl, supabaseKey) 