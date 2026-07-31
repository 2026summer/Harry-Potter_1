import React, { useState } from 'react';
import { Question, HouseType } from '../types';
import { QuestionCard } from './QuestionCard';
import { User, Send, Search, Sparkles, Scroll, History, CheckCircle2, Heart } from 'lucide-react';

import harryReadingImg from '../assets/images/harry_reading_journal_1785475897781.jpg';

interface StudentFormProps {
  chapterNumber: number;
  chapterTitle: string;
  questions: Question[];
  studentHouse: HouseType;
  studentName: string;
  setStudentName: (name: string) => void;
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, text: string) => void;
  onSubmitJournal: () => void;
  isSubmitting: boolean;
  onSearchPrevious: (searchName: string, searchCh: number) => void;
  isSearching: boolean;
  hasPreviousMatch?: boolean;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  chapterNumber,
  chapterTitle,
  questions,
  studentHouse,
  studentName,
  setStudentName,
  answers,
  onAnswerChange,
  onSubmitJournal,
  isSubmitting,
  onSearchPrevious,
  isSearching,
  hasPreviousMatch,
}) => {
  const [searchNameInput, setSearchNameInput] = useState('');
  const [searchChapterInput, setSearchChapterInput] = useState(chapterNumber);

  const answeredCount = Object.values(answers).filter((a) => typeof a === 'string' && a.trim().length > 0).length;
  const isFormComplete = studentName.trim().length >= 2 && answeredCount === 5;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchNameInput.trim()) {
      onSearchPrevious(searchNameInput.trim(), searchChapterInput);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Student Identity & Previous Entry Search Card */}
      <div className="bg-white/95 border-2 border-amber-200/90 rounded-3xl p-5 sm:p-6 shadow-xl shadow-amber-100/50">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Harry Potter Reading Image Avatar */}
          <div className="hidden sm:block shrink-0">
            <img
              src={harryReadingImg}
              alt="Harry Potter Reading Journal"
              referrerPolicy="no-referrer"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-amber-300 shadow-md"
            />
          </div>

          {/* Student Name & House */}
          <div className="flex-1 w-full space-y-3">
            <label className="block text-xs font-serif font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-600" /> 학생 이름 입력 (Student Name)
            </label>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="예: 김호그 / Harry Potter"
                  className="w-full bg-amber-50/40 text-slate-900 placeholder-slate-400 font-serif text-base sm:text-lg font-bold border-2 border-amber-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100 transition-all shadow-inner"
                />
              </div>

              <div className="px-4 py-3 rounded-2xl bg-amber-100/80 border border-amber-300 text-xs font-serif font-bold text-amber-900 flex items-center gap-2 shrink-0 shadow-2xs">
                <span>기숙사 (House):</span>
                <span className="text-sm font-sans font-extrabold">{studentHouse}</span>
              </div>
            </div>
          </div>

          {/* Load Previous Answer Lookup Tool */}
          <div className="lg:w-80 bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-xs text-amber-900 font-serif font-bold">
              <span className="flex items-center gap-1">
                <History className="w-3.5 h-3.5 text-amber-600" /> 이전 제출 답안 조회
              </span>
            </div>

            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="text"
                value={searchNameInput}
                onChange={(e) => setSearchNameInput(e.target.value)}
                placeholder="학생 이름 입력"
                className="w-full bg-white text-xs text-slate-800 placeholder-slate-400 border border-amber-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={isSearching || !searchNameInput.trim()}
                className="px-3.5 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-bold rounded-xl text-xs transition-all shrink-0 flex items-center gap-1 disabled:opacity-50 shadow-2xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>조회</span>
              </button>
            </form>

            {hasPreviousMatch && (
              <p className="text-xs text-emerald-800 font-bold flex items-center gap-1 font-sans">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 이전 작성 기록을 불러왔습니다!
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-amber-100/60 p-3.5 rounded-2xl border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-serif text-slate-700">
        <span className="flex items-center gap-1.5 font-bold text-amber-900">
          <Scroll className="w-4 h-4 text-amber-600" /> Chapter {chapterNumber} 독해 문제 답변 작성 ({answeredCount} / 5개 완료)
        </span>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="w-full sm:w-48 bg-white h-3 rounded-full overflow-hidden border border-amber-300 shadow-inner">
            <div
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-rose-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(answeredCount / 5) * 100}%` }}
            />
          </div>
          <span className="font-bold text-amber-800 text-xs shrink-0">
            {Math.round((answeredCount / 5) * 100)}%
          </span>
        </div>
      </div>

      {/* 5 Questions Section */}
      <div className="space-y-5">
        {questions.map((q, idx) => (
          <QuestionCard
            key={q.id || `q-${idx}`}
            question={q}
            index={idx}
            answerText={answers[q.id] || ''}
            onAnswerChange={(text) => onAnswerChange(q.id, text)}
            disabled={isSubmitting}
          />
        ))}
      </div>

      {/* Submit Section */}
      <div className="bg-white/95 border-2 border-amber-200/90 rounded-3xl p-6 shadow-xl shadow-amber-100/50 text-center space-y-4">
        <div>
          <h3 className="text-lg font-serif font-bold text-slate-800 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" /> 리딩 저널 제출하기 (Submit Reading Journal)
          </h3>
          <p className="text-xs text-slate-600 mt-1 font-sans">
            제출된 저널은 호그와트 데이터베이스 및 구글 시트에 자동 보관됩니다.
          </p>
        </div>

        <button
          onClick={onSubmitJournal}
          disabled={!isFormComplete || isSubmitting}
          className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-serif font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 transition-all shadow-lg mx-auto border-2 ${
            isFormComplete && !isSubmitting
              ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-rose-400 hover:scale-105 text-slate-900 border-amber-300 shadow-amber-200 cursor-pointer'
              : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-slate-800 border-t-transparent rounded-full animate-spin" />
              <span>저널 저장 중...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5 text-slate-900" />
              <span>✨ 리딩 저널 제출하기 (Submit Journal)</span>
            </>
          )}
        </button>

        {!isFormComplete && (
          <p className="text-xs text-amber-800 font-bold italic">
            💡 학생 이름과 5개 질문에 대한 답변을 모두 작성하면 제출 버튼이 활성화됩니다.
          </p>
        )}
      </div>

    </div>
  );
};
