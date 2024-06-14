import { useState, PropsWithChildren, ReactNode } from "react";
import { Link } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";
import { User } from "@/types";
import { FaBell } from 'react-icons/fa'; // Importation de l'icône de notification

export default function Authenticated({
    user,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-dark-blue ">
            <header>
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo and site name */}
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-white font-semibold text-lg">Trade</span>
                        </Link>

                        {/* Center navigation links */}
                        <div className='flex items-center space-x-20 text-white '>
                            <NavLink   href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </NavLink>
                            <NavLink className='ml-5 p-4 border border-gray-300 bg-gray-50 rounded-lg mb-4'href={route('profile.edit')} active={route().current('profile.edit')}>
                                Profile
                            </NavLink>
                            <NavLink className='ml-5 p-4 border border-gray-300 bg-gray-50 rounded-lg mb-4' href={route('logout')} method="post" as="button" active={false}>
                                Log Out
                            </NavLink>
                        </div>

                        {/* Notification Icon with React Icon */}
                        <button className="text-gray-400 hover:text-gray-500">
                            <FaBell className="h-6 w-6" />
                        </button>
                    </div>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    );
}

