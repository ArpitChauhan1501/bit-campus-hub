import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CalendarDays, MapPin, Plus, Trash2, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { Event } from "@/types";

const TYPES: Event["type"][] = ["Hackathon", "Workshop", "Cultural", "Sports", "Seminar"];

export default function Events() {
  const { user } = useAuth();
  const { events, addEvent, deleteEvent, rsvpEvent } = useData();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", date: "", location: "", type: "Workshop" as Event["type"],
  });

  if (!user) return null;
  const canManage = user.role === "club" || user.role === "admin";

  const submit = () => {
    if (!form.title || !form.date || !form.location) return;
    addEvent({
      ...form,
      date: new Date(form.date).toISOString(),
      hostId: user.id,
      hostName: user.club || user.name,
    });
    toast({ title: "Event created", description: form.title });
    setForm({ title: "", description: "", date: "", location: "", type: "Workshop" });
    setOpen(false);
  };

  const sorted = [...events].sort((a, b) => +new Date(a.date) - +new Date(b.date));

  return (
    <div>
      <PageHeader
        title="Events"
        description="Hackathons, workshops, fests, and more — never miss out."
        action={
          canManage && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-xl bg-gradient-primary shadow-card">
                  <Plus className="mr-1.5 h-4 w-4" /> New Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Create Event</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div className="space-y-1.5"><Label>Title</Label>
                    <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5"><Label>Type</Label>
                      <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as Event["type"] })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5"><Label>Date</Label>
                      <Input type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-1.5"><Label>Location</Label>
                    <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                  </div>
                  <div className="space-y-1.5"><Label>Description</Label>
                    <Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  </div>
                </div>
                <DialogFooter><Button onClick={submit} className="bg-gradient-primary">Create</Button></DialogFooter>
              </DialogContent>
            </Dialog>
          )
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {sorted.map((e) => {
          const going = e.attendees.includes(user.id);
          return (
            <Card key={e.id} className="group overflow-hidden border-border/60 shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-elegant">
              <div className="h-2 bg-gradient-primary" />
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{e.type}</Badge>
                  {canManage && e.hostId === user.id && (
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => { deleteEvent(e.id); toast({ title: "Event removed" }); }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <h3 className="font-display text-xl font-semibold leading-tight">{e.title}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{e.description}</p>
                <div className="space-y-1.5 border-t border-border/60 pt-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDays className="h-4 w-4" /> {new Date(e.date).toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {e.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" /> {e.attendees.length} attending · Hosted by {e.hostName}
                  </div>
                </div>
                {user.role === "student" && (
                  <Button
                    onClick={() => rsvpEvent(e.id, user.id)}
                    variant={going ? "outline" : "default"}
                    className={going ? "w-full rounded-xl" : "w-full rounded-xl bg-gradient-primary"}
                  >
                    {going ? "✓ Going" : "RSVP"}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
