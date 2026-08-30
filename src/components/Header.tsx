const externalLinks = [
  { href: "https://www.linkedin.com/in/matthew-park-b98ba1292/", label: "linkedin" },
  { href: "https://github.com/mpark019", label: "github" },
  { href: "/MPARK_Resume.pdf", label: "resume"}
];

export function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <Link className="px-3 py-1.5 font-mono text-sm text-[#e38b5b] transition-colors hover:bg-[#2a1b14] hover:text-[#ffd0ad]" href="/">
        home
      </Link>
      <nav aria-label="External links" className="flex flex-wrap justify-end gap-2 font-mono text-sm text-[#e38b5b]">
        {externalLinks.map((link) => (
          <a className="px-3 py-1.5 text-[#b86c45] transition-colors hover:bg-[#2a1b14] hover:text-[#ffd0ad]" href={link.href} key={link.href} rel="noreferrer" target="_blank">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
import Link from "next/link";
