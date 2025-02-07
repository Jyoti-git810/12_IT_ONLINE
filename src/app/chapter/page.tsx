"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSelectedChapter } from "@/redux/slices/chapter";
import axios from "axios";
import moment from "moment";

const Chapter = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { chapter, chapterSelected } = useAppSelector((state) => state.chapter);
  const { userId } = useAppSelector((state) => state.user.user);

  const onChapSelect = (value: { chapterID: number; chapterName: string }) => {
    dispatch(getSelectedChapter(value));
  };
  const onTestStart = () => {
    const startDate = moment().format("YYYY-MM-DD HH:mm:ss");
    const endDate = moment().add(1, "hour").format("YYYY-MM-DD HH:mm:ss");
    console.log("startDate", chapterSelected);
    if (userId) {
      axios
        .post("/api/exam", {
          userId: userId,
          startDate: startDate,
          endDate: endDate,
          chapterId: chapterSelected.chapterID,
        })
        .then((res) => {
          localStorage.setItem("exameId", res.data.result[0].examId);
          router.push("/test-page");
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <div className="flex justify-center flex-col items-center mt-20">
      <Select onValueChange={onChapSelect}>
        <SelectTrigger className="w-80">
          <SelectValue placeholder="Select Chapter" />
        </SelectTrigger>
        <SelectContent>
          {chapter?.map((chap) => (
            <SelectItem value={chap}>{chap.chapterName}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-9"
        onClick={onTestStart}
      >
        START TEST
      </button>
    </div>
  );
};

export default Chapter;
