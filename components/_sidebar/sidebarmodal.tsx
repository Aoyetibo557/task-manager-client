import React, { useContext, useState, Dispatch } from "react";
import { ThemeContext } from "../Layout/_contexts/themecontext";
import SlideIn from "../Utility/Modal/slidein";
import { SidebarLinks } from "../_sidebar/sidebarlinks";

type Props = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  onConfirm?: () => void;
};

export const SidebarModal = (props: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={``}>
      <SlideIn title="" open={props.open} theme={theme} setOpen={props.setOpen}>
        <SidebarLinks
          open={props.open}
          setOpen={props.setOpen}
          isMobileView={true}
        />
      </SlideIn>
    </div>
  );
};
