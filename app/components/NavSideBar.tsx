"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import SignOutButton from "./SignOutButton";  
import clsx from "clsx"; // Para lidar com classes dinamicamente

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faTable, faSliders, faBars, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const NavSideBar = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isHorizontal, setIsHorizontal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser({
          name: user.user_metadata.full_name || "Usuário",
        });
      }
    };
    fetchUser();
  }, []);

  // Recupera a preferência do usuário ao carregar a página
  useEffect(() => {
    const savedLayout = localStorage.getItem("menuLayout");
    if (savedLayout === "horizontal") {
      setIsHorizontal(true);
    }
  }, []);

  // Alterna entre menu lateral e superior
  const toggleLayout = () => {
    const newLayout = !isHorizontal;
    setIsHorizontal(newLayout);
    localStorage.setItem("menuLayout", newLayout ? "horizontal" : "vertical");
  };

  return (
    <aside
      className={clsx(
        "bg-gray-900 text-white shadow-lg p-6 flex items-center",
        isHorizontal
          ? "w-full h-16 justify-between px-6 fixed top-0 left-0 right-0" // Menu superior
          : "h-screen w-64 flex-col items-center pt-[120px]" // Menu lateral
      )}
    >
      {/* Foto genérica e Nome */}
      <div className={clsx(isHorizontal ? "flex items-center gap-4" : "flex flex-col items-center mb-8")}>
        <img
          src="/avatar.png"
          alt="Avatar genérico"
          className="w-12 h-12 rounded-full border-2 border-gray-700"
        />
        <p className="text-lg font-semibold">{user?.name || "Felipe Rocha"}</p>
      </div>

      {/* Opções de navegação */}
      <nav className={clsx(isHorizontal ? "flex gap-6 ml-6" : "w-full mt-4")}>
        <ul className={clsx(isHorizontal ? "flex space-x-6" : "space-y-4" )}>
          <li>
            <Link href="/" className="block p-3 rounded-md hover:bg-gray-700 flex items-center gap-2">
              <FontAwesomeIcon icon={faDatabase}  className="h-5 w-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/profile" className="block p-3 rounded-md hover:bg-gray-700 flex items-center gap-2">
              <FontAwesomeIcon icon={faTable} className="h-5 w-5" />
              Minha Planilha
            </Link>
          </li>
          <li>
            <Link href="/settings" className="block p-3 rounded-md hover:bg-gray-700 flex items-center gap-2">
            <FontAwesomeIcon icon={faSliders} className="h-5 w-5"  />
              Configurações
            </Link>
          </li>
          <li>
            <button
              onClick={toggleLayout}
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faBars} className="h-5 w-5"  />
              {isHorizontal ? 'Menu lateral' : 'Menu superior'}
            </button>
          </li>
          <li>
            <Link href="/logout" className="block p-3 rounded-md hover:bg-gray-700 flex items-center gap-2"> {/* Assumindo que SignOutButton é um Link ou você quer um ícone aqui também */}
              
            </Link>
          </li>
        </ul>
      </nav>
        <div className="flex flex-col items-start mt-4 max"> 
          
          <SignOutButton />
        </div>
    </aside>
  );
};

export default NavSideBar;
