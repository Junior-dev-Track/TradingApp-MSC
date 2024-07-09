import React, { useState, PropsWithChildren, ReactNode } from "react";
import { Link } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";
import { User } from "@/types";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import AlertsManager from "@/Pages/Auth/AlertsManager";

export default function Authenticated({
    user,
    children,
}: PropsWithChildren<{ user?: User; header?: ReactNode }>) {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [purchased, setPurchased] = useState<{ symbol: string; price: number }[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-dark-blue">
            <header>
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <Link href={route("dashboard")} className="flex items-center space-x-2">
                            <span className="text-white font-bold text-lg">Trade</span>
                        </Link>

                        {/* Burger menu button for tablet and smaller screens */}
                        <div className="flex items-center lg:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-white focus:outline-none"
                            >
                                {isMenuOpen ? <FaTimes size={24} className="hidden" /> : <FaBars size={24} />}
                            </button>
                        </div>

                        {/* Center navigation links for larger screens */}
                        <div className="hidden lg:flex items-center space-x-20 text-white">
                            <NavLink
                                className="bg-gradient-to-b from-deeper-night-blue to-gray-400 pt-2 pb-2 pl-2 pr-2 ml-5 p-4 bg-gray-50 rounded-lg mb-4 mt-4 text-white active:text-zinc-300 hover:text-zinc-300"
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                className="bg-gradient-to-b from-deeper-night-blue to-gray-400 pt-2 pb-2 pl-2 pr-2 ml-5 p-4 bg-gray-50 rounded-lg mb-4 mt-4 text-white active:text-zinc-300 hover:text-zinc-300"
                                href={route("guide")}
                                active={route().current("guide")}
                            >
                                Guide
                            </NavLink>
                            <NavLink
                                className="bg-gradient-to-b from-deeper-night-blue to-gray-400 pt-2 pb-2 pl-2 pr-2 ml-5 p-4 bg-gray-50 rounded-lg mb-4 mt-4 text-white active:text-zinc-300 hover:text-zinc-300"
                                href={route("profile.edit")}
                                active={route().current("profile.edit")}
                            >
                                Profile
                            </NavLink>
                            <NavLink
                                className="bg-gradient-to-b from-deeper-night-blue to-gray-400 pt-2 pb-2 pl-2 pr-2 ml-5 p-4 bg-gray-50 rounded-lg mb-4 mt-4 text-white active:text-zinc-300 hover:text-zinc-300"
                                href={route("logout")}
                                method="post"
                                as="button"
                                active={false}
                            >
                                Log Out
                            </NavLink>
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
                        </div>
                    </div>
                </nav>
            </header>

            {/* Burger menu overlay for tablet and smaller screens */}
            <div
                className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                } lg:hidden`}
                style={{ width: "75%" }}
            >
                <div className="flex justify-between items-center p-4">
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="text-dark-blue focus:outline-none"
                    >
                        <FaTimes size={24} />
                    </button>
                    {/* L'icône de notification ici pour qu'elle soit visible en tout temps */}
                    <FaBell size={24} className="text-dark-blue" />
                </div>
                <div className="flex flex-col items-start p-4 space-y-4 text-dark-blue">
                    <NavLink
                        className="block"
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        className="block"
                        href={route("guide")}
                        active={route().current("guide")}
                    >
                        Guide
                    </NavLink>
                    <NavLink
                        className="block"
                        href={route("profile.edit")}
                        active={route().current("profile.edit")}
                    >
                        Profile
                    </NavLink>
                    <NavLink
                        className="block"
                        href={route("logout")}
                        method="post"
                        as="button"
                        active={false}
                    >
                        Log Out
                    </NavLink>
                </div>
            </div>

            <main>{children}</main>
        </div>
    );
}
