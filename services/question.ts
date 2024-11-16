import { Question } from "@/types/question";

export const getQuestion = async (
  courseCategoryID: number
): Promise<Question[]> => {
  try {
    const response = await fetch(
      `https://lingo-pal-backend-v1.vercel.app/api/quiz/admin?course_category_id=${courseCategoryID}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch : ${response.statusText}`);
    }

    const data = await response.json();

    const questions = data.data.map((question: Question, idx: number) => ({
      idx: idx + 1,
      quiz_id: question.quiz_id,
      question: question.question,
      answer_key: question.answer_key,
      choices: question.choices,
      course_name: question.course_name,
      practice_code: question.practice_code,
    }));

    console.log("Question: ", questions);
    return questions;
  } catch (error) {
    console.error("Error fetching question: ", error);
    return [];
  }
};
