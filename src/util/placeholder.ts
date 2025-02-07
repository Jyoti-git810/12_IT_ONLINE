export const getPlaceholders = (values) => {
  const reqBodyArray = values.map((item) => [
    item.question_id,
    item.category_id,
    item.user_id,
    item.answer,
    item.chapter_id,
    item.chapter_name,
    item.examId,
  ]);
  const placeholderValues = reqBodyArray.flat();
  const placeholder = reqBodyArray.map(() => "(?,?,?,?,?,?,?)").join(", ");
  return { reqBodyArray, placeholder, placeholderValues };
};
