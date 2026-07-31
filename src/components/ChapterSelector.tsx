import React from 'react';
import { CHAPTERS } from '../data/chapters';
import { ChapterInfo, DifficultyLevel } from '../types';
import { Sparkles, RefreshCw, Feather, BookOpen, Layers, Wand2, Gauge } from 'lucide-react';

import hogwartsExpressImg from '../assets/images/hogwarts_express_train_1785475913668.jpg';

interface ChapterSelectorProps {
  selectedChapterNum: number;
  onSelectChapter: (chapterNum: number) => void;
  selectedDifficulty: DifficultyLevel;
  onSelectDifficulty: (level: DifficultyLevel) => void;
  onRegenerateAiQuestions: () => void;
  isAiLoading: boolean;
  isAiGenerated?: boolean;
}

export const ChapterSelector: React.FC<ChapterSelectorProps> = ({
  selectedChapterNum,
  onSelectChapter,
  selectedDifficulty,
  onSelectDifficulty,
  onRegenerateAiQuestions,
  isAiLoading,
  isAiGenerated,
}) => {
  const currentChapter: ChapterInfo = CHAPTERS.find((c) => c.number === selectedChapterNum) || CHAPTERS[0];

  return (
    <div className="bg-white/95 border-2 border-amber-200/90 rounded-3xl p-5 sm:p-6 shadow-xl shadow-amber-100/60 relative overflow-hidden">
      
      {/* Soft Pastel Accent Circle */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-gradient-to-br from-amber-100/80 via-rose-100/50 to-indigo-100/60 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col gap-5 relative z-10">
        
        {/* Top Controls Row: Chapter Dropdown + Difficulty Level Selector */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          
          {/* Chapter Selector Dropdown (7 cols) */}
          <div className="md:col-span-7">
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

          {/* Difficulty Level Buttons (5 cols) */}
          <div className="md:col-span-5">
            <label className="block text-xs font-serif font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-amber-600" /> 질문 난이도 선택 (Difficulty Level)
            </label>

            <div className="grid grid-cols-3 gap-1.5 bg-amber-50/80 p-1.5 rounded-2xl border-2 border-amber-200 shadow-inner">
              <button
                type="button"
                onClick={() => onSelectDifficulty('EASY')}
                className={`py-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center ${
                  selectedDifficulty === 'EASY'
                    ? 'bg-emerald-500 text-white shadow-md scale-102'
                    : 'text-slate-700 hover:bg-white/80'
                }`}
              >
                <span>난이도: 하</span>
                <span className="text-[10px] opacity-90 font-normal">쉬운 어휘/기초</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectDifficulty('MEDIUM')}
                className={`py-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center ${
                  selectedDifficulty === 'MEDIUM'
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-102 font-extrabold'
                    : 'text-slate-700 hover:bg-white/80'
                }`}
              >
                <span>난이도: 중</span>
                <span className="text-[10px] opacity-90 font-normal">고교 표준</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectDifficulty('HARD')}
                className={`py-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center ${
                  selectedDifficulty === 'HARD'
                    ? 'bg-rose-500 text-white shadow-md scale-102'
                    : 'text-slate-700 hover:bg-white/80'
                }`}
              >
                <span>난이도: 상</span>
                <span className="text-[10px] opacity-90 font-normal">심화 추론</span>
              </button>
            </div>
          </div>

        </div>

        {/* AI Generator Action Button Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          
          <button
            onClick={onRegenerateAiQuestions}
            disabled={isAiLoading}
            className={`flex-1 px-5 py-3 rounded-2xl font-serif font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md border-2 ${
              isAiLoading
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-400 via-amber-500 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-slate-900 border-amber-300 shadow-amber-200 hover:scale-[1.01]'
            }`}
          >
            {isAiLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-600" />
                <span>[{selectedDifficulty === 'EASY' ? '하' : selectedDifficulty === 'MEDIUM' ? '중' : '상'}] 맞춤 질문 생성 중...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-amber-950" />
                <span>🎲 [{selectedDifficulty === 'EASY' ? '하(기초)' : selectedDifficulty === 'MEDIUM' ? '중(표준)' : '상(심화)'}] 맞춤 무작위 질문 새로 뽑기</span>
              </>
            )}
          </button>

          {/* AI / Curated Status Badge */}
          <div className="flex items-center justify-center px-4 py-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs shadow-inner shrink-0">
            {isAiGenerated ? (
              <span className="text-amber-800 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Gemini AI 난이도 맞춤 출제
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
