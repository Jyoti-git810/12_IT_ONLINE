"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCategoryType } from "@/redux/slices/categories";
import React from "react";

interface QusetionTypeProps {
  categoryId?: number | string;
  categoryFullName?: string;
  categoryName: string;
}

const CategoryTypes = ({
  categoryFullName,
  categoryName,
  categoryId,
}: QusetionTypeProps) => {
  const dispatch = useAppDispatch();
  const categoryType = useAppSelector((state) => state.categories.categoryName);
  const onButtonClick = () => {
    dispatch(setCategoryType({ categoryFullName, categoryName, categoryId }));
  };

  return (
    <button
      key={categoryId}
      className={`w-28 px-4 py-2 text-black box-border border-gray-400 border-2 mx-2 ${
        categoryType === categoryName ? "bg-ffa103" : "bg-white"
      }`}
      onClick={onButtonClick}
    >
      <p>Q{categoryId}.</p>
      <p>{categoryName}</p>
    </button>
  );
};

export default CategoryTypes;
