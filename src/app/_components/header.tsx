import { TerminalIcon } from "@/components/ui/terminal";
import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";
import ThemeToggle from "./theme-toggle";
type Props = {
  handleabout: MouseEventHandler<HTMLDivElement>;
  handlecontact: MouseEventHandler<HTMLDivElement>;
  lang: string;
};
export function Headers({ handleabout, handlecontact, lang }: Props) {
  return (
    <div className="w-[90%] flex items-center p-9 pt-10 justify-around">
      <Link href={`/`}>
        <div className="flex items-center -space-x-4 sticky">
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
      <div className="flex gap-4 items-center">
        {/* button 1 */}
        <div
          onClick={handleabout}
          className="border-2 rounded-lg border-[#9A9A9A] px-4 whitespace-nowrap text-foreground h-[35px] content-center text-center text-sm cursor-pointer flex items-center"
        >
          <TerminalIcon lang={lang} />
        </div>
        {/* button 2 */}
        <div
          onClick={handlecontact}
          className=" rounded-lg bg-foreground  w-24 h-[35px] text-background content-center text-center text-sm cursor-pointer"
        >
          {lang === `mn` ? "Холбогдох" : "Contact"}
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}
