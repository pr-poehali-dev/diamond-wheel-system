
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AuthBanner: React.FC = () => {
  const navigate = useNavigate();

  const handleAuth = () => {
    navigate("/auth");
  };

  return (
    <div className="bg-purple-700 text-white py-3 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-3 sm:mb-0 text-center sm:text-left">
          <p className="text-white">
            Войдите через Telegram, чтобы начать зарабатывать алмазы!
          </p>
        </div>
        <Button 
          onClick={handleAuth}
          className="bg-white text-purple-700 hover:bg-purple-100"
        >
          Войти через Telegram
        </Button>
      </div>
    </div>
  );
};

export default AuthBanner;
