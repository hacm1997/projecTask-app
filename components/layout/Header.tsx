"use client";

import { useAuth } from "@/contexts/authContext";
import useClickOutside from "@/hooks/useClickOutside";
import Link from "next/link";
import { ProfileMenu } from "./ProfileMenu";

export const Header = () => {
    const { user } = useAuth();
    const { isOpen, toggle, ref, buttonRef } = useClickOutside(false);
    return (
        <header className="w-full bg-[#14171F] fixed z-50">
            <div className="flex justify-around items-center h-[72px]">
                <div className="flex items-center">
                    <Link href='/dashboard' title="Home">
                        <h3 className="font-bold text-[32px]">
                            ProjecTask App
                        </h3>
                    </Link>
                </div>

                {/* Desktop menu */}
                <nav className="hidden md:flex items-center space-x-10">
                    <ul className="flex space-x-6 text-[#E4E4E7]">
                        {/* <li className="text-[16px] font-medium hover:text-[#4C4E53]">
                            <Link href="/">Home</Link>
                        </li> */}
                        <li className="text-[16px] font-medium hover:text-[#4C4E53] cursor-pointer">
                            <Link href="/dashboard" title="proyectos">Proyectos</Link>
                        </li>
                        {/* <li className="text-[16px] font-medium hover:text-[#4C4E53]">
                            <Link href="#">Tareas</Link>
                        </li> */}
                        {/* <li className="text-[16px] font-medium hover:text-[#4C4E53]">
                            <Link href="#">Soy Artista</Link>
                        </li> */}
                    </ul>
                    <div className="flex space-x-4">
                        <ProfileMenu name={user?.name} email={user?.email} role={user?.role} />
                    </div>
                </nav>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button ref={buttonRef} onClick={toggle} className="text-white">
                        {!isOpen ?
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            :
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        }
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden h-[90vh] flex flex-col justify-around" ref={ref}>
                    <div className="px-2 pt-2 pb-3 space-y-8 sm:px-3 text-center">
                        {/* <Link href="/" className="text-[#E4E4E7] block px-3 py-2 rounded-md text-base font-medium">Home</Link> */}
                        <Link href="/dashboard" className="text-[#E4E4E7] block px-3 py-2 rounded-md text-base font-medium">Proyectos</Link>
                        {/* <Link href="#" className="text-[#E4E4E7] block px-3 py-2 rounded-md text-base font-medium">Tareas</Link> */}
                        {/* <Link href="#" className="text-[#E4E4E7] block px-3 py-2 rounded-md text-base font-medium">Soy Artista</Link> */}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-700">
                        <div className="px-2 space-y-1">
                            <ProfileMenu name={user?.name} email={user?.email} role={user?.role} />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};