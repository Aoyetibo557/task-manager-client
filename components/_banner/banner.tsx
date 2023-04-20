import React from "react";
import { Breadcrumb } from "antd";

interface BannerProps {
  imageName: string;
  bannerName: string;
  breadcrumblist?: string[] | { href: string; title: string }[];
  theme: string | undefined;
}

const Banner: React.FC<BannerProps> = ({
  imageName,
  bannerName,
  theme,
  breadcrumblist,
}) => {
  return (
    <div
      className="bg-cover bg-center h-24 sm:h-4 md:h-48 lg:h-36 relative banner"
      style={{
        backgroundImage: `url(${imageName})`,
      }}>
      <div className="absolute top-1/2 transform lg:-translate-x-2/2 -translate-y-2/2 w-80 ">
        <div
          className={`text-sm font-light mb-2 ${
            theme === "light" ? "text-sidebar-dark" : "text-task-light-white"
          }`}></div>
        <div
          className={`text-2xl text-center font-light ${
            theme === "light"
              ? "text-task-sidebar-dark"
              : "text-task-light-white"
          }`}>
          {bannerName}
        </div>
      </div>
    </div>
  );
};

export default Banner;
