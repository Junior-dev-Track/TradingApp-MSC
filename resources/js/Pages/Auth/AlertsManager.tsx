import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { Link } from "@inertiajs/react";

interface AlertsManagerProps {
    executeOrder: boolean;
    priceAlerts: { symbol: string; targetPrice: number }[];
    marketNews: boolean;
    accountStatus: boolean;
    marketMovements: boolean;
    dividends: boolean;
    accountSecurity: boolean;
    supportMessages: boolean;
    assetMovements: boolean; // Nouvelle propriété pour les mouvements importants des actifs
    deadlines: boolean; // Nouvelle propriété pour les échéances
}

const AlertsManager: React.FC<AlertsManagerProps> = ({
    executeOrder,
    priceAlerts,
    marketNews,
    accountStatus,
    marketMovements,
    dividends,
    accountSecurity,
    supportMessages,
    assetMovements,
    deadlines,
}) => {
    const [notifications, setNotifications] = useState<string[]>([]);

    useEffect(() => {
        const addNotification = (message: string) => {
            setNotifications((prevNotifications) => [...prevNotifications, message]);
        };

        if (executeOrder) {
            addNotification("Ordre exécuté avec succès.");
        }

        priceAlerts.forEach((alert) => {
            const currentPrice = Math.random() * 3000; // Remplacer par la logique réelle de récupération des prix
            if (currentPrice >= alert.targetPrice) {
                addNotification(`Alerte de prix atteinte pour ${alert.symbol}.`);
            }
        });

        if (marketNews) {
            addNotification("Nouvelle actualité importante sur les marchés.");
        }

        if (assetMovements) {
            addNotification("Mouvement important d'un actif détenu.");
        }

        if (deadlines) {
            addNotification("Échéance ou dividende à venir pour un actif.");
        }

        // Ajoutez d'autres conditions pour les nouvelles notifications ici

    }, [executeOrder, priceAlerts, marketNews, assetMovements, deadlines]);

    return (
        <div className="relative">
            <Link href={`/notifications`} preserveState>
                <button className="flex flex-col text-gray-400 hover:text-gray-500">
                    <FaBell className="h-6 w-6" />
                    {notifications.length > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center absolute top-0">
                            {notifications.length}
                        </span>
                    )}
                </button>
            </Link>
        </div>
    );
};

export default AlertsManager;
