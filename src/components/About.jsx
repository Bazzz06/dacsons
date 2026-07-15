import Reveal from './ui/Reveal'
import Counter from './ui/Counter'

const people = [
  {
    n: '01',
    name: 'Jacky Caillé',
    role: 'Le père, expert-comptable',
    years: 35,
    line: 'La rigueur comptable et le sens du temps long.',
  },
  {
    n: '02',
    name: 'Basile Caillé',
    role: 'Consultant & expert logiciel',
    years: 10,
    line: "Le conseil et la technologie, au service de l'exécution.",
  },
  {
    n: '03',
    name: 'Théo Caillé',
    role: 'Expert financier, fusions-acquisitions',
    years: 10,
    line: "La finance d'entreprise et les opérations de croissance.",
  },
]

export default function About() {
  return (
    <section
      id="about"
      data-theme="dark"
      className="relative px-6 py-28 text-paper md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-14 max-w-3xl md:mb-20">
          <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-sky">
            <span className="martini-bars h-3 w-10 rounded-sm" />
            À propos
          </p>
          <h2 className="font-display text-4xl leading-[1.04] tracking-tightest md:text-6xl">
            Une histoire familiale.
          </h2>
          <p className="mt-6 text-lg text-paper/70 md:text-xl">
            Un père, deux fils. Des expertises qui se répondent autour d'une même table, avec une
            même exigence.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mb-16 md:mb-24">
          <p className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <span className="font-display text-8xl leading-none tracking-tightest text-paper md:text-[11rem]">
              <Counter to={55} />+
            </span>
            <span className="max-w-[220px] text-base leading-snug text-paper/55 md:text-lg">
              années d'expérience cumulée au service de votre croissance
            </span>
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {people.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.1}>
              <article className="group h-full rounded-xl border border-paper/10 bg-paper/[0.03] p-6 transition-colors duration-500 hover:border-paper/25 md:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-display text-sm text-paper/40">{p.n}</span>
                  <span className="martini-bars h-2 w-12 rounded-sm opacity-90" />
                </div>
                <h3 className="font-display text-2xl">{p.name}</h3>
                <p className="mt-1.5 text-sm text-sky">{p.role}</p>
                <p className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-4xl text-paper">
                    <Counter to={p.years} />+
                  </span>
                  <span className="text-sm text-paper/50">ans d'expérience</span>
                </p>
                <p className="mt-4 text-sm text-paper/55">{p.line}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
