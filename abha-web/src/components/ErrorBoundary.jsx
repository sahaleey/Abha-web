import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }; // Update state to indicate error
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    console.error("Error caught by ErrorBoundary:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-white py-20">
          <h2 className="text-3xl font-bold text-red-400 mb-4">Something went wrong.</h2>
          <p className="text-xl">Please try again later.</p>
        </div>
      );
    }

    return this.props.children; // Render children if no error
  }
}

export default ErrorBoundary;
