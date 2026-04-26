import { PageHeader } from "@/components/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ROLE_LABEL: Record<string, string> = {
  student: "Student", department: "Department", club: "Club", admin: "Admin",
};

export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div>
      <PageHeader title="Profile" description="Manage your personal information and preferences." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border/60 shadow-card lg:col-span-1">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <Avatar className="h-24 w-24 ring-4 ring-primary/20">
              <AvatarFallback className="bg-gradient-primary text-2xl font-bold text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-display text-xl font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Badge className="mt-2 bg-gradient-primary text-primary-foreground">{ROLE_LABEL[user.role]}</Badge>
            </div>
            {user.department && (
              <p className="text-sm text-muted-foreground">🎓 {user.department}</p>
            )}
            {user.club && (
              <p className="text-sm text-muted-foreground">🌟 {user.club}</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-card lg:col-span-2">
          <CardContent className="space-y-4 p-6">
            <h4 className="font-display text-lg font-semibold">Account Details</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>Full Name</Label><Input defaultValue={user.name} /></div>
              <div className="space-y-1.5"><Label>Email</Label><Input defaultValue={user.email} /></div>
              <div className="space-y-1.5"><Label>Role</Label><Input value={ROLE_LABEL[user.role]} disabled /></div>
              <div className="space-y-1.5"><Label>Department / Club</Label>
                <Input defaultValue={user.department || user.club || "—"} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="rounded-xl bg-gradient-primary">Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
