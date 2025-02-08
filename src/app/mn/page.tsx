"use client";
import { Inter } from "next/font/google";
import Image from "next/image";
import Card from "../_components/project-card";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { project } from "../en/page";
const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const [projects, setProject] = useState<project[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const scrolling = useRef<HTMLDivElement>(null);
  const aboutme = useRef<HTMLDivElement>(null);
  const contact = useRef<HTMLDivElement>(null);
  const goTop = useRef<HTMLDivElement>(null);
  const handleLeft = () => {
    if (scrolling.current) {
      scrolling.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };
  const handleRight = () => {
    if (scrolling.current) {
      scrolling.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };
  const handleabout = () => {
    if (aboutme.current) {
      // aboutme.current.focus();
      aboutme.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const handlecontact = () => {
    if (contact.current) {
      // contact.current.focus();
      contact.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const handleGoTop = () => {
    goTop.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`/projects.json`);
        const data: project[] = await res.json();
        setProject(data);
      } catch (e) {
        console.error(e, "Project Oldsongui");
      }
    };
    fetchProjects();
  }, []);
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
  return (
    <>
      <div className=" hidden lg:block">
        <div
          onClick={handleGoTop}
          className="w-10 h-10 cursor-pointer  fixed left-10 bottom-10"
        >
          <FaArrowAltCircleUp className="text-4xl animate-bounce" />
        </div>
        <div ref={goTop} className="h-10 w-full flex justify-center box-border">
          <div className="w-[90%] flex items-center p-9 pt-10 justify-around">
            <Link href={`/`}>
              <div className="flex items-center -space-x-4">
                <div>
                  <Image
                    src={`/img/my-logo.png`}
                    width={100}
                    height={100}
                    alt="my logo"
                  />
                </div>
                <div className="flex flex-col items-end">
                  <div className=" font-extrabold text-xl">adiyakhuu</div>
                  <div className=" text-sm">nergui</div>
                </div>
              </div>
            </Link>
            <div className="flex gap-4">
              {/* button 1 */}
              <div
                onClick={handleabout}
                className="border-2 rounded-lg border-[#9A9A9A] text-foreground w-24 h-[35px] content-center text-center text-sm cursor-pointer"
              >
                About me
              </div>
              {/* button 2 */}
              <div
                onClick={handlecontact}
                className=" rounded-lg bg-foreground  w-24 h-[35px] text-background content-center text-center text-sm cursor-pointer"
              >
                Contact
              </div>
            </div>
          </div>
        </div>
        <Link href={`/en`} className="fixed w-10 h-10 bottom-10 right-10">
          EN
        </Link>
        <div className=" w-full p-40 items-center justify-center flex flex-col gap-[600px]">
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
                    Нэргүй Адъяахүү!
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
                <p className=" text-center">
                  Би сонирхлоорой код бичдэг. Бичихдээ ч маш их дуртай. Би
                  React, NextJS дээр кодлодог. Өдөр болгон шинэ зүйл сурж,
                  туршиж үзэх дуртай нэгэн
                </p>
                <button
                  onClick={handlecontact}
                  className="w-[187px] h-14 border rounded-full bg-background"
                >
                  Холбогдох
                </button>
              </div>
            </motion.div>
          </div>
          {/* About me */}
          <div ref={aboutme} tabIndex={0}>
            <motion.div
              initial={{ opacity: 0, x: 1000 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              exit={{ opacity: 0, y: 50 }}
              viewport={{ once: false }}
              className="p-10 rounded-lg shadow-lg"
            >
              <div
                className={`${inter.className} items-center text-center flex flex-col gap-4`}
              >
                <div>
                  <div className={`text-5xl font-extrabold`}>МИНИЙ ТУХАЙ</div>
                  <div className={` text-lg flex justify-center`}>
                    <p className="bg-gradient-to-r from-purple-500 to-red-900 bg-clip-text text-transparent tracking-[.25rem]">
                      Тухлан сууж байгаад уншиж танилцаарай!
                    </p>
                  </div>
                </div>
                <div className="flex w-1/2">
                  <p className="font-light">
                    Би бол юм болгоныг туршиж үзэх дуртай нэгэн. Намайг аль
                    багаас минь ухаалаг гэж хүмүүс дууддаг байсан ч би тэрийгээ
                    ашиглаж чаддаггүй байсан. 10 жилээ төгсөөд их сургуульд ч
                    явж чадаагүй яагаад гэвэл тэр хэмжээний боломжийн айлын
                    хүүхэд байгаагүй. Тийм ч учир би өөртөө англи хэл заан,
                    тэрийгээ ч ашиглан бараг 2 жилийг, канад &quot;gaming
                    streamer&quot; -т youtube video засаж, хамтран ажилласан.
                    Эцэст нь үргэлж боддог байсан Pinecone Academy -д, энэ бүх
                    зүйлийг олон найрсан багш нар болон хамт олны ачаар сурж
                    боловсрох боломж олдсон.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Experience */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -1000 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              exit={{ opacity: 0, y: 50 }}
              viewport={{ once: false }}
              className="p-10 rounded-lg shadow-lg"
            >
              <div
                className={`${inter.className} items-center text-center flex flex-col gap-4`}
              >
                <div>
                  <div>
                    <div className={`text-5xl font-extrabold`}>ТУРШЛАГА</div>
                    <div className={` text-lg flex justify-center`}>
                      <p className="bg-gradient-to-r  from-purple-500 to-red-900 bg-clip-text text-transparent tracking-[.25rem]">
                        Кофигоо битгий мартаарай!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between">
                      <div className="">Junior Software Engineer</div>
                      <div className="font-extralight text-xs">
                        9 2024 - Одоо ({date.getMonth()}, {date.getFullYear()})
                      </div>
                    </div>
                    <p className="text-xl font-light">
                      Яг одоогоор би Pinecone сурж байгаа, Сураад 5дах сар
                      дээрээ явж байгаа болно. Би 5дах төслөө дуусгасан бөгөөд,
                      суртлаа илүү ихийг сурахыг хичээж байгаа болно.
                    </p>
                    <div className="flex flex-wrap whitespace-nowrap gap-3">
                      {languages.map((language) => (
                        <button
                          key={language}
                          className="border bg-background px-2 py-1 rounded-full text-sm gradient-border"
                        >
                          {language}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Projects */}
          <div>
            <div
              className={`${inter.className} items-center text-center flex flex-col gap-10`}
            >
              <div>
                <div className={`text-5xl font-extrabold`}>Төслүүд</div>
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
          </div>
          <div ref={contact} tabIndex={0} className="flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, x: 1000 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              exit={{ opacity: 0, y: 50 }}
              viewport={{ once: false }}
              className="p-10 rounded-lg shadow-lg"
            >
              <Link target="blank" href={`https://github.com/adiyakhuu1`}>
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
                  my.as.glpzghoo@gmail.com
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="lg:hidden fixed transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        Нэг л өдөр гар утсаар ордог болно доо. Нэг л өдөр!
      </div>
    </>
  );
}
