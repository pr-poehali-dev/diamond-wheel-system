
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Diamond } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  // Мок данных пользователя (в реальном приложении будет получено с сервера)
  const user = {
    name: "Пользователь",
    username: "@user123",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
    diamonds: 5,
    nextWithdrawalAvailable: 3, // сколько алмазов осталось накопить для вывода
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Профиль</h1>
        <Link to="/">
          <Button variant="outline" size="sm">На главную</Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>ПЛ</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.username}</CardDescription>
          </div>
        </CardHeader>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Diamond className="h-5 w-5 text-purple-500" />
            Мои алмазы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <span className="text-4xl font-bold">{user.diamonds}</span>
            <p className="text-muted-foreground mt-2">алмазов накоплено</p>
          </div>
          
          <Separator className="my-4" />
          
          <div className="rounded-lg bg-muted p-4">
            <div className="flex justify-between mb-1">
              <span>Прогресс до вывода</span>
              <span>{user.diamonds}/8 алмазов</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              <div 
                className="bg-purple-600 h-2.5 rounded-full" 
                style={{ width: `${(user.diamonds / 8) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Осталось накопить: {8 - user.diamonds} алмазов
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={user.diamonds < 8}>
            {user.diamonds >= 8 ? "Вывести алмазы" : "Минимум 8 алмазов для вывода"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Дополнительные действия</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Link to="/referrals">
            <Button variant="outline" className="w-full justify-start">
              <span className="mr-2">👥</span> Пригласить друзей
            </Button>
          </Link>
          <Button variant="outline" className="w-full justify-start">
            <span className="mr-2">🔄</span> История операций
          </Button>
          <Button variant="outline" className="w-full justify-start text-red-500" >
            <span className="mr-2">🚪</span> Выйти
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
