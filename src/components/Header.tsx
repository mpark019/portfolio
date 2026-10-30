"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigationLinks = [
  { href: "/projects", label: "projects" },
  { href: "/matthew-park-resume.pdf", label: "resume"}
];

export function Header() {
  const pathname = usePathname();
  const [highlight, setHighlight] = useState({ left: 0, width: 0, visible: false });
  const isProjectsPage = pathname === "/projects" || pathname.startsWith("/projects/");

  function highlightLink(link: HTMLAnchorElement) {
    setHighlight({ left: link.offsetLeft, width: link.offsetWidth, visible: true });
  }

  return (
    <header className="flex items-center justify-between py-6">
      <Link aria-current={pathname === "/" ? "page" : undefined} className={`px-3 py-1.5 font-mono text-sm transition-colors hover:bg-[#2a1b14] hover:text-[#ffd0ad] ${pathname === "/" ? "text-[#ffd0ad]" : "text-[#ded1c8]"}`} href="/">
        home
      </Link>
      <nav
        aria-label="Main navigation"
        className="relative isolate flex flex-nowrap justify-end gap-2 whitespace-nowrap font-mono text-sm"
        onMouseLeave={(event) => {
          const focusedLink = event.currentTarget.querySelector<HTMLAnchorElement>("a:focus-visible");
          if (focusedLink) highlightLink(focusedLink);
          else setHighlight((current) => ({ ...current, visible: false }));
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            const hoveredLink = event.currentTarget.querySelector<HTMLAnchorElement>("a:hover");
            if (hoveredLink) highlightLink(hoveredLink);
            else setHighlight((current) => ({ ...current, visible: false }));
          }
        }}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 -z-10 bg-[#2a1b14] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${highlight.visible ? "transition-[transform,width,opacity]" : "transition-opacity"}`}
          style={{
            width: highlight.width,
            transform: `translateX(${highlight.left}px)`,
            opacity: highlight.visible ? 1 : 0,
          }}
        />
        {navigationLinks.map((link) => (
          <a
            className={`px-3 py-1.5 transition-colors duration-200 hover:text-[#ffd0ad] focus-visible:text-[#ffd0ad] motion-reduce:transition-none ${link.href === "/projects" && isProjectsPage ? "text-[#ffd0ad]" : "text-[#ded1c8]"}`}
            href={link.href}
            key={link.href}
            aria-current={link.href === "/projects" && isProjectsPage ? "location" : undefined}
            onMouseEnter={(event) => highlightLink(event.currentTarget)}
            onFocus={(event) => highlightLink(event.currentTarget)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
