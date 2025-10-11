"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")

  // 计算小计
  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  // 计算运费 (示例: 订单超过200免运费，否则收取10元运费)
  const shipping = subtotal > 200 ? 0 : 10

  // 计算总计
  const total = subtotal + shipping

  // 处理优惠券提交
  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里可以添加优惠券验证逻辑
    alert(`优惠券 ${couponCode} 已应用`)
  }

  // 如果购物车为空
  if (cart.length === 0) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-24 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">您的购物车是空的</h1>
        <p className="text-muted-foreground mt-2">添加一些产品到您的购物车</p>
        <Button className="mt-4" asChild>
          <Link href="/products">浏览产品</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-bold mb-8">购物车</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* 购物车商品列表 */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border shadow-sm">
            <div className="p-6">
              <div className="grid gap-6">
                {cart.map((item) => (
                  <div key={item.id} className="grid gap-4 md:grid-cols-[1fr_auto]">
                    <div className="grid gap-4 md:grid-cols-[80px_1fr]">
                      <div className="flex items-center justify-center">
                        <Image
                          src={item.image || "/placeholder.svg?height=80&width=80"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="aspect-square rounded-md object-cover"
                        />
                      </div>
                      <div className="grid gap-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <div className="text-sm text-muted-foreground">¥{item.price.toFixed(2)}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">减少数量</span>
                          </Button>
                          <div className="flex h-7 w-10 items-center justify-center border border-input bg-background">
                            {item.quantity}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">增加数量</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 ml-2"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">删除</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center font-medium">¥{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between border-t p-6">
              <Button variant="outline" onClick={clearCart}>
                清空购物车
              </Button>
              <Button asChild>
                <Link href="/products">继续购物</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* 订单摘要 */}
        <div>
          <div className="rounded-lg border shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">订单摘要</h2>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span>小计</span>
                  <span>¥{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>运费</span>
                  <span>{shipping === 0 ? "免费" : `¥${shipping.toFixed(2)}`}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-semibold">
                  <span>总计</span>
                  <span>¥{total.toFixed(2)}</span>
                </div>
              </div>
              <form onSubmit={handleCouponSubmit} className="mt-6 grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="coupon" className="text-sm font-medium">
                    优惠券代码
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="coupon"
                      placeholder="输入优惠券代码"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button type="submit" variant="outline">
                      应用
                    </Button>
                  </div>
                </div>
              </form>
              <Button className="w-full mt-6" size="lg" asChild>
                <Link href="/checkout">结账</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
