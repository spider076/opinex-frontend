
import { useState, useEffect } from 'react'
import { supabase, ChatMessage } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export const useChat = (marketId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchMessages()
    
    // Subscribe to real-time messages
    const subscription = supabase
      .channel(`market_chat_${marketId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `market_id=eq.${marketId}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as ChatMessage])
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [marketId])

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('market_id', marketId)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching messages:', error)
        return
      }

      setMessages(data || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (message: string, prediction?: 'yes' | 'no') => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to chat",
          variant: "destructive",
        })
        return false
      }

      const { error } = await supabase
        .from('chat_messages')
        .insert({
          market_id: marketId,
          user_id: user.id,
          username: user.email?.split('@')[0] || 'Anonymous',
          message,
          prediction
        })

      if (error) {
        console.error('Error sending message:', error)
        toast({
          title: "Error",
          description: "Failed to send message",
          variant: "destructive",
        })
        return false
      }

      return true
    } catch (error) {
      console.error('Error sending message:', error)
      return false
    }
  }

  return { messages, loading, sendMessage }
}
