import "./style.css";

import "./tailwind.css";

import React from "react";
import logoUrl from "../assets/PokemonLogo.svg";
import { Link } from "../components/Link.js";
import { TeamContextProvider } from "../contexts/TeamContext";
export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TeamContextProvider>
      <div className={"flex m-auto"}>
        <Sidebar>
          <Logo />
          <Link href="/">Welcome</Link>
          <Link href="/pokedex">Pokedex</Link>
          <Link href="/equipe">Votre Equipe </Link>
          {""}
        </Sidebar>
        <Content>{children}</Content>
      </div>
    </TeamContextProvider>
  );
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="sidebar"
      className={"p-5 flex flex-col shrink-0 border-r-2 border-r-gray-200"}
    >
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container">
      <div id="page-content" className={"p-5 pb-12 min-h-screen"}>
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
