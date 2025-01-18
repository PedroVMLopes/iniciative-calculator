import React from "react";
import Tests from "./Tests/Tests";
import Party from "./Party/Party";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import { SiDungeonsanddragons } from "react-icons/si";

const TestsContent = () => <Tests />;

const NavBar = () => {
  const location = useLocation();
  const links = [
    {
      label: "Testes",
      path: "/",
    },
    {
      label: "NPC's",
      path: "/npcs",
    },
    {
      label: "Tesouros",
      path: "/treasures",
    },
    {
      label: "Party",
      path: "/party",
    },
    {
      label: "Regras da Casa",
      path: "/houseRules",
    },
  ];

  return (
    <nav
      className={`relative grid grid-cols-${links.length} gap-[1px] py-2 px-0 rounded-md max-w-2xl text-[var(--bege)] font-bold shadow-lg`}
      id="navbar"
    >
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`py-3 px-2 flex justify-center bg-[var(--cinza-escuro)]`}
        >
          {link.label}
        </Link>
      ))}

      {/* Barra de destaque de baixo */}
      {/*
      <div
        className={`absolute h-1 bottom-0 bg-[var(--amarelo)] bg-opacity-20 transition-all duration-300 rounded-md`}
        style={{
          width: `${100 / links.length}%`,
          left: `${
            (links.findIndex((l) => l.path === location.pathname) || 0) *
            (100 / links.length)
          }%`,
        }}
      ></div>
      */}

      <div
        className={`absolute flex top-0 text-[var(--amarelo)] transition-all duration-300 justify-center items-center`}
        style={{
          width: `${100 / links.length}%`,
          left: `${
            (links.findIndex((l) => l.path === location.pathname) || 0) *
            (100 / links.length)
          }%`,
        }}
      >
        <SiDungeonsanddragons />
      </div>
    </nav>
  );
};

const Main = () => {
  return (
    <Router>
      <div
        className="flex flex-col items-center w-full xl:pl-[32%] lg:pl-[37%] sm:pl-[42%]  p-3"
        id="main"
      >
        <NavBar />
        <div className="flex justify-center mt-3 w-[98%]" id="content">
          <Routes>
            <Route path="/" element={<TestsContent />} />
            <Route path="/party" element={<Party />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Main;
