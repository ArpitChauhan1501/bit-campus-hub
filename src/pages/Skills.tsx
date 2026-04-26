import { PageHeader } from "@/components/PageHeader";
import { useData } from "@/context/DataContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight } from "lucide-react";

const LEVEL_TONE: Record<string, string> = {
  Beginner: "bg-success/15 text-success",
  Intermediate: "bg-info/15 text-info",
  Advanced: "bg-primary/15 text-primary",
};

export default function Skills() {
  const { skills } = useData();
  return (
    <div>
      <PageHeader
        title="Skills & Placement"
        description="Curated courses and tracks to boost your career readiness."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((s) => (
          <Card key={s.id} className="group border-border/60 shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-elegant">
            <CardContent className="space-y-3 p-5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-card">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={LEVEL_TONE[s.level]}>{s.level}</Badge>
                <Badge variant="secondary">{s.tag}</Badge>
              </div>
              <h3 className="font-display text-lg font-semibold leading-tight">{s.title}</h3>
              <p className="text-sm text-muted-foreground">by {s.provider}</p>
              <Button variant="ghost" className="w-full justify-between text-primary">
                Enroll <ArrowRight className="h-4 w-4 transition-smooth group-hover:translate-x-0.5" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
