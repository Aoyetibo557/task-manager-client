import React, { useContext } from "react";
import { ThemeContext } from "./_contexts/themecontext";
import Header from "./Header/header";
import Footer from "./Footer/footer";

type Props = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

PageLayout.getLayout = function getLayout(page: React.ReactNode) {
  return <PageLayout>{page}</PageLayout>;
};

export default PageLayout;
