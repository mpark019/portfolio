import Link from "next/link";

export default function Projects() {
  return (
    <main className="max-w-4xl pb-20 pt-12 font-mono sm:pt-16">
      <h1 className="text-4xl font-bold text-[#f0a06b] sm:text-6xl">projects</h1>
      <article className="mt-10 border border-[#49352a] p-5 sm:p-7">
        <h2 className="text-2xl font-semibold text-[#f0a06b]"><Link className="hover:text-[#ffd0ad]" href="/projects/mirai-arcade">mirai inventory management system ↗</Link></h2>
        <p className="mt-3 max-w-2xl text-lg leading-8">an event-driven inventory system for mirai arcade that helps staff track stock, plan restocks, and respond to low-stock alerts.</p>
        <p className="mt-4 text-sm text-[#c8b5a8]">next.js · spring boot · postgresql · kafka · python</p>
      </article>
    </main>
  );
}
