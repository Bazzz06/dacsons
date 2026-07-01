import { useState } from 'react'
import Reveal from './ui/Reveal'
import Magnetic from './ui/Magnetic'

// FormSubmit.co : gratuit, sans compte, livre vers l'adresse indiquee.
// 1re soumission => email d'activation a confirmer une seule fois sur contact@dacsons.fr.
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/contact@dacsons.fr'

const inputClass =
  'w-full rounded-lg border border-paper/20 bg-paper/[0.05] px-4 py-3.5 text-paper placeholder-paper/40 outline-none transition-colors duration-300 focus:border-sky focus:bg-paper/[0.08]'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    if (data.get('_honey')) return // honeypot anti-spam

    setStatus('sending')
    setError('')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          _subject: 'Nouveau message depuis dacsons.fr',
          _template: 'table',
          _captcha: 'false',
        }),
      })
      const json = await res.json()
      if (json.success === true || json.success === 'true') {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
        setError(json.message || "L'envoi a échoué. Réessaie ou écris-nous directement.")
      }
    } catch {
      setStatus('error')
      setError('Réseau indisponible. Réessaie ou écris-nous à contact@dacsons.fr.')
    }
  }

  return (
    <section id="contact" data-theme="dark" className="relative px-6 py-28 text-paper md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-2 md:gap-20">
        <Reveal>
          <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-sky">
            <span className="martini-bars h-3 w-10 rounded-sm" />
            Contact
          </p>
          <h2 className="font-display text-4xl leading-[1.04] tracking-tightest md:text-6xl">
            Parlons de
            <br />
            votre projet.
          </h2>
          <p className="mt-6 max-w-sm text-lg text-paper/70">
            Une question, un projet, une opération ? Écrivez-nous, on vous répond vite.
          </p>

          <div className="mt-10">
            <a
              href="mailto:contact@dacsons.fr"
              className="block font-display text-2xl transition-colors hover:text-sky md:text-3xl"
            >
              contact@dacsons.fr
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {status === 'success' ? (
            <div className="flex h-full min-h-[18rem] flex-col items-start justify-center rounded-2xl border border-sky/30 bg-sky/[0.06] p-8">
              <span className="martini-bars mb-5 h-3 w-12 rounded-sm" />
              <h3 className="font-display text-3xl">Message envoyé.</h3>
              <p className="mt-3 text-paper/70">
                Merci, votre message est bien parti vers contact@dacsons.fr. Nous revenons vers vous
                rapidement.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm text-sky underline-offset-4 hover:underline"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-5 rounded-2xl border border-paper/10 bg-paper/[0.02] p-6 md:p-8"
            >
              {/* honeypot anti-spam (FormSubmit) */}
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />

              <div>
                <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-[0.2em] text-paper/60">
                  Nom
                </label>
                <input id="name" name="name" type="text" required placeholder="Votre nom" className={inputClass} />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-[0.2em] text-paper/60">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="vous@exemple.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.2em] text-paper/60">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Quelques mots sur votre besoin…"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === 'error' && <p className="text-sm text-racing">{error}</p>}

              <Magnetic
                as="button"
                type="submit"
                strength={0.25}
                disabled={status === 'sending'}
                className="group mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-opacity duration-300 hover:opacity-90 disabled:opacity-60"
              >
                {status === 'sending' ? 'Envoi…' : 'Envoyer le message'}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Magnetic>

              <p className="text-xs leading-relaxed text-paper/40">
                En envoyant ce message, vous acceptez que vos données soient utilisées pour vous
                recontacter.{' '}
                <a
                  href="/mentions-legales.html"
                  className="underline-offset-2 hover:text-sky hover:underline"
                >
                  Mentions légales
                </a>
                .
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
