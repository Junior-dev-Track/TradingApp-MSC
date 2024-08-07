import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { ErrorBag } from "@inertiajs/inertia";
import { FaTrash } from "react-icons/fa"; // Importer l'icône de poubelle

interface auth {
  auth?: string;
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
interface Notification {
  id: number;
  message: string;
  timestamp: Date;
}

const Notifications: React.FC = () => {
  const { auth, errors }: { auth?: auth, errors?: ErrorBag } = usePage().props;

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const savedNotifications = localStorage.getItem("notifications");
    return savedNotifications ? JSON.parse(savedNotifications).map((notification: any) => ({
      ...notification,
      timestamp: new Date(notification.timestamp)
    })) : [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedNotifications = localStorage.getItem("notifications");
      setNotifications(savedNotifications ? JSON.parse(savedNotifications).map((notification: any) => ({
        ...notification,
        timestamp: new Date(notification.timestamp)
      })) : []);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const removeNotification = (id: number) => {
    setNotifications(prevNotifications => {
      const updatedNotifications = prevNotifications.filter(notification => notification.id !== id);
      localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
      return updatedNotifications;
    });
  };

  // Tri des notifications par timestamp décroissant avant affichage
  notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <AuthenticatedLayout user={auth?.user}>
      <div className="p-4">
        <Head title="Notifications" />
        <h2 className="text-white text-lg">Notifications</h2>
        <div className="mt-4">
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="text-white p-2 bg-gray-800 rounded mb-2 flex justify-between"
                >
                  {notification.message}
                  <button onClick={() => removeNotification(notification.id)} className="text-red-500">
                    <FaTrash />
                  </button>
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
