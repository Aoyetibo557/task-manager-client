import React, { useContext } from "react";
import { ThemeContext } from "./_contexts/themecontext";
import Header from "./Header/header";
import Footer from "./Footer/footer";

const PageLayout = ({ children }: props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;
