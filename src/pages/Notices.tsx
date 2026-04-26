import { useState } from "react";
import { Megaphone, Plus, Pin, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import type { Notice } from "@/types";

const CATEGORIES: Notice["category"][] = ["Academic", "Exam", "General", "Event"];

export default function Notices() {
  const { user } = useAuth();
  const { notices, addNotice, deleteNotice, updateNotice } = useData();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<Notice["category"]>("General");

  const canManage = user && (user.role === "department" || user.role === "admin");

  const submit = () => {
    if (!user || !title.trim() || !body.trim()) return;
    addNotice({ title, body, category, authorId: user.id, authorName: user.name });
    toast({ title: "Notice posted", description: title });
    setTitle("");
    setBody("");
    setCategory("General");
    setOpen(false);
  };

  const sorted = [...notices].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return +new Date(b.createdAt) - +new Date(a.createdAt);
  });

  return (
    <div>
      <PageHeader
        title="Notices"
        description="Stay updated with the latest announcements from your campus."
        action={
          canManage && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-xl bg-gradient-primary shadow-card">
                  <Plus className="mr-1.5 h-4 w-4" /> New Notice
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Notice</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label>Title</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Category</Label>
                    <Select value={category} onValueChange={(v) => setCategory(v as Notice["category"])}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Message</Label>
                    <Textarea rows={5} value={body} onChange={(e) => setBody(e.target.value)} />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={submit} className="bg-gradient-primary">Publish</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )
        }
      />

      <div className="grid gap-4">
        {sorted.map((n) => (
          <Card key={n.id} className="border-border/60 shadow-card transition-smooth hover:shadow-elegant">
            <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-card">
                <Megaphone className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg font-semibold">{n.title}</h3>
                  <Badge variant="secondary">{n.category}</Badge>
                  {n.pinned && (
                    <Badge className="bg-warning/20 text-warning-foreground hover:bg-warning/20">
                      <Pin className="mr-1 h-3 w-3" /> Pinned
                    </Badge>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{n.body}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {n.authorName} · {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
              {canManage && (
                <div className="flex gap-2 sm:flex-col">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateNotice(n.id, { pinned: !n.pinned })}
                  >
                    <Pin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      deleteNotice(n.id);
                      toast({ title: "Notice deleted" });
                    }}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
