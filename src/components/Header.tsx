import React from 'react';
import { BookOpen, GraduationCap, Sparkles, Sheet, Scroll } from 'lucide-react';
import { HouseType } from '../types';

interface HeaderProps {
  activeTab: 'student' | 'teacher';
  setActiveTab: (tab: 'student' | 'teacher') => void;
  selectedHouse: HouseType;
  setSelectedHouse: (house: HouseType) => void;
  onOpenGasModal: () => void;
  isGasConfigured: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedHouse,
  setSelectedHouse,
  onOpenGasModal,
  isGasConfigured,
}) => {
  const houseColors: Record<HouseType, { bg: string; text: string; border: string; emblem: string }> = {
    Gryffindor: {
      bg: 'bg-red-950/80 hover:bg-red-900',
      text: 'text-amber-400',
      border: 'border-amber-500/60',
      emblem: '🦁 Gryffindor',
    },
    Ravenclaw: {
      bg: 'bg-blue-950/80 hover:bg-blue-900',
      text: 'text-sky-300',
      border: 'border-sky-400/60',
      emblem: '🦅 Ravenclaw',
    },
    Hufflepuff: {
      bg: 'bg-amber-950/80 hover:bg-amber-900',
      text: 'text-amber-200',
      border: 'border-amber-400/60',
      emblem: '🦡 Hufflepuff',
    },
    Slytherin: {
      bg: 'bg-emerald-950/80 hover:bg-emerald-900',
      text: 'text-emerald-300',
      border: 'border-emerald-500/60',
      emblem: '🐍 Slytherin',
    },
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-amber-500/30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Hogwarts Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-indigo-900/80 border border-amber-400/50 flex items-center justify-center shadow-lg shadow-amber-500/10">
              <Scroll className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-serif font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Hogwarts School Reading Journal
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-serif font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
                Harry Potter <span className="text-amber-400">&</span> The Sorcerer's Stone
              </h1>
            </div>
          </div>

          {/* House Selector Pills & Navigation Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full md:w-auto">
            
            {/* House Dropdown / Pills */}
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              {(['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin'] as HouseType[]).map((house) => {
                const isSelected = selectedHouse === house;
                return (
                  <button
                    key={house}
                    onClick={() => setSelectedHouse(house)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                      isSelected
                        ? `${houseColors[house].bg} ${houseColors[house].text} border ${houseColors[house].border} shadow-md`
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{houseColors[house].emblem}</span>
                  </button>
                );
              })}
            </div>

            {/* Google Sheets GAS Config Status Button */}
            <button
              onClick={onOpenGasModal}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all shadow-sm ${
                isGasConfigured
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900/70'
                  : 'bg-amber-950/60 text-amber-300 border-amber-500/50 hover:bg-amber-900/70'
              }`}
              title="Configure Google Sheets (GAS Web App) Sync"
            >
              <Sheet className="w-3.5 h-3.5" />
              <span>{isGasConfigured ? 'Sheets Connected' : 'Connect Google Sheets'}</span>
              <span className={`w-2 h-2 rounded-full ${isGasConfigured ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`} />
            </button>

            {/* Tab Navigation: Student Journal vs Teacher Dashboard */}
            <div className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-amber-500/30">
              <button
                onClick={() => setActiveTab('student')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-serif font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'student'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-amber-300'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>학생 리딩 저널</span>
              </button>

              <button
                onClick={() => setActiveTab('teacher')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-serif font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'teacher'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-amber-300'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>교사용 대시보드</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
