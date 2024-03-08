import React from "react";

import MainNavbar from "./MainNavbar";

export default function Header() {
  return (
    <header className="header-fade-in fixed  -top-[1px] z-50 w-full shadow-sm backdrop-blur-sm">
      <MainNavbar />
    </header>
  );
}
// -top-[1px] no deberia de ir
