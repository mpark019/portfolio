const navigationLinks = [
  { href: "/projects", label: "projects" },
  { href: "/matthew-park-resume.pdf", label: "resume"}
];

export function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <Link className="px-3 py-1.5 font-mono text-sm transition-colors hover:bg-[#2a1b14] hover:text-[#ffd0ad]" href="/">
        home
      </Link>
      <nav aria-label="Main navigation" className="flex flex-nowrap justify-end gap-2 whitespace-nowrap font-mono text-sm">
        {navigationLinks.map((link) => (
          <a className="px-3 py-1.5 transition-colors hover:bg-[#2a1b14] hover:text-[#ffd0ad]" href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
import Link from "next/link";
