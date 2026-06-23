# DACSONS — site vitrine

Landing one-page ultra-moderne pour **DACSONS** (conseil stratégique & financier,
développement logiciel, expertise comptable). Inspiration livrée Martini Racing,
fond WebGL animé qui passe du clair au sombre au scroll, transitions soignées.

## Stack

- **Vite** + **React 18**
- **Three.js** via `@react-three/fiber` — shader plein écran des bandes Martini
- **Framer Motion** — reveals, transitions, boutons magnétiques, menu mobile
- **Lenis** — smooth scroll
- **Tailwind CSS** — styles

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
   pré-remplie vers `contact@dacsons.fr`. Fonctionne immédiatement, aucune clé requise.
2. **Envoi en arrière-plan** (recommandé en prod) : via [Web3Forms](https://web3forms.com)
   (gratuit). Le visiteur ne quitte pas le site, l'email n'est pas exposé.

Pour activer le mode 2 :

```bash
cp .env.example .env
```

Puis créer une clé gratuite sur [web3forms.com](https://web3forms.com) en renseignant
`contact@dacsons.fr`, et la coller dans `.env` :

```
VITE_WEB3FORMS_KEY=ta-cle-ici
```

Redémarrer `npm run dev`. (Une variable `VITE_*` est injectée au build : pensez à la
définir aussi dans les variables d'environnement de votre hébergeur.)

## Déploiement

Site statique → déployable partout. Exemples :

| Hébergeur | Build command | Output |
|-----------|---------------|--------|
| Vercel    | `npm run build` | `dist` |
| Netlify   | `npm run build` | `dist` |

Pensez à renseigner la variable `VITE_WEB3FORMS_KEY` côté hébergeur, et à pointer le
domaine `dacsons.fr`.

## Personnalisation

- **Couleurs Martini** : `tailwind.config.js` (`ink`, `navy`, `sky`, `racing`, `paper`)
  et les variables CSS dans `src/index.css`. Les couleurs du shader sont dans
  `src/components/StripesCanvas.jsx`.
- **Contenu** : `src/components/` — `Hero`, `Expertises`, `About`, `Contact`, `Footer`.
- **Portraits de l'équipe** : `src/components/About.jsx`. Les blocs « JC / BC / TC »
  sont des placeholders typographiques — remplacez-les par de vraies photos (ajoutez
  les images dans `public/` et utilisez-les dans la carte).
- **Polices** : Clash Display (titres) + Satoshi (texte), chargées via Fontshare dans
  `index.html`.

## Accessibilité & performances

- **`prefers-reduced-motion`** respecté : animations figées, curseur désactivé,
  shader statique.
- **Repli sans WebGL** : si WebGL est indisponible, un fond CSS thématisé prend le
  relais — le texte reste toujours lisible (jamais de clair sur clair).
- Curseur d'accent désactivé sur tactile.

## Structure

```
src/
  App.jsx                 # orchestration : scroll, thème clair/sombre, loader
  components/
    StripesCanvas.jsx     # shader WebGL des bandes Martini
    Nav.jsx  Hero.jsx  Expertises.jsx  About.jsx  Contact.jsx  Footer.jsx
    Cursor.jsx  Loader.jsx
    ui/  Reveal.jsx  Magnetic.jsx
  lib/  store.js  scroll.js
```

---

DACSONS — SAS au capital de 1 000 € · SIREN 893 343 871 · 504 Chemin de la Colle
Supérieure, 06500 Menton.
