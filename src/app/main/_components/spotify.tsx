"use client";

import { motion } from "framer-motion";

const tracks = [
  {
    id: "3KkXRkHbMCARz0aVfEt68P",
    title: "Sunflower - Post Malone, Swae Lee",
  },
  {
    id: "6dOtVTDdiauQNBQEDOtlAB",
    title: "Birds of a feather - Billie Eilish",
  },
  {
    id: "2CPqh63wRVscbceKcPxwvv",
    title: "Ocean - Shy Martin",
  },
  {
    id: "4yHmlSDd7aPGzA595lv0hT",
    title: "High Enough - Justin Caruso (Tomatow Remix)",
  },
  {
    id: "1YGChO6kNjPN5SYBkYCa08",
    title: "Hari Garigiin Ohin - Ahuna",
  },
];

export default function Spotify() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      exit={{ opacity: 0, y: 50 }}
      viewport={{ once: false }}
      className="p-10 rounded-2xl   flex justify-center w-full flex-wrap gap-6"
    >
      {tracks.map(({ id, title }) => (
        <iframe
          key={id}
          style={{ borderRadius: "12px" }}
          src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`}
          width="100%"
          height="152"
          className="max-w-md"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={`Spotify Embed: ${title}`}
        ></iframe>
      ))}
    </motion.section>
  );
}
