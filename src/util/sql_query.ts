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
        WHERE MCQAns.userID=? AND MCQAns.examId=?`,

  fib: `SELECT fib.QuestionText, fib.QuestionID,fib.CorrectAnswer,fib.category_id,fib.Marks,fu.answer as userAnswer,fu.QuestionID as answeredQustionID,fu.category_id as answredQuestionID,fu.userID FROM  FIB fib
    INNER JOIN FIBUserAnswer fu
    on fib.QuestionID=fu.QuestionID
    WHERE fu.userID=? AND fu.examId=?;`,

  rearrange: `SELECT RQ.leftPart, RQ.QuestionID,RQ.CorrectAnswer,RQ.category_id,RQ.Marks,RAnswer.answer as userAnswer,RAnswer.QuestionID as answeredQustionID,RAnswer.category_id as answredQuestionCategoryId,RAnswer.userID FROM RearrangeQuestions RQ
                INNER JOIN RearrangeUserAnswer RAnswer
                on RQ.QuestionID=RAnswer.QuestionID
                WHERE RAnswer.userID=? AND RAnswer.examId=?;`,

  trueFalse: `SELECT t.QuestionText, t.QuestionID,t.CorrectAnswer,t.category_id,t.Marks,tu.answer as userAnswer,tu.QuestionID as answeredQustionID,tu.category_id as answredQuestionCategoryId,tu.userID FROM TruOrFalse t
        INNER JOIN TruFalseUserAnswer tu
        on t.QuestionID=tu.QuestionID
        WHERE tu.userID=? AND tu.examId=?;`,
};

export const mcqPreviewSQL = `SELECT mq.QuestionText, mq.QuestionID,mq.CorrectOptions,mq.category_id,mq.Marks,MCQAns.answer as userAnswer,MCQAns.QuestionID as answeredQustionID,MCQAns.category_id as answredQuestionCategoryId,MCQAns.userID FROM MCQQuestions mq
        LEFT JOIN McqUserAnswers MCQAns
        on mq.QuestionID=MCQAns.QuestionID AND MCQAns.userID=? AND MCQAns.examId=?`;

export const fibPreviewSQL = `SELECT fib.QuestionText, fib.QuestionID,fib.CorrectAnswer,fib.category_id,fib.Marks,fu.answer as userAnswer,fu.QuestionID as answeredQustionID,fu.category_id as answredQuestionID,fu.userID FROM  FIB fib
    LEFT JOIN FIBUserAnswer fu
    on fib.QuestionID=fu.QuestionID AND fu.userID=? AND fu.examId=?`;

export const rearrangePreviewSQL = `SELECT RQ.leftPart as QuestionText, RQ.QuestionID,RQ.CorrectAnswer,RQ.category_id,RQ.Marks,RAnswer.answer as userAnswer,RAnswer.QuestionID as answeredQustionID,RAnswer.category_id as answredQuestionCategoryId,RAnswer.userID FROM RearrangeQuestions RQ
                LEFT JOIN RearrangeUserAnswer RAnswer
                on RQ.QuestionID=RAnswer.QuestionID AND RAnswer.userID = ? AND RAnswer.examId=?`;

export const trueFalsePreview = `SELECT t.QuestionText, t.QuestionID,t.CorrectAnswer,t.category_id,t.Marks,tu.answer as userAnswer,tu.QuestionID as answeredQustionID,tu.category_id as answredQuestionCategoryId,tu.userID FROM TruOrFalse t
        LEFT JOIN TruFalseUserAnswer tu
        on t.QuestionID=tu.QuestionID AND tu.userID=? AND tu.examId `;
export const shortPreviewSQL = `SELECT sa.QuestionText, sa.QuestionID,sa.category_id,sa.Marks,suAns.answer as userAnswer,suAns.QuestionID as answeredQustionID,suAns.category_id as answredQuestionID,suAns.userID FROM  shortAns sa
    LEFT JOIN shortUserAnswer suAns
    on sa.QuestionID=sa.QuestionID AND suAns.userID=? AND suAns.examId=?`;
export const programmePreviewSQL = `SELECT p.QuestionText, p.QuestionID,p.category_id,p.Marks,pu.answer as userAnswer,pu.QuestionID as answeredQustionID,pu.category_id as answredQuestionID,pu.userID FROM  programe p
    LEFT JOIN programeUserAnswers pu
    on p.QuestionID=p.QuestionID AND pu.userID=? AND pu.examId=?`;
