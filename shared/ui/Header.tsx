import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full flex justify-center h-15 px-6 border-b border-slate-200">
      <div className="w-full max-w-300 flex justify-between items-center">
        <Link href="/">
          <div className="hidden sm:block">
            <Image
              src="/images/logo-lg.png"
              width={151}
              height={40}
              alt="logo"
            />
          </div>
          <div className="block sm:hidden">
            <Image
              src="/images/logo-sm.png"
              width={71}
              height={40}
              alt="logo"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
