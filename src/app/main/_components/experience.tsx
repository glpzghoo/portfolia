"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type ExpType = {
  startAt: Date;
  endedAt: Date;
  present: boolean;
  description_mn: string;
  description_en: string;
};

type Props = {
  lang: string;
  head: boolean;
  odd: number;
  exp: ExpType;
};

export function Experience({ lang, head, odd, exp }: Props) {
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await fetch(`/languages.json`);
        const data: string[] = await res.json();
        setLanguages(data);
      } catch (e) {
        console.error(e, "Languages file not found");
      }
    };
    fetchLanguages();
  }, []);

  const today = new Date();
  const formatWithSuffix = (day: number) => {
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";
    return `${day}${suffix}`;
  };

  const formatDate = (date: Date, isMn: boolean) =>
    isMn
      ? `${
          date.getMonth() + 1
        }-р сарын ${date.getDate()}-н, ${date.getFullYear()}`
      : `${date.toLocaleString("en-US", { month: "short" })} ${formatWithSuffix(
          date.getDate()
        )}, ${date.getFullYear()}`;

  const calculateDurationMonths = (start: Date, end: Date): number => {
    return (
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth())
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: odd % 2 === 1 ? 1000 : -1000 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      exit={{ opacity: 0, y: 50 }}
      viewport={{ once: false }}
      className="p-10 rounded-xl"
    >
      <div className="flex flex-col items-center text-center gap-6">
        {head && (
          <div>
            <h2 className="text-5xl font-extrabold">
              {lang === "mn" ? `ТУРШЛАГА` : `EXPERIENCE`}
            </h2>
            <p className="text-lg bg-gradient-to-r from-purple-500 to-red-900 bg-clip-text text-transparent tracking-[.25rem]">
              {lang === "mn" ? `Кофигоо битгий мартаарай!` : `EXPLORE NOW`}
            </p>
          </div>
        )}

        <div className="w-full md:w-1/2 text-left flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="text-lg font-semibold">
              Junior Software Engineer
            </div>
            <div className="text-xs flex flex-col gap-1 font-bold sm:text-right">
              <div>
                {formatDate(exp.startAt, lang === "mn")} →{" "}
                {exp.present ? (
                  <span className="text-red-500 animate-pulse">
                    {formatDate(today, lang === "mn")}{" "}
                    <span className="text-foreground">
                      ({lang === "mn" ? "Өнөөдөр" : "Today"})
                    </span>
                  </span>
                ) : (
                  <span className="text-green-500">
                    {formatDate(exp.endedAt, lang === "mn")}{" "}
                    <span className="text-foreground">
                      (
                      {lang === "mn"
                        ? `${calculateDurationMonths(
                            exp.startAt,
                            exp.endedAt
                          )} -н сарын турш`
                        : `for ${calculateDurationMonths(
                            exp.startAt,
                            exp.endedAt
                          )} months`}
                      )
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-xl font-light leading-relaxed">
            {lang === "mn" ? exp.description_mn : exp.description_en}
          </p>
          {head && (
            <div className="flex flex-wrap gap-3">
              {languages.map((language) => (
                <span
                  key={language}
                  className="border bg-background px-3 py-1 rounded-full text-xs text-foreground border-purple-400 hover:bg-purple-100 hover:text-background transition-colors cursor-help"
                >
                  {language}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
