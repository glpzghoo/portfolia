"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/main`);
  }, [router]);
  return <div></div>;
}
