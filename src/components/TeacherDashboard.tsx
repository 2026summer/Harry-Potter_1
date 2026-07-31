import React, { useState } from 'react';
import { Submission, HouseType } from '../types';
import { GraduationCap, Search, Filter, Download, MessageSquarePlus, CheckCircle2, ChevronRight, X, Sparkles, Award } from 'lucide-react';

interface TeacherDashboardProps {
  submissions: Submission[];
  onSaveFeedback: (submissionId: string, grade: 'O' | 'E' | 'A' | 'P' | 'D' | 'T', feedback: string) => void;
  onRefreshSubmissions: () => void;
  isLoading: boolean;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  submissions,
  onSaveFeedback,
  onRefreshSubmissions,
  isLoading,
}) => {
  const [selectedChapterFilter, setSelectedChapterFilter] = useState<number | 'ALL'>('ALL');
  const [selectedHouseFilter, setSelectedHouseFilter] = useState<HouseType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubmission, setActiveSubmission] = useState<Submission | null>(null);

  // Modal feedback form state
  const [teacherGrade, setTeacherGrade] = useState<'O' | 'E' | 'A' | 'P' | 'D' | 'T'>('O');
  const [teacherFeedbackText, setTeacherFeedbackText] = useState('');
  const [isSavingFeedback, setIsSavingFeedback] = useState(false);

  // Filter logic
  const filteredSubmissions = submissions.filter((sub) => {
    if (selectedChapterFilter !== 'ALL' && sub.chapterNumber !== selectedChapterFilter) return false;
    if (selectedHouseFilter !== 'ALL' && sub.studentHouse !== selectedHouseFilter) return false;
    if (searchQuery.trim() && !sub.studentName.toLowerCase().includes(searchQuery.toLowerCase().trim())) return false;
    return true;
  });

  // Open detail modal
  const handleOpenDetail = (sub: Submission) => {
    setActiveSubmission(sub);
    setTeacherGrade(sub.teacherGrade || 'O');
    setTeacherFeedbackText(sub.teacherFeedback || '');
  };

  const handleSaveFeedbackSubmit = async () => {
    if (!activeSubmission) return;
    setIsSavingFeedback(true);
    await onSaveFeedback(activeSubmission.id, teacherGrade, teacherFeedbackText);
    setIsSavingFeedback(false);
    setActiveSubmission(null);
  };

  // CSV Export
  const handleExportCsv = () => {
    if (submissions.length === 0) return;

    const headers = ['Submission ID', 'Date', 'Student Name', 'House', 'Chapter', 'Q1 Answer', 'Q2 Answer', 'Q3 Answer', 'Q4 Answer', 'Q5 Answer', 'Teacher Grade', 'Teacher Feedback'];
    
    const rows = submissions.map((s) => {
      const q1 = s.answers[0]?.answerText || '';
      const q2 = s.answers[1]?.answerText || '';
      const q3 = s.answers[2]?.answerText || '';
      const q4 = s.answers[3]?.answerText || '';
      const q5 = s.answers[4]?.answerText || '';

      return [
        s.id,
        new Date(s.submittedAt).toLocaleString('ko-KR'),
        `"${s.studentName.replace(/"/g, '""')}"`,
        s.studentHouse,
        `Chapter ${s.chapterNumber}`,
        `"${q1.replace(/"/g, '""')}"`,
        `"${q2.replace(/"/g, '""')}"`,
        `"${q3.replace(/"/g, '""')}"`,
        `"${q4.replace(/"/g, '""')}"`,
        `"${q5.replace(/"/g, '""')}"`,
        s.teacherGrade || '',
        `"${(s.teacherFeedback || '').replace(/"/g, '""')}"`
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Hogwarts_Journal_Submissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const gradeLabels: Record<string, { label: string; bg: string; color: string }> = {
    O: { label: 'O - Outstanding (특출남)', bg: 'bg-emerald-950/80', color: 'text-emerald-300 border-emerald-500' },
    E: { label: 'E - Exceeds Expectations (기대 이상)', bg: 'bg-blue-950/80', color: 'text-blue-300 border-blue-500' },
    A: { label: 'A - Acceptable (무난함)', bg: 'bg-amber-950/80', color: 'text-amber-300 border-amber-500' },
    P: { label: 'P - Poor (형편없음)', bg: 'bg-orange-950/80', color: 'text-orange-300 border-orange-500' },
    D: { label: 'D - Dreadful (끔찍함)', bg: 'bg-rose-950/80', color: 'text-rose-300 border-rose-500' },
    T: { label: 'T - Troll (트롤)', bg: 'bg-slate-900', color: 'text-slate-400 border-slate-700' },
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-amber-400 font-bold mb-1">
            <GraduationCap className="w-4 h-4 text-amber-400" /> 교사 관리자 화면 (Teacher Portal)
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-amber-100">
            학생 리딩 제출 내역 및 피드백 작성
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            제출된 학생 답변을 확인하고 O, E, A 성적 부여 및 교사 피드백을 전달하세요.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefreshSubmissions}
            disabled={isLoading}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-2"
          >
            <span>🔄 최신 데이터 새로고침</span>
          </button>

          <button
            onClick={handleExportCsv}
            disabled={submissions.length === 0}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>CSV 성적 내보내기</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="학생 이름으로 검색..."
            className="w-full bg-slate-950/80 text-xs sm:text-sm text-slate-100 placeholder-slate-500 border border-slate-700 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Chapter Filter */}
        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-400 font-serif">Chapter:</span>
          <select
            value={selectedChapterFilter}
            onChange={(e) => setSelectedChapterFilter(e.target.value === 'ALL' ? 'ALL' : parseInt(e.target.value))}
            className="bg-slate-950 text-amber-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
          >
            <option value="ALL">전체 챕터 (All Chapters)</option>
            {Array.from({ length: 17 }, (_, i) => i + 1).map((ch) => (
              <option key={ch} value={ch}>
                Chapter {ch}
              </option>
            ))}
          </select>
        </div>

        {/* House Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-serif">House:</span>
          <select
            value={selectedHouseFilter}
            onChange={(e) => setSelectedHouseFilter(e.target.value as any)}
            className="bg-slate-950 text-amber-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
          >
            <option value="ALL">전체 기숙사 (All Houses)</option>
            <option value="Gryffindor">🦁 Gryffindor</option>
            <option value="Ravenclaw">🦅 Ravenclaw</option>
            <option value="Hufflepuff">🦡 Hufflepuff</option>
            <option value="Slytherin">🐍 Slytherin</option>
          </select>
        </div>

      </div>

      {/* Submission List Cards */}
      <div className="space-y-3">
        {filteredSubmissions.length === 0 ? (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            <GraduationCap className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="font-serif text-base text-slate-300">제출된 저널 내역이 없습니다.</p>
            <p className="text-xs text-slate-500 mt-1">학생들이 리딩 저널을 제출하면 이곳에서 통합 조회 가능합니다.</p>
          </div>
        ) : (
          filteredSubmissions.map((sub) => (
            <div
              key={sub.id}
              onClick={() => handleOpenDetail(sub)}
              className="bg-slate-900/90 border border-amber-500/30 hover:border-amber-400/80 rounded-2xl p-4 sm:p-5 shadow-lg transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center shrink-0 font-serif text-amber-400 font-bold">
                  Ch{sub.chapterNumber}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-amber-200 text-base group-hover:text-amber-300 transition-colors">
                      {sub.studentName}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {sub.studentHouse}
                    </span>
                    {sub.teacherGrade && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${gradeLabels[sub.teacherGrade]?.color}`}>
                        Grade: {sub.teacherGrade}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mt-0.5 font-sans">
                    Chapter {sub.chapterNumber}: {sub.chapterTitle} • 제출일: {new Date(sub.submittedAt).toLocaleString('ko-KR')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="text-xs text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                  답안 및 피드백 작성 <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Active Submission Detail & Feedback Modal */}
      {activeSubmission && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-500/60 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative space-y-5">
            
            <button
              onClick={() => setActiveSubmission(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-200 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-serif uppercase tracking-widest text-amber-400 font-bold">
                Student Journal Inspection
              </span>
              <h3 className="text-xl font-serif font-extrabold text-amber-200 mt-1">
                {activeSubmission.studentName} ({activeSubmission.studentHouse}) — Chapter {activeSubmission.chapterNumber}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                제출시간: {new Date(activeSubmission.submittedAt).toLocaleString('ko-KR')}
              </p>
            </div>

            {/* Answers List */}
            <div className="space-y-4">
              <h4 className="text-sm font-serif font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> 제출된 답변 5개 목록
              </h4>

              {activeSubmission.answers.map((ans, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs sm:text-sm">
                  <p className="font-serif font-semibold text-amber-200">
                    Q{i + 1}. {ans.questionText}
                  </p>
                  <p className="text-slate-200 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 font-sans leading-relaxed">
                    {ans.answerText || '(답변 없음)'}
                  </p>
                </div>
              ))}
            </div>

            {/* Teacher Feedback Form */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h4 className="text-sm font-serif font-bold text-amber-300 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" /> 교사 피드백 및 평가 (Teacher Grading)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-serif text-slate-300 mb-1">성적 등급 (Hogwarts Grade)</label>
                  <select
                    value={teacherGrade}
                    onChange={(e) => setTeacherGrade(e.target.value as any)}
                    className="w-full bg-slate-950 text-amber-200 border border-slate-700 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-amber-400"
                  >
                    <option value="O">O - Outstanding (특출남 - A+)</option>
                    <option value="E">E - Exceeds Expectations (기대 이상 - A)</option>
                    <option value="A">A - Acceptable (무난함 - B)</option>
                    <option value="P">P - Poor (보통 - C)</option>
                    <option value="D">D - Dreadful (미흡 - D)</option>
                    <option value="T">T - Troll (노력 필요 - F)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-serif text-slate-300 mb-1">교사 피드백 메시지 (Teacher Comment)</label>
                  <textarea
                    value={teacherFeedbackText}
                    onChange={(e) => setTeacherFeedbackText(e.target.value)}
                    placeholder="학생에게 전달할 칭찬과 보완할 문법/어휘 가이드를 작성하세요..."
                    rows={3}
                    className="w-full bg-slate-950 text-slate-100 placeholder-slate-500 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveSubmission(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  취소
                </button>

                <button
                  type="button"
                  onClick={handleSaveFeedbackSubmit}
                  disabled={isSavingFeedback}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSavingFeedback ? '저장 중...' : '피드백 저장하기'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
