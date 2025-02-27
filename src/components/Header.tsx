"use client";

import { showStudentName, showTimer } from "@/constants";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const { hour, min, sec } = useAppSelector((state) => state.timerReducer);
  const { name } = useAppSelector((state) => state.user.user);
  const { chapterName } = useAppSelector(
    (state) => state.chapter.chapterSelected
  );
  const pathname = usePathname();
  return (
    <div className="flex p-2 items-center bg-35a4b9">
      <div className="flex items-center w-1/2">
        <Link href="/">
          <Image src="/assest/logo.png" height={130} width={130} alt="" />
        </Link>
        <p className="text-3xl font-semibold ml-8 text-white">
          Maharashtra state board of secondary and higher secondary education
        </p>
      </div>
      <div className="ml-24">
        {showTimer.includes(pathname) && (
          <p className="font-bold text-black">
            Current Time:{" "}
            <span
              className={`font-bold text-black  ${
                min <= 10 ? "text-red-700" : ""
              }`}
            >
              {hour}:{min.toString().padStart(2, "0")}:
              {sec.toString().padStart(2, "0")}
            </span>
          </p>
        )}
        {showStudentName.includes(pathname) && (
          <div>
            <p className="font-bold text-black">
              Student Name: {name.toUpperCase()}
            </p>
            <p className="font-bold">Chapter Name: {chapterName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
