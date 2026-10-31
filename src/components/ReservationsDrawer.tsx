import React from 'react';
import { 
  X, 
  ShoppingBag, 
  Clock, 
  Store, 
  MapPin, 
  QrCode, 
  Leaf, 
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { Reservation } from '../types';

interface ReservationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  onCancelReservation: (reservationId: string, productId: number) => void;
}

export const ReservationsDrawer: React.FC<ReservationsDrawerProps> = ({
  isOpen,
  onClose,
  reservations,
  onCancelReservation,
}) => {
  if (!isOpen) return null;

  const totalSpent = reservations.reduce((sum, r) => sum + r.price, 0);
  const totalOriginal = reservations.reduce((sum, r) => sum + r.originalPrice, 0);
  const totalCarbon = reservations.reduce((sum, r) => sum + r.carbonSavedKg, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 text-[#FF6B35] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">내 픽업 예약 목록</h3>
                <p className="text-xs text-slate-500">현재 대기 중인 예약 {reservations.length}건</p>
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

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {reservations.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 text-slate-400">
                <ShoppingBag className="w-16 h-16 stroke-1 text-slate-300 mb-3" />
                <p className="font-bold text-slate-700 text-sm">아직 예약된 마감 상품이 없습니다</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  마감 세일 중인 신선한 동네 음식을 예약하고 따뜻한 푸드 구출에 동참해보세요!
                </p>
              </div>
            ) : (
              reservations.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-[#FF6B35]/30 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-16 h-16 rounded-lg object-cover border border-slate-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <Store className="w-3 h-3 text-slate-400" />
                          <span className="truncate">{item.storeName}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate mt-0.5">
                          {item.productName}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-extrabold text-[#FF6B35]">
                            {item.price.toLocaleString('ko-KR')}원
                          </span>
                          <span className="text-[11px] text-slate-400 line-through">
                            {item.originalPrice.toLocaleString('ko-KR')}원
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onCancelReservation(item.id, item.productId)}
                      className="text-slate-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                      title="예약 취소 (수량 복구)"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Pickup badge & code */}
                  <div className="bg-slate-50 rounded-lg p-2.5 flex items-center justify-between text-xs border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#2EC4B6]" />
                      <span>{item.pickupTime}</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                      <QrCode className="w-3 h-3 text-[#FF6B35]" />
                      <span>{item.pickupCode}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <Leaf className="w-3 h-3" />
                      {item.carbonSavedKg} kg CO₂ 절감
                    </span>
                    <span className="text-slate-400">현장 카드/페이 결제</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Summary */}
          {reservations.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>정상 금액 합계</span>
                  <span className="line-through">{totalOriginal.toLocaleString('ko-KR')}원</span>
                </div>
                <div className="flex justify-between text-[#FF6B35] font-semibold">
                  <span>마감 할인 절약액</span>
                  <span>-{(totalOriginal - totalSpent).toLocaleString('ko-KR')}원</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold text-sm pt-1 border-t border-slate-200">
                  <span>매장 방문 시 결제 총액</span>
                  <span className="text-base font-extrabold text-[#FF6B35]">
                    {totalSpent.toLocaleString('ko-KR')}원
                  </span>
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-200 text-[#20968B] p-2.5 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2EC4B6] shrink-0" />
                <span className="leading-tight">
                  총 <strong className="font-extrabold">{totalCarbon.toFixed(2)} kg CO₂</strong>의 온실가스를 감축했습니다.
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
