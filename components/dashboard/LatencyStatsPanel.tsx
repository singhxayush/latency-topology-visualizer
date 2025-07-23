/* eslint-disable @typescript-eslint/no-explicit-any */
import { TrendingUp, TrendingDown, Activity, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Exchange } from '@/data/exchanges';

interface LatencyStatsPanelProps {
  exchanges: Exchange[];
}

export const LatencyStatsPanel = ({ exchanges }: LatencyStatsPanelProps) => {
  const avgLatency = exchanges.length > 0 
    ? exchanges.reduce((sum, ex) => sum + ex.latency, 0) / exchanges.length 
    : 0;
  
  const minLatency = exchanges.length > 0 
    ? Math.min(...exchanges.map(ex => ex.latency)) 
    : 0;
  
  const maxLatency = exchanges.length > 0 
    ? Math.max(...exchanges.map(ex => ex.latency)) 
    : 0;
  
  const healthyCount = exchanges.filter(ex => ex.status === 'healthy').length;
  const warningCount = exchanges.filter(ex => ex.status === 'warning').length;
  const criticalCount = exchanges.filter(ex => ex.status === 'critical').length;

  type TrendType = 'positive' | 'neutral' | 'negative';

  const stats: Array<{
    title: string;
    value: string;
    icon: any;
    trend: TrendType;
    description: string;
  }> = [
    {
      title: 'Average Latency',
      value: `${avgLatency.toFixed(1)}ms`,
      icon: Activity,
      trend: (avgLatency < 25 ? 'positive' : avgLatency < 40 ? 'neutral' : 'negative') as TrendType,
      description: 'Across all exchanges'
    },
    {
      title: 'Best Performance',
      value: `${minLatency}ms`,
      icon: TrendingDown,
      trend: 'positive' as TrendType,
      description: 'Lowest latency'
    },
    {
      title: 'Worst Performance',
      value: `${maxLatency}ms`,
      icon: TrendingUp,
      trend: (maxLatency > 40 ? 'negative' : 'neutral') as TrendType,
      description: 'Highest latency'
    },
    {
      title: 'Issues Detected',
      value: `${criticalCount + warningCount}`,
      icon: AlertTriangle,
      trend: (criticalCount > 0 ? 'negative' : warningCount > 0 ? 'neutral' : 'positive') as TrendType,
      description: `${criticalCount} critical, ${warningCount} warnings`
    }
  ];

  const getTrendColor = (trend: 'positive' | 'neutral' | 'negative') => {
    switch (trend) {
      case 'positive':
        return 'text-success';
      case 'neutral':
        return 'text-warning';
      case 'negative':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-card border-border/50 bg-gradient-dark">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${getTrendColor(stat.trend)}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}

      {/* Status Overview Card */}
      <Card className="md:col-span-2 lg:col-span-4 shadow-card border-border/50 bg-gradient-dark">
        <CardHeader>
          <CardTitle className="text-lg">Exchange Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">{healthyCount}</div>
              <div className="text-sm text-muted-foreground">Healthy</div>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-success h-2 rounded-full" 
                  style={{ width: `${exchanges.length > 0 ? (healthyCount / exchanges.length) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning mb-1">{warningCount}</div>
              <div className="text-sm text-muted-foreground">Warning</div>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-warning h-2 rounded-full" 
                  style={{ width: `${exchanges.length > 0 ? (warningCount / exchanges.length) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive mb-1">{criticalCount}</div>
              <div className="text-sm text-muted-foreground">Critical</div>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-destructive h-2 rounded-full" 
                  style={{ width: `${exchanges.length > 0 ? (criticalCount / exchanges.length) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};