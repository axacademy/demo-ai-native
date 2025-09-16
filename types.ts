
export interface Question {
  id: string;
  text: string;
}

export interface Category {
  id: string;
  title: string;
  shortTitle: string;
  questions: Question[];
}

export type Scores = {
  [questionId: string]: number;
};