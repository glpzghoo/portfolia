"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, UserRound } from "lucide-react";
import { DICT, Lang } from "../ai/utils/helpers";
import getUrls from "get-urls";
type Role = "user" | "assistant";
interface Msg {
  role: Role;
  content: string;
}

type ActionType =
  | { type: "send_message" }
  | { type: "none" }
  | Record<string, unknown>;

const AI_URL = process.env.NEXT_PUBLIC_AI_URL ?? "http://localhost:8000";

export default function PortfolioAIPage() {
  const [lang, setLang] = useState<Lang>(() =>
    typeof window !== "undefined"
      ? (localStorage.getItem("lang") as Lang) || "mn"
      : "mn"
  );
  const T = DICT[lang];

  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: T.assistantGreeting },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [pendingAction, setPendingAction] = useState<null | "send_message">(
    null
  );

  const [suggested, setSuggested] = useState<React.ReactNode>(null);

  const endRef = useRef<HTMLDivElement | null>(null);
  const inFlightRef = useRef(false);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    setMessages((prev) => {
      if (!prev.length)
        return [{ role: "assistant", content: T.assistantGreeting }];
      const clone = [...prev];
      if (clone[0]?.role === "assistant") {
        clone[0] = { role: "assistant", content: T.assistantGreeting };
      }
      return clone;
    });
    if (typeof window !== "undefined") localStorage.setItem("lang", lang);
  }, [lang, T.assistantGreeting]);

  const historyForAPI = useMemo(
    () => messages.map((m) => ({ role: m.role, content: m.content })),
    [messages]
  );

  function stripActionBlocks(s: string) {
    return s.replace(/<ACTION>[\s\S]*?<\/ACTION>/gi, "").trim();
  }

  useEffect(() => {
    const last =
      [...messages].reverse().find((m) => m.role === "assistant")?.content ??
      "";
    const cleaned = stripActionBlocks(last);
    const urls = Array.from(getUrls(cleaned));

    if (urls.length) {
      setSuggested(
        <div className="mt-3 text-left">
          <p className="text-sm text-muted-foreground mb-2">
            {lang === "mn" ? "Санал болгосон линк" : "Suggested link"}
            {urls.length > 1 ? (lang === "mn" ? "үүд" : "s") : ""}:
          </p>
          <ul className="list-disc list-inside space-y-1">
            {urls.map((u, i) => (
              <li key={`${u}-${i}`} className="break-words">
                <Link
                  href={u}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {u}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      setSuggested(null);
    }
  }, [messages, lang]);

  async function send(q?: string) {
    const question = (q ?? input).trim();
    if (!question) return;

    if (inFlightRef.current) return;
    inFlightRef.current = true;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);

    try {
      if (pendingAction === "send_message") {
        const res = await fetch(`${AI_URL}/api/ai`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": lang,
          },
          body: JSON.stringify({ contactMessage: question, lang }),
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);

        const data = await res.json();
        const answer = stripActionBlocks((data?.answer ?? "").toString());

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: answer },
        ]);
        setPendingAction(null);
        return;
      }

      const res = await fetch(`${AI_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": lang,
        },
        body: JSON.stringify({ question, history: historyForAPI, lang }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const data = await res.json();
      const rawAnswer = (data?.answer ?? "").toString();
      const answer = stripActionBlocks(rawAnswer) || T.noAnswer;

      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);

      const action: ActionType | undefined = data?.action;
      const nextMode: string | undefined = data?.nextMode;
      if (action?.type === "send_message" || nextMode === "contact") {
        setPendingAction("send_message");
      } else {
        setPendingAction(null);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            lang === "mn"
              ? `Уучлаарай—AI үйлчилгээтэй холбогдоход асуудал гарлаа. (${err})`
              : `Sorry—I'm having trouble reaching the AI service. (${err})`,
        },
      ]);
    } finally {
      setLoading(false);
      inFlightRef.current = false;
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void send();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background relative">
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,#000_30%,transparent_80%)]">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[90vw] rounded-full blur-3xl bg-gradient-to-r from-indigo-600/25 via-sky-500/20 to-emerald-500/25" />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="flex justify-end mb-4">
          <div className="inline-flex rounded-xl border p-1 bg-background">
            <button
              className={`px-3 py-1 rounded-lg text-sm ${
                lang === "en" ? "bg-muted" : ""
              }`}
              onClick={() => setLang("en")}
              type="button"
            >
              EN
            </button>
            <button
              className={`px-3 py-1 rounded-lg text-sm ${
                lang === "mn" ? "bg-muted" : ""
              }`}
              onClick={() => setLang("mn")}
              type="button"
            >
              MN
            </button>
          </div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <span>{T.badge}</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
              {T.title}
            </span>
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            {T.blurb}
          </p>
        </motion.section>

        <div className="flex">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="lg:col-span-3"
          >
            <Card className="shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" /> {T.chatTitle}
                </CardTitle>
                <CardDescription>{T.chatDesc}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  {T.suggested.map((s: string) => (
                    <Badge
                      key={s}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => send(s)}
                    >
                      {s}
                    </Badge>
                  ))}
                </div>

                <Separator className="mb-4" />

                <ScrollArea className="h-[420px] pr-4">
                  <div className="space-y-4">
                    {messages.map((m, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarFallback>
                            {m.role === "assistant" ? (
                              <Bot className="h-4 w-4" />
                            ) : (
                              <UserRound className="h-4 w-4" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={
                            m.role === "assistant"
                              ? "rounded-2xl border bg-muted/40 px-4 py-2.5 text-sm"
                              : "rounded-2xl border px-4 py-2.5 text-sm"
                          }
                        >
                          <div className="whitespace-pre-wrap leading-relaxed">
                            {m.content}
                          </div>
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="rounded-2xl border bg-muted/40 px-4 py-2.5 text-sm text-muted-foreground">
                          {T.thinking}
                        </div>
                      </div>
                    )}
                    <div ref={endRef} />
                  </div>
                </ScrollArea>

                {suggested}
              </CardContent>

              <CardFooter>
                <form
                  onSubmit={onSubmit}
                  className="flex w-full items-end gap-2"
                >
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        onSubmit(e);
                      }
                    }}
                    placeholder={
                      pendingAction === "send_message"
                        ? lang === "mn"
                          ? "Энд мессежээ бичээрэй, би шууд inbox руугаа илгээнэ…"
                          : "Type your message here and I’ll forward it to my inbox…"
                        : T.placeholder
                    }
                    className="min-h-[60px]"
                    disabled={loading}
                  />
                  <Button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {T.ask}
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <div className="h-10" />
      </main>
    </div>
  );
}
