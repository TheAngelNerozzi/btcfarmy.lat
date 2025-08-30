import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface IcoContribution {
  id: string;
  user_id: string | null;
  email: string;
  amount_usd: number;
  bfy_tokens: number;
  transaction_hash: string | null;
  status: 'pending' | 'confirmed' | 'failed';
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  email: string;
  full_name: string;
  shipping_address: any;
  items: any[];
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
}

// Hook to get ICO total
export const useIcoTotal = () => {
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTotal = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_ico_total');
      
      if (error) throw error;
      
      setTotal(Number(data) || 0);
    } catch (err) {
      console.error('Error fetching ICO total:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setTotal(45000); // Fallback to static value
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotal();

    // Set up real-time subscription for ICO contributions
    const channel = supabase
      .channel('ico-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'ico_contributions'
        },
        () => {
          fetchTotal();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'ico_contributions'
        },
        () => {
          fetchTotal();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { total, loading, error, refetch: fetchTotal };
};

// Hook to submit ICO contribution
export const useIcoContribution = () => {
  const [loading, setLoading] = useState(false);

  const submitContribution = async (data: {
    email: string;
    amount_usd: number;
    bfy_tokens: number;
    transaction_hash?: string;
  }) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('ico_contributions')
        .insert({
          email: data.email,
          amount_usd: data.amount_usd,
          bfy_tokens: data.bfy_tokens,
          transaction_hash: data.transaction_hash || null,
          status: 'pending'
        });

      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('Error submitting contribution:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    } finally {
      setLoading(false);
    }
  };

  return { submitContribution, loading };
};

// Hook to submit order
export const useSubmitOrder = () => {
  const [loading, setLoading] = useState(false);

  const submitOrder = async (orderData: {
    email: string;
    full_name: string;
    shipping_address: any;
    items: any[];
    total_amount: number;
  }) => {
    setLoading(true);
    try {
      // Get current user if authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('orders')
        .insert({
          email: orderData.email,
          full_name: orderData.full_name,
          shipping_address: orderData.shipping_address,
          items: orderData.items,
          total_amount: orderData.total_amount,
          user_id: user?.id || null, // Attach user_id if authenticated
          status: 'pending'
        });

      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('Error submitting order:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    } finally {
      setLoading(false);
    }
  };

  return { submitOrder, loading };
};

// Hook to subscribe email
export const useEmailSubscription = () => {
  const [loading, setLoading] = useState(false);

  const subscribeEmail = async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('email_subscriptions')
        .insert({ email });

      if (error) {
        // If email already exists, that's ok
        if (error.code === '23505') {
          return { success: true, message: '¡Ya estás suscrito!' };
        }
        throw error;
      }
      
      return { success: true, message: '¡Suscripción exitosa!' };
    } catch (error) {
      console.error('Error subscribing email:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    } finally {
      setLoading(false);
    }
  };

  return { subscribeEmail, loading };
};