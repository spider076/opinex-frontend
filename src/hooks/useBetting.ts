
import { supabase, Bet } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export const useBetting = () => {
  const { toast } = useToast()

  const placeBet = async (marketId: string, prediction: 'yes' | 'no', amount: number) => {
    try {
      // Get current user (you'll need to implement auth first)
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to place bets",
          variant: "destructive",
        })
        return false
      }

      // Calculate potential return based on market odds
      const { data: market } = await supabase
        .from('markets')
        .select('yes_price, no_price')
        .eq('id', marketId)
        .single()

      if (!market) {
        toast({
          title: "Error",
          description: "Market not found",
          variant: "destructive",
        })
        return false
      }

      const potentialReturn = amount * (prediction === 'yes' ? 1/market.yes_price : 1/market.no_price)

      // Insert bet
      const { error: betError } = await supabase
        .from('bets')
        .insert({
          market_id: marketId,
          user_id: user.id,
          prediction,
          amount,
          potential_return: potentialReturn
        })

      if (betError) {
        console.error('Error placing bet:', betError)
        toast({
          title: "Error",
          description: "Failed to place bet",
          variant: "destructive",
        })
        return false
      }

      // Update market totals
      const { error: updateError } = await supabase.rpc('update_market_after_bet', {
        market_id: marketId,
        prediction_type: prediction,
        bet_amount: amount
      })

      if (updateError) {
        console.error('Error updating market:', updateError)
      }

      toast({
        title: "Bet Placed!",
        description: `You predicted ${prediction.toUpperCase()} with $${amount}`,
      })

      return true
    } catch (error) {
      console.error('Error placing bet:', error)
      toast({
        title: "Error",
        description: "Failed to place bet",
        variant: "destructive",
      })
      return false
    }
  }

  return { placeBet }
}
