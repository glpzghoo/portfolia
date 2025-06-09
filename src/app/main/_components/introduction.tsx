import { motion } from "framer-motion";
import Image from "next/image";
import { MouseEventHandler, ReactNode } from "react";
type Props = {
  handlecontact: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  lang: string;
};
export function Introduction({ handlecontact, children, lang }: Props) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -1000 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        exit={{ opacity: 0, y: 50 }}
        viewport={{ once: false }}
        className="p-10 rounded-lg shadow-lg"
      >
        <div className=" items-center flex flex-col w-[580px] gap-5 pt-56">
          <Image src={`/img/Me.svg`} width={231} height={231} alt="me" />
          <div className="justify-items-center">
            <div className="text-5xl font-extrabold">
              {lang === "mn" ? `Нэргүй Адъяахүү!` : `Nergui Adiyakhuu`}
            </div>
            <div className="text-2xl text-gray-400">
              i do code &
              <span className="bg-gradient-to-r from-purple-500 to-red-700 bg-clip-text text-transparent">
                {` `}
                chill
              </span>
              🍿
            </div>
          </div>
          <p className=" text-center">{children}</p>
          <button
            onClick={handlecontact}
            className="w-[187px] h-14 border rounded-full bg-background"
          >
            {lang === "mn" ? `Холбогдох` : `Contact`}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
