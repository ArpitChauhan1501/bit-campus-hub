import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail, Moon, Shield } from "lucide-react";

const SETTINGS = [
  { icon: Bell, title: "Push Notifications", desc: "Get notified about new notices and events." },
  { icon: Mail, title: "Email Digest", desc: "Weekly summary of campus activity." },
  { icon: Moon, title: "Dark Mode", desc: "Switch to a darker theme (coming soon)." },
  { icon: Shield, title: "Two-Factor Auth", desc: "Extra layer of security for your account." },
];

export default function Settings() {
  return (
    <div>
      <PageHeader title="Settings" description="Customize BIT NEXUS to fit your workflow." />
      <Card className="border-border/60 shadow-card">
        <CardContent className="divide-y divide-border p-0">
          {SETTINGS.map((s) => (
            <div key={s.title} className="flex items-center gap-4 p-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-soft text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <Label className="text-base font-semibold">{s.title}</Label>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
              <Switch defaultChecked={s.title !== "Dark Mode"} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
