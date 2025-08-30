import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEmailSubscription } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

export const EmailSubscription = () => {
  const [email, setEmail] = useState('');
  const { subscribeEmail, loading } = useEmailSubscription();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu email",
        variant: "destructive"
      });
      return;
    }

    const result = await subscribeEmail(email);

    if (result.success) {
      toast({
        title: "¡Suscripción Exitosa!",
        description: result.message || "Te mantendremos informado sobre BtcFarmy",
      });
      setEmail('');
    } else {
      toast({
        title: "Error",
        description: result.error || "Hubo un error al suscribirte",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1"
        required
      />
      <Button 
        type="submit" 
        variant="crypto" 
        disabled={loading}
        className="min-w-[140px]"
      >
        <Mail className="w-4 h-4 mr-2" />
        {loading ? "..." : "Suscribirse"}
      </Button>
    </form>
  );
};