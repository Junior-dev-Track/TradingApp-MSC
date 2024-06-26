import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { ErrorBag } from "@inertiajs/inertia";


interface auth{
    auth?:string;
    user?: User;
}
interface User {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  email_verified_at: string;
}

const Notifications: React.FC = () => {
  const { auth, errors }: { auth?: auth, errors?: ErrorBag } = usePage().props;

  const [notifications, setNotifications] = useState<string[]>(() => {
    const savedNotifications = localStorage.getItem("notifications");
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedNotifications = localStorage.getItem("notifications");
      setNotifications(savedNotifications ? JSON.parse(savedNotifications) : []);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthenticatedLayout user={auth?.user}>
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
