export const transformMcqAns = (
  userAnswer,
  CorrectAnswer,
  catId,
  CorrectOptions
) => {
  const mcqCatIds = [3, 4, 5, 6];
  let userRes;
  let correctAns;
  console.log("serAnswer, CorrectAnswer", userAnswer, CorrectOptions);
  if (mcqCatIds.includes(catId)) {
    userRes = userAnswer && JSON.parse(userAnswer).join().toUpperCase();
    correctAns =
      CorrectOptions && JSON.parse(CorrectOptions).join().toUpperCase();
  } else if (catId === 2) {
    userRes = userAnswer === 1 ? "TRUE" : "FALSE";
    correctAns = CorrectAnswer === 1 ? "TRUE" : "FALSE";
  } else {
    userRes = userAnswer && userAnswer.toUpperCase();
    correctAns = CorrectAnswer && CorrectAnswer.toUpperCase();
  }
  return { userRes, correctAns };
};
