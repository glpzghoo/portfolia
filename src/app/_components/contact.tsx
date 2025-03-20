import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
export function Contact({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 1000 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      exit={{ opacity: 0, y: 50 }}
      viewport={{ once: false }}
      className="p-10 rounded-lg shadow-lg"
    >
      <Link target="blank" href={`https://github.com/glpzghoo`}>
        <div className="justify-items-center">
          <Image
            src={`/img/github.svg`}
            alt="github"
            width={100}
            height={100}
          />

          <div className="text-2xl">My GitHub</div>
        </div>
      </Link>
      <div className="text-2xl">
        Email:{" "}
        <Link href={`mailto:my.as.glpzghoo@gmail.com`}>
          {/* my.as.glpzghoo@gmail.com */}
          {children}
        </Link>
      </div>
    </motion.div>
  );
}
