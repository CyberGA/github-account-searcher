import Image from "next/image";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-white z-50">
      <div className="flex items-center justify-between gap-2 w-full max-w-6xl py-4 mx-auto px-6 sm:px-10 md:px-16 text-primary-100">
        <Link href="/" className="rounded-full border-2 border-primary-100 p-2">
          <Image
            src="/brand-icon.svg"
            alt="Brand Icon"
            width={40}
            height={40} className="object-contain w-7 h-7 md:w-10 md:h-10 duration-300"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
