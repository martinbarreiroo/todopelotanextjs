import React from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
    return (props) => {
        if (typeof window !== 'undefined') {
            const router = useRouter();

            const token = localStorage.getItem('token');

            // If there's no token, redirect to login page.
            if (!token) {
                router.replace('/');
                return null;
            }

            // If there is a token, render the wrapped component.
            return <WrappedComponent {...props} />;
        }

        // If we're on server side, just render the component.
        return <WrappedComponent {...props} />;
    };
};

export default withAuth;