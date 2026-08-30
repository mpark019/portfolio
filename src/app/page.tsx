export default function Home() {
  return (
    <section className="max-w-4xl py-24 sm:py-32">
      <h1 className="font-mono text-5xl font-bold tracking-[-0.08em] sm:text-7xl">matthew park</h1>
      <div className="mt-10 space-y-8 font-mono text-xl leading-8 text-zinc-700 dark:text-zinc-300 sm:text-2xl sm:leading-9">
        <p>
          i&apos;m a computer science student at{" "}
          <a className="text-violet-700 underline decoration-1 underline-offset-4 transition-colors hover:text-violet-500 dark:text-violet-400" href="https://www.ucf.edu" rel="noreferrer" target="_blank">
            ucf
          </a>{" "}
          building full-stack and distributed software systems.
        </p>
        <p>
          prev 2x swe intern @{" "}
          <a className="text-violet-700 underline decoration-1 underline-offset-4 transition-colors hover:text-violet-500 dark:text-violet-400" href="https://www.bny.com" rel="noreferrer" target="_blank">
            bny
          </a>,{" "}
          prev software developer @ mirai arcade
        </p>
      </div>
    </section>
  );
}
