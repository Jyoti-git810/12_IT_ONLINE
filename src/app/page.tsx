"use client";

import { useAppDispatch } from "@/redux/hook";
import { setChapter } from "@/redux/slices/chapter";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Chapter from "./chapter/page";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const onGoToChapter = () => {
    axios
      .get("/api/chapter")
      .then((data) => {
        dispatch(setChapter(data.data.chapter));
        router.push("chapter");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="p-5 font-sans flex flex-col justify-center items-center">
      <table className="w-10/12 border-collapse border border-gray-300 mt-9">
        <thead>
          <tr>
            <th className="border border-gray-300"></th>
            <th className="border border-gray-300 p-2">
              <p className="text-purple-900 text-left">
                Colours And their Meaning
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="flex justify-center items-center py-2">
              <div className="bg-red-600 w-10 h-6"></div>
            </td>
            <td className="border border-gray-300 p-2 text-purple-900 font-bold">
              Answer not submitted.
            </td>
          </tr>
          <tr>
            <td className="border-t-1 border-gray-300 flex justify-center py-2">
              <div className="bg-green-700 w-10 h-6"></div>
            </td>
            <td className="border border-gray-300 p-2 text-purple-900 font-bold">
              Answer Submitted.
            </td>
          </tr>
          <tr>
            <td className="border-t-1 border-gray-300 flex justify-center py-2">
              <div className="bg-amber-500 w-10 h-6"></div>
            </td>
            <td className="border border-gray-300 p-2 text-purple-900 font-bold">
              Answer Attempt
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300 p-2 text-red-600 font-bold">
              Paper will display 10 mins before the exam but students cannot
              attempt it.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300 p-3 text-green-600 font-bold">
              If you Submit your answers and Relogin the System automatically
              detect and restore answer automatically.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300 p-3">
              <p className="text-purple-900 font-bold">
                Handicap Category Shown On The Top Right.
              </p>
              <ul className="list-none">
                <li className="text-purple-900 font-bold p-0">
                  HC 0 - No extra time.
                </li>
                <li className="text-purple-900 font-bold p-0">
                  HC 1,4 - 50 minutes extra time.
                </li>
                <li className="text-purple-900 font-bold p-0">
                  HC 2,3,8,9 - 30 minutes extra time.
                </li>
                <li className="text-purple-900 font-bold p-0">
                  HC 5 - 2 hours extra time.
                </li>
                <li className="text-purple-900 font-bold p-0">
                  HC 6,7 - 1 hour extra time.
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300 p-3 text-red-600 font-bold">
              <p>Submit Each and Every Question as you Solve It.</p>
              <p>Do Not Wait to Submit till last Minute.</p>
            </td>
          </tr>
        </tbody>
      </table>

      <Chapter />
    </div>
  );
}
