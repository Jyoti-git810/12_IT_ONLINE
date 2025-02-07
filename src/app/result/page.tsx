"use client";

import CategoryTypes from "@/components/CategoryTypes";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React, { useEffect } from "react";
import { setMarks } from "@/redux/slices/marks";
import Preview from "@/components/Preview";
import Image from "next/image";

const page = () => {
  const { categories, categoryId } = useAppSelector(
    (state) => state.categories
  );
  const storedCategories = JSON.parse(localStorage.getItem("categories") || "");
  const allCategories = storedCategories || categories;
  const { totalMarks } = useAppSelector((state) => state.marks);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const callResultApis = async () => {
      try {
        const [mcqMarks, rearrangeMarks, fibMarks, trueFalseMarks, preview] =
          await Promise.all([
            fetch(`api/marks?key=mcq`).then((marks) => marks.json()),
            fetch("api/marks?key=rearrange").then((marks) => marks.json()),
            fetch("api/marks?key=fib").then((marks) => marks.json()),
            fetch("api/marks?key=trueFalse").then((marks) => marks.json()),
            fetch(`api/preview`).then((marks) => marks.json()),
          ]);

        const categoryViseMarksObj = {
          ...fibMarks,
          ...mcqMarks,
          ...rearrangeMarks,
          ...trueFalseMarks,
        };
        dispatch(
          setMarks({
            ...categoryViseMarksObj,
            previewQuestionsArray: preview,
          })
        );
      } catch (e) {
        console.log(e);
      }
    };
    callResultApis();
  }, []);

  return (
    <div className="p-4">
      <div className="text-black flex justify-center mt-2">
        <div className="flex justify-between">
          {allCategories?.map((x: any) => (
            <CategoryTypes
              key={x.category_id}
              categoryId={x.category_id}
              categoryFullName={x.category_full_name}
              categoryName={x.category_name}
            />
          ))}
        </div>
        <div className="flex items-center ml-8">
          <Image width={20} height={20} src="/assest/trophy.png" alt="score" />
          <p className="ml-4 font-bold">Total Score {totalMarks}/100</p>
        </div>
      </div>
      <div className="m-2">
        <Preview categoryID={categoryId} />
      </div>
    </div>
  );
};

export default React.memo(page);
