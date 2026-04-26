import { Link } from "react-router-dom";
import {
  Megaphone,
  MessageSquareWarning,
  CheckCircle2,
  Lightbulb,
  CalendarDays,
  Plus,
  ArrowRight,
  Eye,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import banner from "@/assets/campus-banner.jpg";

const ROLE_LABEL: Record<string, string> = {
  student: "Student",
  department: "Department",
  club: "Club",
  admin: "Admin",
};

export default function Dashboard() {
  const { user } = useAuth();
  const { notices, complaints, ideas, events } = useData();
  if (!user) return null;

  const myComplaints = complaints.filter((c) => c.authorId === user.id);
  const resolvedCount = complaints.filter((c) => c.status === "Resolved").length;
  const upcoming = [...events].sort((a, b) => +new Date(a.date) - +new Date(b.date)).slice(0, 3);
  const recentNotices = [...notices]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 4);

  const quickActions = [
    { label: "Post Complaint", to: "/my-complaints", icon: MessageSquareWarning, tone: "from-rose-500 to-pink-500" },
    { label: "View Notices", to: "/notices", icon: Megaphone, tone: "from-indigo-500 to-violet-500" },
    { label: "Explore Skills", to: "/skills", icon: GraduationCap, tone: "from-sky-500 to-cyan-500" },
    { label: "Submit Idea", to: "/innovation", icon: Lightbulb, tone: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-3xl shadow-elegant">
        <img
          src={banner}
          alt="Campus illustration"
          width={1600}
          height={640}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-banner" />
        <div className="relative flex flex-col gap-5 p-6 text-primary-foreground sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <Badge className="mb-3 border-0 bg-white/20 text-primary-foreground backdrop-blur">
              <Sparkles className="mr-1 h-3 w-3" /> {ROLE_LABEL[user.role]} Workspace
            </Badge>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              Welcome back, {user.name.split(" ")[0]} 👋
            </h2>
            <p className="mt-2 max-w-xl text-primary-foreground/90">
              Here's what's happening across campus today. Stay updated on notices, complaints, and
              upcoming events.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="lg" className="rounded-xl bg-white text-primary hover:bg-white/90">
              <Link to="/notices">
                <Megaphone className="mr-2 h-4 w-4" /> View Notices
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl border-white/40 bg-white/10 text-primary-foreground backdrop-blur hover:bg-white/20 hover:text-primary-foreground"
            >
              <Link to="/events">
                <CalendarDays className="mr-2 h-4 w-4" /> Browse Events
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Notices" value={notices.length} icon={Megaphone} tone="primary" trend="Across campus" />
        <StatCard
          label="Complaints"
          value={complaints.length}
          icon={MessageSquareWarning}
          tone="warning"
          trend={`${complaints.filter((c) => c.status === "Pending").length} pending`}
        />
        <StatCard label="Resolved" value={resolvedCount} icon={CheckCircle2} tone="success" trend="This term" />
        <StatCard label="Ideas" value={ideas.length} icon={Lightbulb} tone="info" trend="Innovation Hub" />
      </section>

      {/* Quick actions */}
      <section>
        <h3 className="mb-3 font-display text-lg font-semibold">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickActions.map((q) => (
            <Link
              key={q.label}
              to={q.to}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <div
                className={`mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${q.tone} text-white shadow-card`}
              >
                <q.icon className="h-5 w-5" />
              </div>
              <div className="font-semibold">{q.label}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                Open <ArrowRight className="h-3 w-3 transition-smooth group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Two-column section */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Recent Notices */}
        <Card className="lg:col-span-2 border-border/60 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="font-display text-lg">Recent Notices</CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-primary">
              <Link to="/notices">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentNotices.map((n) => (
              <div
                key={n.id}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-gradient-soft p-3.5 transition-smooth hover:border-primary/40"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Megaphone className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold">{n.title}</p>
                    {n.pinned && (
                      <Badge variant="secondary" className="shrink-0 text-[10px]">
                        Pinned
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {n.authorName} · {new Date(n.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* My Complaints / Pending complaints (role-aware) */}
        <Card className="border-border/60 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="font-display text-lg">
              {user.role === "student" ? "My Complaints" : "Recent Complaints"}
            </CardTitle>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-primary"
            >
              <Link to={user.role === "student" ? "/my-complaints" : "/complaints"}>
                <Eye className="mr-1 h-4 w-4" /> All
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {(user.role === "student" ? myComplaints : complaints).slice(0, 4).map((c) => (
              <div
                key={c.id}
                className="rounded-xl border border-border/60 p-3.5 transition-smooth hover:border-primary/40"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate font-semibold">{c.title}</p>
                  <StatusBadge status={c.status} />
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{c.category}</p>
              </div>
            ))}
            {user.role === "student" && (
              <Button asChild variant="outline" className="w-full rounded-xl">
                <Link to="/my-complaints">
                  <Plus className="mr-1.5 h-4 w-4" /> New Complaint
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Upcoming events */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Upcoming Events</h3>
          <Button asChild variant="ghost" size="sm" className="text-primary">
            <Link to="/events">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {upcoming.map((e) => (
            <Card
              key={e.id}
              className="group overflow-hidden border-border/60 shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <div className="h-2 bg-gradient-primary" />
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{e.type}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(e.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </span>
                </div>
                <h4 className="font-display text-lg font-semibold leading-tight">{e.title}</h4>
                <p className="line-clamp-2 text-sm text-muted-foreground">{e.description}</p>
                <div className="flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
                  <span>📍 {e.location}</span>
                  <span>{e.attendees.length} going</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
