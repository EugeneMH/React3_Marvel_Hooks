import {Component} from 'react';
import Error from '../error/Error';

class ErrorBoundary extends Component {
    state = {
        hasError: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
      }

    render() {
        if (this.state.hasError) {
            return (
                <Error/>
            )
        }
        
        return this.props.children;
    }
}

export default ErrorBoundary;