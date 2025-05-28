import React from "react";
import Header from "../components/Header.tsx"; // Or ../components/Header
import { Outlet } from "react-router-dom";
import Navlinks from "../components/Navlinks.tsx"; // Or ../components/Navlinks

const DashboardLayout = () => {
  return (
    // Removed justify-center as it might not be desired for a top-level layout
    <main className="m-0 p-0 flex flex-col">
      <Header />
      <Navlinks />

      {/* down part */}
      {/* Added container and mx-auto for centering content, consistent with shadcn/ui layouts */}
      <section className="container mx-auto mt-10 px-4">
        <Outlet />
      </section>
    </main>
  );
};

export default DashboardLayout;
