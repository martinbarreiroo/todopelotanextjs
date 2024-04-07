// withAuth.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function withAuth(Component) {
    return function ProtectedRoute({...props}) {
        const router = useRouter();
        const user = null; // replace null with your method of getting the current user

        useEffect(() => {
            if (!user) {
                router.replace('/Login'); // redirect to login if user is not authenticated
            }
        }, [user, router]);

        return <Component {...props} />;
    }
}