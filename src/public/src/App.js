import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Star, Filter, Heart, ChefHat, Zap, TrendingUp, Users, Award, RefreshCw, BarChart3, Calendar, Target } from 'lucide-react';

const WhatToEat = () => {
  const [currentUser, setCurrentUser] = useState({
    name: '다앤',
    preferences: ['한식', '일식', '양식'],
    dietaryRestrictions: ['매운맛 선호', '견과류 알레르기'],
    location: '서울 강남구',
    budget: 15000,
    mood: 'energetic'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    cuisine: '전체',
    price: '전체',
    distance: '전체',
    rating: '전체'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('recommend');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('breakfast');
  const [favorites, setFavorites] = useState([]);
  const [isRecommending, setIsRecommending] = useState(false);

  const [recommendations, setRecommendations] = useState({
    breakfast: [
      {
        id: 1,
        name: '토스트앤커피',
        cuisine: '브런치',
        rating: 4.6,
        price: 8000,
        distance: '0.2km',
        time: '10분',
        description: '신선한 재료로 만든 건강한 아침 토스트',
        tags: ['건강식', '간편함', '커피'],
        aiScore: 94,
        aiReason: '아침 시간대 선호 패턴과 건강식 취향에 완벽 매칭',
        specialOffer: '아침 7-9시 토스트+커피 세트 30% 할인',
        timeRecommended: '07:00-10:00',
        nutritionInfo: { calories: 320, protein: '12g', carbs: '28g' }
      },
      {
        id: 2,
        name: '죽이야기',
        cuisine: '한식',
        rating: 4.5,
        price: 6500,
        distance: '0.4km',
        time: '15분',
        description: '따뜻하고 부드러운 영양죽 전문점',
        tags: ['영양만점', '소화잘됨', '따뜻함'],
        aiScore: 91,
        aiReason: '아침 소화력과 영양 균형을 고려한 맞춤 추천',
        specialOffer: '전복죽 주문시 계란 토핑 무료',
        timeRecommended: '06:30-09:30',
        nutritionInfo: { calories: 280, protein: '15g', carbs: '35g' }
      }
    ],
    lunch: [
      {
        id: 3,
        name: '한정식 미담',
        cuisine: '한식',
        rating: 4.8,
        price: 12000,
        distance: '0.3km',
        time: '15분',
        description: '전통 한정식의 진수를 맛볼 수 있는 곳',
        tags: ['전통', '건강식', '푸짐한 양'],
        aiScore: 92,
        aiReason: '점심 시간대 한식 선호도와 영양 밸런스 고려',
        specialOffer: '런치 세트 20% 할인',
        timeRecommended: '11:30-14:30',
        nutritionInfo: { calories: 650, protein: '28g', carbs: '45g' }
      },
      {
        id: 4,
        name: '파스타 델 마레',
        cuisine: '양식',
        rating: 4.6,
        price: 16000,
        distance: '0.7km',
        time: '25분',
        description: '정통 이탈리안 파스타와 리조또 전문점',
        tags: ['로맨틱', '이탈리안', '와인'],
        aiScore: 87,
        aiReason: '점심 시간 양식 선호도와 분위기 중시 패턴 반영',
        specialOffer: '세트 메뉴 주문 시 샐러드 무료',
        timeRecommended: '11:00-15:00',
        nutritionInfo: { calories: 580, protein: '22g', carbs: '68g' }
      }
    ],
    dinner: [
      {
        id: 5,
        name: '스시 하나',
        cuisine: '일식',
        rating: 4.7,
        price: 25000,
        distance: '0.5km',
        time: '20분',
        description: '신선한 회와 정통 스시를 제공하는 일식당',
        tags: ['신선함', '고급', '프리미엄'],
        aiScore: 89,
        aiReason: '저녁 시간 고급 일식 선호도와 품질 중시 성향 반영',
        specialOffer: '오마카세 코스 예약 시 디저트 서비스',
        timeRecommended: '17:00-21:30',
        nutritionInfo: { calories: 520, protein: '35g', carbs: '25g' }
      },
      {
        id: 6,
        name: '고기굽는집',
        cuisine: '한식',
        rating: 4.8,
        price: 22000,
        distance: '0.6km',
        time: '30분',
        description: '프리미엄 한우와 돼지고기 전문 구이집',
        tags: ['고기', '회식', '소주'],
        aiScore: 93,
        aiReason: '저녁 시간 고단백 식사와 사회적 모임 선호도 반영',
        specialOffer: '2인 세트 주문시 된장찌개 서비스',
        timeRecommended: '17:30-22:00',
        nutritionInfo: { calories: 720, protein: '45g', carbs: '15g' }
      }
    ],
    latenight: [
      {
        id: 7,
        name: '24시 김밥천국',
        cuisine: '분식',
        rating: 4.3,
        price: 4500,
        distance: '0.3km',
        time: '10분',
        description: '24시간 운영하는 든든한 분식집',
        tags: ['24시간', '든든함', '저렴함'],
        aiScore: 88,
        aiReason: '야식 시간대 간편함과 포만감 중시 패턴에 최적화',
        specialOffer: '밤 10시 이후 라면류 500원 할인',
        timeRecommended: '22:00-05:00',
        nutritionInfo: { calories: 420, protein: '18g', carbs: '55g' }
      },
      {
        id: 8,
        name: '치킨앤비어',
        cuisine: '치킨',
        rating: 4.5,
        price: 18000,
        distance: '0.4km',
        time: '25분',
        description: '바삭한 치킨과 시원한 맥주의 완벽한 조합',
        tags: ['치킨', '맥주', '야식'],
        aiScore: 90,
        aiReason: '야식 시간 치킨 선호도와 음주 패턴을 고려한 추천',
        specialOffer: '치킨 2마리 주문시 맥주 4캔 무료',
        timeRecommended: '21:00-02:00',
        nutritionInfo: { calories: 580, protein: '32g', carbs: '25g' }
      }
    ]
  });

  const timeSlots = {
    breakfast: { 
      name: '아침', 
      icon: '🌅', 
      time: '06:00-10:00',
      color: 'from-yellow-400 to-orange-400',
      bgColor: 'from-yellow-50 to-orange-50'
    },
    lunch: { 
      name: '점심', 
      icon: '☀️', 
      time: '11:00-15:00',
      color: 'from-blue-400 to-cyan-400',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    dinner: { 
      name: '저녁', 
      icon: '🌆', 
      time: '17:00-22:00',
      color: 'from-purple-400 to-pink-400',
      bgColor: 'from-purple-50 to-pink-50'
    },
    latenight: { 
      name: '야식', 
      icon: '🌙', 
      time: '22:00-05:00',
      color: 'from-indigo-400 to-purple-400',
      bgColor: 'from-indigo-50 to-purple-50'
    }
  };

  const moodBasedRecommendations = {
    energetic: { emoji: '⚡', foods: ['매운 음식', '고단백 식단'] },
    calm: { emoji: '🌿', foods: ['차분한 티', '가벼운 샐러드'] },
    happy: { emoji: '😊', foods: ['디저트', '특별한 요리'] },
    stressed: { emoji: '😰', foods: ['컴포트 푸드', '따뜻한 국물'] }
  };

  const getCurrentTimeSlot = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 11) return 'breakfast';
    if (hour >= 11 && hour < 17) return 'lunch';
    if (hour >= 17 && hour < 22) return 'dinner';
    return 'latenight';
  };

  useEffect(() => {
    setSelectedTimeSlot(getCurrentTimeSlot());
  }, []);

  const handleRecommend = async () => {
    setIsRecommending(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newRecommendations = recommendations[selectedTimeSlot].map(rec => ({
      ...rec,
      aiScore: Math.floor(Math.random() * 15) + 85,
      aiReason: `${currentUser.mood} 기분과 ${currentUser.preferences.join(', ')} 선호도를 고려한 맞춤 추천`
    }));
    
    setRecommendations(prev => ({
      ...prev,
      [selectedTimeSlot]: newRecommendations
    }));
    setIsRecommending(false);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const filterRecommendations = () => {
    const currentRecommendations = recommendations[selectedTimeSlot] || [];
    return currentRecommendations.filter(rec => {
      const matchesSearch = rec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           rec.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCuisine = selectedFilters.cuisine === '전체' || rec.cuisine === selectedFilters.cuisine;
      const matchesPrice = selectedFilters.price === '전체' || 
                          (selectedFilters.price === '1만원 이하' && rec.price <= 10000) ||
                          (selectedFilters.price === '1-2만원' && rec.price > 10000 && rec.price <= 20000) ||
                          (selectedFilters.price === '2만원 이상' && rec.price > 20000);
      
      return matchesSearch && matchesCuisine && matchesPrice;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-2">
                <ChefHat className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  WhatToEat
                </h1>
                <p className="text-sm text-gray-600">AI 맞춤 메뉴 추천</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">서울 강남구</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-blue-100 rounded-full px-3 py-1">
                <span className="text-sm text-blue-700">안녕하세요, 다앤님!</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Time-based Recommendation Banner */}
        <div className={`bg-gradient-to-r ${timeSlots[selectedTimeSlot].color} rounded-2xl p-6 mb-6 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                <span className="text-3xl mr-3">{timeSlots[selectedTimeSlot].icon}</span>
                {timeSlots[selectedTimeSlot].name} 맞춤 추천
              </h2>
              <p className="text-white/90 mb-1">
                {timeSlots[selectedTimeSlot].time} • {moodBasedRecommendations[currentUser.mood].emoji} {currentUser.mood} 기분
              </p>
              <p className="text-sm text-white/80">따뜻한 국물 요리가 좋겠어요! 🍲</p>
            </div>
            
            <button
              onClick={handleRecommend}
              disabled={isRecommending}
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors flex items-center space-x-2"
            >
              {isRecommending ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : (
                <Zap className="h-5 w-5" />
              )}
              <span>{isRecommending ? '추천 중...' : 'AI 재추천'}</span>
            </button>
          </div>
        </div>

        {/* Time Slot Selector */}
        <div className="mb-6">
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(timeSlots).map(([key, slot]) => (
              <button
                key={key}
                onClick={() => setSelectedTimeSlot(key)}
                className={`p-4 rounded-xl transition-all duration-200 ${
                  selectedTimeSlot === key
                    ? `bg-gradient-to-br ${slot.bgColor} border-2 border-current scale-105 shadow-lg`
                    : 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{slot.icon}</div>
                  <h3 className={`font-bold text-sm ${
                    selectedTimeSlot === key ? 'text-gray-800' : 'text-gray-600'
                  }`}>
                    {slot.name}
                  </h3>
                  <p className={`text-xs ${
                    selectedTimeSlot === key ? 'text-gray-700' : 'text-gray-500'
                  }`}>
                    {slot.time}
                  </p>
                  {selectedTimeSlot === key && (
                    <div className="mt-2 text-xs bg-white/50 rounded-full px-2 py-1">
                      현재 선택
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'recommend', label: '맞춤 추천', icon: Zap },
            { id: 'trending', label: '인기 트렌드', icon: TrendingUp },
            { id: 'favorites', label: '즐겨찾기', icon: Heart }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'recommend' && (
          <div>
            {/* Search & Filters */}
            <div className="mb-6">
              <div className="flex space-x-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="메뉴나 음식점을 검색하세요..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Filter className="h-5 w-5" />
                  <span>필터</span>
                </button>
              </div>
            </div>

            {/* Restaurant Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterRecommendations().map(restaurant => (
                <div key={restaurant.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
                      <ChefHat className="h-16 w-16 text-white opacity-50" />
                    </div>
                    
                    <button
                      onClick={() => toggleFavorite(restaurant.id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                    >
                      <Heart 
                        className={`h-5 w-5 ${
                          favorites.includes(restaurant.id) 
                            ? 'text-red-500 fill-current' 
                            : 'text-gray-400'
                        }`} 
                      />
                    </button>

                    <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      AI 매칭 {restaurant.aiScore}%
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{restaurant.name}</h3>
                        <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
                      </div>
                      
                      <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold text-yellow-700">{restaurant.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mb-4">{restaurant.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {restaurant.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">가격</span>
                        <span className="font-semibold">{restaurant.price.toLocaleString()}원</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">거리 • 시간</span>
                        <span className="font-semibold">{restaurant.distance} • {restaurant.time}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">추천 시간</span>
                        <span className="font-semibold text-green-600">{restaurant.timeRecommended}</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">AI 추천 이유:</span> {restaurant.aiReason}
                      </p>
                    </div>

                    {restaurant.specialOffer && (
                      <div className="mt-3 p-3 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-800">
                          <span className="font-semibold">🎁 특별 혜택:</span> {restaurant.specialOffer}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 space-y-3">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => window.open(`https://www.baemin.com/search?q=${encodeURIComponent(restaurant.name)}`, '_blank')}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-colors flex items-center justify-center space-x-2"
                        >
                          <span>🛵</span>
                          <span>배민 주문</span>
                        </button>
                        <button 
                          onClick={() => window.open(`https://www.yogiyo.co.kr/mobile/#/search/?category=RESTAURANT&keyword=${encodeURIComponent(restaurant.name)}`, '_blank')}
                          className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-colors flex items-center justify-center space-x-2"
                        >
                          <span>🍕</span>
                          <span>요기요</span>
                        </button>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => window.open(`https://www.10000recipe.com/search.html?q=${encodeURIComponent(restaurant.cuisine)}`, '_blank')}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-colors flex items-center justify-center space-x-2"
                        >
                          <span>👩‍🍳</span>
                          <span>만개의레시피</span>
                        </button>
                        <button 
                          onClick={() => window.open(`https://map.kakao.com/link/search/${encodeURIComponent(restaurant.name)}`, '_blank')}
                          className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center"
                        >
                          <MapPin className="h-5 w-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'trending' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-6 w-6 text-green-500 mr-2" />
                실시간 트렌딩 메뉴
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['비건 불고기', '마라탕', '감바스', '연어 포케'].map((menu, index) => (
                  <button
                    key={index}
                    onClick={() => window.open(`https://www.10000recipe.com/search.html?q=${encodeURIComponent(menu)}`, '_blank')}
                    className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center group"
                  >
                    <div className="text-2xl mb-2">🍳</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{menu}</h3>
                    <p className="text-xs text-gray-600 group-hover:text-gray-800">레시피 보기</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🚀 빠른 액션</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => window.open('https://www.10000recipe.com/', '_blank')}
                  className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-colors group"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">👩‍🍳</div>
                    <h3 className="font-bold text-gray-900 mb-2">만개의레시피</h3>
                    <p className="text-sm text-gray-600">집에서 직접 만들어보세요</p>
                    <div className="mt-3 text-blue-600 group-hover:text-blue-700 font-medium">
                      레시피 탐색하기 →
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => window.open('https://www.baemin.com/', '_blank')}
                  className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:border-green-300 transition-colors group"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">🛵</div>
                    <h3 className="font-bold text-gray-900 mb-2">배달의민족</h3>
                    <p className="text-sm text-gray-600">편리한 배달 주문</p>
                    <div
