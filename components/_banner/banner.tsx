import React from "react";

interface BannerProps {
  imageName: string;
  bannerName: string;
  subBannerName?: string;
  theme: string | undefined;
}

const Banner: React.FC<BannerProps> = ({
  imageName,
  bannerName,
  subBannerName,
  theme,
}) => {
  return (
    <div
      className="bg-cover bg-center h-24 sm:h-4 md:h-48 lg:h-36 relative"
      style={{
        backgroundImage: `url(${imageName})`,
      }}>
      <div className="absolute top-1/2 transform lg:-translate-x-2/2 -translate-y-2/2 w-80 ">
        <div
          className={`text-sm font-light mb-2 ${
            theme === "light" ? "text-sidebar-dark" : "text-task-light-white"
          }`}>
          {subBannerName}
        </div>
        <div
          className={`text-2xl font-light ${
            theme === "light" ? "text-sidebar-dark" : "text-task-light-white"
          }`}>
          {bannerName}
        </div>
      </div>
    </div>
  );
};

export default Banner;
