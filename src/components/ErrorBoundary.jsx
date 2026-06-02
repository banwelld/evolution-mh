import React from 'react';
import { ErrorPageContent } from './ErrorPage';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Catastrophic error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const mockError = {
        status: 500,
        statusText: this.state.error?.stack || this.state.error?.message || 'Catastrophic Application Error',
        message: this.state.error?.message || 'A critical rendering error occurred.',
      };
      return <ErrorPageContent error={mockError} isCatastrophic={true} />;
    }

    return this.props.children;
  }
}
