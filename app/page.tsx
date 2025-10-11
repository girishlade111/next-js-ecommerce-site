import Link from "next/link"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/data"

export default function Home() {
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="flex flex-col min-h-screen">
      {/* 英雄区域 */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  发现优质产品，享受便捷购物
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  我们提供各种高品质产品，满足您的所有需求。立即开始购物，享受优惠价格和快速配送。
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/products"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  浏览产品
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  查看分类
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                alt="Hero Image"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="550"
                src="/placeholder.svg?height=550&width=1000"
                width="1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 搜索区域 */}
      <section className="w-full py-6 md:py-12 border-b">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">搜索产品</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">输入关键词查找您需要的产品</p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <form className="flex w-full max-w-sm items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="搜索产品..." className="w-full pl-8" />
                </div>
                <Button type="submit">搜索</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 精选产品 */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">精选产品</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">浏览我们的精选产品系列</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="flex justify-center">
              <Link
                href="/products"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                查看全部产品
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
