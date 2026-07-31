import React, { useState } from 'react';
import { Lock, KeyRound, ShieldCheck, X, AlertCircle } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === '2026') {
      setErrorMsg('');
      setPassword('');
      onSuccess();
    } else {
      setErrorMsg('비밀번호가 일치하지 않습니다. (기본 비밀번호: 2026)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border-2 border-indigo-300 rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-5 animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-indigo-100 border-2 border-indigo-300 rounded-2xl mx-auto flex items-center justify-center shadow-md">
            <Lock className="w-7 h-7 text-indigo-700" />
          </div>
          <h3 className="text-xl font-serif font-extrabold text-slate-800">
            관리자 보안 인증
          </h3>
          <p className="text-xs text-slate-600 font-sans">
            학생 리딩 제출 내역 조회 및 성적 관리를 위한 관리자 인증이 필요합니다.
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-serif font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-indigo-600" /> 관리자 비밀번호 (Admin Password)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMsg('');
              }}
              placeholder="비밀번호를 입력하세요..."
              autoFocus
              className="w-full bg-indigo-50/40 text-slate-900 placeholder-slate-400 border-2 border-indigo-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all font-mono"
            />
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition-all"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-2xl text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>관리자 접속</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
