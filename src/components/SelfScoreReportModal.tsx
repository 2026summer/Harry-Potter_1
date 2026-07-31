import React from 'react';
import { Question, HouseType } from '../types';
import { CheckCircle2, XCircle, Award, Sparkles, X, BookOpen, RotateCcw, FileText, Check } from 'lucide-react';

interface SelfScoreReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentHouse: HouseType;
  chapterNumber: number;
  questions: Question[];
  answers: Record<string, string>;
  onResetAnswers: () => void;
}

export const SelfScoreReportModal: React.FC<SelfScoreReportModalProps> = ({
  isOpen,
  onClose,
  studentName,
  studentHouse,
  chapterNumber,
  questions,
  answers,
  onResetAnswers,
}) => {
  if (!isOpen) return null;

  // Calculate Scores (Only Multiple Choice is auto-graded as requested)
  let correctCount = 0;
  let multipleChoiceTotal = 0;
  let shortAnswerSubmittedCount = 0;

  questions.forEach((q) => {
    if (q.format === 'multiple_choice') {
      multipleChoiceTotal++;
      const studentAns = answers[q.id] || '';
      const correctIdx = typeof q.correctOptionIndex === 'number' ? q.correctOptionIndex : 0;
      const correctOptionStr = `(${correctIdx + 1})`;
      
      if (studentAns.startsWith(correctOptionStr) || (q.options && studentAns === q.options[correctIdx])) {
        correctCount++;
      }
    } else {
      if ((answers[q.id] || '').trim().length > 0) {
        shortAnswerSubmittedCount++;
      }
    }
  });

  const totalQuestions = questions.length;
  const shortAnswerTotal = totalQuestions - multipleChoiceTotal;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white border-2 border-amber-300 rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl relative space-y-6 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge & Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold font-serif shadow-sm">
            <Award className="w-4 h-4 text-amber-600" />
            <span>수행평가 제출 완료 & 자가 채점 결과 리포트</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-800">
            {studentName} 학생의 Chapter {chapterNumber} 성적 리포트
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            제출이 완료되었습니다! 아래에서 객관식 정답 개수와 문항별 상세 해설을 확인해보세요.
          </p>
        </div>

        {/* Score Summary Box */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-100/50 to-rose-500/10 border-2 border-amber-300 rounded-2xl p-5 text-center shadow-inner space-y-3">
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">객관식 자동 채점 결과</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-serif flex items-baseline gap-1">
              <span>{correctCount}</span>
              <span className="text-2xl text-slate-600 font-normal">/ {multipleChoiceTotal}</span>
              <span className="text-sm font-sans font-bold text-slate-700 ml-1">개 맞춤</span>
              <span className="text-xs text-slate-500 font-normal ml-2">(전체 {correctCount}/{totalQuestions})</span>
            </div>
          </div>

          <div className="bg-white/90 border border-amber-200 p-3 rounded-xl max-w-md mx-auto text-xs text-slate-800 font-medium space-y-1 shadow-xs">
            <div className="flex items-center justify-center gap-1.5 text-amber-900 font-bold">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>서술형 문항 안내</span>
            </div>
            <p className="text-slate-700">
              📝 서술형 문항({shortAnswerSubmittedCount}/{shortAnswerTotal} 작성 완료)은 <span className="font-bold text-amber-900">선생님이 직접 검토할 예정입니다.</span>
            </p>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="space-y-4">
          <h3 className="text-sm font-serif font-bold text-slate-800 flex items-center gap-2 border-b-2 border-amber-200 pb-2">
            <FileText className="w-4 h-4 text-amber-600" />
            <span>문항별 정답 확인 및 상세 해설</span>
          </h3>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const studentAns = answers[q.id] || '(미제출)';
              const isMc = q.format === 'multiple_choice';
              const correctIdx = typeof q.correctOptionIndex === 'number' ? q.correctOptionIndex : 0;
              const correctOptionStr = `(${correctIdx + 1})`;
              const isCorrect = isMc && (studentAns.startsWith(correctOptionStr) || (q.options && studentAns === q.options[correctIdx]));
              const rawCorrectOpt = q.options && q.options[correctIdx] ? q.options[correctIdx] : '';
              const cleanedCorrectOpt = rawCorrectOpt.replace(/^(Option|option)\s*([A-D1-4])?\s*[:\.-]?\s*/i, '').trim();

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border-2 transition-all space-y-3 ${
                    isMc
                      ? isCorrect
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : 'bg-rose-50/70 border-rose-300'
                      : 'bg-amber-50/70 border-amber-200'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold font-serif text-slate-800 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs">
                        {idx + 1}
                      </span>
                      <span>[{isMc ? '객관식' : '서술형/단답형'}] {q.typeLabel}</span>
                    </span>

                    {/* Result Badge */}
                    {isMc ? (
                      isCorrect ? (
                        <span className="px-2.5 py-1 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" /> 정답!
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-xl bg-rose-500 text-white text-xs font-bold flex items-center gap-1 shadow-xs">
                          <XCircle className="w-3.5 h-3.5" /> 오답
                        </span>
                      )
                    ) : (
                      <span className="px-2.5 py-1 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-xs">
                        <Check className="w-3.5 h-3.5" /> 선생님 검토 예정
                      </span>
                    )}
                  </div>

                  {/* Question Text */}
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-snug">{q.questionText}</p>
                    {q.koreanTranslation && (
                      <p className="text-xs text-slate-600 mt-0.5">🇰🇷 {q.koreanTranslation}</p>
                    )}
                  </div>

                  {/* Student Answer */}
                  <div className="bg-white/90 p-3 rounded-xl border border-slate-200 text-xs font-sans">
                    <span className="text-slate-500 font-bold block mb-0.5">내가 제출한 답변:</span>
                    <span className="text-slate-900 font-semibold">{studentAns}</span>
                  </div>

                  {/* Correct Answer & Explanation */}
                  <div className="bg-amber-100/60 p-3 rounded-xl border border-amber-300/80 text-xs text-amber-950 leading-relaxed font-sans space-y-1">
                    {isMc && cleanedCorrectOpt && (
                      <div className="font-bold text-emerald-900 flex items-center gap-1">
                        <span>💡 정답:</span>
                        <span>({correctIdx + 1}) {cleanedCorrectOpt}</span>
                      </div>
                    )}
                    <div className="font-medium">
                      <span className="font-bold text-amber-900">📖 해설 및 안내:</span>{' '}
                      {isMc
                        ? (q.explanation || '원서 내용과 일치하는 보기입니다.')
                        : '서술형은 선생님이 직접 검토할 예정입니다.'}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              onResetAnswers();
              onClose();
            }}
            className="w-full sm:w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 border border-slate-300"
          >
            <RotateCcw className="w-4 h-4 text-slate-600" />
            <span>새로 다시 풀기</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-1/2 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-2xl text-xs sm:text-sm font-extrabold transition-all shadow-md flex items-center justify-center gap-2 border border-amber-400"
          >
            <CheckCircle2 className="w-4 h-4 text-slate-950" />
            <span>확인 완료 (창 닫기)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
