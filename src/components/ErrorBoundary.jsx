import React from 'react'
// Components
import Button from 'components/Button'

export default class ErrorBoundary extends React.Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch() {
    // log the error to the server
  }
  tryAgain = () => this.setState({ error: null })
  render() {
    return this.state.error ? (
      <>
        There was an error. <Button onClick={this.tryAgain}>Try again</Button>
        <pre style={{ whiteSpace: 'normal' }}>{this.state.error.message}</pre>
      </>
    ) : (
      this.props.children
    )
  }
}
