import React from 'react'
import LogoImg from './img/f-icon.png';

export const Header = () => {
  return (
    <nav className="flex items-center bg-teal-500 p-6 border-b-2">
      <img
        alt=""
        src={LogoImg}
        width="40"
        height="40"
      />{" "}
      <span className="font-semibold text-xl tracking-tight">MPG team builder</span>

    </nav>
  );
}
