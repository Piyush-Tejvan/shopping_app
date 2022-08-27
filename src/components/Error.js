import React, { useState } from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}


export const Counter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(c => c + 1);
  }
  
  if (count === 5){
    throw new Error("Crashed !");
  }
  return (
    <div>
      <div onClick={handleClick}>count: {count}</div>
    </div>
  );
}

const ErrorApp = () => {
  return(
   <div>
    <ErrorBoundary><Counter /></ErrorBoundary>
   </div>
  );
}

export default ErrorApp;