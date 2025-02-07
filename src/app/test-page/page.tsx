"use client";

import QuestionsStatus from "@/components/QuestionsStatus";
import QuestionList from "@/components/QuestionList";
import CategoryTypes from "@/components/CategoryTypes";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setIntialQuestionAttemptStatus } from "@/redux/slices/QuestionAttempt";
import { getAllCategory } from "@/redux/slices/categories";
import { getFibQuestion, getFibUserResponse } from "@/redux/slices/Fib";
import { setRearrangeQuestions } from "@/redux/slices/rearrange";
import { getMcqQuestions } from "@/redux/slices/mcqQuestions";
import { setTrueFalseQuestions } from "@/redux/slices/trueORFalseQuestions";
import { getQuestionsStatusObj } from "@/util/questionStatus";
import { transformMatch } from "@/util/transformeRearrange";
import React, { useEffect, useCallback, useState } from "react";
import Link from "next/link";
import axios from "axios";
import moment from "moment";
import { setTimer } from "@/redux/slices/timer";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/slices/user";
import { tableName } from "@/constants";

const Page = () => {
  const categories = useAppSelector((state) => state.categories.categories);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { chapterName } = useAppSelector((state) => state.chapter);
  const { userId } = useAppSelector((state) => state.user.user);
  console.log("userId", userId);

  // Define API calls using useCallback to prevent re-creating the function
  const callApis = useCallback(async () => {
    try {
      const [
        categoryResult,
        fibResponseJson,
        mcqResponseJson,
        trueOrfalse,
        rearrangeJson,
      ] = await Promise.all([
        axios.get("api/category").then((res) => res.data),
        axios.get("api/questions/fib").then((res) => res.data),
        axios.get("api/questions/mcq").then((res) => res.data),
        axios.get("api/questions/trueOrfalse").then((res) => res.data),
        axios.get("api/questions/rearrange").then((res) => res.data),
        axios
          .post("/api/answer/select", {
            tableName: "FIBUserAnswer",
            userId: userId,
          })
          .then((res) => dispatch(getFibUserResponse(res.data.data))),
      ]);
      const rearrange = transformMatch(rearrangeJson);
      const flatRearrangeData = rearrange.flatMap((x) => x.data);
      const allQuestions = [
        ...fibResponseJson,
        ...mcqResponseJson,
        ...trueOrfalse,
        ...flatRearrangeData,
      ];
      const questionsStatusData = getQuestionsStatusObj(allQuestions);
      dispatch(setIntialQuestionAttemptStatus(questionsStatusData));
      dispatch(getAllCategory(categoryResult));
      dispatch(getFibQuestion(fibResponseJson));
      dispatch(getMcqQuestions(mcqResponseJson));
      dispatch(setTrueFalseQuestions(trueOrfalse));
      dispatch(setRearrangeQuestions(rearrange));

      // Store categories locally (if necessary)
      localStorage.setItem("categories", JSON.stringify(categoryResult));
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response?.data || error.message
      );
    }
  }, [dispatch]);

  useEffect(() => {
    callApis();
  }, [callApis]);

  useEffect(() => {
    const endTime = new Date().getTime() + 60 * 60 * 1000;
    const interval = setInterval(() => {
      const diff = endTime - new Date().getTime();
      const hour = Math.floor((diff / (60 * 60 * 1000)) % 24);
      const min = Math.floor((diff / (60 * 1000)) % 60);
      const sec = Math.floor((diff / 1000) % 60);
      if (diff <= 0) {
        clearInterval(interval);
        router.push("/result");
      } else {
        dispatch(setTimer({ hour, min, sec }));
      }
    }, 1000);
  }, []);

  return (
    <>
      <div className="text-black flex justify-between items-start mt-2">
        <div className="w-1/6">
          <p className="border-b-2 border-black p-2">Paper Id:</p>
          <p className="border-b-2 border-black p-2">N02S</p>
          <p className="p-2">You are Viewing</p>
          <p>True/False</p>
        </div>
        <div className="flex justify-between">
          {categories?.map((x) => (
            <CategoryTypes
              key={x.category_id}
              categoryId={x.category_id}
              categoryFullName={x.category_full_name}
              categoryName={x.category_name}
            />
          ))}
        </div>
        <Link href="/result">END Exam</Link>
      </div>
      <div className="flex">
        <QuestionsStatus />
        <QuestionList />
      </div>
    </>
  );
};

export default React.memo(Page);
