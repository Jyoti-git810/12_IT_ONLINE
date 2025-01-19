interface RearrangeArray {
  QuestionID: number;
  leftPart: string;
  correctAnswer: string;
  category_id: number;
}

export const transformMatch = (RearrangePayload: RearrangeArray[]) => {
  function fisherYatesShuffle(array: (string | number)[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const correctAnswers = RearrangePayload.map((q) => q.correctAnswer);
  const shuffle = fisherYatesShuffle(correctAnswers);
  const result = RearrangePayload.reduce<any[]>((acc, item, index) => {
    const newRearrangeObj = { ...item, correctAnswer: shuffle[index] };
    if (acc.length === 0) {
      acc.push({ category_id: 7, data: [newRearrangeObj] });
    } else {
      acc[0].data.push(newRearrangeObj);
    }
    return acc;
  }, []);
  return result;
};
