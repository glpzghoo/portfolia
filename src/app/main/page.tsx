"use client";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { Headers } from "../_components/header";
import { Introduction } from "../_components/introduction";
import { Aboutme } from "../_components/aboutme";
import { Experience } from "../_components/experience";
import { Project } from "../_components/projects";
import { Contact } from "../_components/contact";
import { Text } from "../_components/mobilesoon";
import { useRouter, useSearchParams } from "next/navigation";
import Spotify from "../_components/spotify";
import Link from "next/link";
export default function Home() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const router = useRouter();
  const scrolling = useRef<HTMLDivElement>(null);
  const aboutme = useRef<HTMLDivElement>(null);
  const contact = useRef<HTMLDivElement>(null);
  const goTop = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!lang || (lang !== "mn" && lang !== "en")) {
      router.replace(`/main?lang=mn`);
    }
  }, [lang, router]);
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
  // const handleChangeLang = () => {
  //   if (lang === "mn") {
  //     router.replace(``, undefined);
  //   } else {
  //     router.replace(`/main?lang=mn`);
  //   }
  // };
  return (
    <>
      {!lang ? (
        ""
      ) : (
        <div className=" hidden lg:block">
          <div
            onClick={handleGoTop}
            className="w-10 h-10 cursor-pointer  fixed left-10 bottom-10"
          >
            <FaArrowAltCircleUp className="text-4xl animate-bounce" />
          </div>
          <div
            ref={goTop}
            className="h-10 w-full flex justify-center box-border"
          >
            <Headers
              handleabout={handleabout}
              handlecontact={handlecontact}
              lang={lang}
            />
          </div>
          {lang === "mn" ? (
            <Link href={`/main?lang=en`} scroll={false}>
              <button className="fixed w-10 h-10 bottom-10 right-10">EN</button>
            </Link>
          ) : (
            <Link href={`/main?lang=mn`} scroll={false}>
              <button className="fixed w-10 h-10 bottom-10 right-10">MN</button>
            </Link>
          )}

          <div className=" w-full p-40 items-center justify-center flex flex-col gap-[600px]">
            <Introduction handlecontact={handlecontact} lang={lang}>
              {lang === "mn"
                ? `Би сонирхлоороо код бичдэг бөгөөд бичихдээ үнэхээр дуртай. Голчлон React, Next.js ашиглан хөгжүүлэлт хийдэг. Өдөр бүр шинэ зүйлсийг сурч, туршиж үзэхийг хүсдэг.`
                : `I'm passionate about coding and truly enjoy it. I mainly build with React and Next.js. Every day, I try to learn something new or experiment with different ideas.`}
            </Introduction>

            {/* About me */}
            <div
              ref={aboutme}
              tabIndex={0}
              className="flex justify-center flex-col"
            >
              <Aboutme lang={lang}>
                {lang === "mn"
                  ? `Би бол юм болгоныг туршиж үзэх дуртай нэгэн. Өөрөө бие даах чадвар сайн гэж боддог. Тийм
              ч учир би өөртөө англи хэл заан, тэрийгээ ч ашиглан бараг 2
              жилийг, канад "gaming streamer" -т youtube video засаж,
              хамтран ажилласан. Эцэст нь үргэлж боддог байсан Pinecone Academy
              -д, энэ бүх зүйлийг олон найрсан багш нар болон хамт олны ачаар
              сурж боловсрох боломж олдсон.`
                  : `I tried many different things. I'm good at
                    self-teaching. I taught myself English, video editing, basic
                    computer science, etc. I love all of them. Thankfully, I
                    started attending Pinecone Academy, where I met some of the
                    most helpful and wholesome people I have ever known. They
                    made everything I once thought impossible feel possible.`}
              </Aboutme>
              <div className="flex flex-col items-center text-2xl font-bold">
                <div className=" animate-pulse">
                  {lang === "mn"
                    ? `Уйтгартай дуунуудаасаа- `
                    : `My boring yet all-time favorite songs `}
                </div>
                <Spotify />
              </div>
            </div>
            {/* Experience */}
            <div>
              <Experience lang={lang}>
                {lang === "mn"
                  ? `Би Pinecone академид 6 сарын турш суралцаж төгссөн бөгөөд одоогоор дадлагын ажилд гарж байгаа болно. Энэ хугацаанд 5 жижиг, 1 дунд хэмжээний төслийг амжилттай гүйцэтгэсэн.`
                  : `I completed 6 months of training at Pinecone Academy and am currently working as an intern. During this time, I successfully completed 4 small projects and 1 medium-sized project.`}
              </Experience>
            </div>
            {/* Projects */}
            <div tabIndex={0}>
              <Project
                handleLeft={handleLeft}
                handleRight={handleRight}
                scrolling={scrolling}
                lang={lang}
              />
            </div>
            <div ref={contact} tabIndex={0} className="flex flex-col gap-10">
              <Contact>my.as.glpzghoo@gmail.com</Contact>
            </div>
          </div>
        </div>
      )}

      <Text>
        {lang === "mn"
          ? `Нэг л өдөр гар утсаар ордог болно доо. Нэг л өдөр!`
          : `I'm still working on the mobile version.`}
      </Text>
    </>
  );
}
