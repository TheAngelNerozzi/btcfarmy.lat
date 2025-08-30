import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useSubmitOrder } from "@/hooks/useSupabase";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart as ShoppingCartIcon, X, Plus, Minus } from "lucide-react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const ShoppingCartComponent = ({ items, onUpdateQuantity, onRemoveItem, onClearCart }: ShoppingCartProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderData, setOrderData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    country: '',
    zipCode: ''
  });

  const { submitOrder, loading } = useSubmitOrder();
  const { toast } = useToast();

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = total > 100 ? 0 : 15; // Free shipping over $100
  const finalTotal = total + shipping;

  const handleQuantityChange = (id: string, change: number) => {
    const item = items.find(i => i.id === id);
    if (item) {
      const newQuantity = Math.max(0, item.quantity + change);
      if (newQuantity === 0) {
        onRemoveItem(id);
      } else {
        onUpdateQuantity(id, newQuantity);
      }
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderData.email || !orderData.fullName || !orderData.address) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    const result = await submitOrder({
      email: orderData.email,
      full_name: orderData.fullName,
      shipping_address: {
        address: orderData.address,
        city: orderData.city,
        country: orderData.country,
        zipCode: orderData.zipCode
      },
      items: items,
      total_amount: finalTotal
    });

    if (result.success) {
      toast({
        title: "¡Pedido Realizado!",
        description: "Tu pedido ha sido registrado. Recibirás instrucciones de pago por email.",
      });
      onClearCart();
      setIsOpen(false);
      setIsCheckout(false);
      setOrderData({
        email: '',
        fullName: '',
        address: '',
        city: '',
        country: '',
        zipCode: ''
      });
    } else {
      toast({
        title: "Error",
        description: result.error || "Hubo un error al procesar tu pedido",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCartIcon className="w-5 h-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCartIcon className="w-5 h-5 text-primary" />
            {isCheckout ? "Finalizar Compra" : "Carrito de Compras"}
          </DialogTitle>
        </DialogHeader>

        {!isCheckout ? (
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Tu carrito está vacío
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <Card key={item.id} className="card-gradient border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            ${item.price} USD
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="h-8 w-8"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => onRemoveItem(item.id)}
                            className="h-6 w-6 mt-1"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío:</span>
                    <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={onClearCart}
                    className="flex-1"
                  >
                    Vaciar Carrito
                  </Button>
                  <Button
                    variant="crypto"
                    onClick={() => setIsCheckout(true)}
                    className="flex-1"
                  >
                    Proceder al Pago
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={orderData.email}
                  onChange={(e) => setOrderData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo *</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={orderData.fullName}
                  onChange={(e) => setOrderData(prev => ({ ...prev, fullName: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección *</Label>
              <Textarea
                id="address"
                value={orderData.address}
                onChange={(e) => setOrderData(prev => ({ ...prev, address: e.target.value }))}
                required
                rows={2}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input
                  id="city"
                  type="text"
                  value={orderData.city}
                  onChange={(e) => setOrderData(prev => ({ ...prev, city: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Input
                  id="country"
                  type="text"
                  value={orderData.country}
                  onChange={(e) => setOrderData(prev => ({ ...prev, country: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">Código Postal</Label>
                <Input
                  id="zipCode"
                  type="text"
                  value={orderData.zipCode}
                  onChange={(e) => setOrderData(prev => ({ ...prev, zipCode: e.target.value }))}
                />
              </div>
            </div>

            <Card className="card-gradient border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCheckout(false)}
                className="flex-1"
              >
                Volver al Carrito
              </Button>
              <Button
                type="submit"
                variant="crypto"
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Procesando..." : "Realizar Pedido"}
              </Button>
            </div>

            <div className="text-xs text-muted-foreground text-center">
              Después de realizar el pedido, recibirás instrucciones de pago por email.
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};