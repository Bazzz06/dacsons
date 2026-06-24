import { scrollToId } from '../lib/scroll'

const links = [
  { label: 'Expertises', id: '#expertises' },
  { label: 'À propos', id: '#about' },
  { label: 'Contact', id: '#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const go = (id) => (e) => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <footer data-theme="dark" className="relative px-6 pb-10 pt-20 text-paper md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="martini-bars mb-12 h-1.5 w-full rounded-full opacity-80" />

        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
          <div>
            <a
              href="#top"
              onClick={go('#top')}
              className="font-display text-5xl tracking-tightest md:text-7xl"
            >
              DACSONS
            </a>
            <p className="mt-4 max-w-sm text-paper/55">
              Conseil, finance & ingénierie logicielle. Une famille, trois expertises.
            </p>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <nav className="flex gap-6">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={l.id}
                  onClick={go(l.id)}
                  className="text-sm text-paper/70 transition-colors hover:text-sky"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <a
              href="mailto:contact@dacsons.fr"
              className="font-display text-xl transition-colors hover:text-sky md:text-2xl"
            >
              contact@dacsons.fr
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-paper/10 pt-6 text-xs text-paper/40 md:flex-row md:items-center md:justify-between">
          <p>DACSONS · SAS au capital de 1 000 € · SIREN 893 343 871</p>
          <div className="flex items-center gap-4">
            <a href="/mentions-legales.html" className="transition-colors hover:text-sky">
              Mentions légales
            </a>
            <span>© {year} DACSONS</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
