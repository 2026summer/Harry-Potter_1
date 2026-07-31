export type QuestionType = 'factual' | 'inferential' | 'opinion';
export type QuestionFormat = 'multiple_choice' | 'short_answer';
export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

export interface Question {
  id: string;
  number: number;
  type: QuestionType;
  format?: QuestionFormat; // 'multiple_choice' or 'short_answer'
  typeLabel: string;
  questionText: string;
  koreanTranslation?: string;
  options?: string[]; // 4 options for multiple_choice
  correctOptionIndex?: number; // 0-based index for correct option
  explanation?: string; // Answer explanation and breakdown in Korean
  hint?: string;
  sampleKeywords?: string[];
  difficulty?: DifficultyLevel;
}

export interface ChapterInfo {
  number: number;
  title: string;
  subtitle: string;
  summaryContext: string;
  keyTopics: string[];
  defaultQuestions: Question[];
}

export type HouseType = 'Gryffindor' | 'Ravenclaw' | 'Hufflepuff' | 'Slytherin';

export interface StudentAnswer {
  questionId: string;
  questionText: string;
  questionType: QuestionType;
  answerText: string;
}

export interface Submission {
  id: string;
  studentName: string;
  studentHouse: HouseType;
  chapterNumber: number;
  chapterTitle: string;
  answers: StudentAnswer[];
  submittedAt: string; // ISO string
  teacherGrade?: 'O' | 'E' | 'A' | 'P' | 'D' | 'T'; // Outstanding, Exceeds Expectations, Acceptable, Poor, Dreadful, Troll
  teacherFeedback?: string;
  syncedToGoogleSheets?: boolean;
}

export interface GasConfig {
  webAppUrl: string;
  isConfigured: boolean;
}

export interface FetchQuestionsResponse {
  success: boolean;
  questions?: Question[];
  chapterNumber: number;
  isAiGenerated?: boolean;
  error?: string;
}

export interface GasSubmissionPayload {
  action: 'submit' | 'search' | 'get_all' | 'feedback';
  studentName?: string;
  studentHouse?: string;
  chapterNumber?: number;
  chapterTitle?: string;
  answersJson?: string;
  submittedAt?: string;
  teacherGrade?: string;
  teacherFeedback?: string;
  submissionId?: string;
}
