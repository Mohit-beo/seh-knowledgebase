import Link from "next/link";
import { User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-primary font-semibold text-lg">
          School Education Haryana
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/kb">Knowledgebase</Link>
          <Link href="/formats">Formats</Link>
          <Link href="/forum">Forum</Link>
          <Link href="/ai">AI Help</Link>
<Link href="/auth/signup" className="text-sm text-accent">
  Register
</Link>

          <button className="flex items-center gap-2 text-sm border px-3 py-1 rounded-md">
            <User size={16} /> <Link href="/auth/login" className="text-sm text-accent">
  Login
</Link>
          </button>
        </div>
      </div>
    </header>
  );
}
