interface SQLMappingType {
  mcq: string;
  fib: string;
  rearrange: string;
  trueFalse: string;
}

export const fetchMarksSqlQueryMapping: SQLMappingType = {
  mcq: `SELECT mq.QuestionText, mq.QuestionID,mq.CorrectOptions,mq.category_id,mq.Marks,MCQAns.answer as userAnswer,MCQAns.QuestionID as answeredQustionID,MCQAns.category_id as answredQuestionCategoryId,MCQAns.userID FROM MCQQuestions mq
        INNER JOIN McqUserAnswers MCQAns
        on mq.QuestionID=MCQAns.QuestionID
        WHERE MCQAns.userID=1;`,

  fib: `SELECT fib.QuestionText, fib.QuestionID,fib.CorrectAnswer,fib.category_id,fib.Marks,fu.answer as userAnswer,fu.QuestionID as answeredQustionID,fu.category_id as answredQuestionID,fu.userID FROM  FIB fib
    INNER JOIN FIBUserAnswer fu
    on fib.QuestionID=fu.QuestionID
    WHERE fu.userID=1;`,

  rearrange: `SELECT RQ.leftPart, RQ.QuestionID,RQ.CorrectAnswer,RQ.category_id,RQ.Marks,RAnswer.answer as userAnswer,RAnswer.QuestionID as answeredQustionID,RAnswer.category_id as answredQuestionCategoryId,RAnswer.userID FROM RearrangeQuestions RQ
                INNER JOIN RearrangeUserAnswer RAnswer
                on RQ.QuestionID=RAnswer.QuestionID
                WHERE RAnswer.userID=1;`,

  trueFalse: `SELECT t.QuestionText, t.QuestionID,t.CorrectAnswer,t.category_id,t.Marks,tu.answer as userAnswer,tu.QuestionID as answeredQustionID,tu.category_id as answredQuestionCategoryId,tu.userID FROM TruOrFalse t
        INNER JOIN TruFalseUserAnswer tu
        on t.QuestionID=tu.QuestionID
        WHERE tu.userID=1;`,
};

export const mcqPreviewSQL = `SELECT mq.QuestionText, mq.QuestionID,mq.CorrectOptions,mq.category_id,mq.Marks,MCQAns.answer as userAnswer,MCQAns.QuestionID as answeredQustionID,MCQAns.category_id as answredQuestionCategoryId,MCQAns.userID FROM MCQQuestions mq
        LEFT JOIN McqUserAnswers MCQAns
        on mq.QuestionID=MCQAns.QuestionID AND MCQAns.userID=1`;

export const fibPreviewSQL = `SELECT fib.QuestionText, fib.QuestionID,fib.CorrectAnswer,fib.category_id,fib.Marks,fu.answer as userAnswer,fu.QuestionID as answeredQustionID,fu.category_id as answredQuestionID,fu.userID FROM  FIB fib
    LEFT JOIN FIBUserAnswer fu
    on fib.QuestionID=fu.QuestionID AND fu.userID=1`;

export const rearrangePreviewSQL = `SELECT RQ.leftPart as QuestionText, RQ.QuestionID,RQ.CorrectAnswer,RQ.category_id,RQ.Marks,RAnswer.answer as userAnswer,RAnswer.QuestionID as answeredQustionID,RAnswer.category_id as answredQuestionCategoryId,RAnswer.userID FROM RearrangeQuestions RQ
                LEFT JOIN RearrangeUserAnswer RAnswer
                on RQ.QuestionID=RAnswer.QuestionID AND RAnswer.userID = 1`;

export const trueFalsePreview = `SELECT t.QuestionText, t.QuestionID,t.CorrectAnswer,t.category_id,t.Marks,tu.answer as userAnswer,tu.QuestionID as answeredQustionID,tu.category_id as answredQuestionCategoryId,tu.userID FROM TruOrFalse t
        LEFT JOIN TruFalseUserAnswer tu
        on t.QuestionID=tu.QuestionID AND tu.userID=1`;
