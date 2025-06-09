import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  lang: string;
};

export function Aboutme({ children, lang }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, x: 300 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      exit={{ opacity: 0, y: 50 }}
      viewport={{ once: false, amount: 0.3 }}
      className="p-10 rounded-2xl"
    >
      <div className="flex flex-col items-center text-center gap-6">
        <header>
          <h2 className="text-5xl font-extrabold">
            {lang === "mn" ? `МИНИЙ ТУХАЙ` : `ABOUT ME`}
          </h2>
          <p className="text-lg mt-2">
            <span className="bg-gradient-to-r from-purple-500 to-red-900 bg-clip-text text-transparent tracking-[.25rem]">
              {lang === "mn"
                ? `Тухлан сууж байгаад уншиж танилцаарай!`
                : `EXPLORE NOW`}
            </span>
          </p>
        </header>

        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
          <p className="font-light leading-relaxed text-foreground">
            {children}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
