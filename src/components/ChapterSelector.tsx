import React from 'react';
import { CHAPTERS } from '../data/chapters';
import { ChapterInfo } from '../types';
import { Sparkles, RefreshCw, Feather, BookOpen, Layers } from 'lucide-react';

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
    <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Background Magic Glow Effect */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        
        {/* Dropdown Selector */}
        <div className="w-full md:w-auto flex-1 max-w-xl">
          <label className="block text-xs font-serif uppercase tracking-widest text-amber-400 font-bold mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Select Chapter (1 ~ 17 장 선택)
          </label>

          <div className="relative">
            <select
              value={selectedChapterNum}
              onChange={(e) => onSelectChapter(parseInt(e.target.value))}
              className="w-full bg-slate-950/90 text-amber-100 font-serif text-base sm:text-lg font-bold border-2 border-amber-500/60 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30 transition-all appearance-none cursor-pointer shadow-inner"
            >
              {CHAPTERS.map((ch) => (
                <option key={ch.number} value={ch.number} className="bg-slate-900 text-amber-100 py-2">
                  Chapter {ch.number}: {ch.title}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-amber-400">
              ▼
            </div>
          </div>
        </div>

        {/* AI Generator Action Button */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={onRegenerateAiQuestions}
            disabled={isAiLoading}
            className={`px-5 py-3 rounded-xl font-serif font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg border ${
              isAiLoading
                ? 'bg-slate-800 text-slate-400 border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 border-amber-300 shadow-amber-500/20 hover:shadow-amber-500/30'
            }`}
          >
            {isAiLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-400" />
                <span>Generating Questions...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>AI 질문 새로 생성 (Gemini)</span>
              </>
            )}
          </button>

          {/* AI / Curated Status Badge */}
          <div className="flex items-center justify-center px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs">
            {isAiGenerated ? (
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Gemini AI Generated
              </span>
            ) : (
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Feather className="w-3 h-3 text-amber-500/80" /> Curated High-School EFL
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Chapter Overview Box */}
      <div className="mt-5 pt-4 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <h2 className="text-lg font-serif font-bold text-amber-300 flex items-center gap-2">
            <span>Chapter {currentChapter.number}:</span>
            <span className="text-slate-100">{currentChapter.title}</span>
          </h2>
          <span className="text-xs text-slate-400 font-serif">High School EFL Level Comprehension</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans italic bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          "{currentChapter.summaryContext}"
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-serif text-amber-400/80 flex items-center gap-1">
            <Layers className="w-3 h-3" /> Chapter Themes:
          </span>
          {currentChapter.keyTopics.map((topic, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
