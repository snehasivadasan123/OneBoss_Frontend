"use client";

import { Bell, ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  // DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { usePathname, useRouter } from "next/navigation";
import { items } from "./Sidebar";


export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const getPathTitleMap = () => {
    const map: Record<string, string> = {};
    items.forEach((section) => {
      section.items.forEach((item) => {
        map[item.url] = item.title;
      });
    });
    return map;
  };
  const pathTitleMap = getPathTitleMap();
  const pageTitle = pathTitleMap[pathname] || "";


  const handleLogout = () => {
    localStorage.removeItem("access_token")
    document.cookie = "access_token=;path=/; max-age=0; secure; samesite=strict"
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between p-5 bg-white border-b border-gray-200 w-full">

      <div className="flex items-center">
        <h2 className="text-2xl font-bold">{pageTitle}</h2>
      </div>


      <div className="relative flex-1 max-w-md mx-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search here..."
          className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/image/femaleavatar.svg" alt="Liana Sepp" />
                <AvatarFallback>LS</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">Liana Sepp</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
