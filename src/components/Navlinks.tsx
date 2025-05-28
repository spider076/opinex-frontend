import React from "react";
import { NavLink } from "react-router-dom";

const Navlinks = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-foreground font-semibold" : ""
    }`;

  return (
    <nav className="flex items-center w-full gap-x-4 border-b border-border bg-card">
      <NavLink to="/" className={getNavLinkClass}>
        Active Question
      </NavLink>
      <NavLink to="/questions" className={getNavLinkClass}>
        Questions
      </NavLink>
      <NavLink to="/trades" className={getNavLinkClass}>
        Your Trades
      </NavLink>
      <NavLink to="/chat" className={getNavLinkClass}>
        Chat
      </NavLink>
    </nav>
  );
};

export default Navlinks;
