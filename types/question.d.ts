export interface Question {
  quiz_id: number;
  question: string;
  answer_key: string;
  choices: string[];
  practice_code: string;
  practice_id: number;
  course_name: string;
  course_description: string;
}

export interface MultipleChoice {
  id: number | null;
  question: string;
  choices: string[];
  answerKey: string;
  practiceLevel: string | number;
}
