import FooterNavbar from "./footernavbar";

const Footer = () => {
  return (
    <div className="golos-font flex flex-row items-center justify-between border-t-[0.9px] border-neutral-200 p-2 w-full fixed bottom-5">
      <div className="flex flex-row items center gap-4">
        <span className="font-bold text-task-blue">Tassker</span>
        <span>&copy; 2023 Tasskker Inc. Allrights reserved</span>
      </div>
      <div>
        <FooterNavbar />
      </div>
    </div>
  );
};

export default Footer;
