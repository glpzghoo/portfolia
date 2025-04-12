import Image from "next/image";
import Link from "next/link";

type Props = {
  project: project;
};
type project = {
  name: string;
  img: string;
  desc: string;
  link: string;
  operable: boolean;
};
export default function Card({ project }: Props) {
  return (
    <div className=" w-[540px] h-32 flex gap-6 items-center relative">
      <Image
        src={`${project.img}`}
        alt="project-pic"
        width={250}
        height={125}
      />

      <div
        className={`absolute top-2 text-xs left-0 px-5 ${
          project.operable ? `bg-green-500` : `bg-red-500`
        }  rounded-xl`}
      >
        {project.operable ? `Боломжтой` : `Боломжгүй`}
      </div>
      <div className="text-start">
        <Link target="blank" href={`${project.link}`}>
          <h1 className="text-2xl font-extrabold">{project.name}</h1>
        </Link>
        <p className="font-extralight text-xs truncate text-wrap">
          {project.desc}
        </p>
      </div>
    </div>
  );
}
