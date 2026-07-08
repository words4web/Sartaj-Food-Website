import { Mail, Wrench, AlertTriangle } from "lucide-react";

export function MaintenancePage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#090a0f] text-zinc-100 p-4 relative overflow-hidden font-sans">
      {/* Decorative ambient background glows */}
      <div className="absolute top-[20%] left-[15%] w-[350px] h-[350px] bg-amber-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-[#d4771a]/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[10000ms] delay-200" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-900/5 rounded-full border border-white/5 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-xl w-full mx-auto">
        <div className="bg-zinc-950/60 backdrop-blur-2xl border border-white/[0.06] rounded-2xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center relative overflow-hidden">
          {/* Top border accent line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-amber-500/20 via-amber-500 to-amber-500/20" />

          {/* Logo */}
          <div className="mb-8">
            <img
              src="/sartaj_logo.svg"
              alt="Sartaj Foods Logo"
              className="h-16 sm:h-20 mx-auto object-contain drop-shadow-[0_4px_12px_rgba(212,119,26,0.2)]"
            />
          </div>

          {/* Status Indicator */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs sm:text-sm font-medium tracking-wider mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>Technical Updates In Progress / メンテナンス中</span>
          </div>

          {/* Icon Header */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-zinc-900/80 border border-white/[0.04] text-amber-500 shadow-inner">
              <Wrench className="h-8 w-8 animate-bounce" style={{ animationDuration: "3s" }} />
            </div>
          </div>

          {/* Multilingual Messages */}
          <div className="space-y-8">
            {/* English Section */}
            <div className="space-y-3">
              <h1 className="text-xl sm:text-2xl font-bold text-zinc-50 tracking-tight">
                Temporary Maintenance
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                We are currently carrying out essential technical upgrades and fixing performance
                issues to improve your browsing experience. We will be back online shortly.
              </p>
            </div>

            {/* Subtle Divider */}
            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
              <div className="relative bg-zinc-950 px-4 text-zinc-600 text-xs">
                <AlertTriangle className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Japanese Section */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-200 tracking-tight">
                システムメンテナンスのお知らせ
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                ただいま、サービスの向上およびシステム調整に伴うメンテナンスを実施しております。お客様には大変ご不便をおかけいたしますが、サービス再開まで今しばらくお待ちください。
              </p>
            </div>
          </div>

          {/* Footer Contact Info */}
          <div className="mt-10 pt-6 border-t border-zinc-900">
            <p className="text-zinc-500 text-xs mb-3">
              For any urgent inquiries, please contact us at:
              <br />
              緊急のお問い合わせはこちらまでお願いいたします：
            </p>
            <a
              href="mailto:info@sartajfoods.jp"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 border border-white/[0.03] hover:border-amber-500/30 text-zinc-300 hover:text-amber-400 transition-all duration-300 text-sm font-medium group"
            >
              <Mail className="h-4 w-4 text-zinc-500 group-hover:text-amber-400 transition-colors" />
              <span>info@sartajfoods.jp</span>
            </a>
          </div>
        </div>

        {/* Copyright or bottom brand details */}
        <div className="text-center mt-6 text-zinc-600 text-xs">
          &copy; {new Date().getFullYear()} Sartaj Foods. All rights reserved.
        </div>
      </div>
    </div>
  );
}
