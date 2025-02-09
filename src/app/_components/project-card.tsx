import Image from "next/image";
import Link from "next/link";
type project = {
  name: string;
  img: string;
  desc: string;
  link: string;
};
type Props = {
  project: project;
};
export default function Card({ project }: Props) {
  return (
    <div className="w-[540px] h-32 flex justify-start gap-6 items-center">
      <Image
        src={`${project.img}`}
        alt="project-pic"
        width={250}
        height={125}
      />
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
