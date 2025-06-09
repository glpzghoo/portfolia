import { TerminalIcon } from "@/components/ui/terminal";
import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";
import { motion } from "framer-motion";

type Props = {
  handleabout: MouseEventHandler<HTMLButtonElement>;
  handlecontact: MouseEventHandler<HTMLButtonElement>;
  lang: string;
};

export function Headers({ handleabout, handlecontact, lang }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[90%] flex flex-col sm:flex-row sm:items-center sm:justify-around p-9 pt-10 gap-6 sm:gap-0"
    >
      <Link href={`/`}>
        <div className="flex items-center -space-x-4 hover:scale-105 transition-transform duration-300">
          <div>
            <Image
              src={`/img/my-logo.png`}
              width={100}
              height={100}
              alt="my logo"
            />
          </div>
          <div className="flex flex-col items-end">
            <div className="font-extrabold text-xl">adiyakhuu</div>
            <div className="text-sm text-muted-foreground">nergui</div>
          </div>
        </div>
      </Link>
      <div className="flex gap-4">
        <button
          onClick={handleabout}
          className="border-2 rounded-lg border-[#9A9A9A] px-4 h-[35px] text-sm text-foreground flex items-center justify-center whitespace-nowrap hover:bg-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
        >
          <TerminalIcon lang={lang} />
        </button>
        <button
          onClick={handlecontact}
          className="rounded-lg bg-foreground w-24 h-[35px] text-background text-sm hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
        >
          {lang === `mn` ? "Холбогдох" : "Contact"}
        </button>
      </div>
    </motion.div>
  );
}
