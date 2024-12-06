import "./style.css";
import "./tailwind.css";
import React, { useState } from "react";
import logoUrl from "../assets/PokemonLogo.svg";
import { Link } from "../components/Link.js";
import { TeamContextProvider } from "../contexts/TeamContext";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <TeamContextProvider>
      <div className="flex relative min-h-screen">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarOpen && (
            <Sidebar>
              <Logo />
              <Link href="/">Bienvenue</Link>
              <Link href="/pokedex">Pokedex</Link>
              <Link href="/equipe">Votre Equipe</Link>
            </Sidebar>
          )}
        </div>
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          {sidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
        {/* Content */}
        <div
          className={`transition-all duration-300 ease-in-out flex-1 flex justify-center`}
        >
          <Content sidebarOpen={sidebarOpen}>{children}</Content>
        </div>
      </div>
    </TeamContextProvider>
  );
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="sidebar"
      className={
        "h-full p-5 flex flex-col shrink-0 border-r-2 border-r-gray-200 bg-white w-64"
      }
    >
      {children}
    </div>
  );
}

function Content({
  children,
  sidebarOpen,
}: {
  children: React.ReactNode;
  sidebarOpen: boolean;
}) {
  return (
    <div
      id="page-container"
      className={`flex justify-center transition-all duration-300 ease-in-out ${
        sidebarOpen ? "w-[calc(100%-16rem)]" : "w-full"
      }`}
    >
      <div
        id="page-content"
        className="p-5 pb-12 min-h-screen w-full max-w-7xl"
      >
        {children}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className={"p-5 mb-2"}>
      <a href="/">
        <img src={logoUrl} height={120} width={120} alt="logo" />
      </a>
    </div>
  );
}
