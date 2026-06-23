# DACSONS — site vitrine

Landing one-page pour **DACSONS** (conseil stratégique & financier, développement
logiciel, expertise comptable). Design sobre, éditorial, avec des **notes Martini
Racing** en accents (liseré tricolore, bandes, rouge racing) sur des fonds pleins
clair/sombre.

## Stack

- **Vite** + **React 18**
- **Framer Motion** — reveals au scroll, boutons magnétiques, menu mobile
- **Lenis** — smooth scroll
- **Tailwind CSS** — styles

Léger : ~94 Ko gzip, aucune dépendance 3D.

## Démarrage

```bash
npm install
npm run dev          # http://localhost:5180
```

Build de production :

```bash
npm run build        # génère /dist
npm run preview      # sert /dist en local
```

## Formulaire de contact

Le formulaire route vers **contact@dacsons.fr**. Deux modes :

1. **Sans configuration** (par défaut) : à l'envoi, la messagerie du visiteur s'ouvre
   pré-remplie vers `contact@dacsons.fr`. Fonctionne immédiatement.
2. **Envoi en arrière-plan** (recommandé en prod) : via [Web3Forms](https://web3forms.com)
   (gratuit). Le visiteur ne quitte pas le site, l'email n'est pas exposé.

Pour activer le mode 2 :

```bash
cp .env.example .env
```

Créer une clé gratuite sur [web3forms.com](https://web3forms.com) avec `contact@dacsons.fr`,
la coller dans `.env` (`VITE_WEB3FORMS_KEY=...`), puis redémarrer. (Définir aussi la
variable côté hébergeur en prod.)

## Déploiement

Site statique → déployable partout (Vercel, Netlify…). Build : `npm run build`, output : `dist`.
Pensez à renseigner `VITE_WEB3FORMS_KEY` côté hébergeur et à pointer `dacsons.fr`.

## Personnalisation

- **Couleurs Martini** : `tailwind.config.js` + variables CSS dans `src/index.css`
  (`--paper`, `--ink`, `--navy`, `--sky`, `--racing`).
- **Accents Martini** : classes `.martini-rule` (liseré haut de page) et `.martini-bars`
  (eyebrows, cartes, footer) dans `src/index.css`.
- **Fonds clair/sombre** : pilotés par `data-theme="light|dark"` sur chaque `<section>`.
- **Contenu** : `src/components/` — `Hero`, `Expertises`, `About`, `Contact`, `Footer`.
- **Portraits** : `src/components/About.jsx` — les blocs « JC / BC / TC » sont des
  placeholders ; remplacez-les par de vraies photos (images dans `public/`).
- **Polices** : Clash Display (titres) + Satoshi (texte), via Fontshare dans `index.html`.

## Accessibilité

- **`prefers-reduced-motion`** respecté : reveals et smooth-scroll désactivés.
- Contrastes maîtrisés (texte sombre sur clair, clair sur sombre).

## Structure

```
src/
  App.jsx                 # smooth scroll, loader, thème nav clair/sombre
  components/
    Nav.jsx  Hero.jsx  Expertises.jsx  About.jsx  Contact.jsx  Footer.jsx  Loader.jsx
    ui/  Reveal.jsx  Magnetic.jsx
  lib/  scroll.js
  index.css               # couleurs, accents Martini, fonds de section
```

---

DACSONS — SAS au capital de 1 000 € · SIREN 893 343 871 · 504 Chemin de la Colle
Supérieure, 06500 Menton.
