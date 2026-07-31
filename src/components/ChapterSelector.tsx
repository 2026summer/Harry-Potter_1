import React from 'react';
import { CHAPTERS } from '../data/chapters';
import { ChapterInfo } from '../types';
import { Sparkles, RefreshCw, Feather, BookOpen, Layers, Wand2 } from 'lucide-react';

import hogwartsExpressImg from '../assets/images/hogwarts_express_train_1785475913668.jpg';

interface ChapterSelectorProps {
  selectedChapterNum: number;
  onSelectChapter: (chapterNum: number) => void;
  onRegenerateAiQuestions: () => void;
  isAiLoading: boolean;
  isAiGenerated?: boolean;
}

export const ChapterSelector: React.FC<ChapterSelectorProps> = ({
  selectedChapterNum,
  onSelectChapter,
  onRegenerateAiQuestions,
  isAiLoading,
  isAiGenerated,
}) => {
  const currentChapter: ChapterInfo = CHAPTERS.find((c) => c.number === selectedChapterNum) || CHAPTERS[0];

  return (
    <div className="bg-white/95 border-2 border-amber-200/90 rounded-3xl p-5 sm:p-6 shadow-xl shadow-amber-100/60 relative overflow-hidden">
      
      {/* Soft Pastel Accent Circle */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-gradient-to-br from-amber-100/80 via-rose-100/50 to-indigo-100/60 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative z-10">
        
        {/* Dropdown Selector */}
        <div className="w-full md:w-auto flex-1 max-w-xl">
          <label className="block text-xs font-serif font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-600" /> 원서 챕터 선택 (Chapter 1 ~ 17 장)
          </label>

          <div className="relative">
            <select
              value={selectedChapterNum}
              onChange={(e) => onSelectChapter(parseInt(e.target.value))}
              className="w-full bg-amber-50/70 text-slate-900 font-serif text-base sm:text-lg font-bold border-2 border-amber-300 rounded-2xl px-4 py-3 pr-10 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-200 transition-all appearance-none cursor-pointer shadow-sm"
            >
              {CHAPTERS.map((ch) => (
                <option key={ch.number} value={ch.number} className="bg-white text-slate-800 py-2">
                  Chapter {ch.number}: {ch.title}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-amber-700 font-bold">
              ▼
            </div>
          </div>
        </div>

        {/* AI Generator Action Button */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={onRegenerateAiQuestions}
            disabled={isAiLoading}
            className={`px-5 py-3 rounded-2xl font-serif font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md border-2 ${
              isAiLoading
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-400 via-amber-500 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-slate-900 border-amber-300 shadow-amber-200 hover:scale-[1.02]'
            }`}
          >
            {isAiLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-600" />
                <span>새로운 질문 생성 중...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-amber-950" />
                <span>🎲 무작위 질문 새로 뽑기 (Randomize)</span>
              </>
            )}
          </button>

          {/* AI / Curated Status Badge */}
          <div className="flex items-center justify-center px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-xs shadow-inner">
            {isAiGenerated ? (
              <span className="text-amber-800 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Gemini AI 맞춤 무작위 생성
              </span>
            ) : (
              <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                <Feather className="w-3.5 h-3.5 text-amber-600" /> 고교 EFL 엄선 질문 세트
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Chapter Overview Box */}
      <div className="mt-5 pt-4 border-t border-amber-100 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <h2 className="text-base sm:text-lg font-serif font-bold text-amber-900 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-800 border border-amber-300 text-xs">
              Chapter {currentChapter.number}
            </span>
            <span className="text-slate-800">{currentChapter.title}</span>
          </h2>
          <span className="text-xs text-amber-700 font-serif">고교 영어 EFL 원서 읽기 과정</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/60">
          <img
            src={hogwartsExpressImg}
            alt="Hogwarts Express"
            referrerPolicy="no-referrer"
            className="w-full md:w-36 h-28 object-cover rounded-xl border border-amber-300 shadow-2xs shrink-0"
          />
          <div className="flex-1 space-y-2">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans italic">
              "{currentChapter.summaryContext}"
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-serif font-bold text-amber-900 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-amber-600" /> 핵심 키워드:
              </span>
              {currentChapter.keyTopics.map((topic, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 font-medium"
                >
                  #{topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
