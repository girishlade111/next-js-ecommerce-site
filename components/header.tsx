"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingCart, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"

export default function Header() {
  const { cart } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // 计算购物车中的商品总数
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">打开菜单</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <ShoppingCart className="h-5 w-5" />
                <span>电子商城</span>
              </Link>
              <Link href="/" className="hover:text-primary">
                首页
              </Link>
              <Link href="/products" className="hover:text-primary">
                所有产品
              </Link>
              <Link href="/categories" className="hover:text-primary">
                分类
              </Link>
              <Link href="/about" className="hover:text-primary">
                关于我们
              </Link>
              <Link href="/contact" className="hover:text-primary">
                联系我们
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/" className="hidden md:flex items-center gap-2 text-lg font-semibold">
            <ShoppingCart className="h-5 w-5" />
            <span>电子商城</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="font-medium transition-colors hover:text-primary">
              首页
            </Link>
            <Link href="/products" className="font-medium transition-colors hover:text-primary">
              所有产品
            </Link>
            <Link href="/categories" className="font-medium transition-colors hover:text-primary">
              分类
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {isSearchOpen ? (
            <div className="relative flex items-center md:w-80">
              <Input type="search" placeholder="搜索产品..." className="w-full" autoFocus />
              <Button variant="ghost" size="icon" className="absolute right-0" onClick={() => setIsSearchOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">关闭搜索</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">搜索</span>
            </Button>
          )}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">账户</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">购物车</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
