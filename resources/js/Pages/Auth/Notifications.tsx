import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

interface AuthData {
    user: User;
    // Add other properties of the 'auth' object here if needed
}
interface User {
    // Define the properties of the 'User' object here
    // For example:
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    address: string;
    email: string;
    email_verified_at: string;
    // ...
}

const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState<string[]>(() => {
        const savedNotifications = localStorage.getItem("notifications");
        return savedNotifications ? JSON.parse(savedNotifications) : [];
    });

    const auth = usePage().props.auth as AuthData;

    useEffect(() => {
        // Update notifications when localStorage changes
        const handleStorageChange = () => {
            const savedNotifications = localStorage.getItem("notifications");
            setNotifications(savedNotifications ? JSON.parse(savedNotifications) : []);
        };

        // Listen to changes in localStorage
        window.addEventListener("storage", handleStorageChange);

        // Clean up listener on unmount
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="p-4">
                <h2 className="text-white text-lg">Notifications</h2>
                <div className="mt-4">
                    {notifications.length > 0 ? (
                        <ul>
                            {notifications.map((notification, index) => (
                                <li
                                    key={index}
                                    className="text-white p-2 bg-gray-800 rounded mb-2"
                                >
                                    {notification}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-red-500">No notifications available.</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Notifications;
