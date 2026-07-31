export type QuestionType = 'factual' | 'inferential' | 'opinion';
export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

export interface Question {
  id: string;
  number: number;
  type: QuestionType;
  typeLabel: string; // e.g. "Fact Check (2/2)", "Inferential Thinking (2/2)", "Personal Opinion (1/1)"
  questionText: string;
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
