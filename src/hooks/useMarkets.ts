
import { useState, useEffect } from 'react'
import { supabase, Market } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export const useMarkets = (selectedTopic?: string | null) => {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchMarkets()
  }, [selectedTopic])

  const fetchMarkets = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from('markets')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (selectedTopic) {
        query = query.eq('topic', selectedTopic)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching markets:', error)
        toast({
          title: "Error",
          description: "Failed to load markets",
          variant: "destructive",
        })
        return
      }

      setMarkets(data || [])
    } catch (error) {
      console.error('Error fetching markets:', error)
      toast({
        title: "Error",
        description: "Failed to load markets",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return { markets, loading, refetch: fetchMarkets }
}
