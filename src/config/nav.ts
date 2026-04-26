import {
  LayoutDashboard,
  Megaphone,
  MessageSquareWarning,
  ClipboardList,
  Lightbulb,
  GraduationCap,
  BookOpen,
  CalendarDays,
  User as UserIcon,
  Settings,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "@/types";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  roles?: Role[]; // visible to these roles; undefined = all
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Notices", to: "/notices", icon: Megaphone },
  { label: "Complaints", to: "/complaints", icon: MessageSquareWarning, roles: ["department", "admin"] },
  { label: "My Complaints", to: "/my-complaints", icon: ClipboardList, roles: ["student"] },
  { label: "Innovation Hub", to: "/innovation", icon: Lightbulb },
  { label: "Skills & Placement", to: "/skills", icon: GraduationCap },
  { label: "Resources", to: "/resources", icon: BookOpen },
  { label: "Events", to: "/events", icon: CalendarDays },
  { label: "Profile", to: "/profile", icon: UserIcon },
  { label: "Settings", to: "/settings", icon: Settings },
];
