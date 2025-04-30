
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner";
import AuthBanner from "@/components/AuthBanner";
import DiamondCounter from "@/components/DiamondCounter";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [diamonds, setDiamonds] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastSpinTime, setLastSpinTime] = useState<number | null>(null);
  const navigate = useNavigate();

  // Проверка авторизации при загрузке страницы
  useEffect(() => {
    // Здесь будет проверка токена Telegram
    const token = localStorage.getItem("telegramToken");
    if (token) {
      setIsLoggedIn(true);
      
      // Загрузка количества алмазов пользователя
      const savedDiamonds = localStorage.getItem("userDiamonds");
      if (savedDiamonds) {
        setDiamonds(parseInt(savedDiamonds));
      }
      
      // Загрузка времени последнего вращения
      const savedSpinTime = localStorage.getItem("lastSpinTime");
      if (savedSpinTime) {
        setLastSpinTime(parseInt(savedSpinTime));
      }
    }
  }, []);

  // Проверка, можно ли крутить винт снова
  const canSpin = () => {
    if (!lastSpinTime) return true;
    
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    return now - lastSpinTime >= oneDay;
  };

  // Функция вращения винта
  const spinWheel = () => {
    if (!isLoggedIn) {
      navigate("/auth");
      return;
    }
    
    if (!canSpin()) {
      alert("Вы уже крутили винт сегодня! Приходите завтра!");
      return;
    }
    
    setIsSpinning(true);
    
    // Имитация процесса вращения
    setTimeout(() => {
      const newDiamonds = diamonds + 1;
      setDiamonds(newDiamonds);
      setIsSpinning(false);
      
      // Сохраняем новые данные
      const now = Date.now();
      localStorage.setItem("userDiamonds", newDiamonds.toString());
      localStorage.setItem("lastSpinTime", now.toString());
      setLastSpinTime(now);
      
      alert("Поздравляем! Вы получили 1 алмаз!");
    }, 2000);
  };

  // Переход в профиль
  const goToProfile = () => {
    navigate("/profile");
  };

  // Переход на страницу приглашений
  const goToReferrals = () => {
    navigate("/referrals");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Баннер для неавторизованных пользователей */}
      {!isLoggedIn && <AuthBanner />}
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">Крутите винт - получайте алмазы!</h1>
          <p className="text-lg text-gray-600">Один раз в день вы можете крутить винт и получать алмаз</p>
        </div>
        
        {isLoggedIn && (
          <div className="flex justify-center mb-6">
            <DiamondCounter count={diamonds} />
          </div>
        )}
        
        <Card className="max-w-lg mx-auto p-6 shadow-xl bg-white rounded-xl">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 mb-8">
              <Spinner isSpinning={isSpinning} />
            </div>
            
            <Button 
              onClick={spinWheel} 
              disabled={isSpinning || (!canSpin() && isLoggedIn)} 
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full text-lg mb-4 w-full sm:w-auto"
            >
              {isSpinning ? "Крутится..." : "Крутить винт"}
            </Button>
            
            {isLoggedIn && !canSpin() && (
              <p className="text-orange-500 text-sm mb-4">
                Вы уже крутили винт сегодня. Приходите завтра!
              </p>
            )}
            
            {isLoggedIn && (
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button 
                  onClick={goToProfile} 
                  variant="outline" 
                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  Мой профиль
                </Button>
                
                <Button 
                  onClick={goToReferrals} 
                  variant="outline" 
                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  Пригласить друзей
                </Button>
              </div>
            )}
          </div>
        </Card>
        
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Как это работает?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-3xl mb-2">🎡</div>
              <h3 className="font-medium mb-1">Крутите винт</h3>
              <p className="text-sm text-gray-600">Один раз в день и получайте 1 алмаз</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-medium mb-1">Приглашайте друзей</h3>
              <p className="text-sm text-gray-600">Получайте 1 алмаз за каждого приглашенного друга</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-3xl mb-2">💎</div>
              <h3 className="font-medium mb-1">Выводите алмазы</h3>
              <p className="text-sm text-gray-600">Минимум для вывода — 8 алмазов</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
