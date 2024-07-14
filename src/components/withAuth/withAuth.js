import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
      setIsClient(true); // Once the component mounts, we know it's client-side

      const token = localStorage.getItem('token');

      // If there's no token, redirect to login page.
      if (!token) {
        router.replace('/'); // Make sure this is the path to your login page
      }
    }, []);

    // While checking the token, you can render a loading state or null to match the server render
    if (!isClient) {
      return null; // or a loading spinner, etc.
    }

    // If there is a token or we're still waiting to check, render the wrapped component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;