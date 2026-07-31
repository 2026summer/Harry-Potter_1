import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ChapterSelector } from './components/ChapterSelector';
import { StudentForm } from './components/StudentForm';
import { TeacherDashboard } from './components/TeacherDashboard';
import { GasSetupModal } from './components/GasSetupModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { CHAPTERS, getChapterByNumber } from './data/chapters';
import { Question, HouseType, Submission, GasConfig } from './types';
import { Sparkles, Scroll, BookOpen, Feather } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');
  const [selectedChapterNum, setSelectedChapterNum] = useState<number>(1);
  const [selectedHouse, setSelectedHouse] = useState<HouseType>('Gryffindor');
  const [studentName, setStudentName] = useState<string>('');

  // Questions for current chapter
  const [questions, setQuestions] = useState<Question[]>(getChapterByNumber(1).defaultQuestions);
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

  // Fetch Questions for a Chapter (calls Express server Gemini route with fallback)
  const fetchQuestionsForChapter = useCallback(
    async (chapterNum: number, forceAiRegen: boolean = false) => {
      setIsAiLoading(true);
      setHasPreviousMatch(false);

      try {
        const res = await fetch('/api/gemini/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chapterNumber: chapterNum, forceRegenerate: forceAiRegen }),
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
            addToast('success', 'Gemini AI Questions Generated!', `Chapter ${chapterNum}용 5개의 새로운 이해도 질문이 생성되었습니다.`);
          }
        } else {
          // Curated fallback
          const defaultCh = getChapterByNumber(chapterNum);
          setQuestions(defaultCh.defaultQuestions);
          setIsAiGenerated(false);
          const initialAnswers: Record<string, string> = {};
          defaultCh.defaultQuestions.forEach((q) => {
            initialAnswers[q.id] = '';
          });
          setAnswers(initialAnswers);
        }
      } catch (err: any) {
        console.error('Error fetching questions:', err);
        const defaultCh = getChapterByNumber(chapterNum);
        setQuestions(defaultCh.defaultQuestions);
        setIsAiGenerated(false);
        const initialAnswers: Record<string, string> = {};
        defaultCh.defaultQuestions.forEach((q) => {
          initialAnswers[q.id] = '';
        });
        setAnswers(initialAnswers);
        addToast('info', 'Loaded Curated Questions', `Chapter ${chapterNum} 기본 질문을 불러왔습니다.`);
      } finally {
        setIsAiLoading(false);
      }
    },
    []
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
      }
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setIsSubmissionsLoading(false);
    }
  };

  // Chapter Selection Change Handler
  const handleSelectChapter = (num: number) => {
    setSelectedChapterNum(num);
    fetchQuestionsForChapter(num);
  };

  // Answer Textarea Change Handler
  const handleAnswerChange = (questionId: string, text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: text,
    }));
  };

  // Submit Journal Entry
  const handleSubmitJournal = async () => {
    if (!studentName.trim()) {
      addToast('error', 'Student Name Required', '학생 이름을 먼저 입력해 주세요.');
      return;
    }

    const currentChapter = getChapterByNumber(selectedChapterNum);
    const answersList = questions.map((q) => ({
      questionId: q.id,
      questionText: q.questionText,
      questionType: q.type,
      answerText: answers[q.id] || '',
    }));

    setIsSubmitting(true);

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

      if (data.success) {
        addToast(
          'success',
          '제출 완료! (Journal Saved)',
          data.syncedToGoogleSheets
            ? '구글 시트 및 호그와트 데이터베이스에 성공적으로 저장이 완료되었습니다.'
            : '서버 데이터베이스에 저장이 완료되었습니다. (구글 시트 연동 시 시트에도 자동 기록)'
        );
        fetchSubmissions();
      } else {
        addToast('error', 'Submission Error', data.error || '제출 중 오류가 발생했습니다.');
      }
    } catch (err: any) {
      console.error('Submit error:', err);
      addToast('error', 'Network Error', '서버 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
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
        addToast('success', '이전 제출 내역 로드 완료', `${sub.studentName} 학생의 Chapter ${sub.chapterNumber} 이전 작성 답안을 불러왔습니다.`);
      } else {
        addToast('info', '검색 결과 없음', `'${searchName}' 학생의 Chapter ${searchCh} 이전 제출 기록이 존재하지 않습니다.`);
      }
    } catch (err) {
      console.error('Search error:', err);
      addToast('error', 'Search Error', '이전 작성 내역을 조회하는 중 오류가 발생했습니다.');
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
      addToast('error', 'Feedback Save Failed', '피드백 저장 중 오류가 발생했습니다.');
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Background Magic Particles Atmosphere */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedHouse={selectedHouse}
          setSelectedHouse={setSelectedHouse}
          onOpenGasModal={() => setIsGasModalOpen(true)}
          isGasConfigured={gasConfig.isConfigured}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
          
          {activeTab === 'student' ? (
            <div className="space-y-6">
              
              {/* Chapter Selector Card */}
              <ChapterSelector
                selectedChapterNum={selectedChapterNum}
                onSelectChapter={handleSelectChapter}
                onRegenerateAiQuestions={() => fetchQuestionsForChapter(selectedChapterNum, true)}
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
            />
          )}

        </main>

        {/* Magical Footer */}
        <footer className="border-t border-slate-900 bg-slate-950/90 py-6 mt-12 text-center text-xs text-slate-500 font-serif">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-amber-400/80">
              <Feather className="w-4 h-4" />
              <span>Hogwarts English Reading Journal • Harry Potter & The Sorcerer's Stone</span>
            </div>
            <p className="text-slate-600">
              Powered by Server-Side Gemini API & Google Sheets Apps Script
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

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

    </div>
  );
}
