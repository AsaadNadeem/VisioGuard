import React from "react";
import Header from "./header";
import Footer from "./footer";

const HomeLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
