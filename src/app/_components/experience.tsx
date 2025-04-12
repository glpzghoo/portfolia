"use client";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export function Experience({
  lang,
  head,
  odd,
  exp,
}: {
  lang: string;
  head: boolean;
  odd: number;
  exp: {
    startAt: Date;
    endedAt: Date;
    present: boolean;
    description_mn: string;
    description_en: string;
  };
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
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const month_ = date.toLocaleString("en-US", { month: "2-digit" });
  const year = date.getFullYear();
  const suffix =
    day === 1 || day === 21 || day === 31
      ? `st`
      : day === 2 || day === 22
      ? `nd`
      : day === 3 || day === 23
      ? `rd`
      : `th`;

  const calculateSuffix = (day: number): string => {
    if (day === 1 || day === 21 || day === 31) return "st";

    if (day === 2 || day === 22) return "nd";
    if (day === 3 || day === 23) return "rd";
    else return "th";
  };
  console.log(exp.startAt);
  return (
    <motion.div
      initial={{ opacity: 0, x: odd ? 1000 : -1000 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      exit={{ opacity: 0, y: 50 }}
      viewport={{ once: false }}
      className="p-10 rounded-lg shadow-lg"
    >
      <div
        className={`${inter.className} items-center text-center flex flex-col gap-4`}
      >
        {head && (
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
        )}
        <div className="w-1/2">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <div className="">Junior Software Engineer</div>
              <div className="text-xs flex  gap-3 font-bold">
                {exp.startAt.toISOString().split("T")[0]} -
                {exp.present ? (
                  <div>
                    {lang === "mn" ? (
                      <div className="text-red-400 flex animate-pulse">
                        {month_}-р сарын {day}-н, {year}
                        <div className="text-foreground">(Өнөөдөр)</div>
                      </div>
                    ) : (
                      <div className="text-red-400 flex animate-pulse">
                        {month}-{day}
                        {suffix}, {year}
                        <div className="text-foreground">(Today)</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {lang === "mn" ? (
                      <div className="text-green-400 flex">
                        {exp.endedAt.getMonth() + 1}-р сарын{" "}
                        {exp.endedAt.getDate()}-н, {exp.endedAt.getFullYear()}
                        <div className="text-foreground">
                          (
                          {Math.floor(
                            new Date(
                              exp.endedAt.getTime() - exp.startAt.getTime()
                            ).getMonth()
                          )}{" "}
                          -н сарын турш)
                        </div>
                      </div>
                    ) : (
                      <div className="text-green-400 flex">
                        {exp.endedAt.getMonth() + 1}-{exp.endedAt.getDate()}
                        {calculateSuffix(exp.endedAt.getDate())},{" "}
                        {exp.endedAt.getFullYear()}
                        <div className="text-foreground">
                          (for{" "}
                          {Math.floor(
                            new Date(
                              exp.endedAt.getTime() - exp.startAt.getTime()
                            ).getMonth()
                          )}{" "}
                          months)
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <p className="text-xl font-light">
              {lang === "mn" ? exp.description_mn : exp.description_en}
            </p>
            <div className="flex flex-wrap whitespace-nowrap gap-3">
              {head &&
                languages.map((language) => (
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
