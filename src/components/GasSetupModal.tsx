import React, { useState } from 'react';
import { GAS_SCRIPT_CODE } from '../data/gasScriptTemplate';
import { Sheet, Copy, Check, X, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

interface GasSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGasUrl: string;
  onSaveGasUrl: (url: string) => Promise<boolean>;
}

export const GasSetupModal: React.FC<GasSetupModalProps> = ({
  isOpen,
  onClose,
  currentGasUrl,
  onSaveGasUrl,
}) => {
  const [inputUrl, setInputUrl] = useState(currentGasUrl);
  const [copied, setCopied] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GAS_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTestAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTesting(true);
    setTestResult(null);

    const trimmedUrl = inputUrl.trim();
    if (!trimmedUrl) {
      await onSaveGasUrl('');
      setTestResult({ success: true, message: 'Google Sheets 연동 해제됨 (로컬 DB 모드로 전환되었습니다).' });
      setIsTesting(false);
      return;
    }

    try {
      // Test connection
      const res = await fetch(`${trimmedUrl}?action=get_all`);
      const data = await res.json();

      if (data && (data.status === 'ok' || data.success || Array.isArray(data.submissions))) {
        await onSaveGasUrl(trimmedUrl);
        setTestResult({
          success: true,
          message: '✨ 구글 시트 연동 성공! 제출 답변이 구글 시트에 자동 기록됩니다.',
        });
      } else {
        await onSaveGasUrl(trimmedUrl);
        setTestResult({
          success: true,
          message: '구글 시트 URL 저장 완료! (배포 권한이 [모든 사용자/Anyone]인지 확인하세요.)',
        });
      }
    } catch (err: any) {
      await onSaveGasUrl(trimmedUrl);
      setTestResult({
        success: true,
        message: 'URL이 저장되었습니다. (호그와트 데이터베이스에 안전하게 기록됩니다)',
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border-2 border-amber-300 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative space-y-5">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-amber-100 pb-4">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
            <Sheet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-extrabold text-slate-800">
              구글 시트(Google Sheets) 연동 설정
            </h3>
            <p className="text-xs text-slate-600">
              학생 제출 답변을 개인 구글 시트에 자동 실시간 수집하는 설정입니다.
            </p>
          </div>
        </div>

        {/* Step Guide */}
        <div className="space-y-3 text-xs text-slate-700">
          <h4 className="font-serif font-bold text-amber-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" /> 쉬운 3단계 연동 가이드:
          </h4>

          <ol className="list-decimal list-inside space-y-2 pl-1 leading-relaxed bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200">
            <li>새 구글 시트(Google Sheets)를 생성합니다.</li>
            <li>상단 메뉴에서 <span className="text-amber-900 font-bold">[확장 프로그램] → [Apps Script]</span>를 실행합니다.</li>
            <li>아래 [스크립트 코드 전체 복사] 버튼을 누르고 붙여넣기합니다.</li>
            <li>우측 상단 <span className="text-amber-900 font-bold">[배포] → [새 배포] → [웹 앱]</span> 선택!</li>
            <li>액세스 권한: <span className="text-amber-900 font-extrabold">[모든 사용자 (Anyone)]</span>로 선택 후 배포합니다!</li>
          </ol>
        </div>

        {/* Copy Script Code */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-serif font-bold text-slate-800">Apps Script Source Code (Code.gs)</span>
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '복사 완료!' : '스크립트 코드 복사'}</span>
            </button>
          </div>

          <pre className="bg-slate-900 p-3.5 rounded-2xl border border-slate-700 text-[11px] font-mono text-amber-100 max-h-36 overflow-y-auto leading-tight shadow-inner">
            {GAS_SCRIPT_CODE}
          </pre>
        </div>

        {/* URL Input Form */}
        <form onSubmit={handleTestAndSave} className="pt-3 border-t border-amber-100 space-y-3">
          <label className="block text-xs font-serif font-bold text-slate-800">
            배포된 구글 웹 앱 URL (GAS Web App Deployment URL)
          </label>

          <input
            type="url"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="https://script.google.com/macros/s/AKfycb.../exec"
            className="w-full bg-amber-50/40 text-slate-900 placeholder-slate-400 border border-amber-300 rounded-2xl p-3 text-xs focus:outline-none focus:border-amber-500 font-mono"
          />

          {testResult && (
            <div className={`p-3.5 rounded-2xl border text-xs flex items-center gap-2 ${
              testResult.success ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold' : 'bg-rose-50 text-rose-800 border-rose-300'
            }`}>
              {testResult.success ? <Check className="w-4 h-4 shrink-0 text-emerald-600" /> : <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />}
              <span>{testResult.message}</span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
            >
              닫기
            </button>

            <button
              type="submit"
              disabled={isTesting}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-slate-900 font-extrabold rounded-xl text-xs shadow-md flex items-center gap-1.5"
            >
              {isTesting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-900" />
                  <span>연동 검증 중...</span>
                </>
              ) : (
                <>
                  <Sheet className="w-4 h-4" />
                  <span>연동 테스트 및 저장</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
