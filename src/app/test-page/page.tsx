"use client";

import QuestionsStatus from "@/components/QuestionsStatus";
import QuestionList from "@/components/QuestionList";
import CategoryTypes from "@/components/CategoryTypes";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setIntialQuestionsStatus } from "@/redux/slices/questionsStatus";
import { getAllCategory } from "@/redux/slices/categories";
import { getFibQuestion } from "@/redux/slices/Fib";
import { setRearrangeQuestions } from "@/redux/slices/rearrange";
import { getMcqQuestions } from "@/redux/slices/mcqQuestions";
import { setTrueFalseQuestions } from "@/redux/slices/trueORFalseQuestions";
import { getQuestionsStatusObj } from "@/util/questionStatus";
import { transformMatch } from "@/util/transformeRearrange";
import React, { useEffect, useCallback, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { setTimer } from "@/redux/slices/timer";
import { useRouter } from "next/navigation";
import { getTableName } from "@/util/helper";
import { getUserStoredAnswer } from "@/redux/slices/userResponse";
import { getShortAnsSliceQuestions } from "@/redux/slices/short";
import { getProgrammeSliceQuestions } from "@/redux/slices/programme";

const Page = () => {
  const [QState, setQState] = useState({});
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const endTime = useRef<number>(Date.now() + 60 * 60 * 1000);
  const { categories, categoryName } = useAppSelector(
    (state) => state.categories
  );
  const { userId } = useAppSelector((state) => state.user.user);
  const examId = localStorage.getItem("examId");
  const { chapterID } = useAppSelector(
    (state) => state.chapter.chapterSelected
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Define API calls using useCallback to prevent re-creating the function
  const callApis = async () => {
    try {
      const [
        categoryResult,
        fibResponseJson,
        mcqResponseJson,
        trueOrfalse,
        rearrangeJson,
        shortAnsJson,
        programmeJson,
      ] = await Promise.all([
        axios.get("api/category").then((res) => res.data),
        axios.get(`api/questions/fib`).then((res) => res.data),
        axios
          .get(`api/questions/mcq/?chapterID=${chapterID}`)
          .then((res) => res.data),
        axios.get("api/questions/trueOrfalse").then((res) => res.data),
        axios.get("api/questions/rearrange").then((res) => res.data),
        axios.get("api/questions/short").then((res) => res.data),
        axios.get("api/questions/programme").then((res) => res.data),
      ]);
      const rearrange = transformMatch(rearrangeJson);
      const flatRearrangeData = rearrange.flatMap((x) => x.data);

      const allQuestions = [
        ...fibResponseJson,
        ...mcqResponseJson,
        ...trueOrfalse,
        ...flatRearrangeData,
        ...shortAnsJson,
        ...programmeJson,
      ];
      const questionsStatusData = getQuestionsStatusObj(allQuestions);
      setQState(questionsStatusData);
      dispatch(getAllCategory(categoryResult));
      dispatch(getFibQuestion(fibResponseJson));
      dispatch(getMcqQuestions(mcqResponseJson));
      dispatch(setTrueFalseQuestions(trueOrfalse));
      dispatch(setRearrangeQuestions(rearrange));
      dispatch(getShortAnsSliceQuestions(shortAnsJson));
      dispatch(getProgrammeSliceQuestions(programmeJson));

      // Store categories locally (if necessary)
      localStorage.setItem("categories", JSON.stringify(categoryResult));
      localStorage.setItem("FIB", JSON.stringify(fibResponseJson));
      setLoading(false);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response?.data || error.message
      );
    }
  };

  const callUserAnserApi = useCallback(async () => {
    axios
      .post("/api/answer/get_user_ans", {
        tableName: getTableName(categoryName),
        userId: userId,
        examId: examId,
      })
      .then((res) => dispatch(getUserStoredAnswer(res.data.data)))
      .catch((e) => console.log(e));
  }, [categoryName]);

  useEffect(() => {
    callApis();;''
    const timeoutId = setTimeout(() => {
      callApis();
    }, 60 * 60 * 1000); // 1 hour

    // Cleanup timeout when component unmounts or user logs out
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    callUserAnserApi();
  }, [callUserAnserApi]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Ensure previous interval is cleared
    }

    intervalRef.current = setInterval(() => {
      const diff = endTime.current - Date.now();
      if (diff <= 0) {
        clearInterval(intervalRef.current!);
        router.push("/result");
        return;
      }

      const hour = Math.floor((diff / (60 * 60 * 1000)) % 24);
      const min = Math.floor((diff / (60 * 1000)) % 60);
      const sec = Math.floor((diff / 1000) % 60);

      dispatch(setTimer({ hour, min, sec }));
    }, 1000);

    return () => clearInterval(intervalRef.current!); // Cleanup on unmount
  }, [dispatch, router]);
  useEffect(() => {
    dispatch(setIntialQuestionsStatus(QState));
  }, [QState]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-gray-500">Loading...</p>
      </div>
    );
  }
  return (
    <>
      <div className="text-black flex justify-between items-start mt-2">
        <div className="w-1/6">
          <p className="border-b-2 border-black p-2">Paper Id:</p>
          <p className="border-b-2 border-black p-2">N02S</p>
          <p className="p-2">You are Viewing</p>
          <p>True/False</p>
        </div>
        <div className="flex justify-between flex-col">
          <div>
            {categories?.map((x) => (
              <CategoryTypes
                key={x.category_id}
                categoryId={x.category_id}
                categoryFullName={x.category_full_name}
                categoryName={x.category_name}
              />
            ))}
          </div>
          <Link
            href="/result"
            className="bg-35a4b9 w-28 text-white text-center mt-8 mx-4 py-2"
          >
            End Exam
          </Link>
        </div>
      </div>
      <div className="flex">
        <QuestionsStatus />
        <QuestionList />
      </div>
    </>
  );
};

export default React.memo(Page);
