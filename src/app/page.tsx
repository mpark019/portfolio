const interests = [
  "rock climbing",
  "gaming",
  "traveling",
  "eating",
];

export default function Home() {
  return (
    <main className="max-w-4xl pb-12 pt-12 sm:pb-16 sm:pt-16">
      <section aria-labelledby="intro-heading" className="max-w-3xl" id="home">
        <h1 className="font-mono text-5xl font-bold tracking-[-0.08em] text-[#f0a06b] sm:text-7xl" id="intro-heading">
          matthew park
        </h1>
        <div className="mt-9 max-w-2xl space-y-5 font-mono text-lg leading-7 sm:text-xl sm:leading-8">
          <p>
            i&apos;m a computer science student at{" "}
            <a className="text-[#f0a06b] underline decoration-1 underline-offset-4 transition-colors hover:text-[#ffd0ad]" href="https://www.ucf.edu" rel="noreferrer" target="_blank">
              ucf
            </a>
            {" "}who enjoys understanding how things work and finding ways to improve them.
          </p>
          <p>
            i&apos;m particularly interested in building reliable, useful software. i&apos;ve explored that interest through my experience as a software engineering intern at{" "}
            <a
              className="text-[#f0a06b] underline decoration-1 underline-offset-4 transition-colors hover:text-[#ffd0ad]"
              href="https://www.bny.com"
              rel="noreferrer"
              target="_blank"
            >
              bny
            </a>{" "}
            and a software developer at{" "}
            <a
              className="text-[#f0a06b] underline decoration-1 underline-offset-4 transition-colors hover:text-[#ffd0ad]"
              href="/projects/mirai-arcade"
            >
              mirai arcade
            </a>.
          </p>
        </div>
      </section>

      <section aria-labelledby="interests-heading" className="mt-14 scroll-mt-10 sm:mt-16" id="interests">
        <p className="font-mono text-sm text-[#f0a06b]">i&apos;m interested in:</p>
        <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-3 font-mono text-base sm:text-lg">
          {interests.map((interest) => (
            <li key={interest}>
              {interest === "gaming" ? (
                <a className="transition-colors hover:text-[#ffd0ad]" href="/gaming">
                  /{interest} ↗
                </a>
              ) : interest === "eating" ? (
                <a
                  className="transition-colors hover:text-[#ffd0ad]"
                  href="https://beliapp.co/app/mjpark019"
                  rel="noreferrer"
                  target="_blank"
                >
                  /{interest} ↗
                </a>
              ) : (
                `/${interest}`
              )}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="contact-heading" className="mt-14 scroll-mt-10 sm:mt-16" id="contact">
        <p className="font-mono text-sm text-[#f0a06b]">contact</p>
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 font-mono text-base sm:text-lg">
          <a className="underline decoration-1 underline-offset-4 transition-colors hover:text-[#ffd0ad]" href="mailto:mjpark019@gmail.com">email</a>
          <a className="underline decoration-1 underline-offset-4 transition-colors hover:text-[#ffd0ad]" href="https://github.com/mpark019" rel="noreferrer" target="_blank">github ↗</a>
          <a className="underline decoration-1 underline-offset-4 transition-colors hover:text-[#ffd0ad]" href="https://www.linkedin.com/in/mjpark019/" rel="noreferrer" target="_blank">linkedin ↗</a>
        </div>
      </section>
    </main>
  );
}
