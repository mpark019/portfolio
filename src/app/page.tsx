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
        <h1 className="font-mono text-5xl font-bold tracking-[-0.08em] sm:text-7xl" id="intro-heading">
          matthew park
        </h1>
        <div className="mt-9 space-y-5 font-mono text-xl leading-8 text-[#e38b5b] sm:text-2xl sm:leading-9">
          <p>
            i&apos;m a computer science student at{" "}
            <a className="text-[#f0a06b] underline decoration-1 underline-offset-4 transition-colors hover:text-[#ffd0ad]" href="https://www.ucf.edu" rel="noreferrer" target="_blank">
              ucf
            </a>
            . i previously worked as a software engineering intern at{" "}
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
              href="https://www.miraiarcade.com"
              rel="noreferrer"
              target="_blank"
            >
              mirai arcade
            </a>{""}.
          </p>
          <p>i like building software that is reliable, useful, and a little easier to operate.</p>
        </div>
      </section>

      <section aria-labelledby="interests-heading" className="mt-14 scroll-mt-10 sm:mt-16" id="interests">
        <p className="font-mono text-sm text-[#b86c45]">i&apos;m broadly interested in:</p>
        <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-3 font-mono text-lg text-[#e38b5b]">
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
        <p className="font-mono text-sm text-[#b86c45]">contact</p>
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 font-mono text-lg">
          <a className="text-[#f0a06b] underline decoration-1 underline-offset-4 transition-colors hover:text-[#ffd0ad]" href="mailto:mjpark019@gmail.com">email</a>
          <a className="text-[#f0a06b] underline decoration-1 underline-offset-4 transition-colors hover:text-[#ffd0ad]" href="https://github.com/mpark019" rel="noreferrer" target="_blank">github ↗</a>
          <a className="text-[#f0a06b] underline decoration-1 underline-offset-4 transition-colors hover:text-[#ffd0ad]" href="https://www.linkedin.com/in/matthew-park-b98ba1292/" rel="noreferrer" target="_blank">linkedin ↗</a>
        </div>
      </section>
    </main>
  );
}
