import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Star, Filter, Heart, ChefHat, Zap, TrendingUp, Users, Award, RefreshCw, Crown, Sparkles } from 'lucide-react';

const WhatToEat = () => {
  const [currentUser, setCurrentUser] = useState({
    name: '다앤',
    preferences: ['한식', '일식', '양식'],
    dietaryRestrictions: ['매운맛 선호', '견과류 알레르기'],
    location: '서울 강남구',
    budget: 15000,
    mood: 'energetic'
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(['김치찌개', '초밥', '파스타']);
  const [currentRecommendation, setCurrentRecommendation] = useState(null);
  const [moodFilter, setMoodFilter] = useState('all');
  const [mealHistory, setMealHistory] = useState([
    { name: '김치찌개', date: '2025-06-10', rating: 4.5, category: '한식' },
    { name: '초밥', date: '2025-06-09', rating: 5.0, category: '일식' },
    { name: '파스타', date: '2025-06-08', rating: 4.2, category: '양식' }
  ]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeBasedGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 10) return { text: 'Good Morning', subtitle: '좋은 아침입니다', emoji: '🌅', meal: '아침' };
    if (hour < 14) return { text: 'Lunch Time', subtitle: '점심시간입니다', emoji: '☀️', meal: '점심' };
    if (hour < 18) return { text: 'Afternoon', subtitle: '오후 간식은 어떠세요', emoji: '🌤️', meal: '간식' };
    if (hour < 22) return { text: 'Dinner Time', subtitle: '저녁 메뉴를 추천드려요', emoji: '🌆', meal: '저녁' };
    return { text: 'Late Night', subtitle: '야식 타임입니다', emoji: '🌙', meal: '야식' };
  };

  const foodDatabase = {
    아침: [
      { name: '계란 베네딕트', category: '양식', mood: 'calm', calories: 280, cookTime: 15, rating: 4.8, price: 18000, premium: true },
      { name: '아보카도 토스트', category: '양식', mood: 'energetic', calories: 220, cookTime: 8, rating: 4.6, price: 15000, premium: true },
      { name: '김치찌개', category: '한식', mood: 'energetic', calories: 250, cookTime: 15, rating: 4.5, price: 12000 },
      { name: '크루아상', category: '양식', mood: 'calm', calories: 200, cookTime: 2, rating: 4.3, price: 8000 }
    ],
    점심: [
      { name: '한우 비빔밥', category: '한식', mood: 'energetic', calories: 450, cookTime: 25, rating: 4.9, price: 25000, premium: true },
      { name: '트러플 파스타', category: '양식', mood: 'romantic', calories: 520, cookTime: 30, rating: 4.8, price: 32000, premium: true },
      { name: '오마카세 스시', category: '일식', mood: 'calm', calories: 400, cookTime: 45, rating: 4.9, price: 55000, premium: true },
      { name: '클럽 샌드위치', category: '양식', mood: 'energetic', calories: 380, cookTime: 12, rating: 4.4, price: 18000 },
      { name: '육개장', category: '한식', mood: 'comfort', calories: 320, cookTime: 20, rating: 4.6, price: 14000 }
    ],
    간식: [
      { name: '마카롱 세트', category: '디저트', mood: 'happy', calories: 180, cookTime: 1, rating: 4.7, price: 12000, premium: true },
      { name: '핸드드립 커피', category: '음료', mood: 'energetic', calories: 15, cookTime: 8, rating: 4.8, price: 9000, premium: true },
      { name: '수제 떡볶이', category: '한식', mood: 'energetic', calories: 280, cookTime: 15, rating: 4.5, price: 8000 }
    ],
    저녁: [
      { name: '한우 스테이크', category: '양식', mood: 'romantic', calories: 650, cookTime: 25, rating: 4.9, price: 65000, premium: true },
      { name: '랍스터 요리', category: '양식', mood: 'romantic', calories: 420, cookTime: 35, rating: 4.8, price: 78000, premium: true },
      { name: '특선 회 코스', category: '일식', mood: 'romantic', calories: 380, cookTime: 0, rating: 4.9, price: 85000, premium: true },
      { name: '갈비찜', category: '한식', mood: 'social', calories: 580, cookTime: 90, rating: 4.7, price: 35000 },
      { name: '프리미엄 치킨', category: '양식', mood: 'social', calories: 620, cookTime: 30, rating: 4.5, price: 28000 }
    ],
    야식: [
      { name: '트러플 피자', category: '양식', mood: 'comfort', calories: 750, cookTime: 25, rating: 4.6, price: 35000, premium: true },
      { name: '와규 버거', category: '양식', mood: 'social', calories: 680, cookTime: 15, rating: 4.7, price: 28000, premium: true },
      { name: '족발', category: '한식', mood: 'social', calories: 500, cookTime: 45, rating: 4.4, price: 25000 },
      { name: '라멘', category: '일식', mood: 'comfort', calories: 450, cookTime: 12, rating: 4.5, price: 16000 }
    ]
  };

  const categories = ['전체', '한식', '일식', '양식', '중식', '디저트', '음료'];
  const moods = [
    { key: 'all', label: '전체', emoji: '✨' },
    { key: 'energetic', label: '활기찬', emoji: '⚡' },
    { key: 'calm', label: '차분한', emoji: '🕊️' },
    { key: 'romantic', label: '로맨틱', emoji: '🥂' },
    { key: 'social', label: '사교적', emoji: '🍾' },
    { key: 'comfort', label: '편안한', emoji: '🏠' },
    { key: 'happy', label: '즐거운', emoji: '🎉' }
  ];

  const getCurrentMealOptions = () => {
    const greeting = getTimeBasedGreeting();
    let options = foodDatabase[greeting.meal] || foodDatabase.점심;
    
    if (moodFilter !== 'all') {
      options = options.filter(food => food.mood === moodFilter);
    }
    
    if (selectedCategory !== '전체') {
      options = options.filter(food => food.category === selectedCategory);
    }
    
    if (searchQuery) {
      options = options.filter(food => 
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return options.sort((a, b) => (b.premium ? 1 : 0) - (a.premium ? 1 : 0));
  };

  const addToHistory = (food, rating) => {
    const newEntry = {
      name: food.name,
      date: new Date().toISOString().split('T')[0],
      rating: rating,
      category: food.category,
      price: food.price
    };
    setMealHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10 meals
  };

  const getRecommendationBasedOnHistory = () => {
    // AI-like recommendation based on history
    const recentCategories = mealHistory.slice(0, 5).map(meal => meal.category);
    const favoriteCategory = recentCategories.reduce((a, b, i, arr) => 
      arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
    );
    
    const options = getCurrentMealOptions().filter(food => 
      food.category !== favoriteCategory // Suggest different category for variety
    );
    
    if (options.length > 0) {
      const randomFood = options[Math.floor(Math.random() * options.length)];
      setCurrentRecommendation(randomFood);
    } else {
      getRandomRecommendation();
    }
  };

  const getRandomRecommendation = () => {
    const options = getCurrentMealOptions();
    if (options.length > 0) {
      const randomFood = options[Math.floor(Math.random() * options.length)];
      setCurrentRecommendation(randomFood);
    }
  };

  const toggleFavorite = (foodName) => {
    setFavorites(prev => 
      prev.includes(foodName) 
        ? prev.filter(f => f !== foodName)
        : [...prev, foodName]
    );
  };

  const getDeliveryUrl = (foodName, service) => {
    const urls = {
      baemin: `https://www.baemin.com/search?q=${encodeURIComponent(foodName)}`,
      yogiyo: `https://www.yogiyo.co.kr/mobile/#/search/${encodeURIComponent(foodName)}`,
      coupang: `https://www.coupangeats.com/search?q=${encodeURIComponent(foodName)}`
    };
    return urls[service];
  };

  const greeting = getTimeBasedGreeting();
  const mealOptions = getCurrentMealOptions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      {/* Elegant Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-slate-800 to-zinc-900 p-3 rounded-2xl shadow-lg">
                <ChefHat className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-zinc-700 bg-clip-text text-transparent tracking-tight">
                  WhatToEat
                </h1>
                <p className="text-sm text-gray-500 font-medium">Curated Dining Experience</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="bg-gradient-to-r from-slate-100 to-gray-100 rounded-2xl px-6 py-3 shadow-sm border border-gray-200/50">
                <span className="text-sm font-semibold text-slate-700">Welcome, 다앤님</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-800 tracking-wide">
                  {currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="text-xs text-gray-500 font-medium">{greeting.subtitle}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Premium Welcome Section */}
        <div className="text-center mb-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-100/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-zinc-50/30"></div>
            <div className="relative z-10">
              <div className="text-7xl mb-6">{greeting.emoji}</div>
              <h2 className="text-4xl font-bold text-slate-800 mb-3 tracking-tight">{greeting.text}</h2>
              <p className="text-slate-600 mb-8 text-lg font-medium max-w-2xl mx-auto">
                {greeting.subtitle} • AI가 엄선한 프리미엄 메뉴를 경험해보세요
              </p>
              
              <button
                onClick={getRecommendationBasedOnHistory}
                className="bg-gradient-to-r from-slate-800 to-zinc-800 hover:from-slate-900 hover:to-zinc-900 text-white font-bold py-4 px-10 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 mx-auto group"
              >
                <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                <span>AI Smart Recommendation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Premium Recommendation */}
        {currentRecommendation && (
          <div className="mb-12">
            <div className="bg-gradient-to-br from-slate-900 via-zinc-900 to-gray-900 rounded-3xl p-8 text-white shadow-2xl border border-gray-800/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-zinc-900/40"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Crown className="h-8 w-8 text-yellow-400" />
                    <h3 className="text-3xl font-bold tracking-tight">Today's Recommendation</h3>
                  </div>
                  <button
                    onClick={() => toggleFavorite(currentRecommendation.name)}
                    className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors backdrop-blur-sm border border-white/10"
                  >
                    <Heart 
                      className={`h-6 w-6 ${favorites.includes(currentRecommendation.name) ? 'fill-current text-red-400' : 'text-white'}`} 
                    />
                  </button>
                </div>
                
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <h4 className="text-4xl font-bold tracking-tight">{currentRecommendation.name}</h4>
                      {currentRecommendation.premium && (
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                          PREMIUM
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-6 w-6 fill-current text-yellow-400" />
                      <span className="font-bold text-xl">{currentRecommendation.rating}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{currentRecommendation.calories}</div>
                      <div className="text-sm opacity-70 font-medium">칼로리</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{currentRecommendation.cookTime}분</div>
                      <div className="text-sm opacity-70 font-medium">조리시간</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{currentRecommendation.price.toLocaleString()}원</div>
                      <div className="text-sm opacity-70 font-medium">예상가격</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{currentRecommendation.category}</div>
                      <div className="text-sm opacity-70 font-medium">분류</div>
                    </div>
                  </div>

                  {/* Luxury Delivery Options */}
                  <div className="space-y-4">
                    <h5 className="font-bold text-xl mb-4 flex items-center space-x-2">
                      <Sparkles className="h-5 w-5" />
                      <span>Premium Ordering</span>
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <a
                        href={getDeliveryUrl(currentRecommendation.name, 'baemin')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-slate-800 py-4 px-6 rounded-xl font-bold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <span className="text-lg">🛵</span>
                        <span>배달의민족</span>
                      </a>
                      <a
                        href={getDeliveryUrl(currentRecommendation.name, 'yogiyo')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-slate-800 py-4 px-6 rounded-xl font-bold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <span className="text-lg">🍽️</span>
                        <span>요기요</span>
                      </a>
                      <a
                        href={`https://www.10000recipe.com/search.html?q=${encodeURIComponent(currentRecommendation.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-slate-800 py-4 px-6 rounded-xl font-bold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <span className="text-lg">👩‍🍳</span>
                        <span>만개의레시피</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Refined Filters */}
        <div className="mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Curated Selection</h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-slate-600 hover:text-slate-800 flex items-center space-x-2 font-semibold transition-colors"
              >
                <Filter className="h-5 w-5" />
                <span>{showFilters ? 'Hide Filters' : 'More Filters'}</span>
              </button>
            </div>

            {/* Elegant Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search premium dining options..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white/80 backdrop-blur-sm font-medium"
              />
            </div>

            {/* Premium Category Filter */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-slate-800 text-white shadow-lg'
                        : 'bg-white/80 text-slate-700 hover:bg-white border border-gray-200/50 hover:shadow-md'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Mood Filter */}
            {showFilters && (
              <div>
                <h4 className="font-bold text-slate-800 mb-4 text-lg">Dining Mood</h4>
                <div className="flex flex-wrap gap-3">
                  {moods.map(mood => (
                    <button
                      key={mood.key}
                      onClick={() => setMoodFilter(mood.key)}
                      className={`px-5 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
                        moodFilter === mood.key
                          ? 'bg-slate-800 text-white shadow-lg'
                          : 'bg-white/80 text-slate-700 hover:bg-white border border-gray-200/50 hover:shadow-md'
                      }`}
                    >
                      <span>{mood.emoji}</span>
                      <span>{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Premium Food Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mealOptions.map((food, index) => (
            <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-800 tracking-tight">{food.name}</h3>
                      {food.premium && (
                        <Crown className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    {food.premium && (
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold tracking-wide inline-block mb-3">
                        PREMIUM
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => toggleFavorite(food.name)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                  >
                    <Heart 
                      className={`h-5 w-5 ${favorites.includes(food.name) ? 'fill-current text-red-500' : ''}`} 
                    />
                  </button>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Category</span>
                    <span className="font-bold text-slate-800">{food.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Calories</span>
                    <span className="font-bold text-slate-800">{food.calories} kcal</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Cook Time</span>
                    <span className="font-bold text-slate-800">{food.cookTime}분</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Price</span>
                    <span className="font-bold text-slate-800">{food.price.toLocaleString()}원</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="font-bold text-slate-800">{food.rating}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentRecommendation(food)}
                  className="w-full bg-gradient-to-r from-slate-800 to-zinc-800 hover:from-slate-900 hover:to-zinc-900 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform group-hover:scale-105 mb-3"
                >
                  Select This Menu
                </button>
                
                {/* Quick Rating Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => addToHistory(food, 5)}
                    className="flex-1 bg-green-100 hover:bg-green-200 text-green-800 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    ⭐ 먹었어요!
                  </button>
                  <button
                    onClick={() => addToHistory(food, 3)}
                    className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    👍 괜찮아요
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mealOptions.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-3 tracking-tight">No Results Found</h3>
            <p className="text-gray-500 font-medium">Try different search terms or filters</p>
          </div>
        )}

        {/* Meal History Section */}
        <div className="mt-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center space-x-3">
                <Clock className="h-6 w-6 text-slate-600" />
                <span>Meal History</span>
              </h3>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-slate-600 hover:text-slate-800 font-semibold transition-colors"
              >
                {showHistory ? 'Hide' : 'Show All'}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(showHistory ? mealHistory : mealHistory.slice(0, 3)).map((meal, index) => (
                <div key={index} className="bg-white/80 rounded-xl p-4 border border-gray-200/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-800">{meal.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="text-sm font-semibold">{meal.rating}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>📅 {meal.date}</div>
                    <div>🍽️ {meal.category}</div>
                    {meal.price && <div>💰 {meal.price.toLocaleString()}원</div>}
                  </div>
                </div>
              ))}
            </div>
            
            {mealHistory.length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🍽️</div>
                <p className="text-gray-500 font-medium">아직 기록된 식사가 없어요</p>
              </div>
            )}
          </div>
        </div>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="mt-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-3 tracking-tight">
                <Heart className="h-6 w-6 fill-current text-red-500" />
                <span>Your Favorites</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {favorites.map((food, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 px-4 py-2 rounded-full text-sm font-bold border border-gray-200/50"
                  >
                    {food}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Luxury Footer */}
      <footer className="bg-white/40 backdrop-blur-md border-t border-gray-100/50 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center text-gray-600">
            <p className="mb-3 text-xl font-bold text-slate-800">✨ Premium Dining Experience</p>
            <p className="text-sm font-medium">Crafted with excellence for 다앤님 • Powered by AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WhatToEat;
