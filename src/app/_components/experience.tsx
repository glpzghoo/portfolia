"use client";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import { ReactNode, useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export function Experience({
  children,
  lang,
}: {
  children: ReactNode;
  lang: string;
}) {
  const [languages, setLanguages] = useState<string[]>([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`/languages.json`);
        const data: string[] = await res.json();
        setLanguages(data);
      } catch (e) {
        console.error(e, "Languages file Oldsongui");
      }
    };
    fetchProjects();
  }, []);
  const date = new Date();
  return (
    <motion.div
      initial={{ opacity: 0, x: -1000 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      exit={{ opacity: 0, y: 50 }}
      viewport={{ once: false }}
      className="p-10 rounded-lg shadow-lg"
    >
      <div
        className={`${inter.className} items-center text-center flex flex-col gap-4`}
      >
        <div>
          <div>
            <div className={`text-5xl font-extrabold`}>
              {lang === "mn" ? `ТУРШЛАГА` : `EXPERIENCE`}
            </div>
            <div className={` text-lg flex justify-center`}>
              <p className="bg-gradient-to-r  from-purple-500 to-red-900 bg-clip-text text-transparent tracking-[.25rem]">
                {lang === "mn" ? `Кофигоо битгий мартаарай!` : `EXPLORE NOW`}
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <div className="">Junior Software Engineer</div>
              <div className="font-extralight text-xs">
                9 2024 - {lang === "mn" ? `Одоо` : `PRESENT`} ({date.getMonth()}
                , {date.getFullYear()})
              </div>
            </div>
            <p className="text-xl font-light">{children}</p>
            <div className="flex flex-wrap whitespace-nowrap gap-3">
              {languages.map((language) => (
                <button
                  key={language}
                  className="border bg-background px-2  rounded-full text-xs gradient-border"
                >
                  {language}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
