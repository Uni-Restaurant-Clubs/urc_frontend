import React, { Component } from 'react';
import { Notifier } from '@airbrake/browser';
import airbrake from "../../utils/airbrake";

class ErrorBoundary extends React.Component {
  constructor(props) {
    const id = process.env.AIRBRAKE_ID;
    const key = process.env.AIRBRAKE_KEY;
    super(props);
    this.state = { hasError: false };
    this.airbrake = airbrake
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // Send error to Airbrake
    this.airbrake.notify({
      error: error,
      params: {info: info}
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
