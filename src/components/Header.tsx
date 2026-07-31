import React from 'react';
import { BookOpen, GraduationCap, Sparkles, Sheet, Scroll, Wand2 } from 'lucide-react';
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
  const houseColors: Record<HouseType, { bg: string; text: string; border: string; emblem: string; label: string }> = {
    Gryffindor: {
      bg: 'bg-rose-100 hover:bg-rose-200',
      text: 'text-rose-800',
      border: 'border-rose-300',
      emblem: '🦁',
      label: '그리핀도르 (Gryffindor)',
    },
    Ravenclaw: {
      bg: 'bg-sky-100 hover:bg-sky-200',
      text: 'text-sky-800',
      border: 'border-sky-300',
      emblem: '🦅',
      label: '래번클로 (Ravenclaw)',
    },
    Hufflepuff: {
      bg: 'bg-amber-100 hover:bg-amber-200',
      text: 'text-amber-900',
      border: 'border-amber-300',
      emblem: '🦡',
      label: '후플푸프 (Hufflepuff)',
    },
    Slytherin: {
      bg: 'bg-emerald-100 hover:bg-emerald-200',
      text: 'text-emerald-800',
      border: 'border-emerald-300',
      emblem: '🐍',
      label: '슬리데린 (Slytherin)',
    },
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-2 border-amber-200/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-200 via-rose-200 to-indigo-200 border-2 border-amber-300 flex items-center justify-center shadow-md shadow-amber-100">
              <Wand2 className="w-6 h-6 text-amber-700 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 font-serif">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>호그와트 마법학교 영어 독서록 (Hogwarts Reading Journal)</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-serif font-extrabold text-slate-800 tracking-tight">
                해리포터와 마법사의 돌 <span className="text-amber-600 font-normal">| Harry Potter & The Sorcerer's Stone</span>
              </h1>
            </div>
          </div>

          {/* House Selector & Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full md:w-auto">
            
            {/* House Selector Pills */}
            <div className="flex items-center gap-1 bg-amber-50/80 p-1 rounded-2xl border border-amber-200 shadow-inner">
              {(['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin'] as HouseType[]).map((house) => {
                const isSelected = selectedHouse === house;
                const config = houseColors[house];
                return (
                  <button
                    key={house}
                    onClick={() => setSelectedHouse(house)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      isSelected
                        ? `${config.bg} ${config.text} border-2 ${config.border} shadow-sm scale-105`
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <span>{config.emblem}</span>
                    <span className="hidden sm:inline">{house}</span>
                  </button>
                );
              })}
            </div>

            {/* Google Sheets Config Button */}
            <button
              onClick={onOpenGasModal}
              className={`px-3 py-1.5 rounded-2xl text-xs font-bold border-2 flex items-center gap-1.5 transition-all shadow-sm ${
                isGasConfigured
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
              }`}
            >
              <Sheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isGasConfigured ? '구글 시트 연동됨' : '구글 시트 연동하기'}</span>
              <span className={`w-2 h-2 rounded-full ${isGasConfigured ? 'bg-emerald-500' : 'bg-amber-500 animate-ping'}`} />
            </button>

            {/* Tab Navigation: Student vs Admin */}
            <div className="flex items-center p-1 bg-slate-100/80 rounded-2xl border border-slate-200">
              <button
                onClick={() => setActiveTab('student')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'student'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 shadow-md'
                    : 'text-slate-600 hover:text-amber-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>학생 리딩 저널</span>
              </button>

              <button
                onClick={() => setActiveTab('teacher')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'teacher'
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-indigo-800'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>관리자</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
