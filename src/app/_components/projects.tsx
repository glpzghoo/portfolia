import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Card from "./project-card";
import { MouseEventHandler, ReactNode, Ref } from "react";
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
    <motion.div
      initial={{ opacity: 0, x: 1000 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      exit={{ opacity: 0, y: 50 }}
      viewport={{ once: false }}
      className="p-10 rounded-lg shadow-lg"
    >
      <div className={` items-center text-center flex flex-col gap-10`}>
        <div className="flex flex-col  gap-7">
          <div className={`text-5xl font-extrabold`}>
            {lang === "mn" ? `Төслүүд` : `Projects`}
          </div>
          <div className=" text-xs">
            Зарим төсөл ашиглах/шалгах боломжгүй. Серверийн төлбөрөөс болоод :|
          </div>
        </div>
        {/* project carsd */}
        <div className="flex justify-center gap-5">
          <button onClick={handleLeft}>
            <FaArrowLeft />
          </button>
          <div
            ref={scrolling}
            className="flex overflow-hidden h-[340px] flex-wrap whitespace-nowrap w-2/3 box-content flex-col gap-4"
          >
            {/* single card */}
            {projects.map((project) => (
              <Card key={project.name} project={project} />
            ))}
          </div>
          <button onClick={handleRight}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
