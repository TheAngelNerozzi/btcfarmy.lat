import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TokenomicsCardProps {
  title: string;
  value: string;
  description?: string;
  highlight?: boolean;
}

export const TokenomicsCard = ({ title, value, description, highlight = false }: TokenomicsCardProps) => {
  return (
    <Card className={`card-gradient border-primary/20 crypto-transition hover:scale-105 ${highlight ? 'ring-2 ring-primary/50' : ''}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
        {description && (
          <Badge variant="secondary" className="text-xs">
            {description}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};