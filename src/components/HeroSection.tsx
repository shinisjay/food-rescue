import React from 'react';
import { Clock, ShieldCheck, Sparkles, TrendingDown } from 'lucide-react';

interface HeroSectionProps {
  currentLocation: string;
  activeStoreCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLocation,
  activeStoreCount,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50/70 via-orange-50/50 to-teal-50/40 border-b border-orange-100/60 py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headlines & Benefits */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-bold px-3 py-1.5 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              <span>마감 임박 최대 70% 타임세일 실시간 진행</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight text-balance">
              버려질 위기의 맛있는 음식,<br className="hidden sm:inline" />
              <span className="text-[#FF6B35]">마감 특가</span>로 구출하고 지구도 지켜요!
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              동네 이웃 가게들의 신선한 당일 제조 베이커리, 샐러드, 도시락을 최대 70% 할인된 가격에 간편하게 예약하고 직접 픽업해보세요.
            </p>

            {/* Benefit Highlights */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#2EC4B6]" />
                <span>당일 생산 신선도 100% 보장</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <TrendingDown className="w-4 h-4 text-[#FF6B35]" />
                <span>평균 50~70% 할인</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>현장 확인 후 안심 결제</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Golden Hour Card & Hero Graphic */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Live Golden Hour Card */}
            <div className="bg-white/95 backdrop-blur-xs border border-orange-200/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2EC4B6]/15 flex items-center justify-center text-[#20968B] shrink-0">
                  <Clock className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#FF6B35] tracking-wider uppercase">
                      골든타임 알림
                    </span>
                    <span className="text-[11px] text-slate-400">· 실시간 매칭</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 leading-snug">
                    지금 <strong className="text-slate-900 underline decoration-[#2EC4B6]">{currentLocation}</strong> 주변{' '}
                    <span className="text-[#FF6B35] font-extrabold text-base">{activeStoreCount}</span>개 매장에서 마감 세일 중입니다.
                  </p>
                  <p className="text-xs text-slate-500 pt-0.5">
                    평균 마감 40분 전 조기 품절되니 빠른 예약을 추천드려요!
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Hero Banner visual card */}
            <div className="relative rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 aspect-[16/7] hidden sm:block">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
                alt="Food Rescue 신선 베이커리와 샐러드"
                className="w-full h-full object-cover"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://placehold.co/600x400/2EC4B6/ffffff?text=Food+Rescue';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-4">
                <div className="text-white text-xs">
                  <span className="font-semibold block text-emerald-300">#오늘의구출 #방이동소상공인</span>
                  <p className="text-white/90 text-[11px]">이웃과 매장이 상생하는 푸드 리스크 매칭 플랫폼</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
