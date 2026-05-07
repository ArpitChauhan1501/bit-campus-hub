import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Bot, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "bot";
  text: string;
};

const RULES: { keywords: string[]; reply: string }[] = [
  { keywords: ["hello", "hi", "hey", "hola"], reply: "Hello! How can I help you today?" },
  { keywords: ["notice", "notices", "announcement"], reply: "You can check all latest notices in the Notices section." },
  { keywords: ["complaint", "complaints", "issue"], reply: "Go to the Complaints section to submit or track your complaint." },
  { keywords: ["event", "events", "fest"], reply: "Upcoming events are available in the Events section." },
  { keywords: ["skill", "skills", "placement", "career"], reply: "Explore skill resources in the Skills & Placement section." },
  { keywords: ["idea", "innovation", "pitch"], reply: "You can submit your idea in the Innovation Hub." },
  { keywords: ["thanks", "thank you", "ty"], reply: "You're welcome! 😊" },
  { keywords: ["bye", "goodbye"], reply: "Goodbye! Have a great day on campus 👋" },
];

const FALLBACK = "Sorry, I am just a demo chatbot. Please explore the dashboard sections.";

const SUGGESTIONS = ["Notices", "Complaint", "Events", "Skills", "Idea"];

function getBotReply(input: string): string {
  const text = input.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((k) => text.includes(k))) return rule.reply;
  }
  return FALLBACK;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hi there! I'm Campus Buddy 🤖 — ask me about notices, complaints, events, skills or ideas.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    const reply = getBotReply(trimmed);
    setTimeout(() => {
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "bot", text: reply }]);
      setTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-elegant transition-smooth hover:scale-105 active:scale-95",
        )}
      >
        <span className="absolute inset-0 rounded-full bg-primary/30 motion-safe:animate-ping" aria-hidden />
        <span className="relative">
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </span>
      </button>

      {/* Chat window */}
      {open && (
        <div
          role="dialog"
          aria-label="BIT NEXUS chatbot"
          className="fixed bottom-24 right-5 z-50 flex h-[520px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-elegant animate-scale-in origin-bottom-right"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-gradient-primary px-4 py-3 text-primary-foreground">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-white/20 backdrop-blur">
              <Bot className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display font-semibold leading-tight">Campus Buddy</p>
              <p className="flex items-center gap-1.5 text-xs text-primary-foreground/80">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-300" />
                Online · Demo assistant
              </p>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full text-primary-foreground/90 transition-smooth hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-gradient-soft px-3 py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex items-end gap-2 animate-fade-in",
                  m.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                {m.role === "bot" && (
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm shadow-card",
                    m.role === "user"
                      ? "rounded-br-sm bg-gradient-primary text-primary-foreground"
                      : "rounded-bl-sm bg-card text-foreground border border-border/60",
                  )}
                >
                  {m.text}
                </div>
                {m.role === "user" && (
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
                    <UserIcon className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className="flex items-end gap-2 animate-fade-in">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-2xl rounded-bl-sm border border-border/60 bg-card px-3.5 py-2.5 shadow-card">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-1.5 border-t border-border/60 bg-card px-3 py-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-smooth hover:border-primary/40 hover:text-primary"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border/60 bg-card p-3"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="h-10 rounded-full bg-background"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim()}
              className="h-10 w-10 shrink-0 rounded-full bg-gradient-primary"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
