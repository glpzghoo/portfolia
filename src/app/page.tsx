"use client";

import { TypeAnimation } from "react-type-animation";
import TimeNow from "./_components/time";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <TypeAnimation
        sequence={[
          "юу байна! 👋",
          2000,
          "намайг адъяахүү гэдэг",
          15000,
          "одоо болтол байсаар л байна уу?",
          4000,
          "ммммм?",
          10000,
          "хммм...",
          10000,
          "тэгэхээр.... би 26-тай",
          4000,
          "мхмм",
          5000,
          "1727677800000",
        ]}
        wrapper="span"
        speed={50}
        style={{ fontSize: "3rem", display: "inline-block" }}
      />
      <TimeNow />
    </div>
  );
}
