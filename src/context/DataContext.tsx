import { createContext, useContext, useState, ReactNode } from "react";
import {
  SEED_NOTICES,
  SEED_COMPLAINTS,
  SEED_EVENTS,
  SEED_IDEAS,
  SEED_RESOURCES,
  SEED_SKILLS,
} from "@/data/seed";
import type { Notice, Complaint, Event, Idea, Resource, Skill, ComplaintStatus } from "@/types";

interface DataContextValue {
  notices: Notice[];
  complaints: Complaint[];
  events: Event[];
  ideas: Idea[];
  resources: Resource[];
  skills: Skill[];
  addNotice: (n: Omit<Notice, "id" | "createdAt">) => void;
  updateNotice: (id: string, patch: Partial<Notice>) => void;
  deleteNotice: (id: string) => void;
  addComplaint: (c: Omit<Complaint, "id" | "createdAt" | "status">) => void;
  updateComplaintStatus: (id: string, status: ComplaintStatus) => void;
  addEvent: (e: Omit<Event, "id" | "attendees">) => void;
  updateEvent: (id: string, patch: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  rsvpEvent: (eventId: string, userId: string) => void;
  addIdea: (i: Omit<Idea, "id" | "createdAt" | "upvotes">) => void;
  upvoteIdea: (id: string) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);
const id = () => Math.random().toString(36).slice(2, 10);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [notices, setNotices] = useState<Notice[]>(SEED_NOTICES);
  const [complaints, setComplaints] = useState<Complaint[]>(SEED_COMPLAINTS);
  const [events, setEvents] = useState<Event[]>(SEED_EVENTS);
  const [ideas, setIdeas] = useState<Idea[]>(SEED_IDEAS);
  const [resources] = useState<Resource[]>(SEED_RESOURCES);
  const [skills] = useState<Skill[]>(SEED_SKILLS);

  const value: DataContextValue = {
    notices,
    complaints,
    events,
    ideas,
    resources,
    skills,
    addNotice: (n) =>
      setNotices((prev) => [{ ...n, id: id(), createdAt: new Date().toISOString() }, ...prev]),
    updateNotice: (nid, patch) =>
      setNotices((prev) => prev.map((n) => (n.id === nid ? { ...n, ...patch } : n))),
    deleteNotice: (nid) => setNotices((prev) => prev.filter((n) => n.id !== nid)),
    addComplaint: (c) =>
      setComplaints((prev) => [
        { ...c, id: id(), createdAt: new Date().toISOString(), status: "Pending" },
        ...prev,
      ]),
    updateComplaintStatus: (cid, status) =>
      setComplaints((prev) => prev.map((c) => (c.id === cid ? { ...c, status } : c))),
    addEvent: (e) => setEvents((prev) => [{ ...e, id: id(), attendees: [] }, ...prev]),
    updateEvent: (eid, patch) =>
      setEvents((prev) => prev.map((e) => (e.id === eid ? { ...e, ...patch } : e))),
    deleteEvent: (eid) => setEvents((prev) => prev.filter((e) => e.id !== eid)),
    rsvpEvent: (eid, uid) =>
      setEvents((prev) =>
        prev.map((e) =>
          e.id === eid
            ? {
                ...e,
                attendees: e.attendees.includes(uid)
                  ? e.attendees.filter((a) => a !== uid)
                  : [...e.attendees, uid],
              }
            : e,
        ),
      ),
    addIdea: (i) =>
      setIdeas((prev) => [
        { ...i, id: id(), createdAt: new Date().toISOString(), upvotes: 0 },
        ...prev,
      ]),
    upvoteIdea: (iid) =>
      setIdeas((prev) => prev.map((i) => (i.id === iid ? { ...i, upvotes: i.upvotes + 1 } : i))),
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};
