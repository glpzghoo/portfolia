"use client";

import type React from "react";
import { ReactNode, useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import urlRegex from "url-regex-safe";

const AI_URL = process.env.NEXT_PUBLIC_AI_URL ?? "http://localhost:8000";

type Lang = "en" | "mn";

interface Message {
  type: "user" | "ai";
  content: string;
  timestamp: number;
}

export default function Home() {
  const [animKey, setAnimKey] = useState(0);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [pendingAction, setPendingAction] = useState<null | "send_message">(
    null
  );
  const [suggested, setSuggested] = useState<ReactNode | null>(null);

  const [lang, setLang] = useState<Lang>(() =>
    typeof window !== "undefined"
      ? (localStorage.getItem("lang") as Lang) || "mn"
      : "mn"
  );

  const translations = {
    en: {
      greeting: [
        "Hello! 👋",
        1200,
        "I'm Adyaakhuu",
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

  const [sequence, setSequence] = useState<Array<string | number>>(
    t.greeting.slice()
  );

  async function askOnce(e: React.FormEvent) {
    e.preventDefault();
    const question = q.trim();
    if (!question || loading) return;

    const userMsg: Message = {
      type: "user",
      content: question,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setQ("");

    setSequence([t.typing]);
    setAnimKey((k) => k + 1);

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
        setMessages((prev) => [...prev, aiMsg]);
        setSequence([answer]);
        setAnimKey((k) => k + 1);

        setPendingAction(null);
        return;
      }

      const historyForAPI = messages.slice(-4).map((m) => ({
        role: m.type === "user" ? "user" : "assistant",
        content: m.content,
      }));

      const res = await fetch(`${AI_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": lang,
        },
        body: JSON.stringify({
          question,
          history: historyForAPI,
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
      setMessages((prev) => [...prev, aiMsg]);

      setSequence([finalAnswer]);
      setAnimKey((k) => k + 1);

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
      setMessages((prev) => [...prev, aiMsg]);
      setSequence([errText]);
      setAnimKey((k) => k + 1);
      setPendingAction(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const text = sequence[0]?.toString() ?? "";

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
  }, [sequence]);

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
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

        <section className="max-w-4xl mx-auto mb-16 min-h-screen flex flex-col justify-center">
          <div className="text-center mb-8 bg-foreground/75 rounded-xl shadow-xl p-6 md:p-10 lg:p-12 bg-opacity-10 backdrop-blur-lg ">
            <div className="min-h-[120px] flex items-center justify-center mb-8">
              <TypeAnimation
                key={animKey}
                sequence={sequence}
                wrapper="div"
                speed={50}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-background text-center leading-tight"
                repeat={0}
                cursor
              />
            </div>

            <div className="min-h-[120px] flex items-center justify-center mb-8">
              {suggested}
            </div>

            <form onSubmit={askOnce} className="max-w-2xl mx-auto ">
              <div className="flex gap-2 justify-center">
                <TextField
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t.placeholder}
                  disabled={loading}
                  variant="standard"
                  sx={{
                    minWidth: "300px",
                    resize: "none",
                    color: "white",
                    textColor: "white",
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      askOnce(e);
                    }
                  }}
                />
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
