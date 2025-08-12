import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function AnimatedUnit({ value }: { value: number }) {
  const digits = Math.max(2, value.toString().length);
  return (
    <span style={{ display: "inline-block", minWidth: `${digits}ch` }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.22 }}
          style={{ display: "inline-block" }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function TimeNow() {
  const [now, setNow] = useState(() => new Date());
  const birth = useMemo(() => new Date("1998-11-23T02:20:02"), []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const nextBirthday = new Date(
    now.getFullYear(),
    birth.getMonth(),
    birth.getDate(),
    birth.getHours(),
    birth.getMinutes(),
    birth.getSeconds()
  );
  if (nextBirthday <= now) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  const age = nextBirthday.getFullYear() - birth.getFullYear() - 1;

  const diffMs = nextBirthday.getTime() - now.getTime();
  const totalSeconds = Math.floor(diffMs / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  return (
    <div
      style={{
        fontSize: "2rem",
        fontVariantNumeric: "tabular-nums",
        display: "flex",
        gap: "0.5rem",
        alignItems: "baseline",
        flexWrap: "wrap",
      }}
    >
      <AnimatedUnit value={age} /> <span>нас</span>
      <AnimatedUnit value={days} /> <span>өдөр</span>
      <AnimatedUnit value={hours} /> <span>цаг</span>
      <AnimatedUnit value={minutes} /> <span>минут</span>
      <AnimatedUnit value={seconds} /> <span>секунд</span>
    </div>
  );
}
