"use client"

import { useState } from "react"
import { Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import ProductCard from "@/components/product-card"
import { products, categories } from "@/lib/data"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])

  // 筛选产品
  const filteredProducts = products.filter((product) => {
    // 搜索筛选
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    // 类别筛选
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)

    // 价格筛选
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesPrice
  })

  // 处理类别选择
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">所有产品</h1>
                <p className="text-muted-foreground">浏览我们的产品系列</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative flex-1 md:w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="搜索产品..."
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">筛选</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle>筛选产品</SheetTitle>
                      <SheetDescription>根据类别和价格筛选产品</SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-6 py-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium tracking-wide text-foreground">类别</h3>
                        <div className="grid gap-2">
                          {categories.map((category) => (
                            <div key={category.id} className="flex items-center gap-2">
                              <Checkbox
                                id={`category-${category.id}`}
                                checked={selectedCategories.includes(category.id)}
                                onCheckedChange={() => handleCategoryChange(category.id)}
                              />
                              <label
                                htmlFor={`category-${category.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium tracking-wide text-foreground">价格范围</h3>
                          <p className="text-sm text-muted-foreground">
                            ¥{priceRange[0]} - ¥{priceRange[1]}
                          </p>
                        </div>
                        <Slider
                          defaultValue={[0, 1000]}
                          max={1000}
                          step={10}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedCategories([])
                          setPriceRange([0, 1000])
                        }}
                      >
                        重置
                      </Button>
                      <Button>应用筛选</Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg font-medium">未找到匹配的产品</p>
                <p className="text-muted-foreground">请尝试不同的搜索条件</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
