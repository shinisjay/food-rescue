import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  X, 
  ShoppingBag, 
  Store, 
  ChevronDown, 
  Check, 
  Code2, 
  Sparkles,
  TreePine,
  Utensils
} from 'lucide-react';
import { NEIGHBORHOODS } from '../data/mockProducts';

interface HeaderProps {
  currentLocation: string;
  onLocationChange: (loc: string) => void;
  onDetectGPS: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  reservedCount: number;
  onOpenCart: () => void;
  onOpenHtmlExport: () => void;
  carbonSavedKg: number;
  totalRescuedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  onLocationChange,
  onDetectGPS,
  searchQuery,
  onSearchChange,
  reservedCount,
  onOpenCart,
  onOpenHtmlExport,
  carbonSavedKg,
  totalRescuedCount,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pineTrees = (carbonSavedKg / 6.6).toFixed(1);

  return (
    <>
      {/* Top ESG Global Notification Banner */}
      <aside aria-label="ESG 캠페인 알림" className="bg-gradient-to-r from-[#2EC4B6] to-[#20968B] text-white text-xs sm:text-sm font-medium py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="bg-white/20 px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase">
              ESG Campaign
            </span>
            <span className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-emerald-200 shrink-0" />
              <span>오늘 우리 동네에서 절감된 탄소 배출량:</span>
              <strong className="underline decoration-emerald-300 font-extrabold text-white tracking-wide">
                {carbonSavedKg.toFixed(1)} kg CO₂
              </strong>
            </span>
          </div>

          <div className="hidden md:flex items-center text-xs text-white/90 gap-4">
            <span className="flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-emerald-100" />
              구출된 음식 <strong>{totalRescuedCount}개</strong>
            </span>
            <span className="text-white/40">|</span>
            <span className="flex items-center gap-1.5">
              <TreePine className="w-3.5 h-3.5 text-emerald-100" />
              소나무 <strong>{pineTrees}그루</strong> 식재 효과
            </span>
          </div>
        </div>
      </aside>

      {/* Main Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3 md:gap-8">
            
            {/* Logo & Location */}
            <div className="flex items-center gap-3 md:gap-6 shrink-0">
              <a href="#" className="flex items-center gap-2 group focus:outline-none">
                <span className="text-3xl select-none transition-transform duration-300 group-hover:scale-110">
                  🥑
                </span>
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-black tracking-tight text-[#FF6B35]">
                    Food<span className="text-[#2EC4B6]">Rescue</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium -mt-1 hidden sm:block">
                    지구를 살리는 마감할인
                  </span>
                </div>
              </a>

              {/* Location Selector: GPS Auto-detection + Direct Input */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 py-1.5 px-3 rounded-full transition-colors cursor-pointer"
                  title="동네 설정 (GPS 자동 인식 / 직접 입력)"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B35] shrink-0" />
                  <span className="truncate max-w-[140px] sm:max-w-none">{currentLocation}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                </button>

                {/* Location Dropdown Popover */}
                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-800">탐색 동네 설정</span>
                      <button
                        type="button"
                        onClick={onDetectGPS}
                        className="flex items-center gap-1 text-[11px] font-bold text-[#2EC4B6] hover:text-[#20968B] bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        <MapPin className="w-3 h-3" />
                        <span>현재 위치로 설정</span>
                      </button>
                    </div>

                    {/* Direct Text Input Form */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (customInput.trim()) {
                          onLocationChange(customInput.trim());
                          setDropdownOpen(false);
                          setCustomInput('');
                        }
                      }}
                      className="flex gap-1.5 mb-3"
                    >
                      <input
                        type="text"
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        placeholder="예: 잠실동, 역삼동, 판교동"
                        className="flex-1 bg-slate-100 focus:bg-white text-xs px-3 py-2 rounded-xl border border-transparent focus:border-[#2EC4B6] outline-none"
                      />
                      <button
                        type="submit"
                        className="bg-[#FF6B35] hover:bg-[#E85A25] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer shrink-0"
                      >
                        변경
                      </button>
                    </form>

                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">
                      추천 동네 바로가기
                    </div>
                    <div className="space-y-0.5">
                      {NEIGHBORHOODS.map((loc) => {
                        const isSelected = loc === currentLocation;
                        return (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => {
                              onLocationChange(loc);
                              setDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-orange-50 text-[#FF6B35] font-bold'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            <span>{loc}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#FF6B35]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Bar (Desktop) */}
            <div className="flex-1 max-w-lg hidden sm:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="가게명, 빵, 샐러드, 디저트 검색..."
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-100 focus:bg-white text-sm rounded-full border border-transparent focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20 transition-all outline-none"
                />
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                    title="검색어 지우기"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Single HTML Export Code View Modal Button */}
              <button
                type="button"
                onClick={onOpenHtmlExport}
                className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#FF6B35] bg-slate-100 hover:bg-orange-50 px-3 py-2 rounded-xl transition-colors cursor-pointer"
                title="단일 HTML 파일 코드 확인 및 다운로드"
              >
                <Code2 className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>단일 HTML 보기</span>
              </button>

              {/* My Reservations Cart */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative p-2.5 text-slate-700 hover:text-[#FF6B35] transition-colors rounded-full hover:bg-orange-50 cursor-pointer"
                title="예약 내역 확인"
              >
                <ShoppingBag className="w-5 h-5" />
                {reservedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF6B35] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                    {reservedCount}
                  </span>
                )}
              </button>

              {/* Partner Merchant Button */}
              <button
                type="button"
                onClick={() => alert('사장님 마감할인 제휴 신청 안내:\n가맹점 등록 문의는 partner@foodrescue.eco 또는 1588-0000으로 연락주시면 24시간 이내 입점 심사가 진행됩니다.')}
                className="hidden md:flex items-center gap-1.5 bg-[#2EC4B6]/10 text-[#20968B] hover:bg-[#2EC4B6]/20 font-semibold text-xs px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <Store className="w-3.5 h-3.5" />
                <span>사장님 입점</span>
              </button>
            </div>
          </div>

          {/* Mobile Search Input */}
          <div className="pb-3 sm:hidden">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="가게명, 상품명으로 검색해보세요"
                className="w-full pl-9 pr-9 py-2 bg-slate-100 text-xs rounded-full border border-slate-200 focus:border-[#2EC4B6] outline-none"
              />
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
