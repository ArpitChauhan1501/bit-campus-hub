export type Role = "student" | "department" | "club" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  department?: string;
  club?: string;
}

export interface Notice {
  id: string;
  title: string;
  body: string;
  category: "Academic" | "Exam" | "General" | "Event";
  authorId: string;
  authorName: string;
  createdAt: string;
  pinned?: boolean;
}

export type ComplaintStatus = "Pending" | "In Progress" | "Resolved";

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: "Hostel" | "Academic" | "Infrastructure" | "Other";
  status: ComplaintStatus;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: "Hackathon" | "Workshop" | "Cultural" | "Sports" | "Seminar";
  hostId: string;
  hostName: string;
  attendees: string[];
}

export interface Idea {
  id: string;
  title: string;
  pitch: string;
  authorId: string;
  authorName: string;
  upvotes: number;
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  type: "PDF" | "Video" | "Link" | "Course";
  url: string;
  subject: string;
}

export interface Skill {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  provider: string;
  tag: string;
}
