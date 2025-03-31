"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faTable, faSliders, faBars, faArrowRightFromBracket, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const NavSideBar = () => {
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser({ name: user.user_metadata.full_name || "Usuário" });
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const savedCollapsed = localStorage.getItem("menuCollapsed");
        if (savedCollapsed === "true") {
            setIsCollapsed(true);
        }
    }, []);

    const toggleCollapse = () => {
        const newCollapsed = !isCollapsed;
        setIsCollapsed(newCollapsed);
        localStorage.setItem("menuCollapsed", newCollapsed.toString());
    };

    const navItemClasses = clsx(
        "block p-3  rounded-md hover:bg-gray-700 flex items-center transition-all duration-300",
        isCollapsed ? "justify-center" : "gap-2 px-3"
    );

    const navItemClassesred = clsx(
      "block p-3 bg-red-900 rounded-md hover:bg-gray-700 flex items-center transition-all duration-300",
      isCollapsed ? "justify-center" : "gap-2 px-3"
  );

    const navLinkClasses = clsx(
        "transition-opacity duration-300",
        isCollapsed ? "opacity-0 pointer-events-none absolute left-0" : "opacity-100"
    );

    return (
            <aside
                className={clsx(
                    "bg-gray-900 items-center p-2 text-white shadow-lg flex flex-col h-screen transition-all duration-300 relative",
                    isCollapsed ? "w-16 items-center" : "w-64 items-start",
                )}
            >
            <button
                onClick={toggleCollapse}
                className="absolute top-4 right-[-1rem] bg-gray-700 hover:bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
            >
                <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} className="h-4 w-4" />
            </button>

            <div className={clsx(
                "flex p-3 transition-opacity duration-300",
                isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100 items-center mb-8 flex-col items-center"
            )}>
                <img
                    src="/avatar.png"
                    alt="Avatar genérico"
                    className="w-12 h-12 rounded-full border-2 border-gray-700 mb-2"
                />
                <p className="text-lg font-semibold truncate">{user?.name || "Felipe Rocha"}</p>
            </div>

            <nav className="w-full mt-4">
                <ul className="space-y-2">
                    <li>
                        <Link href="/" className={navItemClasses}>
                            <FontAwesomeIcon icon={faDatabase} className="h-5 w-5" />
                            <span className={navLinkClasses}>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/empresas/nova" className={navItemClasses}>
                            <FontAwesomeIcon icon={faTable} className="h-5 w-5" />
                            <span className={navLinkClasses}>Nova Empresa</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/resume" className={navItemClasses}>
                            <FontAwesomeIcon icon={faTable} className="h-5 w-5" />
                            <span className={navLinkClasses}>Resumo</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/settings" className={navItemClasses}>
                            <FontAwesomeIcon icon={faSliders} className="h-5 w-5" />
                            <span className={navLinkClasses}>Configurações</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className={clsx(
                "mt-auto p-6 transition-all duration-300",
                isCollapsed ? "items-center justify-center" : "items-start"
            )}>
                <Link href="/logout" className={navItemClassesred}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className="h-5 w-5 " />
                    <span className={navLinkClasses}>Sair</span>
                </Link>
            </div>
        </aside>
    );
};

export default NavSideBar;