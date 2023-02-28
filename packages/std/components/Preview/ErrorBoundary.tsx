import { Component, ErrorInfo, ReactElement } from "react";

export class ErrorBoundary extends Component<{ children: ReactElement }, { error: Error; errorInfo: ErrorInfo }> {
  componentDidCatch (error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  render () {
    return this.state
      ? <>:(</>
      : this.props.children;
  }
}
