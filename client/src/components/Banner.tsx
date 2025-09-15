import React from "react";

interface BannerProps {
  title?: string;
  subtitle?: string;
  bgColor?: string;
}

const Banner: React.FC<BannerProps> = ({
  title = "Welcome to Phone Store",
  subtitle = "Find the best phones at the best prices",
  bgColor = "bg-blue-500",
}) => {
  return (
    <div className={`${bgColor} p-8 text-center text-white`}>
      <h2 className="text-4xl font-bold">{title}</h2>
      {subtitle && <p className="mt-4 text-lg">{subtitle}</p>}
    </div>
  );
};

export default Banner;
