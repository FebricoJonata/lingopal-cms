export interface Question {
  quiz_id: number;
  question: string;
  answer_key: string;
  choices: string[];
  practice_code: string;
  course_name: string;
}
