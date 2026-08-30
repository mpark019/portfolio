import Link from "next/link";

const links = [
  { href: "https://www.linkedin.com/in/matthew-park-b98ba1292/", label: "LinkedIn" },
  { href: "https://github.com/mpark019", label: "GitHub" },
];

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-200 py-6 dark:border-zinc-800">
      <nav aria-label="External links" className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 ml-auto">
        {links.map((link) => (
          <a className="transition-colors hover:text-zinc-950 dark:hover:text-zinc-50" href={link.href} key={link.href} rel="noreferrer" target="_blank">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
