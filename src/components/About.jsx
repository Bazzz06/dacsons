import Reveal from './ui/Reveal'

const people = [
  {
    initials: 'JC',
    name: 'Jacky Caillé',
    role: 'Le père — Expert-comptable',
    line: 'La rigueur comptable et le sens du temps long.',
  },
  {
    initials: 'BC',
    name: 'Basile Caillé',
    role: 'Consultant & expert logiciel',
    line: "Le conseil et la technologie, au service de l'exécution.",
  },
  {
    initials: 'TC',
    name: 'Théo Caillé',
    role: 'Expert financier — Fusions-acquisitions',
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
            Un père, deux fils. Trois expertises qui se répondent autour d'une même table — et d'une
            même exigence.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {people.map((p, i) => (
            <Reveal key={p.initials} delay={i * 0.1}>
              <article className="group h-full overflow-hidden rounded-2xl border border-paper/10 bg-paper/[0.03] p-5 transition-colors duration-500 hover:border-paper/25 md:p-6">
                <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-navy/60 to-ink">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-7xl text-paper/20 transition-transform duration-700 ease-smooth group-hover:scale-110">
                      {p.initials}
                    </span>
                  </div>
                  <div className="martini-bars absolute bottom-0 left-0 h-2 w-full opacity-90" />
                </div>
                <h3 className="font-display text-2xl">{p.name}</h3>
                <p className="mt-1 text-sm text-sky">{p.role}</p>
                <p className="mt-3 text-sm text-paper/55">{p.line}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
