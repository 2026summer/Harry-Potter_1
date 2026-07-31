import React, { useState } from 'react';
import { GAS_SCRIPT_CODE } from '../data/gasScriptTemplate';
import { Sheet, Copy, Check, ExternalLink, X, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

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
      setTestResult({ success: true, message: 'Google Sheets URL disengaged. Saved local mode.' });
      setIsTesting(false);
      return;
    }

    try {
      // Test GET connection to GAS Web App
      const res = await fetch(`${trimmedUrl}?action=get_all`);
      const data = await res.json();

      if (data && (data.status === 'ok' || data.success || Array.isArray(data.submissions))) {
        await onSaveGasUrl(trimmedUrl);
        setTestResult({
          success: true,
          message: '✨ Google Sheets 연동 성공! 제출 답안이 자동으로 구글 시트에 저장됩니다.',
        });
      } else {
        setTestResult({
          success: false,
          message: '웹 앱 URL에서 유효한 응답을 받지 못했습니다. 앱 스크립트 웹 앱 배포 권한이 [모든 사용자(Anyone)]인지 확인하세요.',
        });
      }
    } catch (err: any) {
      // Save anyway in case of CORS or preview proxy constraints
      await onSaveGasUrl(trimmedUrl);
      setTestResult({
        success: true,
        message: 'URL이 저장되었습니다. (테스트 알림: 배포 시 [액세스 권한: 모든 사용자] 설정 필수)',
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-amber-500/60 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative space-y-5">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-200 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Sheet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-amber-200">
              구글 시트 연동 설정 (Google Apps Script Web App)
            </h3>
            <p className="text-xs text-slate-400">
              구글 시트(Google Sheets)에 제출 답안을 자동 기록하기 위한 GAS 연동 가이드입니다.
            </p>
          </div>
        </div>

        {/* Step Guide */}
        <div className="space-y-3 text-xs text-slate-300">
          <h4 className="font-serif font-bold text-amber-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> 연동 3단계 가이드:
          </h4>

          <ol className="list-decimal list-inside space-y-1.5 pl-1 leading-relaxed text-slate-300">
            <li>새 구글 시트(Google Sheets)를 만듭니다.</li>
            <li>상단 메뉴에서 <span className="text-amber-300 font-semibold">[확장 프로그램] → [Apps Script]</span>를 실행합니다.</li>
            <li>아래 [Google Apps Script 코드 복사] 버튼을 누르고 전체 붙여넣기합니다.</li>
            <li>우측 상단 <span className="text-amber-300 font-semibold">[배포] → [새 배포] → [웹 앱]</span> 선택!</li>
            <li>액세스 권한: <span className="text-amber-400 font-bold">[모든 사용자 (Anyone)]</span>로 설정 후 배포!</li>
          </ol>
        </div>

        {/* Copy Script Code */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-serif font-semibold text-slate-300">Apps Script Source Code (Code.gs)</span>
            <button
              onClick={handleCopyCode}
              className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '복사 완료!' : '스크립트 코드 전체 복사'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 max-h-36 overflow-y-auto leading-tight">
            {GAS_SCRIPT_CODE}
          </pre>
        </div>

        {/* URL Input Form */}
        <form onSubmit={handleTestAndSave} className="pt-3 border-t border-slate-800 space-y-3">
          <label className="block text-xs font-serif font-semibold text-amber-300">
            배포된 구글 웹 앱 URL (GAS Web App Deployment URL)
          </label>

          <input
            type="url"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="https://script.google.com/macros/s/AKfycb.../exec"
            className="w-full bg-slate-950 text-slate-100 placeholder-slate-600 border border-slate-700 rounded-xl p-3 text-xs focus:outline-none focus:border-amber-400 font-mono"
          />

          {testResult && (
            <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
              testResult.success ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50' : 'bg-rose-950/80 text-rose-300 border-rose-500/50'
            }`}>
              {testResult.success ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{testResult.message}</span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
            >
              닫기
            </button>

            <button
              type="submit"
              disabled={isTesting}
              className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg flex items-center gap-1.5"
            >
              {isTesting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-950" />
                  <span>연동 검증 중...</span>
                </>
              ) : (
                <>
                  <Sheet className="w-3.5 h-3.5" />
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
