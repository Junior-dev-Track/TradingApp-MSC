import React from "react";
import { usePage } from "@inertiajs/react";

interface NotificationsProps {
    notifications: string[];
}

const Notifications: React.FC<NotificationsProps> = () => {
    const { notifications } = usePage().props as {
        notifications: string[];
        errors: any;
    };

    return (
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
                    <p className="text-white">No notifications available.</p>
                )}
            </div>
        </div>
    );
};

export default Notifications;
