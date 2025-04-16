import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Navlinks from "../components/Navlinks";

const DashboardLayout = () => {
  return (
    <main className="m-0 p-0 flex flex-col justify-center gap-11">
      <Header />
      <Navlinks />

      {/* down part */}
      <section className="mt-10">
        <Outlet />
      </section>
    </main>
  );
};

export default DashboardLayout;
