// 1) add at top
export type Lang = "en" | "mn";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DICT: Record<Lang, any> = {
  en: {
    title: "Ask about me",
    blurb:
      "Get quick answers about projects, tech stack, and how to get in touch.",
    assistantGreeting:
      "Hey! My name is Adiyakhuu. Ask me anything about my work, skills, or projects.",
    chatTitle: "My Chat",
    chatDesc:
      "Answers are grounded in Adiyakhuu's profile. Try a suggested prompt below.",
    placeholder: "Ask about my work, stack, availability…",
    ask: "Ask",
    suggested: [
      "Who are you and what do you do?",
      "Show me your recent projects",
      "What stack do you use most?",
      "How can I contact you?",
    ],
    sidebarAbout: "About Me",
    sidebarSnap: "Quick snapshot",
    location: "Location",
    focus: "Focus",
    style: "Style",
    howWorks: "How this works",
    simpleArch: "Simple architecture",
    frontend: "Frontend: Next.js + shadcn/ui",
    backend: "Backend: Node/Express or FastAPI",
    model: "Model: OpenAI (or local via Ollama)",
  },
  mn: {
    title: "Миний тухай асуулт асуу",
    blurb: "Төслүүд, технологийн стек, холбогдох аргыг хурдан олж мэдээрэй.",
    assistantGreeting:
      "Сайн уу! Намайг Адъяа. Ажлын туршлага, ур чадвар, төслүүдийн талаар юу ч асууж болно.",
    chatTitle: "Портфолио чат",
    chatDesc:
      "Хариултууд нь Адъяагийн профайлаас суурилна. Доорх санал болгосон асуултуудыг туршаад үзээрэй.",
    placeholder: "Миний ажил, стек, боломжийн талаар асуу…",
    ask: "Асуух",
    suggested: [
      "Би хэн бэ, юу хийдэг вэ?",
      "Сүүлийн үеийн төслүүдийг харуул",
      "Би хамгийн их ямар стекийн технологи ашигладаг вэ?",
      "Надтай яаж холбогдох вэ?",
    ],
    sidebarAbout: "Миний тухай",
    sidebarSnap: "Товч танилцуулга",
    location: "Байршил",
    focus: "Чиглэл",
    style: "Загвар",
    howWorks: "Энэ хэрхэн ажилладаг вэ",
    simpleArch: "Энгийн архитектур",
    frontend: "Фронтенд: Next.js + shadcn/ui",
    backend: "Бекенд: Node/Express эсвэл FastAPI",
    model: "Загвар: OpenAI (эсвэл локал Ollama)",
  },
};
export { DICT };
