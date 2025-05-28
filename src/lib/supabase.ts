
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hypeyazsqvpzdnldzdce.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cGV5YXpzcXZwemRubGR6ZGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NDIxNTMsImV4cCI6MjA2NDAxODE1M30.K3zaxAMW4ZwAjopYhTEGc5H5CQzV3eyLKCUI_oKUlZI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Market {
  id: string
  title: string
  description: string
  topic: string
  category: string
  total_pool: number
  participants: number
  yes_votes: number
  no_votes: number
  yes_price: number
  no_price: number
  fee_percentage: number
  status: 'active' | 'settled' | 'cancelled'
  end_date: string
  created_at: string
  updated_at: string
}

export interface Bet {
  id: string
  market_id: string
  user_id: string
  prediction: 'yes' | 'no'
  amount: number
  potential_return: number
  created_at: string
}

export interface ChatMessage {
  id: string
  market_id: string
  user_id: string
  username: string
  message: string
  prediction?: 'yes' | 'no'
  created_at: string
}

export interface User {
  id: string
  email: string
  username: string
  balance: number
  total_winnings: number
  created_at: string
}
