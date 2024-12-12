"use client";
import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state to render fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // You can log the error to an error reporting service
    // console.error("Error caught in ErrorBoundary:", error);
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
