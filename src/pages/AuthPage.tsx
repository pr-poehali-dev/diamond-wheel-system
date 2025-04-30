
import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const token = localStorage.getItem("telegramToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  // Функция авторизации через Telegram
  const handleTelegramLogin = () => {
    // В реальном приложении здесь будет настоящая авторизация через Telegram API
    // Для демонстрации просто имитируем успешную авторизацию
    
    // Генерируем фейковый токен
    const fakeToken = "telegram_" + Math.random().toString(36).substr(2, 9);
    
    // Сохраняем в localStorage
    localStorage.setItem("telegramToken", fakeToken);
    localStorage.setItem("userDiamonds", "0");
    
    // Перенаправляем на главную страницу
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-4">Авторизация</h1>
          <p className="text-gray-600">
            Для входа в систему и начала заработка алмазов, авторизуйтесь через Telegram
          </p>
        </div>
        
        <div className="flex flex-col items-center">
          <Button 
            onClick={handleTelegramLogin}
            className="bg-[#0088cc] hover:bg-[#0077b5] text-white px-6 py-3 flex items-center gap-2 text-lg rounded-lg w-full justify-center"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M19.3041 4.2009C17.102 5.1238 4.5644 10.2447 2.0743 11.2523C1.1021 11.5905 0.534644 12.0186 0.618394 12.5413C0.680644 12.9427 1.1855 13.1387 1.9462 13.4016L5.4462 14.5174C6.1323 14.7516 6.5241 14.8271 6.9196 14.6627C7.2544 14.5214 8.0854 13.9847 9.3893 12.9635C10.6158 12.0045 11.6335 12.4334 12.4195 12.9635L17.5927 16.5571C18.5121 17.1872 19.2011 16.8834 19.4823 15.8944L21.954 5.8073C22.3215 4.49525 21.5065 3.99662 19.3041 4.2009Z" 
                fill="white"
              />
            </svg>
            Войти через Telegram
          </Button>
          
          <p className="mt-6 text-sm text-gray-500">
            Мы не храним ваш пароль от Telegram. Авторизация происходит через официальный API Telegram.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
