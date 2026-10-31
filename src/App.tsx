import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ReservationModal } from './components/ReservationModal';
import { ReservationsDrawer } from './components/ReservationsDrawer';
import { SingleHtmlExportModal } from './components/SingleHtmlExportModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { INITIAL_PRODUCTS } from './data/mockProducts';
import { CategoryType, Product, Reservation } from './types';
import { PackageOpen, Sparkles, RefreshCcw } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [currentLocation, setCurrentLocation] = useState<string>('서울시 송파구 방이동');
  const [currentCategory, setCurrentCategory] = useState<CategoryType>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('discount');
  const [hideSoldOut, setHideSoldOut] = useState<boolean>(false);

  // ESG and Bookings state
  const [carbonSavedKg, setCarbonSavedKg] = useState<number>(128.5);
  const [totalRescuedCount, setTotalRescuedCount] = useState<number>(314);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isHtmlExportOpen, setIsHtmlExportOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Category counts calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      전체: products.length,
      베이커리: 0,
      '카페/디저트': 0,
      '편의점/마트': 0,
      '도시락/샐러드': 0,
    };
    products.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      }
    });
    return counts;
  }, [products]);

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchCategory = currentCategory === '전체' || p.category === currentCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchStock = hideSoldOut ? p.stock > 0 : true;
      return matchCategory && matchSearch && matchStock;
    });

    // Sorting
    if (sortOption === 'discount') {
      result.sort((a, b) => {
        const rateA = (a.originalPrice - a.discountPrice) / a.originalPrice;
        const rateB = (b.originalPrice - b.discountPrice) / b.originalPrice;
        return rateB - rateA;
      });
    } else if (sortOption === 'deadline') {
      result.sort((a, b) => a.deadlineMinutes - b.deadlineMinutes);
    } else if (sortOption === 'price-asc') {
      result.sort((a, b) => a.discountPrice - b.discountPrice);
    } else if (sortOption === 'distance') {
      result.sort((a, b) => a.distanceMeters - b.distanceMeters);
    }

    return result;
  }, [products, currentCategory, searchQuery, sortOption, hideSoldOut]);

  // Handlers
  const handleOpenReservationModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleConfirmReservation = (product: Product, pickupTime: string) => {
    // 1. Decrement Stock
    setProducts((prev) =>
      prev.map((item) =>
        item.id === product.id ? { ...item, stock: Math.max(0, item.stock - 1) } : item
      )
    );

    // 2. Add to Reservations List
    const newReservation: Reservation = {
      id: `RES-${Date.now().toString().slice(-6)}`,
      productId: product.id,
      productName: product.productName,
      storeName: product.storeName,
      price: product.discountPrice,
      originalPrice: product.originalPrice,
      pickupTime,
      reservedAt: '방금 전',
      status: '예약완료',
      image: product.image,
      carbonSavedKg: product.carbonSavedKg,
      pickupCode: `FR-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setReservations((prev) => [newReservation, ...prev]);

    // 3. Increment ESG Carbon & Count
    setCarbonSavedKg((prev) => +(prev + product.carbonSavedKg).toFixed(2));
    setTotalRescuedCount((prev) => prev + 1);

    // 4. Close modal & Show Toast
    setIsModalOpen(false);
    setSelectedProduct(null);
    setToastMessage(
      `'${product.productName}' (${pickupTime}) 예약이 완료되었습니다! 픽업 시간에 맞추어 매장을 방문해주세요.`
    );
  };

  const handleCancelReservation = (reservationId: string, productId: number) => {
    const target = reservations.find((r) => r.id === reservationId);
    if (!target) return;

    // Restore stock
    setProducts((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, stock: item.stock + 1 } : item
      )
    );

    // Remove from reservations
    setReservations((prev) => prev.filter((r) => r.id !== reservationId));
    setCarbonSavedKg((prev) => +(prev - target.carbonSavedKg).toFixed(2));
    setTotalRescuedCount((prev) => Math.max(0, prev - 1));

    setToastMessage(`'${target.productName}' 예약이 취소되었으며 수량이 복구되었습니다.`);
  };

  const handleResetFilters = () => {
    setCurrentCategory('전체');
    setSearchQuery('');
    setHideSoldOut(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-800 antialiased">
      {/* Header with ESG Bar and Search */}
      <Header
        currentLocation={currentLocation}
        onLocationChange={(loc) => {
          setCurrentLocation(loc);
          setToastMessage(`탐색 동네가 '${loc}'(으)로 변경되었습니다.`);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        reservedCount={reservations.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenHtmlExport={() => setIsHtmlExportOpen(true)}
        carbonSavedKg={carbonSavedKg}
        totalRescuedCount={totalRescuedCount}
      />

      {/* Hero Banner with Golden Hour notice */}
      <HeroSection
        currentLocation={currentLocation}
        activeStoreCount={products.filter((p) => p.stock > 0).length}
      />

      {/* Filter and Category Bar */}
      <FilterBar
        currentCategory={currentCategory}
        onSelectCategory={setCurrentCategory}
        categoryCounts={categoryCounts}
        sortOption={sortOption}
        onSortChange={setSortOption}
        hideSoldOut={hideSoldOut}
        onToggleHideSoldOut={() => setHideSoldOut(!hideSoldOut)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Results status bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>오늘의 구출 대기 상품</span>
              <span className="text-xs bg-[#2EC4B6]/15 text-[#20968B] px-2.5 py-0.5 rounded-full font-bold tabular-nums">
                {filteredProducts.length}개
              </span>
            </h2>
          </div>
          <div className="text-xs text-slate-400 hidden sm:flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>당일 생산 및 제조 마감 할인 전용 상품입니다</span>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenModal={handleOpenReservationModal}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
              <PackageOpen className="w-10 h-10 text-slate-300 stroke-1" />
            </div>
            <h3 className="text-base font-bold text-slate-700">
              해당 조건에 맞는 마감 상품이 없습니다
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              선택하신 카테고리나 검색어와 일치하는 마감 임박 상품이 없거나 이미 품절되었습니다.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35] hover:bg-[#E85A25] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>전체 상품 보기로 초기화</span>
            </button>
          </div>
        )}
      </main>

      {/* Reservation Modal */}
      <ReservationModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleConfirmReservation}
      />

      {/* Reservations Slide-over Drawer */}
      <ReservationsDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        reservations={reservations}
        onCancelReservation={handleCancelReservation}
      />

      {/* Single HTML Export Code Modal */}
      <SingleHtmlExportModal
        isOpen={isHtmlExportOpen}
        onClose={() => setIsHtmlExportOpen(false)}
      />

      {/* Floating Success Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
