import React, { useState } from 'react';
import { Question } from '../types';
import { HelpCircle, Sparkles, CheckCircle2, MessageSquare, BookCheck, Lightbulb } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  index: number;
  answerText: string;
  onAnswerChange: (text: string) => void;
  disabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  answerText,
  onAnswerChange,
  disabled = false,
}) => {
  const [showHint, setShowHint] = useState(false);
  const [showKorean, setShowKorean] = useState(false);

  // Pastel Badge styling based on question type
  const typeBadgeStyles = {
    factual: {
      bg: 'bg-sky-100 text-sky-900 border-sky-300',
      icon: BookCheck,
      categoryLabel: '사실 확인 질문',
      subLabel: 'Factual Question',
    },
    inferential: {
      bg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      icon: Lightbulb,
      categoryLabel: '문맥 추론 질문',
      subLabel: 'Inferential Question',
    },
    opinion: {
      bg: 'bg-rose-100 text-rose-900 border-rose-300',
      icon: MessageSquare,
      categoryLabel: '나의 생각 및 의견',
      subLabel: 'Personal Opinion',
    },
  }[question.type] || {
    bg: 'bg-amber-100 text-amber-900 border-amber-300',
    icon: Sparkles,
    categoryLabel: '독해 이해도 질문',
    subLabel: 'Comprehension',
  };

  const IconComponent = typeBadgeStyles.icon;

  const difficultyBadge = {
    EASY: { text: '난이도: 하 (기초)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    MEDIUM: { text: '난이도: 중 (표준)', color: 'bg-amber-100 text-amber-900 border-amber-300' },
    HARD: { text: '난이도: 상 (심화)', color: 'bg-rose-100 text-rose-900 border-rose-300' },
  }[question.difficulty || 'MEDIUM'];

  const wordCount = answerText.trim() ? answerText.trim().split(/\s+/).length : 0;
  const charCount = answerText.length;

  return (
    <div className="bg-white/95 border-2 border-amber-200/90 hover:border-amber-300 transition-all rounded-3xl p-5 sm:p-6 shadow-xl shadow-amber-100/50 relative">
      
      {/* Question Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        
        {/* Type Badge & Difficulty Tag */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-3.5 py-1.5 rounded-2xl text-xs font-serif font-bold border-2 flex items-center gap-1.5 shadow-2xs ${typeBadgeStyles.bg}`}>
            <IconComponent className="w-3.5 h-3.5 shrink-0" />
            <span>질문 {index + 1}. [{typeBadgeStyles.categoryLabel}] {typeBadgeStyles.subLabel}</span>
          </span>

          <span className={`px-2.5 py-1 rounded-xl text-xs font-sans font-semibold border ${difficultyBadge.color}`}>
            {difficultyBadge.text}
          </span>
        </div>

        {/* Word Counter */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>{wordCount} 단어</span>
          <span>•</span>
          <span>{charCount} 자</span>
          {wordCount >= 8 && (
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 충실한 답변!
            </span>
          )}
        </div>

      </div>

      {/* Question Text with '한국어' Translation Button */}
      <div className="bg-amber-50/60 border-2 border-amber-200/90 rounded-2xl p-4 mb-4 shadow-2xs">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base sm:text-lg font-serif font-extrabold text-slate-800 leading-snug flex-1">
            {question.questionText}
          </h3>

          <button
            type="button"
            onClick={() => setShowKorean(!showKorean)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-sm active:scale-95 ${
              showKorean
                ? 'bg-amber-500 text-slate-950 border-amber-600 ring-2 ring-amber-200 shadow-amber-100 font-extrabold'
                : 'bg-white hover:bg-amber-100 text-amber-900 border-amber-300 hover:border-amber-400'
            }`}
          >
            <span>🌐</span>
            <span>{showKorean ? '한국어 숨기기' : '한국어'}</span>
          </button>
        </div>

        {/* Korean Translation Block */}
        {showKorean && (
          <div className="mt-3 pt-3 border-t-2 border-amber-200/80 text-xs sm:text-sm text-slate-900 font-sans leading-relaxed animate-in fade-in duration-200 bg-white/90 p-3 rounded-xl border border-amber-200 shadow-inner">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1 text-xs">
              <span>🇰🇷</span>
              <span>한국어 해석:</span>
            </div>
            <p className="text-slate-800 font-medium">
              {question.koreanTranslation || (question.hint ? `(${question.hint})` : '해석이 함께 제공되는 질문입니다.')}
            </p>
          </div>
        )}
      </div>

      {/* Hint Reveal Section */}
      {question.hint && (
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-amber-800 hover:text-amber-900 font-bold bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 flex items-center gap-1.5 transition-all shadow-2xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{showHint ? '💡 힌트 접기 (Hide Hint)' : '💡 단서 및 힌트 보기 (Show Teacher Clue)'}</span>
          </button>

          {showHint && (
            <div className="mt-2.5 p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed font-sans shadow-inner">
              <span className="font-bold text-amber-800"> 선생님 힌트:</span> {question.hint}
            </div>
          )}
        </div>
      )}

      {/* Answer Area: Multiple Choice Options OR Short Answer Textarea */}
      {question.format === 'multiple_choice' && question.options && question.options.length > 0 ? (
        <div className="space-y-2.5">
          <label className="block text-xs font-bold text-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-900">
              <CheckCircle2 className="w-4 h-4 text-amber-600" /> [객관식] 가장 알맞은 정답 보기를 선택하세요
            </span>
            <span className="text-[11px] text-amber-800 font-normal">(4개 선택지 중 클릭)</span>
          </label>

          <div className="grid grid-cols-1 gap-2">
            {question.options.map((rawOptText, optIdx) => {
              const cleanedOptText = rawOptText.replace(/^(Option|option)\s*([A-D1-4])?\s*[:\.-]?\s*/i, '').trim();
              const optionLabel = `(${optIdx + 1}) ${cleanedOptText}`;
              const isSelected = answerText === optionLabel || answerText === cleanedOptText || answerText.startsWith(`(${optIdx + 1})`);

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={disabled}
                  onClick={() => onAnswerChange(optionLabel)}
                  className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 active:scale-[0.99] ${
                    isSelected
                      ? 'bg-amber-100/90 border-amber-500 text-slate-950 font-bold ring-2 ring-amber-200 shadow-md'
                      : 'bg-white hover:bg-amber-50/80 border-amber-200 text-slate-800 hover:border-amber-400 shadow-2xs'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                    isSelected ? 'bg-amber-500 text-slate-950 border-amber-600' : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}>
                    {optIdx + 1}
                  </span>
                  <span className="text-xs sm:text-sm leading-relaxed flex-1">{cleanedOptText}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Short Answer / Essay Input Area */
        <div className="relative space-y-1.5">
          <label className="block text-xs font-bold text-amber-900 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-amber-600" /> [서술형/단답형] 우리말 또는 영어로 정성껏 답변을 작성하세요
            </span>
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              ✍️ 우리말 또는 영어로 작성
            </span>
          </label>

          <textarea
            value={answerText}
            onChange={(e) => onAnswerChange(e.target.value)}
            disabled={disabled}
            placeholder={`질문 ${index + 1}에 대한 답변을 우리말 또는 영어로 작성하세요... (원서의 내용과 나의 생각을 자유롭게 기술합니다)`}
            rows={3}
            className="w-full bg-amber-50/30 text-slate-900 placeholder-slate-400 font-sans text-sm sm:text-base border-2 border-amber-200 rounded-2xl p-3.5 focus:outline-none focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100 transition-all resize-y disabled:opacity-50 shadow-inner"
          />
        </div>
      )}

    </div>
  );
};
