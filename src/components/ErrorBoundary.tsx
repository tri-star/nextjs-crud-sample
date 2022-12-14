import { Component, PropsWithChildren, ReactElement, ReactNode } from 'react'

export type ErrorBoundaryState = {
  error?: Error
  hasError: boolean
}

interface ErrorBoundaryProps extends PropsWithChildren {
  fallback: (error: Error) => ReactElement
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  }

  static getDerivedStateFromError (/* error: any */) {
    return {
      hasError: true
    }
  }

  componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
    this.setState(() => ({
      hasError: true,
      error
    }))
  }

  render (): ReactNode {
    console.info(this.state)
    if (this.state?.hasError) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.props.fallback(this.state.error!)
    }
    return this.props.children
  }
}
