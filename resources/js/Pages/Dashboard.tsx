import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { PageProps } from '@/types';

export default function Dashboard({ auth }: PageProps) {
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessage(false);
        }, 5000);  // Le message disparaîtra après 5 secondes

        return () => clearTimeout(timer);  // Nettoie le timer si le composant est démonté
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}

        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {showMessage && (
                            <div className="p-6 text-gray-900">You're logged in!</div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
