// État de scène mutable, partagé avec la couche WebGL sans déclencher
// de rendu React (lu directement dans la boucle useFrame).
export const scene = {
  mouseX: 0,
  mouseY: 0,
  darkTarget: 0, // 0 = clair, 1 = sombre — piloté par la section active
  heroBoost: 1, // 1 = hero (bandes vives), 0 = contenu (bandes calmées)
}
