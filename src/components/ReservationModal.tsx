import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Clock, 
  CreditCard, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Store,
  MapPin,
  Leaf
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product } from '../types';

interface ReservationModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (product: Product, pickupTime: string) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  product,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [pickupTime, setPickupTime] = useState<string>('30분 이내 방문');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !product) return null;

  const discountRate = Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100);
  const discountAmount = product.originalPrice - product.discountPrice;

  const handleConfirmReservation = () => {
    setIsSubmitting(true);
    
    // Shoot confetti for celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF6B35', '#2EC4B6', '#FFD166']
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      onConfirm(product, pickupTime);
      setIsSubmitting(false);
    }, 200);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-lg border border-slate-100">
          
          {/* Modal Header */}
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex p-1.5 rounded-lg bg-[#FF6B35]/10 text-[#FF6B35]">
                <ShoppingBag className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-slate-900" id="modal-title">
                마감할인 픽업 예약
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="px-6 py-5 space-y-5">
            {/* Target Product Summary Card */}
            <div className="flex items-center gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <img
                src={product.image}
                alt={product.productName}
                className="w-20 h-20 rounded-lg object-cover shrink-0 shadow-xs"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Store className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{product.storeName}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 truncate mt-0.5">
                  {product.productName}
                </h4>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-base font-extrabold text-[#FF6B35] tabular-nums">
                    {product.discountPrice.toLocaleString('ko-KR')}원
                  </span>
                  <span className="text-xs text-slate-400 line-through tabular-nums">
                    {product.originalPrice.toLocaleString('ko-KR')}원
                  </span>
                  <span className="text-xs font-bold text-[#2EC4B6] bg-[#2EC4B6]/10 px-1.5 py-0.2 rounded tabular-nums">
                    {discountRate}% OFF
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                  <MapPin className="w-3 h-3 text-[#FF6B35]" />
                  <span className="truncate">{product.address} ({product.distance})</span>
                </div>
              </div>
            </div>

            {/* Pickup Time Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>예상 매장 방문 (픽업) 시간 선택</span>
                </span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`relative flex items-center p-3 border rounded-xl cursor-pointer transition-all ${
                    pickupTime === '30분 이내 방문'
                      ? 'border-[#2EC4B6] bg-teal-50/50 ring-1 ring-[#2EC4B6]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="pickupTime"
                    value="30분 이내 방문"
                    checked={pickupTime === '30분 이내 방문'}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-4 h-4 text-[#2EC4B6] focus:ring-[#2EC4B6]"
                  />
                  <div className="ml-2.5 text-left">
                    <span className="block text-xs font-bold text-slate-800">30분 이내 방문</span>
                    <span className="block text-[11px] text-slate-500">지금 바로 픽업 가능</span>
                  </div>
                </label>

                <label
                  className={`relative flex items-center p-3 border rounded-xl cursor-pointer transition-all ${
                    pickupTime === '1시간 이내 방문'
                      ? 'border-[#2EC4B6] bg-teal-50/50 ring-1 ring-[#2EC4B6]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="pickupTime"
                    value="1시간 이내 방문"
                    checked={pickupTime === '1시간 이내 방문'}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-4 h-4 text-[#2EC4B6] focus:ring-[#2EC4B6]"
                  />
                  <div className="ml-2.5 text-left">
                    <span className="block text-xs font-bold text-slate-800">1시간 이내 방문</span>
                    <span className="block text-[11px] text-slate-500">여유로운 방문</span>
                  </div>
                </label>
              </div>

              <p className="text-[11px] text-slate-400 mt-1.5">
                * 마감 할인 특성상 매장 영업 종료 전 방문해 주셔야 상품이 확보됩니다.
              </p>
            </div>

            {/* Payment Method Notice */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                <span className="flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#2EC4B6]" />
                  <span>결제 방식</span>
                </span>
              </label>
              <div className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-[#20968B] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      현장 결제 (카드 / 제로페이 / 카카오페이 / 현금)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      매장 도착 후 실물 상태를 직접 확인하고 결제하세요.
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#2EC4B6] bg-teal-100/60 px-2 py-0.5 rounded-full shrink-0">
                  노쇼 방지 보장
                </span>
              </div>
            </div>

            {/* Price & ESG Impact Summary */}
            <div className="bg-gradient-to-r from-orange-50/80 to-teal-50/80 p-4 rounded-xl space-y-2 border border-orange-100/90">
              <div className="flex justify-between text-xs text-slate-600">
                <span>상품 정가</span>
                <span className="line-through tabular-nums">
                  {product.originalPrice.toLocaleString('ko-KR')}원
                </span>
              </div>
              <div className="flex justify-between text-xs text-[#FF6B35] font-semibold">
                <span>푸드 리스크 마감할인 혜택 ({discountRate}%)</span>
                <span className="tabular-nums">-{discountAmount.toLocaleString('ko-KR')}원</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-800">최종 픽업 결제 예정액</span>
                <span className="text-xl font-black text-[#FF6B35] tabular-nums">
                  {product.discountPrice.toLocaleString('ko-KR')}원
                </span>
              </div>
              <div className="mt-2 text-center bg-white/80 py-1.5 px-3 rounded-lg text-[11px] font-semibold text-[#20968B] flex items-center justify-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  이 주문으로 약 <strong className="font-bold underline">{product.carbonSavedKg} kg CO₂</strong> 배출을 막아냅니다!
                </span>
              </div>
            </div>

          </div>

          {/* Modal Actions */}
          <div className="bg-slate-50 px-6 py-4 flex flex-col sm:flex-row-reverse gap-2 sm:gap-3 border-t border-slate-200">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleConfirmReservation}
              className="w-full sm:w-auto flex-1 inline-flex justify-center items-center gap-2 rounded-xl bg-[#FF6B35] hover:bg-[#E85A25] active:scale-98 px-5 py-3 text-sm font-bold text-white shadow-md transition-all cursor-pointer focus:outline-none"
            >
              <Check className="w-4 h-4" />
              <span>{isSubmitting ? '예약 처리 중...' : '예약 확정하기'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-xs border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              취소
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
