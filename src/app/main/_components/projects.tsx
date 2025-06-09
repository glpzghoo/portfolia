import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Card from "./project-card";
import { MouseEventHandler, Ref, ReactNode } from "react";
import { projects } from "@/lib/data";

type Props = {
  handleLeft: MouseEventHandler<HTMLButtonElement>;
  handleRight: MouseEventHandler<HTMLButtonElement>;
  scrolling: Ref<HTMLDivElement>;
  children?: ReactNode;
  lang: string;
};

export function Project({ handleLeft, handleRight, scrolling, lang }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, x: 300 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      exit={{ opacity: 0, y: 50 }}
      viewport={{ once: false, amount: 0.3 }}
      className="p-10 rounded-2xl "
    >
      <div className="flex flex-col items-center text-center gap-10">
        <div className="flex flex-col gap-3">
          <h2 className="text-5xl font-extrabold">
            {lang === "mn" ? "Төслүүд" : "Projects"}
          </h2>
          <p className="text-sm text-muted-foreground max-w-md">
            {lang === "mn"
              ? "Зарим төсөл ашиглах/шалгах боломжгүй. Серверийн төлбөрөөс болоод :|"
              : "Some projects may be offline due to server costs 😅"}
          </p>
        </div>

        <div className="flex items-center gap-4 w-full justify-center">
          <button
            onClick={handleLeft}
            className="p-2 rounded-full border hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
          >
            <FaArrowLeft />
          </button>

          <div
            ref={scrolling}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-2 py-4 w-full max-w-6xl scrollbar-hide"
          >
            {projects.map((project) => (
              <div key={project.name} className="snap-start flex-shrink-0">
                <Card project={project} />
              </div>
            ))}
          </div>

          <button
            onClick={handleRight}
            className="p-2 rounded-full border hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
