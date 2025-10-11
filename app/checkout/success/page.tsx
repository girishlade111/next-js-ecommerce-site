import Link from "next/link"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24 flex flex-col items-center justify-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
        <Check className="h-10 w-10 text-primary-foreground" />
      </div>
      <h1 className="mt-6 text-3xl font-bold">订单已确认</h1>
      <p className="mt-2 text-center text-muted-foreground">感谢您的购买！您的订单已成功提交，我们将尽快处理。</p>
      <p className="mt-1 text-center text-muted-foreground">订单确认邮件已发送至您的邮箱。</p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/">返回首页</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/products">继续购物</Link>
        </Button>
      </div>
    </div>
  )
}
