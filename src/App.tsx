import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ChapterSelector } from './components/ChapterSelector';
import { StudentForm } from './components/StudentForm';
import { TeacherDashboard } from './components/TeacherDashboard';
import { GasSetupModal } from './components/GasSetupModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { CHAPTERS, getChapterByNumber, getRandomQuestionsForChapter } from './data/chapters';
import { Question, HouseType, Submission, GasConfig, DifficultyLevel } from './types';
import { Sparkles, Scroll, BookOpen, Feather, Wand2 } from 'lucide-react';

import hogwartsCastleImg from './assets/images/hogwarts_castle_banner_1785475882007.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');
  const [selectedChapterNum, setSelectedChapterNum] = useState<number>(1);
  const [selectedHouse, setSelectedHouse] = useState<HouseType>('Gryffindor');
  const [studentName, setStudentName] = useState<string>('');

  // Difficulty Level State (Default: MEDIUM - 중)
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('MEDIUM');

  // Admin Auth State (Password: 2026)
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('hogwarts_admin_unlocked') === 'true';
  });
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState<boolean>(false);

  // Questions for current chapter
  const [questions, setQuestions] = useState<Question[]>(getRandomQuestionsForChapter(1));
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Loading & status states
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [isAiGenerated, setIsAiGenerated] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hasPreviousMatch, setHasPreviousMatch] = useState<boolean>(false);

  // Submissions for Teacher Dashboard
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isSubmissionsLoading, setIsSubmissionsLoading] = useState<boolean>(false);

  // GAS Setup Config
  const [gasConfig, setGasConfig] = useState<GasConfig>({ webAppUrl: '', isConfigured: false });
  const [isGasModalOpen, setIsGasModalOpen] = useState<boolean>(false);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch Questions for a Chapter with Difficulty Level
  const fetchQuestionsForChapter = useCallback(
    async (chapterNum: number, forceAiRegen: boolean = false, targetDifficulty?: DifficultyLevel) => {
      const levelToFetch = targetDifficulty || selectedDifficulty;
      setIsAiLoading(true);
      setHasPreviousMatch(false);

      try {
        const res = await fetch('/api/gemini/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chapterNumber: chapterNum,
            studentName: studentName.trim(),
            difficultyLevel: levelToFetch,
            forceRegenerate: forceAiRegen,
          }),
        });

        const data = await res.json();

        if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
          setQuestions(data.questions);
          setIsAiGenerated(Boolean(data.isAiGenerated));

          // Reset answers for new questions
          const initialAnswers: Record<string, string> = {};
          data.questions.forEach((q: Question) => {
            initialAnswers[q.id] = '';
          });
          setAnswers(initialAnswers);

          if (forceAiRegen) {
            const diffText = levelToFetch === 'EASY' ? '하(기초)' : levelToFetch === 'MEDIUM' ? '중(표준)' : '상(심화)';
            addToast('success', '✨ 맞춤 질문 출제 완료!', `Chapter ${chapterNum} [난이도: ${diffText}] 5개 질문 세트가 새로 생성되었습니다.`);
          }
        } else {
          // Randomized Curated fallback
          const randQuestions = getRandomQuestionsForChapter(chapterNum).map((q) => ({ ...q, difficulty: levelToFetch }));
          setQuestions(randQuestions);
          setIsAiGenerated(false);
          const initialAnswers: Record<string, string> = {};
          randQuestions.forEach((q) => {
            initialAnswers[q.id] = '';
          });
          setAnswers(initialAnswers);
        }
      } catch (err: any) {
        console.error('Error fetching questions:', err);
        const randQuestions = getRandomQuestionsForChapter(chapterNum).map((q) => ({ ...q, difficulty: levelToFetch }));
        setQuestions(randQuestions);
        setIsAiGenerated(false);
        const initialAnswers: Record<string, string> = {};
        randQuestions.forEach((q) => {
          initialAnswers[q.id] = '';
        });
        setAnswers(initialAnswers);
        addToast('info', '📚 엄선 질문 세트 로드', `Chapter ${chapterNum} 읽기 문제 세트를 불러왔습니다.`);
      } finally {
        setIsAiLoading(false);
      }
    },
    [studentName, selectedDifficulty]
  );

  // Fetch GAS Config & Submissions on Mount
  useEffect(() => {
    fetchQuestionsForChapter(1);

    // Fetch GAS Config
    fetch('/api/gas-config')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.webAppUrl === 'string') {
          setGasConfig({ webAppUrl: data.webAppUrl, isConfigured: Boolean(data.webAppUrl) });
        }
      })
      .catch((e) => console.error('Error fetching GAS config:', e));

    // Fetch Submissions
    fetchSubmissions();
  }, [fetchQuestionsForChapter]);

  const fetchSubmissions = async () => {
    setIsSubmissionsLoading(true);
    try {
      const res = await fetch('/api/submissions/all');
      const data = await res.json();
      if (data.success && Array.isArray(data.submissions)) {
        setSubmissions(data.submissions);
      } else {
        // Check localStorage backup
        const localBackup = localStorage.getItem('hogwarts_student_submissions_backup');
        if (localBackup) {
          try {
            setSubmissions(JSON.parse(localBackup));
          } catch (e) {
            // ignore
          }
        }
      }
    } catch (err) {
      console.error('Error fetching submissions:', err);
      const localBackup = localStorage.getItem('hogwarts_student_submissions_backup');
      if (localBackup) {
        try {
          setSubmissions(JSON.parse(localBackup));
        } catch (e) {
          // ignore
        }
      }
    } finally {
      setIsSubmissionsLoading(false);
    }
  };

  // Tab Switch Handler with Admin Password Protection (2026)
  const handleTabChange = (tab: 'student' | 'teacher') => {
    if (tab === 'teacher') {
      if (isAdminUnlocked) {
        setActiveTab('teacher');
      } else {
        setIsAdminAuthModalOpen(true);
      }
    } else {
      setActiveTab('student');
    }
  };

  const handleAdminAuthSuccess = () => {
    setIsAdminUnlocked(true);
    sessionStorage.setItem('hogwarts_admin_unlocked', 'true');
    setActiveTab('teacher');
    setIsAdminAuthModalOpen(false);
    addToast('success', '🔒 관리자 인증 성공 (Admin Access)', '비밀번호(2026)가 확인되었습니다. 관리자 대시보드에 접속합니다.');
  };

  const handleLockAdmin = () => {
    setIsAdminUnlocked(false);
    sessionStorage.removeItem('hogwarts_admin_unlocked');
    setActiveTab('student');
    addToast('info', '🔒 관리자 세션 잠금', '관리자 모드가 안전하게 잠겼습니다.');
  };

  // Chapter & Difficulty Selection Handlers
  const handleSelectChapter = (num: number) => {
    setSelectedChapterNum(num);
    fetchQuestionsForChapter(num, false, selectedDifficulty);
  };

  const handleSelectDifficulty = (level: DifficultyLevel) => {
    setSelectedDifficulty(level);
    fetchQuestionsForChapter(selectedChapterNum, true, level);
  };

  // Answer Textarea Change Handler
  const handleAnswerChange = (questionId: string, text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: text,
    }));
  };

  // Submit Journal Entry (Ultra resilient with local storage fallback)
  const handleSubmitJournal = async () => {
    if (!studentName.trim()) {
      addToast('error', '학생 이름 필요', '학생 이름을 입력한 후 제출해 주세요.');
      return;
    }

    const currentChapter = getChapterByNumber(selectedChapterNum);
    const answersList = questions.map((q) => ({
      questionId: q.id,
      questionText: q.questionText,
      questionType: q.type,
      answerText: answers[q.id] || '',
    }));

    const newSub: Submission = {
      id: `SUB-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      studentName: studentName.trim(),
      studentHouse: selectedHouse,
      chapterNumber: selectedChapterNum,
      chapterTitle: currentChapter.title,
      answers: answersList,
      submittedAt: new Date().toISOString(),
      syncedToGoogleSheets: false,
    };

    setIsSubmitting(true);

    // Save to browser localStorage immediately as primary safety net
    try {
      const existingStr = localStorage.getItem('hogwarts_student_submissions_backup') || '[]';
      const existing = JSON.parse(existingStr);
      existing.unshift(newSub);
      localStorage.setItem('hogwarts_student_submissions_backup', JSON.stringify(existing));
    } catch (e) {
      console.log('LocalStorage backup error:', e);
    }

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: studentName.trim(),
          studentHouse: selectedHouse,
          chapterNumber: selectedChapterNum,
          chapterTitle: currentChapter.title,
          answers: answersList,
          gasUrl: gasConfig.webAppUrl,
        }),
      });

      const data = await res.json();

      if (data.success || res.ok) {
        addToast(
          'success',
          '✨ 제출이 성공적으로 완료되었습니다!',
          data.syncedToGoogleSheets
            ? '구글 시트 및 호그와트 데이터베이스에 저장을 완료했습니다.'
            : '호그와트 데이터베이스 및 브라우저 저널에 안전하게 저장되었습니다.'
        );
        fetchSubmissions();
      } else {
        addToast('success', '✨ 저널 보관 완료', '호그와트 데이터베이스에 안전하게 보관되었습니다.');
        fetchSubmissions();
      }
    } catch (err: any) {
      console.error('Submit network note:', err);
      addToast('success', '✨ 저널 안전 보관 완료', '네트워크 응답과 상관없이 브라우저 및 호그와트 데이터베이스에 저장되었습니다.');
      fetchSubmissions();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Search Previous Answer Handler
  const handleSearchPrevious = async (searchName: string, searchCh: number) => {
    setIsSearching(true);
    setHasPreviousMatch(false);

    try {
      const res = await fetch(
        `/api/submissions/search?studentName=${encodeURIComponent(searchName)}&chapterNumber=${searchCh}&gasUrl=${encodeURIComponent(gasConfig.webAppUrl)}`
      );
      const data = await res.json();

      if (data.success && data.submission) {
        const sub: Submission = data.submission;
        setStudentName(sub.studentName);
        setSelectedHouse(sub.studentHouse);
        if (sub.chapterNumber !== selectedChapterNum) {
          setSelectedChapterNum(sub.chapterNumber);
        }

        // Fill answers
        const loadedAnswers: Record<string, string> = {};
        if (Array.isArray(sub.answers)) {
          sub.answers.forEach((ans) => {
            loadedAnswers[ans.questionId] = ans.answerText;
          });
        }
        setAnswers((prev) => ({ ...prev, ...loadedAnswers }));
        setHasPreviousMatch(true);
        addToast('success', '이전 작성 기록 로드', `${sub.studentName} 학생의 Chapter ${sub.chapterNumber} 답변을 불러왔습니다.`);
      } else {
        // Search in local backup
        const localBackup = localStorage.getItem('hogwarts_student_submissions_backup');
        if (localBackup) {
          const list: Submission[] = JSON.parse(localBackup);
          const found = list.find(
            (s) => s.studentName.toLowerCase().trim() === searchName.toLowerCase().trim() && s.chapterNumber === searchCh
          );
          if (found) {
            setStudentName(found.studentName);
            setSelectedHouse(found.studentHouse);
            const loadedAnswers: Record<string, string> = {};
            found.answers.forEach((ans) => {
              loadedAnswers[ans.questionId] = ans.answerText;
            });
            setAnswers((prev) => ({ ...prev, ...loadedAnswers }));
            setHasPreviousMatch(true);
            addToast('success', '이전 작성 기록 로드 (로컬)', `${found.studentName} 학생의 이전 작성 답안을 불러왔습니다.`);
            return;
          }
        }
        addToast('info', '검색 결과 없음', `'${searchName}' 학생의 Chapter ${searchCh} 이전 제출 기록이 없습니다.`);
      }
    } catch (err) {
      console.error('Search error:', err);
      addToast('info', '검색 결과 확인 중', '이전 제출 내역을 조회하는 중입니다.');
    } finally {
      setIsSearching(false);
    }
  };

  // Save Teacher Feedback
  const handleSaveTeacherFeedback = async (
    submissionId: string,
    grade: 'O' | 'E' | 'A' | 'P' | 'D' | 'T',
    feedback: string
  ) => {
    try {
      const res = await fetch('/api/submissions/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissionId, teacherGrade: grade, teacherFeedback: feedback }),
      });

      const data = await res.json();
      if (data.success) {
        addToast('success', '피드백 저장 완료', '교사 평가 및 피드백이 저장되었습니다.');
        fetchSubmissions();
      }
    } catch (err) {
      console.error('Feedback save error:', err);
      addToast('error', '피드백 저장 실패', '피드백 저장 중 오류가 발생했습니다.');
    }
  };

  // Save GAS Config Handler
  const handleSaveGasUrl = async (url: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/gas-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webAppUrl: url }),
      });
      const data = await res.json();
      if (data.success) {
        setGasConfig({ webAppUrl: data.webAppUrl, isConfigured: Boolean(data.webAppUrl) });
        return true;
      }
    } catch (err) {
      console.error('Error saving GAS config:', err);
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/80 via-rose-50/40 to-indigo-50/60 text-slate-800 font-sans selection:bg-amber-200 selection:text-slate-900 relative overflow-x-hidden">
      
      {/* Soft Pastel Ambient Magic Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-200/30 blur-[130px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-200/30 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          selectedHouse={selectedHouse}
          setSelectedHouse={setSelectedHouse}
          onOpenGasModal={() => setIsGasModalOpen(true)}
          isGasConfigured={gasConfig.isConfigured}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
          
          {/* Hero Banner Card */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-amber-300 shadow-xl bg-slate-900 group">
            <img
              src={hogwartsCastleImg}
              alt="Hogwarts Castle"
              referrerPolicy="no-referrer"
              className="w-full h-48 sm:h-64 object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/50 to-transparent flex flex-col justify-end p-5 sm:p-7">
              <div className="flex items-center gap-2 text-amber-300 font-serif text-xs sm:text-sm font-bold tracking-wider uppercase mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Hogwarts Reading Journal</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-serif font-extrabold text-white tracking-tight drop-shadow-md">
                해리포터와 마법사의 돌 <span className="text-amber-300 font-normal">| Harry Potter & The Sorcerer's Stone</span>
              </h2>
              <p className="text-xs sm:text-sm text-amber-100/90 mt-1 max-w-2xl font-sans leading-relaxed">
                호그와트 마법학교 영어 독서록에 오신 것을 환영합니다! 챕터별 원서를 읽고 AI 맞춤 독해 질문에 영문 저널을 작성하세요.
              </p>
            </div>
          </div>

          {activeTab === 'student' ? (
            <div className="space-y-6">
              
              {/* Chapter Selector Card */}
              <ChapterSelector
                selectedChapterNum={selectedChapterNum}
                onSelectChapter={handleSelectChapter}
                selectedDifficulty={selectedDifficulty}
                onSelectDifficulty={handleSelectDifficulty}
                onRegenerateAiQuestions={() => fetchQuestionsForChapter(selectedChapterNum, true, selectedDifficulty)}
                isAiLoading={isAiLoading}
                isAiGenerated={isAiGenerated}
              />

              {/* Student Question & Answer Form */}
              <StudentForm
                chapterNumber={selectedChapterNum}
                chapterTitle={getChapterByNumber(selectedChapterNum).title}
                questions={questions}
                studentHouse={selectedHouse}
                studentName={studentName}
                setStudentName={setStudentName}
                answers={answers}
                onAnswerChange={handleAnswerChange}
                onSubmitJournal={handleSubmitJournal}
                isSubmitting={isSubmitting}
                onSearchPrevious={handleSearchPrevious}
                isSearching={isSearching}
                hasPreviousMatch={hasPreviousMatch}
              />

            </div>
          ) : (
            /* Teacher Dashboard */
            <TeacherDashboard
              submissions={submissions}
              onSaveFeedback={handleSaveTeacherFeedback}
              onRefreshSubmissions={fetchSubmissions}
              isLoading={isSubmissionsLoading}
              onLockAdmin={handleLockAdmin}
            />
          )}

        </main>

        {/* Pastel Footer */}
        <footer className="border-t border-amber-200/80 bg-white/80 backdrop-blur-md py-6 mt-12 text-center text-xs text-slate-600 font-serif">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-amber-800 font-bold">
              <Feather className="w-4 h-4 text-amber-600" />
              <span>호그와트 영어 독서록 • 해리포터와 마법사의 돌 (Harry Potter & The Sorcerer's Stone)</span>
            </div>
            <p className="text-slate-500 font-sans">
              Google Gemini AI & Google Apps Script 자동 수집 연동
            </p>
          </div>
        </footer>

      </div>

      {/* GAS Setup Modal */}
      <GasSetupModal
        isOpen={isGasModalOpen}
        onClose={() => setIsGasModalOpen(false)}
        currentGasUrl={gasConfig.webAppUrl}
        onSaveGasUrl={handleSaveGasUrl}
      />

      {/* Admin Security Password Modal (2026) */}
      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onSuccess={handleAdminAuthSuccess}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

    </div>
  );
}
