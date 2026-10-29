import Image from "next/image";
import Link from "next/link";

export default function MiraiArcade() {
  return (
    <main className="mx-auto max-w-3xl pb-20 pt-12 font-mono text-lg leading-8 sm:pt-16">
      <Link className="font-mono text-sm text-[#f0a06b] transition-colors hover:text-[#ffd0ad]" href="/projects">← back to projects</Link>
      <header className="mt-10 border-b border-[#49352a] pb-10">
        <h1 className="mt-4 font-mono text-4xl font-bold tracking-tight text-[#f0a06b] sm:text-5xl">mirai inventory management system</h1>
        <p className="mt-6 text-lg leading-8 sm:text-xl">an event-driven system that centralizes inventory tracking, supports restock planning, and sends low-stock alerts.</p>
        <p className="mt-5 text-[#ded1c8]">instead of reacting to stockouts, staff can use demand forecasts and reorder suggestions to plan ahead. forecasts update as inventory changes.</p>
        <p className="mt-6 font-mono text-sm text-[#ded1c8]">next.js · spring boot · postgresql · kafka · python</p>
        <video
          className="mt-5 h-auto w-full rounded-xl"
          src="/videos/mirai-demo.mp4"
          aria-label="Mirai inventory management system demo"
          controls
          playsInline
          preload="metadata"
        >
          <a href="/videos/mirai-demo.mp4">download the mirai demo video</a>
        </video>
      </header>

      <section className="mt-14" aria-labelledby="client">
        <h2 className="font-mono text-sm uppercase tracking-widest text-[#f0a06b]" id="client">the client</h2>
        <Image className="mt-5 h-auto w-full rounded-xl" src="/photos/mirai/mirai-client.webp" alt="Claw machines inside Mirai Arcade" width={5166} height={3590} sizes="(max-width: 768px) 100vw, 768px" />
        <p className="mt-5 leading-8"><a className="text-[#f0a06b] underline decoration-1 underline-offset-4 transition-colors hover:text-[#ffd0ad]" href="https://www.miraiarcade.com" rel="noreferrer" target="_blank">mirai arcade</a> is an arcade and collectibles shop with claw machines, prizes, and products stored in racks, cabinets, and bins. keeping stock accurate across these locations is essential to daily operations.</p>
        <p className="mt-4 leading-8">staff use the web app to manage a shared product catalog, update stock, transfer items, receive shipments, and review movement history. each physical site has its own inventory and locations.</p>
      </section>

      <section className="mt-14" aria-labelledby="architecture">
        <h2 className="font-mono text-sm uppercase tracking-widest text-[#f0a06b]" id="architecture">system design</h2>
        <Image className="mt-5 h-auto w-full rounded-xl" src="/photos/mirai/mirai-system.webp" alt="Diagram of the inventory API, Kafka events, forecasting service, and messaging service" width={1920} height={1080} sizes="(max-width: 768px) 100vw, 768px" />
        <p className="mt-5 leading-8">a Next.js frontend connects to a Spring Boot inventory API backed by PostgreSQL. the API handles catalog, stock, shipments, and access by staff role and site.</p>
        <p className="mt-4 leading-8">inventory changes publish events to Kafka. downstream Python services consume those events to refresh forecasts and send alerts through Slack.</p>
      </section>

      <section className="mt-14" aria-labelledby="forecasting">
        <h2 className="font-mono text-sm uppercase tracking-widest text-[#f0a06b]" id="forecasting">demand forecasting</h2>
        <Image className="mt-5 h-auto w-full rounded-xl" src="/photos/mirai/mirai-forecast.webp" alt="Diagram of the event-driven demand forecasting and restock alert flow" width={1920} height={1080} sizes="(max-width: 768px) 100vw, 768px" />
        <p className="mt-5 leading-8">the forecasting service combines inventory events with sales history to estimate future demand and calculate reorder quantities. forecasts appear in the analytics page, while low-stock conditions can trigger alerts for staff.</p>
      </section>

      <section className="mt-14" aria-labelledby="results">
        <h2 className="font-mono text-sm uppercase tracking-widest text-[#f0a06b]" id="results">results</h2>
        <p className="mt-5 leading-8">now used by 30+ staff, the rebuilt system responds faster and has reduced monthly costs by 50% compared with the previous system.</p>
        <p className="mt-4 leading-8">it supports daily operations across the team:</p>
        <ul className="mt-4 list-disc space-y-3 pl-6 leading-8">
          <li>employees manage stock updates, transfers, and shipments in one place.</li>
          <li>managers get a clearer view of stock levels and movement history.</li>
          <li>demand forecasts and low-stock alerts help staff plan restocks before items run out.</li>
        </ul>
      </section>
    </main>
  );
}
