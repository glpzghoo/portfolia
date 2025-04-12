import { motion } from "framer-motion";
import { ReactNode } from "react";
type Props = {
  children: ReactNode;
  lang: string;
};
export function Aboutme({ children, lang }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 1000 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      exit={{ opacity: 0, y: 50 }}
      viewport={{ once: false }}
      className="p-10 rounded-lg shadow-lg"
    >
      <div className={` items-center text-center flex flex-col gap-4`}>
        <div>
          <div className={`text-5xl font-extrabold`}>
            {lang === "mn" ? `МИНИЙ ТУХАЙ` : `ABOUT ME`}
          </div>
          <div className={` text-lg flex justify-center`}>
            <p className="bg-gradient-to-r from-purple-500 to-red-900 bg-clip-text text-transparent tracking-[.25rem]">
              {lang === "mn"
                ? `Тухлан сууж байгаад уншиж танилцаарай!`
                : `EXPLORE NOW`}
            </p>
          </div>
        </div>
        <div className="flex w-1/2">
          <p className="font-light">{children}</p>
        </div>
      </div>
    </motion.div>
  );
}
