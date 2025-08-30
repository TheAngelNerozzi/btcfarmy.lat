import { Progress } from "@/components/ui/progress";
import { useIcoTotal } from "@/hooks/useSupabase";
import { Skeleton } from "@/components/ui/skeleton";

interface ProgressBarProps {
  targetAmount?: number;
  className?: string;
}

export const ProgressBar = ({ targetAmount = 100000, className = "" }: ProgressBarProps) => {
  const { total: currentAmount, loading, error } = useIcoTotal();
  const percentage = Math.min((currentAmount / targetAmount) * 100, 100);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Recaudado</span>
          <span className="text-muted-foreground">Meta</span>
        </div>
        <Skeleton className="h-3 w-full" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-24" />
          <div className="text-right">
            <Skeleton className="h-6 w-20 mb-2" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="text-center text-muted-foreground">
          <p>Error cargando datos ICO</p>
          <p className="text-xs">Mostrando datos de ejemplo</p>
        </div>
        <Progress value={45} className="h-3 bg-secondary" />
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(45000)}
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold">
              {formatCurrency(targetAmount)}
            </div>
            <div className="text-sm text-muted-foreground">
              45.0% completado
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Recaudado</span>
        <span className="text-muted-foreground">Meta</span>
      </div>
      
      <Progress value={percentage} className="h-3 bg-secondary" />
      
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">
          {formatCurrency(currentAmount)}
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold">
            {formatCurrency(targetAmount)}
          </div>
          <div className="text-sm text-muted-foreground">
            {percentage.toFixed(1)}% completado
          </div>
        </div>
      </div>
    </div>
  );
};