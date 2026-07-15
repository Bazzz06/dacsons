import { useState } from 'react'
import Reveal from './ui/Reveal'
import Magnetic from './ui/Magnetic'

// FormSubmit.co : gratuit, sans compte, livre vers l'adresse indiquee.
// 1re soumission => email d'activation a confirmer une seule fois sur contact@dacsons.fr.
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/contact@dacsons.fr'

const inputClass =
  'w-full rounded-lg border border-ink/15 bg-white px-4 py-3.5 text-ink placeholder-ink/35 outline-none transition-all duration-300 focus:border-navy focus:ring-2 focus:ring-sky/40'

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
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          {/* Panneau clair sur fond sombre */}
          <div className="relative overflow-hidden rounded-3xl bg-paper p-7 text-ink shadow-[0_40px_120px_rgba(0,0,0,0.5)] md:p-16">
            <div className="martini-rule absolute inset-x-0 top-0 h-[5px]" aria-hidden="true" />

            <div className="grid gap-12 md:grid-cols-2 md:gap-20">
              <div>
                <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-navy/70">
                  <span className="martini-bars h-3 w-10 rounded-sm" />
                  Contact
                </p>
                <h2 className="font-display text-4xl leading-[1.04] tracking-tightest text-navy md:text-6xl">
                  Parlons de
                  <br />
                  votre projet.
                </h2>
                <p className="mt-6 max-w-sm text-lg text-ink/70">
                  Une question, un projet, une opération ? Écrivez-nous, on vous répond vite.
                </p>

                <a
                  href="mailto:contact@dacsons.fr"
                  className="mt-9 inline-block border-b-[3px] border-racing pb-1 font-display text-2xl tracking-tightest text-ink transition-colors hover:text-racing md:text-3xl"
                >
                  contact@dacsons.fr
                </a>
              </div>

              {status === 'success' ? (
                <div className="flex min-h-[18rem] flex-col items-start justify-center rounded-2xl border border-navy/15 bg-navy/[0.04] p-8">
                  <span className="martini-bars mb-5 h-3 w-12 rounded-sm" />
                  <h3 className="font-display text-3xl text-navy">Message envoyé.</h3>
                  <p className="mt-3 text-ink/70">
                    Merci, votre message est bien parti vers contact@dacsons.fr. Nous revenons vers
                    vous rapidement.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm text-navy underline-offset-4 hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-5">
                  {/* honeypot anti-spam (FormSubmit) */}
                  <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />

                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-[0.2em] text-ink/55">
                      Nom
                    </label>
                    <input id="name" name="name" type="text" required placeholder="Votre nom" className={inputClass} />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-[0.2em] text-ink/55">
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
                    <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.2em] text-ink/55">
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
                    className="group mt-1 inline-flex w-fit items-center gap-3 rounded-full bg-racing px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_12px_30px_rgba(225,29,42,0.35)] disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Envoi…' : 'Envoyer le message'}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Magnetic>

                  <p className="text-xs leading-relaxed text-ink/45">
                    En envoyant ce message, vous acceptez que vos données soient utilisées pour vous
                    recontacter.{' '}
                    <a
                      href="/mentions-legales.html"
                      className="underline-offset-2 hover:text-navy hover:underline"
                    >
                      Mentions légales
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
