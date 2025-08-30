import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useIcoContribution } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import { Zap, Calculator } from "lucide-react";

const TOKEN_PRICE = 0.416; // $0.416 per BFY token

export const IcoContributionForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    usdAmount: '',
    bfyTokens: 0
  });
  
  const { submitContribution, loading } = useIcoContribution();
  const { toast } = useToast();

  const calculateTokens = (usdAmount: string) => {
    const amount = parseFloat(usdAmount) || 0;
    const tokens = Math.floor(amount / TOKEN_PRICE);
    setFormData(prev => ({
      ...prev,
      usdAmount,
      bfyTokens: tokens
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.usdAmount) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    const usdAmount = parseFloat(formData.usdAmount);
    if (usdAmount < 10) {
      toast({
        title: "Error", 
        description: "La contribución mínima es de $10 USD",
        variant: "destructive"
      });
      return;
    }

    const result = await submitContribution({
      email: formData.email,
      amount_usd: usdAmount,
      bfy_tokens: formData.bfyTokens
    });

    if (result.success) {
      toast({
        title: "¡Contribución Registrada!",
        description: "Tu contribución ha sido registrada. Recibirás instrucciones de pago por email.",
      });
      setFormData({ email: '', usdAmount: '', bfyTokens: 0 });
      setIsOpen(false);
    } else {
      toast({
        title: "Error",
        description: result.error || "Hubo un error al procesar tu contribución",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="crypto" size="xl">
          <Zap className="w-6 h-6 mr-2" />
          Comprar BFY Ahora
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Participar en Pre-Venta
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Cantidad en USD (mínimo $10)</Label>
            <Input
              id="amount"
              type="number"
              min="10"
              step="0.01"
              placeholder="100"
              value={formData.usdAmount}
              onChange={(e) => calculateTokens(e.target.value)}
              required
            />
          </div>

          {formData.bfyTokens > 0 && (
            <Card className="card-gradient border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-primary" />
                    <span className="text-sm">Recibirás:</span>
                  </div>
                  <div className="text-lg font-bold text-primary">
                    {formData.bfyTokens.toLocaleString()} BFY
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Precio: ${TOKEN_PRICE} USD por token
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="crypto"
              disabled={loading || !formData.email || !formData.usdAmount}
              className="flex-1"
            >
              {loading ? "Procesando..." : "Participar"}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Después de registrar tu contribución, recibirás instrucciones de pago por email.
            Los tokens se distribuirán al final de la pre-venta.
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};