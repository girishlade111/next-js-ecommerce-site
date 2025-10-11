"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Minus, Plus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"
import { products } from "@/lib/data"

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  // 查找产品
  const product = products.find((p) => p.id === params.id)

  // 如果产品不存在，显示错误信息
  if (!product) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-24 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">产品未找到</h1>
        <p className="text-muted-foreground mt-2">无法找到您请求的产品</p>
        <Button className="mt-4" onClick={() => router.push("/products")}>
          返回产品列表
        </Button>
      </div>
    )
  }

  // 增加数量
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  // 减少数量
  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  // 添加到购物车
  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    })

    toast({
      title: "已添加到购物车",
      description: `${product.name} x ${quantity} 已添加到您的购物车`,
    })
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        {/* 产品图片 */}
        <div className="flex items-center justify-center overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.image || "/placeholder.svg?height=600&width=600"}
            alt={product.name}
            width={600}
            height={600}
            className="aspect-square object-cover"
          />
        </div>

        {/* 产品信息 */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl font-semibold mt-2">¥{product.price.toFixed(2)}</p>
          </div>

          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>

          {/* 数量选择器 */}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm font-medium">数量:</span>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">减少数量</span>
              </Button>
              <div className="flex h-8 w-12 items-center justify-center border-y border-input bg-background">
                {quantity}
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-none" onClick={incrementQuantity}>
                <Plus className="h-3 w-3" />
                <span className="sr-only">增加数量</span>
              </Button>
            </div>
          </div>

          {/* 添加到购物车按钮 */}
          <Button className="mt-6" size="lg" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            添加到购物车
          </Button>

          {/* 产品详情 */}
          <div className="mt-8 border-t pt-8">
            <h2 className="text-xl font-semibold mb-4">产品详情</h2>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4 border-b pb-3">
                <div className="font-medium">类别</div>
                <div>{product.categoryName}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b pb-3">
                <div className="font-medium">库存状态</div>
                <div>{product.stock > 0 ? "有货" : "缺货"}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b pb-3">
                <div className="font-medium">配送</div>
                <div>全国配送</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
