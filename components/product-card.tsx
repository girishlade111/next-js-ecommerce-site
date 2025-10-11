"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast()
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart({
      ...product,
      quantity: 1,
    })

    toast({
      title: "已添加到购物车",
      description: `${product.name} 已添加到您的购物车`,
    })
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group relative overflow-hidden rounded-lg border">
        <div className="aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        {product.stock <= 0 && (
          <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
            缺货
          </div>
        )}
        <div className="p-4">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-medium">¥{product.price.toFixed(2)}</span>
            <Button
              variant="secondary"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="mr-1 h-4 w-4" />
              加入购物车
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
