export type Difficulty = 'easy' | 'medium' | 'hard';
export type Topic = 'algebra' | 'geometry' | 'advanced' | 'problem' | 'random';

export interface Question {
  id: number;
  difficulty: Difficulty;
  topic: Topic;
  question: string;
  choices: string[];
  answer: number; // index of correct answer
  explanation?: string;
}

export const questions: Question[] = [
  {
    id: 1,
    difficulty: 'easy',
    topic: 'algebra',
    question: 'What is 10% of 100?',
    choices: ['1', '5', '10', '15'],
    answer: 2,
  },
  {
    id: 2,
    difficulty: 'easy',
    topic: 'algebra',
    question: 'What is 25% of 80?',
    choices: ['15', '18', '20', '25'],
    answer: 2,
  },
  {
    id: 3,
    difficulty: 'easy',
    topic: 'algebra',
    question: 'What is 1/4 of 60?',
    choices: ['10', '12', '15', '20'],
    answer: 2,
  },
  {
    id: 4,
    difficulty: 'medium',
    topic: 'algebra',
    question: 'If a shirt costs $40 and is discounted by 10%, what is the sale price?',
    choices: ['$36', '$38', '$34', '$32'],
    answer: 0,
  },
  {
    id: 5,
    difficulty: 'medium',
    topic: 'algebra',
    question: 'What is 30% of 50?',
    choices: ['10', '12', '15', '20'],
    answer: 2,
  },
  {
    id: 6,
    difficulty: 'medium',
    topic: 'algebra',
    question: 'What is 2/5 of 25?',
    choices: ['5', '8', '10', '12'],
    answer: 2,
  },
  {
    id: 7,
    difficulty: 'hard',
    topic: 'algebra',
    question: 'If you have 3/4 of a pizza and eat 1/2 of what you have, how much pizza is left?',
    choices: ['1/4', '3/8', '1/2', '3/4'],
    answer: 1,
  },
  {
    id: 8,
    difficulty: 'hard',
    topic: 'algebra',
    question: 'What is 60 increased by 20%?',
    choices: ['66', '70', '72', '80'],
    answer: 2,
  },
  {
    id: 9,
    difficulty: 'hard',
    topic: 'algebra',
    question: 'If 10% of x is 5, what is x?',
    choices: ['10', '20', '50', '100'],
    answer: 3,
  },
  {
    id: 10,
    difficulty: 'hard',
    topic: 'algebra',
    question: 'If a number is decreased by 25% and the result is 60, what was the original number?',
    choices: ['75', '80', '85', '90'],
    answer: 1,
  },
]; 