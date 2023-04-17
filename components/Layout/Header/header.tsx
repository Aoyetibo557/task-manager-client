import Link from "next/link";

const Header = () => {
  return (
    <div className={`border-b-[0.9px] border-neutral-200 p-5 text-center`}>
      <Link
        href="/"
        className="bebas-neue-font text-5xl font-light text-task-blue">
        Tassker
      </Link>
    </div>
  );
};

export default Header;
