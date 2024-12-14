export interface MaterialResource {
  id: number;
  title: string;
  type: string;
  category: string;
  source: string;
  cover: string;
  content: string;
  description: string;
}

export interface MultipleChoice {
  id: number | null;
  question: string;
  choices: string[];
  answerKey: string;
  practiceLevel: string | number;
}
