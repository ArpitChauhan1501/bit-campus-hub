import { PageHeader } from "@/components/PageHeader";
import { useData } from "@/context/DataContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Link as LinkIcon, PlayCircle, Download } from "lucide-react";

const ICONS = { PDF: FileText, Video: PlayCircle, Link: LinkIcon, Course: BookOpen };

export default function Resources() {
  const { resources } = useData();
  return (
    <div>
      <PageHeader title="Resources" description="Notes, videos, and references curated for you." />
      <div className="grid gap-4 md:grid-cols-2">
        {resources.map((r) => {
          const Icon = ICONS[r.type];
          return (
            <Card key={r.id} className="border-border/60 shadow-card transition-smooth hover:shadow-elegant">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-soft text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-semibold leading-tight">{r.title}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary">{r.subject}</Badge>
                    <Badge>{r.type}</Badge>
                  </div>
                </div>
                <Button variant="outline" className="rounded-xl">
                  <Download className="mr-1.5 h-4 w-4" /> Open
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
