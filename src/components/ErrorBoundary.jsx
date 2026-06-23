import { Component } from 'react'

// Isole la couche WebGL : si le canvas échoue (contexte WebGL perdu, etc.),
// on retombe sur le fond CSS au lieu de casser toute la page.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) console.warn('[DACSONS] Canvas WebGL désactivé :', error)
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}
