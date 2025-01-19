import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="flex p-2 items-center bg-35a4b9">
      <div className="flex items-center w-1/2">
        <Image src="/assest/logo.png" height={80} width={80} alt="" />
        <p className="text-3xl font-semibold ml-8 text-white">
          Maharashtra state board of secondary and higher secondary education
        </p>
      </div>
      <div className="ml-24">
        <p className="font-bold text-black mb-6">Current Time: 10</p>
        <p className="font-bold text-black">Student Name: 10</p>
      </div>
    </div>
  );
};

export default Header;
