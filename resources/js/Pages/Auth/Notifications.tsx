import React from "react";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

interface NotificationsProps {
    notifications: string[];
}

const Notifications: React.FC<NotificationsProps> = () => {
    const { notifications, auth } = usePage().props as {
        notifications: string[];
        errors: any;
        auth: any;
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="p-4">
                <h2 className="text-dark-blue text-lg">Notifications</h2>
                <div className="mt-4">
                    {notifications.length > 0 ? (
                        <ul>
                            {notifications.map((notification, index) => (
                                <li
                                    key={index}
                                    className="text-dark-blue p-2 bg-gray-800 rounded mb-2"
                                >
                                    {notification}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-red">No notifications available.</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Notifications;
