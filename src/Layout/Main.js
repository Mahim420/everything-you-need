import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "../Page/SharedItems/Navbar/Navbar";
import Footer from "../Page/SharedItems/Footer/Footer";

const Main = () => {
  return (
    <div>
      <section className="sticky top-0 z-10">
        <Navbar></Navbar>
      </section>
      <section className="mb-24 mx-8">
        <Outlet></Outlet>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default Main;
