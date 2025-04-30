
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Diamond, HistoryIcon, ArrowDownToLine, Copy, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const ProfilePage = () => {
  // Мок данных пользователя (в реальном приложении будет получено с сервера)
  const user = {
    name: "Пользователь",
    username: "@user123",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
    diamonds: 5,
    nextWithdrawalAvailable: 3, // сколько алмазов осталось накопить для вывода
    dailyDiamondClaimed: true, // получен ли сегодня алмаз
    totalEarned: 12, // всего заработано алмазов
    totalWithdrawn: 8, // всего выведено алмазов
    lastActivity: "2025-04-29T10:30:00", // последняя активность
    referralCount: 3, // количество приглашенных друзей
  };

  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // История транзакций (мок)
  const transactions = [
    { id: 1, type: "earn", amount: 1, date: "2025-04-29", description: "Ежедневное вращение" },
    { id: 2, type: "earn", amount: 1, date: "2025-04-28", description: "Ежедневное вращение" },
    { id: 3, type: "earn", amount: 1, date: "2025-04-27", description: "Приглашение пользователя" },
    { id: 4, type: "withdraw", amount: 8, date: "2025-04-25", description: "Вывод на кошелек" },
  ];

  const handleWithdraw = () => {
    if (!withdrawAddress.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите адрес кошелька для вывода",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Имитация запроса
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Запрос на вывод отправлен",
        description: "Ваши алмазы будут отправлены в течение 24 часов",
      });
    }, 1500);
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`https://example.com/ref/${user.username}`);
    toast({
      title: "Ссылка скопирована",
      description: "Реферальная ссылка скопирована в буфер обмена",
    });
  };

  const nextDiamondAvailable = new Date();
  // Если сегодня уже получен алмаз, то следующий будет доступен завтра
  if (user.dailyDiamondClaimed) {
    nextDiamondAvailable.setDate(nextDiamondAvailable.getDate() + 1);
    nextDiamondAvailable.setHours(0, 0, 0, 0);
  }

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
            <div className="flex items-center mt-2">
              <Badge variant="outline" className="mr-2">
                Telegram
              </Badge>
              <Badge variant="secondary">
                {user.referralCount} приглашений
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Diamond className="h-5 w-5 text-purple-500" />
            Мои алмазы
          </CardTitle>
          <CardDescription>
            Статистика и управление вашими накоплениями
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-muted rounded-lg p-3 text-center">
              <div className="text-3xl font-bold text-purple-600">{user.diamonds}</div>
              <div className="text-sm text-muted-foreground">Доступно</div>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <div className="text-3xl font-bold">{user.totalEarned}</div>
              <div className="text-sm text-muted-foreground">Всего заработано</div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="rounded-lg bg-muted p-4">
            <div className="flex justify-between mb-1">
              <span>Прогресс до вывода</span>
              <span>{user.diamonds}/8 алмазов</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              <div 
                className="bg-purple-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min((user.diamonds / 8) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {user.diamonds >= 8 
                ? "Вы можете вывести свои алмазы!" 
                : `Осталось накопить: ${8 - user.diamonds} алмазов`
              }
            </p>
          </div>

          <div className="mt-4 bg-muted/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <RefreshCcw className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-sm">Следующий алмаз доступен:</span>
              </div>
              <Badge variant={user.dailyDiamondClaimed ? "outline" : "secondary"}>
                {user.dailyDiamondClaimed 
                  ? `Завтра в 00:00` 
                  : "Сейчас!"
                }
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full mb-2" disabled={user.diamonds < 8}>
                <ArrowDownToLine className="mr-2 h-4 w-4" />
                {user.diamonds >= 8 ? "Вывести алмазы" : "Минимум 8 алмазов для вывода"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Вывод алмазов</DialogTitle>
                <DialogDescription>
                  Вы можете вывести {Math.floor(user.diamonds / 8) * 8} алмазов на ваш кошелек.
                  Обработка занимает до 24 часов.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="wallet">Адрес кошелька</Label>
                  <Input 
                    id="wallet" 
                    placeholder="Введите адрес кошелька..." 
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Количество алмазов</Label>
                  <div className="p-2 bg-muted rounded">
                    <div className="font-medium">{Math.floor(user.diamonds / 8) * 8} алмазов</div>
                    <div className="text-sm text-muted-foreground">Всегда выводится кратно 8</div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleWithdraw} disabled={isLoading}>
                  {isLoading ? "Обработка..." : "Вывести алмазы"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Link to="/" className="w-full">
            <Button variant="outline" className="w-full">
              Вернуться к вращению
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HistoryIcon className="h-5 w-5" />
            История операций
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map(tx => (
              <div key={tx.id} className="flex justify-between items-center p-3 border-b">
                <div className="flex items-center">
                  {tx.type === 'earn' ? (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Diamond className="h-4 w-4 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <ArrowDownToLine className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{tx.description}</div>
                    <div className="text-sm text-muted-foreground">{tx.date}</div>
                  </div>
                </div>
                <div className={`font-bold ${tx.type === 'earn' ? 'text-green-600' : 'text-blue-600'}`}>
                  {tx.type === 'earn' ? '+' : '-'}{tx.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
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
          
          <Button variant="outline" className="w-full justify-start" onClick={copyReferralLink}>
            <Copy className="mr-2 h-4 w-4" /> Скопировать реферальную ссылку
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
