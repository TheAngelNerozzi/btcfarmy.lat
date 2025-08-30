import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  popular?: boolean;
  onAddToCart: (product: { id: string; name: string; price: number; image: string }) => void;
}

export const ProductCard = ({ id, name, price, image, description, popular = false, onAddToCart }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Card className="card-gradient border-primary/20 crypto-transition hover:scale-105 relative overflow-hidden">
      {popular && (
        <Badge className="absolute top-4 right-4 z-10 crypto-gradient">
          Más Popular
        </Badge>
      )}
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover crypto-transition hover:scale-110"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold mb-2">{name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="text-2xl font-bold text-primary">{formatPrice(price)}</div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="crypto" 
          className="w-full"
          onClick={() => onAddToCart({ id, name, price, image })}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Añadir al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
};