import { motion } from "framer-motion";

export default function Spotify() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      exit={{ opacity: 0, y: 50 }}
      viewport={{ once: false }}
      className="p-10 rounded-lg shadow-lg flex justify-center w-full flex-wrap gap-6"
    >
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/track/3KkXRkHbMCARz0aVfEt68P?utm_source=generator"
        width="40%"
        height="352"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Embed"
      ></iframe>
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/track/2CPqh63wRVscbceKcPxwvv?utm_source=generator"
        width="40%"
        height="352"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Embed"
      ></iframe>
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/track/4yHmlSDd7aPGzA595lv0hT?utm_source=generator"
        width="40%"
        height="352"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Embed"
      ></iframe>
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/track/1YGChO6kNjPN5SYBkYCa08?utm_source=generator"
        width="40%"
        height="352"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Embed"
      ></iframe>
    </motion.div>
  );
}
