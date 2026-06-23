import Reveal from './ui/Reveal'

const items = [
  {
    n: '01',
    title: 'Conseil stratégique & financier',
    desc: 'Structuration, levées de fonds, fusions-acquisitions. La décision financière au service de la croissance.',
  },
  {
    n: '02',
    title: 'Développement logiciel',
    desc: "Produits sur mesure, plateformes et automatisations. De l'idée au déploiement, sans intermédiaire.",
  },
  {
    n: '03',
    title: 'Expertise comptable',
    desc: "Comptabilité, fiscalité et conseil. La rigueur d'un cabinet, la proximité d'une famille.",
  },
]

export default function Expertises() {
  return (
    <section id="expertises" data-theme="light" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-14 flex items-end justify-between gap-6 md:mb-20">
          <h2 className="font-display text-4xl tracking-tightest text-ink md:text-6xl">Expertises</h2>
          <p className="hidden max-w-[16rem] text-right text-sm text-ink/55 md:block">
            Trois métiers, un seul interlocuteur. La cohérence d'une famille.
          </p>
        </Reveal>

        <div className="border-t border-ink/15">
          {items.map((it, i) => (
            <Reveal key={it.n} delay={i * 0.08}>
              <article className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b border-ink/15 py-8 md:py-12">
                <span className="col-span-12 font-display text-sm text-ink/40 md:col-span-2 md:text-base">
                  {it.n}
                </span>
                <h3 className="col-span-12 font-display text-3xl text-ink transition-all duration-500 ease-smooth group-hover:translate-x-2 group-hover:text-racing md:col-span-5 md:text-[2.6rem]">
                  {it.title}
                </h3>
                <p className="col-span-12 text-ink/65 md:col-span-4">{it.desc}</p>
                <span className="col-span-1 hidden translate-x-0 justify-self-end text-xl text-racing opacity-0 transition-all duration-500 ease-smooth group-hover:translate-x-1 group-hover:opacity-100 md:block">
                  →
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
