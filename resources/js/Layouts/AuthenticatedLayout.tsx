import React, { useState, PropsWithChildren, ReactNode } from "react";
import { Link } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";
import { User } from "@/types";
import { FaBell } from "react-icons/fa";
import AlertsManager from "@/Pages/Trading/AlertsManager";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

export default function Authenticated({
    user,
    children,
}: PropsWithChildren<{ user?: User; header?: ReactNode }>) {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [purchased, setPurchased] = useState<
        { symbol: string; price: number }[]
    >([]);

    return (
        <div className="min-h-screen bg-dark-blue">
            <header>
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <Link
                            href={route("dashboard")}
                            className="flex items-center space-x-2"
                        >
                            <span className="text-white font-semibold text-lg">
                                SimTrade
                            </span>
                        </Link>

                        {/* Center navigation links */}
                        <div className="flex items-center space-x-20 text-white">
                            <NavLink
                                className="bg-gradient-to-b from-deeper-night-blue to-gray-400 pt-2 pb-2 pl-2 pr-2 ml-5 p-4  bg-gray-50 rounded-lg mb-4 mt-4 text-white active:text-zinc-300 hover:text-zinc-300"
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                className="bg-gradient-to-b from-deeper-night-blue to-gray-400 pt-2 pb-2 pl-2 pr-2 ml-5 p-4  bg-gray-50 rounded-lg mb-4 mt-4 text-white active:text-zinc-300  hover:text-zinc-300"
                                href={route("guide")}
                                active={route().current("guide")}
                            >
                                Guide
                            </NavLink>
                            <NavLink
                                className="bg-gradient-to-b from-deeper-night-blue to-gray-400 pt-2 pb-2 pl-2 pr-2 ml-5 p-4  bg-gray-50 rounded-lg mb-4 mt-4 text-white  active:text-zinc-300 hover:text-zinc-300"
                                href={route("profile.edit")}
                                active={route().current("profile.edit")}
                            >
                                Profile
                            </NavLink>
                            <NavLink
                                className=" bg-gradient-to-b from-deeper-night-blue to-gray-400 pt-2 pb-2 pl-2 pr-2 ml-5 p-4  bg-gray-50 rounded-lg mb-4 mt-4 text-white active:text-zinc-300 hover:text-zinc-300"
                                href={route("logout")}
                                method="post"
                                as="button"
                                active={false}
                            >
                                Log Out
                            </NavLink>{" "}
                            {/* classname hover bg dark blue ne fonctionne pas*/}
                            {/* Intégration d'AlertsManager avec les props favorites et purchased */}
                            <AlertsManager
                                executeOrder={false}
                                priceAlerts={[]}
                                marketNews={false}
                                accountStatus={false}
                                marketMovements={false}
                                dividends={false}
                                accountSecurity={false}
                                supportMessages={false}
                                assetMovements={false}
                                deadlines={false}
                            />
                            {/* Affichage du composant Notifications */}
                        </div>
                    </div>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    );
}
