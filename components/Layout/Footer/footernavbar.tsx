import React, { useContext } from "react";
import { MenuItem } from "../Header/Navbar/menuItem";
import { ThemeContext } from "../_contexts/themecontext";
import { useRouter } from "next/router";

const FooterNavbar = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const path = router.pathname.toLowerCase();
  return (
    <div className="flex flex-row space-x-2">
      <MenuItem
        url="/terms"
        title="Terms of Use"
        theme={theme}
        isActive={path.includes("terms")}
      />

      <MenuItem
        url="/privacy"
        title="Privacy"
        theme={theme}
        isActive={path.includes("privacy")}
      />
      <MenuItem
        url="/contact"
        title="Contact"
        theme={theme}
        isActive={path.includes("contact")}
      />
      <MenuItem
        url="/cookie"
        title="Cookie Preferences"
        theme={theme}
        isActive={path.includes("cookie")}
      />
    </div>
  );
};

export default FooterNavbar;
