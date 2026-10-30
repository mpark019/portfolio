import Image from "next/image";
import Link from "next/link";

export default function MiraiArcade() {
  return (
    <main className="mx-auto max-w-3xl pb-20 pt-12 font-mono text-base leading-normal sm:pt-16 sm:text-lg sm:leading-normal">
      <Link className="font-mono text-sm text-[#f0a06b] transition-colors hover:text-[#ffd0ad]" href="/projects">← back to projects</Link>
      <header className="mt-10 border-b border-[#49352a] pb-10">
        <h1 className="mt-4 font-mono text-4xl font-bold tracking-tight text-[#f0a06b] sm:text-5xl">mirai inventory management system</h1>
        <p className="mt-6 text-base leading-normal sm:text-xl sm:leading-normal">a full-stack inventory management system built for mirai arcade, replacing its previous system with a faster, more cost-efficient solution.</p>
        <p className="mt-5 text-[#ded1c8]">the system centralizes inventory operations, uses event-driven services to update demand forecasts, and automates low-stock alerts to help staff plan restocks and analyze product trends.</p>
        <p className="mt-6 font-mono text-sm text-[#ded1c8]">next.js · spring boot · postgresql · kafka · python</p>
        <video
          className="mt-5 h-auto w-full rounded-xl"
          src="/projects/mirai/mirai-demo.mp4"
          poster="/projects/mirai/mirai-demo-poster.jpg"
          aria-label="Mirai inventory management system demo"
          controls
          playsInline
          preload="metadata"
        >
          <a href="/projects/mirai/mirai-demo.mp4">download the mirai demo video</a>
        </video>
      </header>

      <section className="mt-14" aria-labelledby="client">
        <h2 className="font-mono text-sm uppercase tracking-widest text-[#f0a06b]" id="client">the client</h2>
        <Image className="mt-5 h-auto w-full rounded-xl" src="/projects/mirai/mirai-client.webp" alt="Claw machines inside Mirai Arcade" width={5166} height={3590} sizes="(max-width: 768px) 100vw, 768px" />
        <p className="mt-5"><a className="text-[#f0a06b] underline decoration-1 underline-offset-4 transition-colors hover:text-[#ffd0ad]" href="https://www.miraiarcade.com" rel="noreferrer" target="_blank">mirai arcade</a> is an arcade and collectibles shop managing over 1,200 products across 11 types of storage locations, including claw machines, racks, cabinets, and bins. with hundreds of inventory updates made daily, maintaining accurate stock information is essential to operations.</p>
        <p className="mt-4">the previous system faced performance and scalability limitations as inventory operations grew. the rebuilt web app provides a centralized place for staff to manage products, update stock, transfer items, receive shipments, and review movement history across physical sites.</p>
      </section>

      <section className="mt-14" aria-labelledby="architecture">
        <h2 className="font-mono text-sm uppercase tracking-widest text-[#f0a06b]" id="architecture">system design</h2>
        <Image className="mt-5 h-auto w-full rounded-xl" src="/projects/mirai/mirai-system.webp" alt="Diagram of the inventory API, Kafka events, forecasting service, and messaging service" width={1920} height={1080} sizes="(max-width: 768px) 100vw, 768px" />
        <p className="mt-5">the system uses a next.js frontend connected to a spring boot inventory api backed by postgresql. the api handles product management, inventory transactions, shipments, and role-based access across physical sites.</p>
        <p className="mt-4">to support frequent inventory changes without blocking core operations, the backend publishes events to kafka. downstream python services consume these events to update demand forecasts and deliver low-stock alerts through slack.</p>
      </section>

      <section className="mt-14" aria-labelledby="forecasting">
        <h2 className="font-mono text-sm uppercase tracking-widest text-[#f0a06b]" id="forecasting">demand forecasting</h2>
        <Image className="mt-5 h-auto w-full rounded-xl" src="/projects/mirai/mirai-forecast.webp" alt="Diagram of the event-driven demand forecasting and restock alert flow" width={1920} height={1080} sizes="(max-width: 768px) 100vw, 768px" />
        <p className="mt-5">the forecasting service consumes inventory events from kafka, validates and batches them, then combines them with historical sales data to analyze demand trends and calculate suggested reorder quantities. updated forecasts are stored in postgresql and displayed in the analytics dashboard.</p>
        <p className="mt-4">when stock falls below a threshold, the messaging service sends automated restock alerts through slack, helping staff plan ahead and prevent stockouts.</p>
      </section>

      <section className="mt-14" aria-labelledby="results">
        <h2 className="font-mono text-sm uppercase tracking-widest text-[#f0a06b]" id="results">results</h2>
        <p className="mt-5">the rebuilt system now supports 30+ employees managing over 1,200 products and hundreds of daily inventory updates. compared with the previous system, it delivers 10x faster response times and reduced monthly system costs by 50%.</p>
        <p className="mt-4">the system improves daily operations across the team:</p>
        <ul className="mt-4 list-disc space-y-3 pl-6">
          <li>employees manage inventory updates, transfers, and shipments through a centralized workflow.</li>
          <li>managers gain visibility into stock levels, inventory movement, and product demand.</li>
          <li>automated forecasts and low-stock alerts help staff plan restocks before products run out.</li>
        </ul>
      </section>
    </main>
  );
}
