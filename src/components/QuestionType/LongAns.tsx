import { Textarea } from "@nextui-org/react";
import React from "react";

interface LongAnsProps {
  questions: [{}];
}
const LongAns = () => {
  return (
    <div className="text-black flex border-1 border-gray-400 items-center">
      <p className="p-4">Q1</p>
      <div className="border-l border-gray-400">
        <p className="p-4">
          The _________ attribute of input tag specifies whether a form or input
          field should have auto completed on or off.
        </p>
        <Textarea
          isRequired
          className="border-1 m-4 border-gray-300 rounded-md h-40"
        />
      </div>
    </div>
  );
};

export default LongAns;
