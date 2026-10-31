import React from 'react';
import { 
  LayoutGrid, 
  Croissant, 
  Coffee, 
  ShoppingBag, 
  Salad, 
  ArrowUpDown,
  Check
} from 'lucide-react';
import { CategoryType } from '../types';

interface FilterBarProps {
  currentCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  categoryCounts: Record<CategoryType, number>;
  sortOption: string;
  onSortChange: (sort: string) => void;
  hideSoldOut: boolean;
  onToggleHideSoldOut: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  currentCategory,
  onSelectCategory,
  categoryCounts,
  sortOption,
  onSortChange,
  hideSoldOut,
  onToggleHideSoldOut,
}) => {
  const categories: { label: CategoryType; icon: React.ReactNode }[] = [
    { label: '전체', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { label: '베이커리', icon: <Croissant className="w-3.5 h-3.5 text-amber-500" /> },
    { label: '카페/디저트', icon: <Coffee className="w-3.5 h-3.5 text-[#2EC4B6]" /> },
    { label: '편의점/마트', icon: <ShoppingBag className="w-3.5 h-3.5 text-blue-500" /> },
    { label: '도시락/샐러드', icon: <Salad className="w-3.5 h-3.5 text-emerald-500" /> },
  ];

  return (
    <div className="bg-white border-b border-slate-200 sticky top-20 z-20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const isActive = currentCategory === cat.label;
              const count = categoryCounts[cat.label] || 0;

              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => onSelectCategory(cat.label)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FF6B35] text-white shadow-sm ring-2 ring-[#FF6B35]/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  <span className={isActive ? 'text-white' : ''}>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Controls: Stock Filter + Sort Dropdown */}
          <div className="flex items-center justify-between md:justify-end gap-4 text-xs text-slate-600 shrink-0">
            {/* Hide Sold Out Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer select-none font-medium hover:text-slate-900">
              <input
                type="checkbox"
                checked={hideSoldOut}
                onChange={onToggleHideSoldOut}
                className="w-4 h-4 text-[#FF6B35] rounded border-slate-300 focus:ring-[#FF6B35]"
              />
              <span>품절 제외</span>
            </label>

            <span className="text-slate-300 hidden sm:inline">|</span>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400 hidden sm:inline">정렬:</span>
              <select
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value)}
                className="bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold py-1 px-2.5 rounded-lg text-xs outline-none cursor-pointer transition-colors focus:border-[#2EC4B6]"
              >
                <option value="discount">할인율 높은순</option>
                <option value="deadline">마감 임박순</option>
                <option value="price-asc">낮은 가격순</option>
                <option value="distance">가까운 거리순</option>
              </select>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
