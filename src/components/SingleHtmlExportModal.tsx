import React, { useState } from 'react';
import { X, Copy, Check, Download, Code2, Globe } from 'lucide-react';

interface SingleHtmlExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SingleHtmlExportModal: React.FC<SingleHtmlExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const standaloneHtmlCode = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Food Rescue - 동네 마감할인 & 푸드 리스크 매칭</title>
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              orange: '#FF6B35',
              'orange-hover': '#e85a25',
              green: '#2EC4B6',
              'green-dark': '#20968b',
              light: '#F8F9FA',
              dark: '#1E293B',
            }
          },
          fontFamily: {
            sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <!-- FontAwesome CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <!-- Google Web Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <style>
    body { font-family: 'Noto Sans KR', sans-serif; }
    .custom-scrollbar::-webkit-scrollbar { height: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
  </style>
</head>
<body class="bg-[#F8F9FA] text-slate-800 antialiased min-h-screen flex flex-col">

  <!-- ESG Global Notification Banner -->
  <div class="bg-gradient-to-r from-[#2EC4B6] to-[#20968b] text-white text-xs sm:text-sm font-medium py-2 px-4 shadow-inner">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center space-x-2">
        <span class="bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase">ESG Campaign</span>
        <span class="flex items-center gap-1.5">
          <i class="fa-solid fa-seedling text-emerald-200"></i>
          <span>오늘 우리 동네에서 절감된 탄소 배출량:</span>
          <strong id="carbonStat" class="underline decoration-emerald-300 font-extrabold text-white">128.5 kg CO₂</strong>
        </span>
      </div>
      <div class="hidden md:flex items-center text-xs text-white/90 gap-3">
        <span><i class="fa-solid fa-utensils mr-1"></i>구출된 음식 <strong>314개</strong></span>
        <span>|</span>
        <span><i class="fa-solid fa-tree mr-1"></i>소나무 <strong>19.4그루</strong> 식재 효과</span>
      </div>
    </div>
  </div>

  <!-- Header -->
  <header class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20 gap-3 md:gap-8">
        
        <!-- Logo & Location -->
        <div class="flex items-center gap-3 md:gap-6 flex-shrink-0">
          <a href="#" class="flex items-center gap-2 group">
            <span class="text-3xl filter drop-shadow transition-transform duration-300 group-hover:scale-110">🥑</span>
            <div class="flex flex-col">
              <span class="text-xl md:text-2xl font-black tracking-tight text-[#FF6B35]">
                Food<span class="text-[#2EC4B6]">Rescue</span>
              </span>
              <span class="text-[10px] text-slate-400 font-medium -mt-1 hidden sm:block">지구를 살리는 마감할인</span>
            </div>
          </a>

          <!-- Location Selector -->
          <div class="relative">
            <button id="locationBtn" class="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 py-1.5 px-3 rounded-full transition-colors">
              <i class="fa-solid fa-location-dot text-[#FF6B35]"></i>
              <span id="currentLocation">서울시 송파구 방이동</span>
              <i class="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
            </button>
            <div id="locationDropdown" class="hidden absolute left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
              <div class="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase">동네 변경</div>
              <button onclick="changeLocation('서울시 송파구 방이동')" class="w-full text-left px-3 py-1.5 text-xs hover:bg-orange-50 hover:text-[#FF6B35] font-medium flex items-center justify-between">
                <span>송파구 방이동</span>
                <i class="fa-solid fa-check text-xs text-[#FF6B35]"></i>
              </button>
              <button onclick="changeLocation('서울시 송파구 잠실본동')" class="w-full text-left px-3 py-1.5 text-xs hover:bg-orange-50 hover:text-[#FF6B35] font-medium">송파구 잠실본동</button>
              <button onclick="changeLocation('서울시 송파구 오금동')" class="w-full text-left px-3 py-1.5 text-xs hover:bg-orange-50 hover:text-[#FF6B35] font-medium">송파구 오금동</button>
              <button onclick="changeLocation('서울시 강동구 둔촌동')" class="w-full text-left px-3 py-1.5 text-xs hover:bg-orange-50 hover:text-[#FF6B35] font-medium">강동구 둔촌동</button>
            </div>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="flex-1 max-w-lg hidden sm:block">
          <div class="relative">
            <input 
              id="searchInput" 
              type="text" 
              placeholder="가게명, 빵, 샐러드, 디저트 검색..."
              class="w-full pl-10 pr-10 py-2.5 bg-slate-100 focus:bg-white text-sm rounded-full border border-transparent focus:border-[#2EC4B6] focus:ring-2 focus:ring-[#2EC4B6]/20 transition-all outline-none"
            >
            <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-slate-400 text-sm"></i>
            <button id="clearSearchBtn" class="hidden absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-sm">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <!-- Right User Actions -->
        <div class="flex items-center gap-2 sm:gap-3">
          <button class="relative p-2 text-slate-600 hover:text-[#FF6B35] transition-colors rounded-full hover:bg-orange-50">
            <i class="fa-solid fa-bag-shopping text-lg"></i>
            <span id="reservationBadge" class="absolute -top-1 -right-1 bg-[#FF6B35] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white scale-0 transition-transform">0</span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Hero Banner -->
  <section class="bg-gradient-to-br from-amber-50 via-orange-50 to-teal-50 border-b border-orange-100/60 py-6 sm:py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="space-y-2 text-center md:text-left">
          <div class="inline-flex items-center gap-1.5 bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-bold px-3 py-1 rounded-full">
            <i class="fa-solid fa-stopwatch"></i> 마감 임박 최대 70% 타임세일
          </div>
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
            버려질 위기의 맛있는 음식,<br class="hidden sm:inline">
            <span class="text-[#FF6B35]">마감 특가</span>로 구출하고 지구도 지켜요!
          </h1>
          <p class="text-slate-600 text-xs sm:text-sm">
            신선한 당일 제조 식품을 합리적인 가격에 예약하고 직접 픽업하세요.
          </p>
        </div>
        
        <div class="bg-white/90 backdrop-blur border border-orange-200/80 p-4 rounded-2xl shadow-sm flex items-center gap-4 w-full md:w-auto">
          <div class="w-12 h-12 rounded-xl bg-[#2EC4B6]/15 flex items-center justify-center text-[#2EC4B6] text-xl flex-shrink-0">
            <i class="fa-solid fa-clock-rotate-left"></i>
          </div>
          <div class="text-left">
            <span class="text-[11px] text-slate-400 font-semibold block">골든타임 알림</span>
            <p class="text-xs font-bold text-slate-800">
              지금 주변 매장에서 마감할인이 진행 중입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Filter & Category Bar -->
  <div class="bg-white border-b border-slate-200 sticky top-20 z-20 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar flex-1">
        <button onclick="setCategory('전체')" class="category-btn active px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-sm bg-[#FF6B35] text-white">전체 보기</button>
        <button onclick="setCategory('베이커리')" class="category-btn px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all bg-slate-100 hover:bg-slate-200 text-slate-600">베이커리</button>
        <button onclick="setCategory('카페/디저트')" class="category-btn px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all bg-slate-100 hover:bg-slate-200 text-slate-600">카페/디저트</button>
        <button onclick="setCategory('편의점/마트')" class="category-btn px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all bg-slate-100 hover:bg-slate-200 text-slate-600">편의점/마트</button>
        <button onclick="setCategory('도시락/샐러드')" class="category-btn px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all bg-slate-100 hover:bg-slate-200 text-slate-600">도시락/샐러드</button>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
    <div id="productGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"></div>
    <div id="emptyState" class="hidden flex flex-col items-center justify-center py-20 text-center">
      <h3 class="text-base font-bold text-slate-700">해당 조건에 맞는 마감 상품이 없습니다</h3>
    </div>
  </main>

  <!-- Reservation Modal -->
  <div id="reservationModal" class="fixed inset-0 z-50 hidden overflow-y-auto" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onclick="closeModal()"></div>
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-lg border border-slate-100">
        <div class="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 class="text-base font-bold text-slate-900">마감할인 픽업 예약</h3>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
        </div>
        <div class="px-6 py-5 space-y-4">
          <div class="p-3 bg-slate-50 rounded-xl border flex items-center gap-3">
            <div class="flex-1">
              <span id="modalStoreName" class="text-xs text-slate-500 font-medium block"></span>
              <h4 id="modalProductName" class="text-sm font-bold text-slate-900 mt-0.5"></h4>
              <div class="flex items-baseline gap-2 mt-1">
                <span id="modalDiscountPrice" class="text-base font-extrabold text-[#FF6B35]"></span>
                <span id="modalOriginalPrice" class="text-xs text-slate-400 line-through"></span>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-2">예상 픽업 시간 선택</label>
            <div class="grid grid-cols-2 gap-3">
              <label class="p-3 border rounded-xl flex items-center gap-2 cursor-pointer bg-teal-50/40 border-[#2EC4B6]">
                <input type="radio" name="pickupTime" value="30분 이내 방문" checked>
                <span class="text-xs font-bold">30분 이내 방문</span>
              </label>
              <label class="p-3 border rounded-xl flex items-center gap-2 cursor-pointer">
                <input type="radio" name="pickupTime" value="1시간 이내 방문">
                <span class="text-xs font-bold">1시간 이내 방문</span>
              </label>
            </div>
          </div>
          <div class="p-3 bg-slate-50 rounded-xl border text-xs">
            <span class="font-bold text-slate-700 block">결제 방식: 현장 결제 (카드 / 제로페이 / 현금)</span>
            <span class="text-slate-500">매장 도착 후 상품을 확인하고 안심 결제하세요.</span>
          </div>
        </div>
        <div class="bg-slate-50 px-6 py-4 flex gap-2 border-t border-slate-200">
          <button onclick="confirmReservation()" class="flex-1 bg-[#FF6B35] hover:bg-[#e85a25] text-white py-3 rounded-xl font-bold text-sm">예약 확정</button>
          <button onclick="closeModal()" class="px-4 py-3 bg-white border rounded-xl font-semibold text-sm text-slate-700">취소</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    const products = [
      { id: 1, storeName: '방이동 갓구운빵집', productName: '유기농 통밀 식빵 세트', category: '베이커리', deadline: '마감 1시간 전', stock: 3, originalPrice: 8500, discountPrice: 3800, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80' },
      { id: 2, storeName: '그린카페 방이점', productName: '아메리카노 + 에그타르트 2개', category: '카페/디저트', deadline: '마감 45분 전', stock: 2, originalPrice: 9000, discountPrice: 4200, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80' },
      { id: 3, storeName: '포케&보울 헬시키친', productName: '생연어 아보카도 샐러드', category: '도시락/샐러드', deadline: '마감 30분 전', stock: 1, originalPrice: 13500, discountPrice: 6200, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80' },
      { id: 4, storeName: '프레시마트', productName: '당일 수확 컵과일 플래터', category: '편의점/마트', deadline: '마감 2시간 전', stock: 5, originalPrice: 7500, discountPrice: 3500, image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80' }
    ];
    let curCategory = '전체';
    let selectedId = null;

    function render() {
      const grid = document.getElementById('productGrid');
      const list = products.filter(p => curCategory === '전체' || p.category === curCategory);
      grid.innerHTML = list.map(item => \`
        <div class="bg-white rounded-2xl border p-4 shadow-sm flex flex-col justify-between \${item.stock <= 0 ? 'opacity-50' : ''}">
          <div>
            <div class="text-xs text-slate-400 flex justify-between">
              <span>\${item.category}</span>
              <span>\${item.storeName}</span>
            </div>
            <h3 class="font-bold text-slate-900 mt-1">\${item.productName}</h3>
            <div class="text-xs text-[#FF6B35] font-semibold mt-1">\${item.deadline} · 남은 수량 \${item.stock}개</div>
            <div class="mt-3 flex items-baseline justify-between">
              <span class="text-xs text-slate-400 line-through">\${item.originalPrice.toLocaleString()}원</span>
              <span class="text-lg font-black text-[#FF6B35]">\${item.discountPrice.toLocaleString()}원</span>
            </div>
          </div>
          <button onclick="openModal(\${item.id})" \${item.stock <= 0 ? 'disabled' : ''} class="mt-4 w-full py-2.5 rounded-xl font-bold text-xs bg-[#FF6B35] text-white hover:bg-[#e85a25]">
            \${item.stock <= 0 ? '품절 마감' : '픽업 예약하기'}
          </button>
        </div>
      \`).join('');
    }

    function setCategory(cat) { curCategory = cat; render(); }
    function openModal(id) {
      selectedId = id;
      const p = products.find(x => x.id === id);
      document.getElementById('modalStoreName').textContent = p.storeName;
      document.getElementById('modalProductName').textContent = p.productName;
      document.getElementById('modalDiscountPrice').textContent = p.discountPrice.toLocaleString() + '원';
      document.getElementById('modalOriginalPrice').textContent = p.originalPrice.toLocaleString() + '원';
      document.getElementById('reservationModal').classList.remove('hidden');
    }
    function closeModal() { document.getElementById('reservationModal').classList.add('hidden'); }
    function confirmReservation() {
      const p = products.find(x => x.id === selectedId);
      if (p && p.stock > 0) { p.stock -= 1; }
      closeModal();
      render();
      alert('예약이 완료되었습니다! 픽업 시간에 맞추어 매장을 방문해주세요.');
    }
    render();
  </script>
</body>
</html>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(standaloneHtmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([standaloneHtmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'food-rescue-single-page.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 text-[#FF6B35] flex items-center justify-center">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  단일 파일 (Single HTML) 소스 코드
                </h3>
                <p className="text-xs text-slate-500">
                  빌드 없이 브라우저나 Vercel/GitHub Pages에서 바로 실행 가능한 코드입니다.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Toolbar */}
          <div className="px-5 py-3 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between text-xs">
            <span className="font-mono text-slate-500 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#2EC4B6]" />
              <span>Tailwind CSS CDN + FontAwesome + Vanilla JS</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#FF6B35]" />}
                <span>{copied ? '복사 완료!' : '전체 코드 복사'}</span>
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1.5 bg-[#FF6B35] hover:bg-[#E85A25] text-white font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>HTML 파일 다운로드</span>
              </button>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="p-5 flex-1 overflow-y-auto bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed select-all">
            <pre className="whitespace-pre">{standaloneHtmlCode}</pre>
          </div>

          {/* Footer note */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>브라우저에서 `.html` 파일로 저장 후 더블 클릭하시면 즉시 동작합니다.</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer"
            >
              닫기
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
