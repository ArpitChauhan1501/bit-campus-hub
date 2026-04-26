import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const DEMO = [
  { role: "Student", email: "student@test.com" },
  { role: "Department", email: "dept@test.com" },
  { role: "Club", email: "club@test.com" },
  { role: "Admin", email: "admin@test.com" },
];

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate("/", { replace: true });
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (!res.ok) {
        toast({ title: "Login failed", description: res.error, variant: "destructive" });
        return;
      }
      toast({ title: "Welcome back!", description: "You're signed in to Campus Hub." });
      navigate("/");
    }, 350);
  };

  const fillDemo = (e: string) => {
    setEmail(e);
    setPassword("123456");
  };

  return (
    <div className="relative grid min-h-screen w-full lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="relative hidden overflow-hidden bg-gradient-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-primary-glow/30 blur-3xl" />
        <div className="relative flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 backdrop-blur">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="font-display text-xl font-bold">Campus Hub</span>
        </div>

        <div className="relative space-y-5">
          <h2 className="font-display text-4xl font-bold leading-tight">
            One platform for your entire campus life.
          </h2>
          <p className="max-w-md text-primary-foreground/90">
            Notices, complaints, events, ideas, and resources — beautifully organized for students,
            departments, and clubs.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {["Role-based access", "Real-time updates", "Modern UX"].map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="relative text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} Campus Hub. Crafted for modern campuses.
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center bg-background px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-bold">Campus Hub</span>
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight">Sign in</h1>
          <p className="mt-1.5 text-muted-foreground">
            Welcome back. Use a demo account below to explore.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@college.edu"
                required
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                required
                className="h-11 rounded-xl"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl bg-gradient-primary text-base font-semibold shadow-card hover:opacity-95"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign in"}
            </Button>
          </form>

          <Card className="mt-6 border-border/60 bg-gradient-soft p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Demo accounts (password: 123456)
            </p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO.map((d) => (
                <button
                  key={d.email}
                  type="button"
                  onClick={() => fillDemo(d.email)}
                  className="rounded-lg border border-border bg-card px-3 py-2 text-left text-xs transition-smooth hover:border-primary hover:shadow-card"
                >
                  <div className="font-semibold">{d.role}</div>
                  <div className="truncate text-muted-foreground">{d.email}</div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
