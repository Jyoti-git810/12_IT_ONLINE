//import { RearrangeQue } from "@/constant/questions";
import { useAnswerHandler } from "@/hooks/useAnswerHandler";
import { useAppSelector } from "@/redux/hook";
import { ChangeEvent } from "react";
import SubmitBtn from "../submitBtn";

interface RearrangePropsType {
  categoryId: number;
}

const Rearrange = ({ categoryId }: RearrangePropsType) => {
  const { answers, handleAnswerChange } = useAnswerHandler(categoryId);
  const rearrangeQuestions = useAppSelector(
    (state) => state.rearrangeReducer.rearrangeQuestions
  );
  const onInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    QuestionID: number
  ) => {
    const value = event.target.value;
    handleAnswerChange(value, QuestionID);
  };
  return (
    <div>
      <h1 className="text-xl">Match the follwoing</h1>
      {rearrangeQuestions.map((x: any, id) => (
        <div className="border-1 border-gray-400 mt-8" key={id}>
          <div>
            <p className="border-b-1 border-gray-400 p-6">
              Q{id + 1} <span className="ml-4">{x.QuestionText}</span>
            </p>

            <div className="flex justify-between w-2/4 mb-8 p-6">
              <ol className="ol-alpha">
                {x.data.map((y: any) => (
                  <li key={id}>{y.leftPart}</li>
                ))}
              </ol>

              <ol className="list-decimal">
                {x.data.map((y: any) => (
                  <li key={id}>{y.correctAnswer}</li>
                ))}
              </ol>
            </div>
            <h1 className="p-4">Answer</h1>
            <div className="flex flex-col mt-4 p-6">
              <ol className="ol-alpha">
                {x.data.map((x: any, id: number) => (
                  <li key={id}>
                    <input
                      type="text"
                      className="w-16 ml-2"
                      onChange={(event) => onInputChange(event, x.QuestionID)}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      ))}
      <SubmitBtn answerArray={answers} />
    </div>
  );
};

export default Rearrange;
