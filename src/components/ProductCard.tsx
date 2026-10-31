import React, { useState } from 'react';
import { Clock, Navigation, ShoppingBag, Store, Sparkles, AlertCircle } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenModal }) => {
  const [imageError, setImageError] = useState(false);
  const isSoldOut = product.stock <= 0;
  const discountRate = Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100);

  return (
    <div
      className={`group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#FF6B35]/40 transition-all duration-300 flex flex-col ${
        isSoldOut ? 'opacity-65 grayscale-[35%]' : ''
      }`}
    >
      {/* Product Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
        <img
          src={product.image}
          alt={product.productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://placehold.co/600x400/2EC4B6/ffffff?text=Food+Rescue';
          }}
        />

        {/* Top Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className="bg-[#FF6B35] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{product.deadlineText}</span>
          </span>
          <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
            <Navigation className="w-2.5 h-2.5 text-[#2EC4B6]" />
            <span>{product.distance}</span>
          </span>
        </div>

        {/* Remaining Stock Badge */}
        <div className="absolute bottom-3 right-3">
          {isSoldOut ? (
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>품절 마감</span>
            </span>
          ) : (
            <span className="bg-white/95 backdrop-blur-xs text-slate-800 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm border border-slate-200/60">
              남은 수량 <strong className="text-[#FF6B35] tabular-nums">{product.stock}개</strong>
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Store Info */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              {product.category}
            </span>
            <span className="flex items-center gap-1 text-slate-500 font-medium truncate max-w-[130px]">
              <Store className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{product.storeName}</span>
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1 group-hover:text-[#FF6B35] transition-colors">
            {product.productName}
          </h3>

          {/* Description snippet */}
          <p className="text-slate-500 text-xs mt-1 line-clamp-1">
            {product.description}
          </p>

          {/* Price Section */}
          <div className="mt-3.5 pt-3 border-t border-slate-100">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 line-through mr-1.5 tabular-nums">
                  {product.originalPrice.toLocaleString('ko-KR')}원
                </span>
                <span className="text-xs font-black text-[#2EC4B6] bg-[#2EC4B6]/10 px-1.5 py-0.5 rounded tabular-nums">
                  {discountRate}% OFF
                </span>
              </div>
              <div className="text-lg sm:text-xl font-black text-[#FF6B35] tabular-nums">
                {product.discountPrice.toLocaleString('ko-KR')}원
              </div>
            </div>
          </div>
        </div>

        {/* Reservation Action Button */}
        <div className="mt-4">
          <button
            type="button"
            disabled={isSoldOut}
            onClick={() => onOpenModal(product)}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isSoldOut
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-[#FF6B35] hover:bg-[#E85A25] active:scale-98 text-white shadow-sm hover:shadow-md'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isSoldOut ? '마감되었습니다' : '픽업 예약하기'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
