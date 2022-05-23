import React from 'react';

class ErrorBoundary extends React.Component {

    state = { error : false }

    static getDerivedStateFromError(error) {
        
        return { error : true };
    }

    render() {

        const { error } = this.state;

        if (error === false) {

            return this.props.children;

        }


        return <div>Error Boundary Catch !!</div>
    }
}

export default ErrorBoundary;