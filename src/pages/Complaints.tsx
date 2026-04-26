import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
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
import { Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { Complaint, ComplaintStatus } from "@/types";

const CATEGORIES: Complaint["category"][] = ["Hostel", "Academic", "Infrastructure", "Other"];
const STATUSES: ComplaintStatus[] = ["Pending", "In Progress", "Resolved"];

interface Props {
  scope: "all" | "mine";
}

export default function ComplaintsPage({ scope }: Props) {
  const { user } = useAuth();
  const { complaints, addComplaint, updateComplaintStatus } = useData();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Complaint["category"]>("Academic");

  if (!user) return null;

  const list = scope === "mine" ? complaints.filter((c) => c.authorId === user.id) : complaints;
  const canCreate = scope === "mine" && user.role === "student";
  const canManageStatus = user.role === "department" || user.role === "admin";

  const submit = () => {
    if (!title.trim() || !description.trim()) return;
    addComplaint({
      title,
      description,
      category,
      authorId: user.id,
      authorName: user.name,
    });
    toast({ title: "Complaint submitted", description: "We'll keep you posted." });
    setTitle("");
    setDescription("");
    setCategory("Academic");
    setOpen(false);
  };

  return (
    <div>
      <PageHeader
        title={scope === "mine" ? "My Complaints" : "Complaints"}
        description={
          scope === "mine"
            ? "Track the status of your submitted complaints."
            : "Manage and resolve campus complaints."
        }
        action={
          canCreate && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-xl bg-gradient-primary shadow-card">
                  <Plus className="mr-1.5 h-4 w-4" /> New Complaint
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Submit a Complaint</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div className="space-y-1.5"><Label>Title</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                  <div className="space-y-1.5"><Label>Category</Label>
                    <Select value={category} onValueChange={(v) => setCategory(v as Complaint["category"])}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5"><Label>Description</Label>
                    <Textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={submit} className="bg-gradient-primary">Submit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )
        }
      />

      {list.length === 0 ? (
        <Card className="border-dashed bg-gradient-soft p-10 text-center">
          <p className="text-muted-foreground">No complaints yet.</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {list.map((c) => (
            <Card key={c.id} className="border-border/60 shadow-card transition-smooth hover:shadow-elegant">
              <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                    <Badge variant="secondary">{c.category}</Badge>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{c.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {c.authorName} · {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>
                {canManageStatus && (
                  <Select
                    value={c.status}
                    onValueChange={(v) => {
                      updateComplaintStatus(c.id, v as ComplaintStatus);
                      toast({ title: "Status updated", description: `${c.title} → ${v}` });
                    }}
                  >
                    <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
