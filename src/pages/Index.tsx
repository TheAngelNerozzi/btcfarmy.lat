import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CountdownTimer } from "@/components/CountdownTimer";
import { ProgressBar } from "@/components/ProgressBar";
import { TokenomicsCard } from "@/components/TokenomicsCard";
import { ProductCard } from "@/components/ProductCard";
import { IcoContributionForm } from "@/components/IcoContributionForm";
import { ShoppingCartComponent, CartItem } from "@/components/ShoppingCart";
import { EmailSubscription } from "@/components/EmailSubscription";
import { Toaster } from "@/components/ui/toaster";
import { 
  Wallet, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Shield, 
  Zap,
  Twitter,
  Instagram,
  MessageCircle,
  Bitcoin,
  Rocket,
  Target,
  Trophy
} from "lucide-react";
import heroImage from "@/assets/hero-crypto-farm.jpg";
import tshirtImage from "@/assets/tshirt-btcfarmy.jpg";
import capImage from "@/assets/cap-btcfarmy.jpg";
import hoodieImage from "@/assets/hoodie-btcfarmy.jpg";
import mugImage from "@/assets/mug-btcfarmy.jpg";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: { id: string; name: string; price: number; image: string }) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };
  
  const products = [
    {
      id: "tshirt-classic",
      name: "Franela BtcFarmy Clásica",
      price: 25,
      image: tshirtImage,
      description: "Camiseta premium 100% algodón con logo BtcFarmy",
      popular: true
    },
    {
      id: "cap-classic",
      name: "Gorra BtcFarmy",
      price: 20,
      image: capImage,
      description: "Gorra ajustable con bordado de alta calidad"
    },
    {
      id: "hoodie-classic",
      name: "Hoodie BtcFarmy",
      price: 45,
      image: hoodieImage,
      description: "Sudadera con capucha, perfecta para hodlers"
    },
    {
      id: "mug-classic",
      name: "Taza BtcFarmy",
      price: 15,
      image: mugImage,
      description: "Taza cerámica para tu café matutino crypto"
    }
  ];

  const roadmapPhases = [
    {
      phase: "Fase 1",
      title: "Lanzamiento y Comunidad",
      status: "En Progreso",
      items: ["Crear comunidad", "Pre-venta ICO", "Marketing inicial"]
    },
    {
      phase: "Fase 2", 
      title: "Listado en DEXs",
      status: "Próximo",
      items: ["Listado en Raydium", "Campaña de marketing", "Partnerships"]
    },
    {
      phase: "Fase 3",
      title: "Expansión",
      status: "Futuro",
      items: ["Listado en CEXs", "Expansión internacional", "Nuevos productos"]
    },
    {
      phase: "Fase 4",
      title: "Ecosistema",
      status: "Futuro", 
      items: ["Plataforma DeFi", "NFT Collection", "Governance"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bitcoin className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">BtcFarmy.lat</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#inicio" className="hover:text-primary crypto-transition">Inicio</a>
            <a href="#ico" className="hover:text-primary crypto-transition">ICO</a>
            <a href="#roadmap" className="hover:text-primary crypto-transition">Roadmap</a>
            <a href="#tienda" className="hover:text-primary crypto-transition">Tienda</a>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="crypto-outline" size="sm">
              <Wallet className="w-4 h-4 mr-2" />
              Conectar Wallet
            </Button>
            <ShoppingCartComponent
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onClearCart={clearCart}
            />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="pt-20 min-h-screen flex items-center hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={heroImage} alt="Crypto Farm" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 float-animation">
              ¡Cultiva tu futuro con <span className="text-primary">BtcFarmy</span>!
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              La próxima gran memecoin que revolucionará el farming digital. Únete a la comunidad más vibrante de crypto.
            </p>
            
            <div className="mb-8">
              <EmailSubscription />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="min-w-[250px]">
                <Rocket className="w-6 h-6 mr-2" />
                Participa en Pre-Venta
              </Button>
              <Button variant="crypto-outline" size="xl">
                <Users className="w-6 h-6 mr-2" />
                Únete a la Comunidad
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">¿Qué es BtcFarmy.lat?</h2>
            <p className="text-xl text-muted-foreground mb-12">
              BtcFarmy es más que una memecoin - es una comunidad de farmers digitales que creen en el futuro descentralizado.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="card-gradient border-primary/20">
                <CardHeader>
                  <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Alto Potencial</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Tokenomics diseñados para recompensar a los holders y crear valor a largo plazo.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-gradient border-primary/20">
                <CardHeader>
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Comunidad Fuerte</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Una comunidad activa y comprometida que impulsa el crecimiento del proyecto.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-gradient border-primary/20">
                <CardHeader>
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Transparencia Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Contratos auditados y equipo doxxed. Toda la información está disponible públicamente.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ICO Section */}
      <section id="ico" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Detalles de la ICO</h2>
              <p className="text-xl text-muted-foreground">
                Participa en el lanzamiento del token BFY y sé parte del futuro
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Card className="card-gradient border-primary/20 p-6">
                  <ProgressBar />
                </Card>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <TokenomicsCard
                  title="Token"
                  value="BFY"
                  description="Basado en Solana"
                  highlight
                />
                <TokenomicsCard
                  title="Suministro Total"
                  value="120M"
                  description="BFY Tokens"
                />
                <TokenomicsCard
                  title="Precio Pre-Venta"
                  value="$0.416"
                  description="Por token"
                  highlight
                />
                <TokenomicsCard
                  title="Meta"
                  value="$100K"
                  description="USD Recaudar"
                />
              </div>
            </div>

            <div className="text-center mt-8">
              <IcoContributionForm />
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Roadmap</h2>
              <p className="text-xl text-muted-foreground">
                Nuestro plan para conquistar el mundo crypto
              </p>
            </div>

            <div className="space-y-8">
              {roadmapPhases.map((phase, index) => (
                <Card key={index} className="card-gradient border-primary/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{phase.phase}: {phase.title}</CardTitle>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        phase.status === 'En Progreso' ? 'bg-primary text-primary-foreground' :
                        phase.status === 'Próximo' ? 'bg-secondary text-secondary-foreground' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {phase.status}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid sm:grid-cols-3 gap-2">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-primary" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Store Section */}
      <section id="tienda" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Viste con Estilo BtcFarmy</h2>
              <p className="text-xl text-muted-foreground">
                Merchandising oficial de la comunidad más cool del crypto
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Participate */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Cómo Participar</h2>
              <p className="text-xl text-muted-foreground">
                Sigue estos simples pasos para unirte a la revolución BtcFarmy
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Conecta tu Wallet", desc: "MetaMask, Phantom o tu wallet preferida", icon: Wallet },
                { step: "2", title: "Prepara USDC/SOL", desc: "Asegúrate de tener fondos suficientes", icon: Bitcoin },
                { step: "3", title: "Selecciona Cantidad", desc: "Elige cuántos BFY quieres comprar", icon: Target },
                { step: "4", title: "Confirma Compra", desc: "Confirma la transacción en tu wallet", icon: Trophy }
              ].map((item, index) => (
                <Card key={index} className="card-gradient border-primary/20 text-center">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full crypto-gradient flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-primary mb-2">{item.step}</div>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Preguntas Frecuentes</h2>
              <p className="text-xl text-muted-foreground">
                Resolvemos tus dudas sobre BtcFarmy
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">¿Qué es una memecoin?</AccordionTrigger>
                <AccordionContent>
                  Una memecoin es una criptomoneda inspirada en memes de internet. Aunque comenzaron como bromas, 
                  muchas han desarrollado comunidades fuertes y casos de uso reales. BtcFarmy combina el aspecto 
                  divertido de los memes con una utilidad real en el ecosistema crypto.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">¿Cómo puedo confiar en este proyecto?</AccordionTrigger>
                <AccordionContent>
                  BtcFarmy se basa en transparencia total: contratos auditados, equipo público, y toda la información 
                  disponible en blockchain. Además, nuestro enfoque en construir una comunidad real y productos 
                  tangibles demuestra nuestro compromiso a largo plazo.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">¿Qué wallet necesito?</AccordionTrigger>
                <AccordionContent>
                  Para participar en la ICO de BFY, necesitas una wallet compatible con Solana como Phantom, 
                  Solflare, o Backpack. También puedes usar wallets multi-chain como MetaMask con la red Solana configurada.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">¿Cuándo recibiré mis tokens?</AccordionTrigger>
                <AccordionContent>
                  Los tokens BFY se distribuirán automáticamente al final de la fase de pre-venta, 
                  aproximadamente 24-48 horas después del cierre. Recibirás una notificación y podrás 
                  ver tus tokens en tu wallet.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">¿El merchandising se envía a todo el mundo?</AccordionTrigger>
                <AccordionContent>
                  Sí, enviamos nuestro merchandising a nivel mundial. Los tiempos de entrega varían según 
                  la ubicación (7-14 días para América Latina, 14-21 días para el resto del mundo). 
                  Los gastos de envío se calculan automáticamente en el checkout.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-primary/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Bitcoin className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold">BtcFarmy.lat</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                La memecoin que está revolucionando el farming digital. 
                Únete a la comunidad más vibrante del crypto.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
              <div className="space-y-2">
                <a href="#ico" className="block text-muted-foreground hover:text-primary crypto-transition">ICO</a>
                <a href="#roadmap" className="block text-muted-foreground hover:text-primary crypto-transition">Roadmap</a>
                <a href="#tienda" className="block text-muted-foreground hover:text-primary crypto-transition">Tienda</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Mantente Informado</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Suscríbete para recibir las últimas noticias sobre BtcFarmy
              </p>
              <EmailSubscription />
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2024 BtcFarmy.lat. Todos los derechos reservados.
            </p>
            <p className="text-xs text-muted-foreground">
              Este es un proyecto de memecoin de alto riesgo. No es asesoramiento financiero.
            </p>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Index;