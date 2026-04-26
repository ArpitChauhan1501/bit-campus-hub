import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  tone?: "primary" | "success" | "warning" | "info";
}

const TONES: Record<NonNullable<StatCardProps["tone"]>, string> = {
  primary: "from-primary/15 to-primary-glow/10 text-primary",
  success: "from-success/15 to-success/5 text-success",
  warning: "from-warning/20 to-warning/5 text-warning",
  info: "from-info/15 to-info/5 text-info",
};

export function StatCard({ label, value, icon: Icon, trend, tone = "primary" }: StatCardProps) {
  return (
    <Card className="overflow-hidden border-border/60 shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-elegant">
      <CardContent className="flex items-start justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="mt-1.5 font-display text-3xl font-bold tracking-tight">{value}</p>
          {trend && <p className="mt-1 text-xs text-muted-foreground">{trend}</p>}
        </div>
        <div className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br", TONES[tone])}>
          <Icon className="h-6 w-6" />
        </div>
      </CardContent>
    </Card>
  );
}
