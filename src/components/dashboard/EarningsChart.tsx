import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users, Calendar } from "lucide-react";
import { MOCK_EARNINGS } from "@/lib/constants";

interface EarningsChartProps {
  className?: string;
}

export function EarningsChart({ className }: EarningsChartProps) {
  const totalEarnings = MOCK_EARNINGS.reduce((sum, m) => sum + m.earnings, 0);
  const totalBookings = MOCK_EARNINGS.reduce((sum, m) => sum + m.bookings, 0);
  const avgPerMonth = totalEarnings / 12;
  const currentMonth = MOCK_EARNINGS[new Date().getMonth()];
  const previousMonth = MOCK_EARNINGS[Math.max(0, new Date().getMonth() - 1)];
  const growth = previousMonth.earnings > 0 
    ? ((currentMonth.earnings - previousMonth.earnings) / previousMonth.earnings * 100).toFixed(1)
    : 0;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Earnings Overview</CardTitle>
            <CardDescription>Your income and booking trends</CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {Number(growth) >= 0 ? (
              <div className="flex items-center gap-1 text-emerald-600">
                <TrendingUp className="h-4 w-4" />
                <span>+{growth}%</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-600">
                <TrendingDown className="h-4 w-4" />
                <span>{growth}%</span>
              </div>
            )}
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="earnings">
          <TabsList className="mb-4">
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="combined">Combined</TabsTrigger>
          </TabsList>
          
          <TabsContent value="earnings" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_EARNINGS}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`$${value}`, "Earnings"]}
                />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorEarnings)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="bookings" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_EARNINGS}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="bookings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="combined" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_EARNINGS}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis yAxisId="left" className="text-xs" />
                <YAxis yAxisId="right" orientation="right" className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line yAxisId="left" type="monotone" dataKey="earnings" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="hsl(var(--accent))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs">Total Earnings</span>
            </div>
            <p className="text-xl font-bold">${totalEarnings.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs">Total Bookings</span>
            </div>
            <p className="text-xl font-bold">{totalBookings}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
              <span className="text-xs">Avg/Month</span>
            </div>
            <p className="text-xl font-bold">${avgPerMonth.toFixed(0)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
