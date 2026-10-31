import React from 'react';
import { ShieldCheck, HeartHandshake, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs mt-auto py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🥑</span>
              <span className="text-lg font-black text-white tracking-tight">
                Food<span className="text-[#2EC4B6]">Rescue</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed text-xs">
              Food Rescue는 동네 소상공인의 유통기한 임박 마감 식품과 지역 주민을 직접 연결하여 음식물 쓰레기를 줄이고, 가치 있는 소비와 지속 가능한 환경 생태계를 함께 만듭니다.
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ESG Net-Zero 지역순환 공익 프로젝트 파트너</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">서비스 안내</h4>
            <ul className="space-y-2">
              <li>
                <a href="#how" className="hover:text-white transition-colors">
                  이용 가이드
                </a>
              </li>
              <li>
                <a href="#partner" className="hover:text-white transition-colors">
                  소상공인 입점 파트너 신청
                </a>
              </li>
              <li>
                <a href="#carbon" className="hover:text-white transition-colors">
                  탄소 절감 계산 방식
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  자주 묻는 질문 (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">고객센터 & 제휴</h4>
            <p className="text-slate-300 font-bold mb-1 flex items-center gap-1.5 text-sm">
              <Phone className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>1588-0000</span>
            </p>
            <p className="text-slate-500 mb-2">평일 09:00 ~ 18:00 (점심 12:00~13:00)</p>
            <p className="text-slate-500 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>partner@foodrescue.eco</span>
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>© 2026 Food Rescue Inc. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#terms" className="hover:underline">이용약관</a>
            <a href="#privacy" className="hover:underline">개인정보처리방침</a>
            <a href="#merchant" className="hover:underline">전자상거래 표준약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
