import React, { useState } from 'react';
import { Question, HouseType, StudentAnswer } from '../types';
import { QuestionCard } from './QuestionCard';
import { User, Send, Search, Sparkles, Scroll, History, CheckCircle2 } from 'lucide-react';

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
      <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
          
          {/* Student Name & House */}
          <div className="flex-1 space-y-3">
            <label className="block text-xs font-serif uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-400" /> Student Name (학생 이름 입력)
            </label>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="예: Harry Potter / 김철수"
                  className="w-full bg-slate-950/80 text-amber-100 placeholder-slate-500 font-serif text-base sm:text-lg border border-amber-500/50 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30 transition-all shadow-inner"
                />
              </div>

              <div className="px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-serif font-bold text-amber-300 flex items-center gap-2 shrink-0">
                <span>House:</span>
                <span className="text-sm font-sans">{studentHouse}</span>
              </div>
            </div>
          </div>

          {/* Load Previous Answer Lookup Tool */}
          <div className="lg:w-80 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs text-amber-300 font-serif font-semibold">
              <span className="flex items-center gap-1">
                <History className="w-3.5 h-3.5 text-amber-400" /> 이전 작성 답안 불러오기
              </span>
            </div>

            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="text"
                value={searchNameInput}
                onChange={(e) => setSearchNameInput(e.target.value)}
                placeholder="이름 검색"
                className="w-full bg-slate-900 text-xs text-slate-100 placeholder-slate-500 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={isSearching || !searchNameInput.trim()}
                className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1 disabled:opacity-50"
              >
                <Search className="w-3 h-3" />
                <span>조회</span>
              </button>
            </form>

            {hasPreviousMatch && (
              <p className="text-xs text-emerald-400 flex items-center gap-1 font-sans">
                <CheckCircle2 className="w-3 h-3" /> 이전 제출 답안을 성공적으로 불러왔습니다.
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Progress & Question Instructions Bar */}
      <div className="flex items-center justify-between px-2 text-xs font-serif text-slate-300">
        <span className="flex items-center gap-1.5 text-amber-300">
          <Scroll className="w-4 h-4 text-amber-400" /> Chapter {chapterNumber} Questions ({answeredCount} / 5 Completed)
        </span>
        <div className="w-32 sm:w-48 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-400 h-full transition-all duration-300"
            style={{ width: `${(answeredCount / 5) * 100}%` }}
          />
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
      <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-6 shadow-2xl backdrop-blur-md text-center space-y-4">
        <div>
          <h3 className="text-lg font-serif font-bold text-amber-300 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> 리딩 저널 제출 (Submit Journal)
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            제출 시 입력한 내용이 구글 시트 및 교사 데이터베이스에 기록됩니다.
          </p>
        </div>

        <button
          onClick={onSubmitJournal}
          disabled={!isFormComplete || isSubmitting}
          className={`w-full sm:w-auto px-8 py-4 rounded-xl font-serif font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 transition-all shadow-xl mx-auto border ${
            isFormComplete && !isSubmitting
              ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:scale-105 text-slate-950 border-amber-200 shadow-amber-500/30'
              : 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed opacity-60'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>구글 시트 저장 중 (Casting Spell...)...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5 text-slate-950" />
              <span>마법 저널 제출하기 (Submit to Google Sheets)</span>
            </>
          )}
        </button>

        {!isFormComplete && (
          <p className="text-xs text-amber-400/90 font-serif italic">
            * 학생 이름과 5개 질문에 대한 답변 작성을 완료해야 제출 버튼이 활성화됩니다.
          </p>
        )}
      </div>

    </div>
  );
};
