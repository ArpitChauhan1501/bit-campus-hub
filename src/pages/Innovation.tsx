import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Lightbulb, Plus, ArrowUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Innovation() {
  const { user } = useAuth();
  const { ideas, addIdea, upvoteIdea } = useData();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [pitch, setPitch] = useState("");

  if (!user) return null;

  const submit = () => {
    if (!title.trim() || !pitch.trim()) return;
    addIdea({ title, pitch, authorId: user.id, authorName: user.name });
    toast({ title: "Idea submitted!", description: "Your spark is now in the Hub." });
    setTitle(""); setPitch(""); setOpen(false);
  };

  const sorted = [...ideas].sort((a, b) => b.upvotes - a.upvotes);

  return (
    <div>
      <PageHeader
        title="Innovation Hub"
        description="Pitch big ideas, vote on the best, and shape your campus."
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-gradient-primary shadow-card">
                <Plus className="mr-1.5 h-4 w-4" /> Submit Idea
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Submit an Idea</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div className="space-y-1.5"><Label>Title</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="space-y-1.5"><Label>Pitch</Label>
                  <Textarea rows={5} value={pitch} onChange={(e) => setPitch(e.target.value)} />
                </div>
              </div>
              <DialogFooter><Button onClick={submit} className="bg-gradient-primary">Submit</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        {sorted.map((i) => (
          <Card key={i.id} className="border-border/60 shadow-card transition-smooth hover:shadow-elegant">
            <CardContent className="flex gap-4 p-5">
              <div className="flex flex-col items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl border-primary/30 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => upvoteIdea(i.id)}
                >
                  <ArrowUp className="h-5 w-5" />
                </Button>
                <span className="mt-1 font-display text-lg font-bold">{i.upvotes}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-warning" />
                  <h3 className="font-display text-lg font-semibold">{i.title}</h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{i.pitch}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  by {i.authorName} · {new Date(i.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
