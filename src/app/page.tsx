"use client";

import type React from "react";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import urlRegex from "url-regex-safe";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const AI_URL = process.env.NEXT_PUBLIC_AI_URL ?? "http://localhost:8000";

type Lang = "en" | "mn";

interface Message {
  type: "user" | "ai";
  content: string;
  timestamp: number;
}

export default function Home() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggested, setSuggested] = useState<ReactNode | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  const [pendingAction, setPendingAction] = useState<null | "send_message">(
    null
  );

  const translations = {
    en: {
      greeting: [
        "Hello! 👋",
        1200,
        "I'm Adiyakhuu",
        1200,
        "Ask me anything about my work and experience ⤵",
      ],
      placeholder: "Ask anything about my skills, projects, or experience...",
      askButton: "Ask",
      projects: "Featured Projects",
      contact: "Get in Touch",
      noAnswer: "No answer found.",
      error: "Something went wrong:",
      typing: "Thinking...",
      clearChat: "Clear chat",
    },
    mn: {
      greeting: [
        "Сайн байна уу! 👋",
        1200,
        "Намайг Адъяахүү гэдэг",
        1200,
        "Миний ажил, туршлагын талаар асуугаарай ⤵",
      ],
      placeholder: "Миний чадвар, төсөл, туршлагын талаар асуугаарай...",
      askButton: "Асуух",
      projects: "Онцлох Төслүүд",
      contact: "Холбоо Барих",
      noAnswer: "Хариулт олдсонгүй.",
      error: "Алдаа гарлаа:",
      typing: "Бодож байна…",
      clearChat: "Яриаг цэвэрлэх",
    },
  } as const;

  const t = translations[lang];

  async function askOnce(e: React.FormEvent) {
    e.preventDefault();
    const question = q.trim();
    if (!question || loading) return;
    setLoading(true);
    setQ("");

    try {
      if (pendingAction === "send_message") {
        const res = await fetch(`${AI_URL}/api/ai`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": lang,
          },
          body: JSON.stringify({
            contactMessage: question,
            lang,
          }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const answer = (data?.answer ?? "").toString().trim();

        const aiMsg: Message = {
          type: "ai",
          content: answer,
          timestamp: Date.now(),
        };
        setResponse(aiMsg.content);
        setPendingAction(null);
        return;
      }

      const res = await fetch(`${AI_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": lang,
        },
        body: JSON.stringify({
          question,
          history: [],
          lang,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const answer = (data?.answer ?? "").toString().trim();
      const finalAnswer = answer || t.noAnswer;

      const aiMsg: Message = {
        type: "ai",
        content: finalAnswer,
        timestamp: Date.now(),
      };
      setResponse(aiMsg.content);
      if (data?.action?.type === "send_message") {
        setPendingAction("send_message");
      }
    } catch (err) {
      const errText = `${t.error} ${err}`;
      const aiMsg: Message = {
        type: "ai",
        content: errText,
        timestamp: Date.now(),
      };
      setResponse(aiMsg.content);

      setPendingAction(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const text = response?.toString() ?? "";

    const urls = text.match(urlRegex());

    if (urls && urls.length > 0) {
      setSuggested(
        <div className="mt-4 text-left">
          <p className="text-sm text-muted-foreground mb-2">
            Санал болгосон линк{urls.length > 1 ? "үүд" : ""}:
          </p>
          <ul className="list-disc list-inside space-y-1">
            {urls.map((url, i) => (
              <li key={i}>
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline break-words"
                >
                  {url}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      setSuggested(null);
    }
  }, [response]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent [mask-image:radial-gradient(60%_60%_at_50%_0%,#000_40%,transparent_100%)]" />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Bot className="h-6 w-6 text-primary" />
            </motion.div>
            <TypeAnimation
              sequence={["Adiyakhuu", 1000]}
              wrapper="span"
              repeat={Infinity}
            />
          </div>

          {/* Lang Switch */}
          <div className="inline-flex items-center gap-1 rounded-xl border bg-muted p-1 shadow-sm">
            <button
              type="button"
              aria-label="Switch to English"
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ${
                lang === "en"
                  ? "bg-background shadow"
                  : "hover:bg-background/50"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              aria-label="Switch to Mongolian"
              onClick={() => setLang("mn")}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ${
                lang === "mn"
                  ? "bg-background shadow"
                  : "hover:bg-background/50"
              }`}
            >
              MN
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4">
        {/* Hero / copy */}
        <section className="mx-auto max-w-3xl text-center pt-16 sm:pt-24">
          <motion.h1
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            {lang === "mn"
              ? "Асуух зүйлээ бичээрэй."
              : "Ask anything. Get a crisp answer."}
          </motion.h1>
          <p className="mt-3 text-muted-foreground">
            {lang === "mn" ? (
              <>
                Дарах:{" "}
                <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  Enter
                </kbd>{" "}
                илгээх,{" "}
                <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  Shift
                </kbd>
                +
                <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  Enter
                </kbd>{" "}
                шинэ мөр лүү шилжих.
              </>
            ) : (
              <>
                Press{" "}
                <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  Enter
                </kbd>{" "}
                to send,{" "}
                <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  Shift
                </kbd>
                +
                <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  Enter
                </kbd>{" "}
                for a new line.
              </>
            )}
          </p>
        </section>

        {/* Answer / Response */}
        <section
          aria-live="polite"
          className="mx-auto mt-10 sm:mt-14 max-w-3xl space-y-4"
        >
          {loading ? (
            <Card className="border-primary/20">
              <CardContent className="p-5 flex items-center gap-2 text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                бодож байна...
              </CardContent>
            </Card>
          ) : (
            response && (
              <Card className="border-primary/20">
                <CardContent className="p-5">
                  <div className="prose prose-neutral dark:prose-invert max-w-none whitespace-pre-line">
                    {response}
                  </div>
                </CardContent>
              </Card>
            )
          )}

          {suggested && (
            <Card>
              <CardContent className="p-5">
                <div className="text-sm text-muted-foreground">Линк:</div>
                <div className="mt-1 break-words text-sm">{suggested}</div>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Ask box */}
        <section className="sticky bottom-0 z-40 mx-auto mt-8 max-w-3xl pb-6">
          <Card className="shadow-lg">
            <CardContent className="p-3 sm:p-4">
              <form onSubmit={askOnce} className="flex flex-col gap-3">
                <Textarea
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t.placeholder}
                  disabled={loading}
                  className="min-h-[72px] resize-y"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      askOnce(e);
                    }
                  }}
                />
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {q?.length ? `${q.length} chars` : ""}
                  </span>
                  <div className="ml-auto flex items-center gap-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="min-w-[96px]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Thinking…
                        </>
                      ) : lang === "mn" ? (
                        "Асуух"
                      ) : (
                        "Ask"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Optional: Featured Projects (kept for future) */}
      {/*
      <section className="container mx-auto my-16 max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{t.projects}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <Card key={i} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-6">
                <div className="w-full h-48 bg-muted rounded-lg mb-4 grid place-items-center text-muted-foreground">
                  Project {i}
                </div>
                <h3 className="font-semibold text-lg mb-2">Sample Project {i}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  A brief description of this project and the technologies used to build it.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">React</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Node.js</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">AI</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      */}
    </div>
  );
}
