
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Diamond, Copy, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ReferralsPage = () => {
  const [copied, setCopied] = useState(false);
  
  // Мок данных приглашений (в реальном приложении будет получено с сервера)
  const referralLink = "https://almazvint.com/?ref=user123";
  const referrals = [
    { id: 1, username: "@friend1", date: "25.04.2025", status: "активен" },
    { id: 2, username: "@friend2", date: "26.04.2025", status: "активен" },
    { id: 3, username: "@friend3", date: "28.04.2025", status: "ожидание" },
  ];
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Ссылка скопирована в буфер обмена");
    setTimeout(() => setCopied(false), 2000);
  };
  
  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: "Присоединяйся к Алмаз Винт!",
        text: "Крути винт и получай алмазы каждый день!",
        url: referralLink,
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Приглашения</h1>
        <Link to="/">
          <Button variant="outline" size="sm">На главную</Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Diamond className="h-5 w-5 text-purple-500" />
            Пригласи друзей
          </CardTitle>
          <CardDescription>
            За каждого приглашенного друга ты получишь 1 алмаз
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Input 
              value={referralLink} 
              readOnly 
              className="bg-muted"
            />
            <Button size="icon" variant="outline" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          
          <Button className="w-full gap-2" onClick={shareLink}>
            <Share2 className="h-4 w-4" />
            Поделиться ссылкой
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Мои приглашения</CardTitle>
          <CardDescription>
            Всего приглашено: {referrals.filter(r => r.status === "активен").length} друзей
          </CardDescription>
        </CardHeader>
        <CardContent>
          {referrals.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Пользователь</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead>Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referrals.map((referral) => (
                  <TableRow key={referral.id}>
                    <TableCell>{referral.username}</TableCell>
                    <TableCell>{referral.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        referral.status === "активен" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {referral.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">У вас пока нет приглашенных друзей</p>
              <p className="mt-2">Поделитесь своей реферальной ссылкой!</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <Link to="/profile">
            <Button variant="outline">Вернуться в профиль</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReferralsPage;
