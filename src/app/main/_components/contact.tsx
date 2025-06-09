import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export function Contact({ children }: { children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, x: 300 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      exit={{ opacity: 0, y: 50 }}
      viewport={{ once: false, amount: 0.3 }}
      className="p-10 rounded-2xl flex flex-col items-center gap-6"
    >
      <Link
        target="_blank"
        href="https://github.com/glpzghoo"
        className="flex flex-col items-center hover:scale-105 transition-transform duration-300"
      >
        <Image
          src="/img/github.svg"
          alt="GitHub"
          width={100}
          height={100}
          className="mb-2"
        />
        <div className="text-2xl font-semibold">My GitHub</div>
      </Link>
      <div className="text-xl text-center">
        Email:{" "}
        <Link
          href="mailto:my.as.glpzghoo@gmail.com"
          className="text-blue-600 hover:underline"
        >
          {children}
        </Link>
      </div>
    </motion.section>
  );
}
