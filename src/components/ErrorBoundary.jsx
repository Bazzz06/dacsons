import { Component } from 'react'

// Isole une couche optionnelle (ex: fond WebGL) : en cas d'echec, on retombe
// sur le fallback au lieu de casser la page.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) console.warn('[DACSONS] Couche desactivee :', error)
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}
