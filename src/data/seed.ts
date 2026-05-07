import type { User, Notice, Complaint, Event, Idea, Resource, Skill } from "@/types";

export const DEMO_USERS: (User & { password: string })[] = [
  {
    id: "u-stu",
    name: "Aarav Sharma",
    email: "student@test.com",
    password: "123456",
    role: "student",
    department: "Computer Science",
  },
  {
    id: "u-dept",
    name: "Dr. Priya Verma",
    email: "dept@test.com",
    password: "123456",
    role: "department",
    department: "Computer Science",
  },
  {
    id: "u-club",
    name: "Rohit Kapoor",
    email: "club@test.com",
    password: "123456",
    role: "club",
    club: "TechSpark Coding Club",
  },
  {
    id: "u-admin",
    name: "Admin Office",
    email: "admin@test.com",
    password: "123456",
    role: "admin",
  },
];

const now = Date.now();
const day = 86400000;
const iso = (offset: number) => new Date(now + offset).toISOString();

export const SEED_NOTICES: Notice[] = [
  {
    id: "n1",
    title: "Mid-Semester Exam Schedule Released",
    body: "Mid-sem exams begin Nov 18. Check the academic portal for your detailed timetable and seating arrangements.",
    category: "Exam",
    authorId: "u-dept",
    authorName: "Dr. Priya Verma",
    createdAt: iso(-2 * day),
    pinned: true,
  },
  {
    id: "n2",
    title: "Library Hours Extended During Exams",
    body: "The central library will remain open till 11 PM until November 30 to support exam preparation.",
    category: "General",
    authorId: "u-admin",
    authorName: "Admin Office",
    createdAt: iso(-1 * day),
  },
  {
    id: "n3",
    title: "Guest Lecture: AI in Healthcare",
    body: "A guest lecture by Dr. Mehta on November 12 in Auditorium A. Open to all students.",
    category: "Academic",
    authorId: "u-dept",
    authorName: "Dr. Priya Verma",
    createdAt: iso(-3 * day),
  },
];

export const SEED_COMPLAINTS: Complaint[] = [
  {
    id: "c1",
    title: "Wi-Fi outage in Block C",
    description: "Internet has been down in Block C since yesterday evening.",
    category: "Infrastructure",
    status: "In Progress",
    authorId: "u-stu",
    authorName: "Aarav Sharma",
    createdAt: iso(-1 * day),
  },
  {
    id: "c2",
    title: "Hostel mess food quality",
    description: "Requesting a review of the dinner menu for hygiene and variety.",
    category: "Hostel",
    status: "Pending",
    authorId: "u-stu",
    authorName: "Aarav Sharma",
    createdAt: iso(-3 * day),
  },
  {
    id: "c3",
    title: "Lab projector not working",
    description: "Projector in Lab 204 needs replacement.",
    category: "Academic",
    status: "Resolved",
    authorId: "u-stu",
    authorName: "Aarav Sharma",
    createdAt: iso(-7 * day),
  },
];

export const SEED_EVENTS: Event[] = [
  {
    id: "e1",
    title: "HackCampus 24h Hackathon",
    description: "Build something amazing in 24 hours. Prizes worth ₹1,00,000.",
    date: iso(5 * day),
    location: "Innovation Center",
    type: "Hackathon",
    hostId: "u-club",
    hostName: "TechSpark Coding Club",
    attendees: ["u-stu"],
  },
  {
    id: "e2",
    title: "UI/UX Design Workshop",
    description: "Hands-on session on Figma, prototyping, and accessibility.",
    date: iso(2 * day),
    location: "Seminar Hall 2",
    type: "Workshop",
    hostId: "u-club",
    hostName: "TechSpark Coding Club",
    attendees: [],
  },
  {
    id: "e3",
    title: "Annual Cultural Fest — Spectra",
    description: "Three days of music, dance, drama, and food.",
    date: iso(14 * day),
    location: "Main Grounds",
    type: "Cultural",
    hostId: "u-club",
    hostName: "TechSpark Coding Club",
    attendees: [],
  },
];

export const SEED_IDEAS: Idea[] = [
  {
    id: "i1",
    title: "Campus carpool app",
    pitch: "Match students from the same locality for daily commute.",
    authorId: "u-stu",
    authorName: "Aarav Sharma",
    upvotes: 24,
    createdAt: iso(-2 * day),
  },
  {
    id: "i2",
    title: "Smart attendance via QR",
    pitch: "Replace paper attendance with rotating QR codes per lecture.",
    authorId: "u-stu",
    authorName: "Meera Iyer",
    upvotes: 41,
    createdAt: iso(-5 * day),
  },
];

export const SEED_RESOURCES: Resource[] = [
  { id: "r1", title: "Data Structures Notes", type: "PDF", url: "#", subject: "DSA" },
  { id: "r2", title: "Intro to Machine Learning", type: "Video", url: "#", subject: "AI/ML" },
  { id: "r3", title: "MIT OCW — Algorithms", type: "Course", url: "#", subject: "DSA" },
  { id: "r4", title: "System Design Primer", type: "Link", url: "#", subject: "Backend" },
];

export const SEED_SKILLS: Skill[] = [
  { id: "s1", title: "Full-Stack Web Development", level: "Intermediate", provider: "BIT NEXUS Academy", tag: "Web" },
  { id: "s2", title: "Public Speaking Mastery", level: "Beginner", provider: "Toastmasters Club", tag: "Soft Skills" },
  { id: "s3", title: "Data Analytics with Python", level: "Intermediate", provider: "DataCamp", tag: "Data" },
  { id: "s4", title: "Product Management 101", level: "Beginner", provider: "Reforge", tag: "Career" },
];
