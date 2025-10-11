"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { cart, clearCart } = useCart()
  const [step, setStep] = useState(1)

  // 表单状态
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "中国",
    paymentMethod: "creditCard",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
  })

  // 计算订单总额
  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
  const shipping = subtotal > 200 ? 0 : 10
  const total = subtotal + shipping

  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 处理配送信息提交
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  // 处理支付信息提交
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(3)
  }

  // 处理订单确认
  const handleConfirmOrder = () => {
    // 这里可以添加订单提交逻辑
    toast({
      title: "订单已提交",
      description: "感谢您的购买！您的订单已成功提交。",
    })

    // 清空购物车并跳转到确认页面
    clearCart()
    router.push("/checkout/success")
  }

  // 如果购物车为空
  if (cart.length === 0) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-24 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">您的购物车是空的</h1>
        <p className="text-muted-foreground mt-2">无法进行结账</p>
        <Button className="mt-4" asChild>
          <Link href="/products">浏览产品</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-bold mb-8">结账</h1>

      {/* 结账步骤 */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className={`flex flex-col items-center ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 1 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}
            >
              {step > 1 ? <Check className="h-5 w-5" /> : 1}
            </div>
            <span className="mt-2 text-sm font-medium">配送</span>
          </div>
          <div className={`w-20 border-t ${step >= 2 ? "border-primary" : "border-muted-foreground"}`} />
          <div className={`flex flex-col items-center ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 2 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}
            >
              {step > 2 ? <Check className="h-5 w-5" /> : 2}
            </div>
            <span className="mt-2 text-sm font-medium">支付</span>
          </div>
          <div className={`w-20 border-t ${step >= 3 ? "border-primary" : "border-muted-foreground"}`} />
          <div className={`flex flex-col items-center ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 3 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}
            >
              3
            </div>
            <span className="mt-2 text-sm font-medium">确认</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* 结账表单 */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border shadow-sm">
            {/* 步骤 1: 配送信息 */}
            {step === 1 && (
              <form onSubmit={handleShippingSubmit}>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">配送信息</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">名字</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">姓氏</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">电子邮件</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">电话号码</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                    </div>
                    <div className="grid gap-2 sm:col-span-2">
                      <Label htmlFor="address">地址</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="city">城市</Label>
                      <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="postalCode">邮政编码</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="country">国家</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t p-6">
                  <Button variant="outline" asChild>
                    <Link href="/cart">返回购物车</Link>
                  </Button>
                  <Button type="submit">继续到支付</Button>
                </div>
              </form>
            )}

            {/* 步骤 2: 支付信息 */}
            {step === 2 && (
              <form onSubmit={handlePaymentSubmit}>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">支付方式</h2>
                  <RadioGroup
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
                    className="grid gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="creditCard" id="creditCard" />
                      <Label htmlFor="creditCard" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        信用卡
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="alipay" id="alipay" />
                      <Label htmlFor="alipay">支付宝</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="wechatPay" id="wechatPay" />
                      <Label htmlFor="wechatPay">微信支付</Label>
                    </div>
                  </RadioGroup>

                  {formData.paymentMethod === "creditCard" && (
                    <div className="mt-6 grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="cardName">持卡人姓名</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cardNumber">卡号</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="cardExpiry">有效期</Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            placeholder="MM/YY"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cardCvc">CVC</Label>
                          <Input
                            id="cardCvc"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between border-t p-6">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    返回配送信息
                  </Button>
                  <Button type="submit">继续到确认</Button>
                </div>
              </form>
            )}

            {/* 步骤 3: 订单确认 */}
            {step === 3 && (
              <div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">确认订单</h2>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="shipping">
                      <AccordionTrigger>配送信息</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-2 text-sm">
                          <div className="grid grid-cols-2">
                            <span className="font-medium">姓名:</span>
                            <span>
                              {formData.firstName} {formData.lastName}
                            </span>
                          </div>
                          <div className="grid grid-cols-2">
                            <span className="font-medium">电子邮件:</span>
                            <span>{formData.email}</span>
                          </div>
                          <div className="grid grid-cols-2">
                            <span className="font-medium">电话:</span>
                            <span>{formData.phone}</span>
                          </div>
                          <div className="grid grid-cols-2">
                            <span className="font-medium">地址:</span>
                            <span>
                              {formData.address}, {formData.city}, {formData.postalCode}, {formData.country}
                            </span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="payment">
                      <AccordionTrigger>支付方式</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-2 text-sm">
                          <div className="grid grid-cols-2">
                            <span className="font-medium">支付方式:</span>
                            <span>
                              {formData.paymentMethod === "creditCard" && "信用卡"}
                              {formData.paymentMethod === "alipay" && "支付宝"}
                              {formData.paymentMethod === "wechatPay" && "微信支付"}
                            </span>
                          </div>
                          {formData.paymentMethod === "creditCard" && (
                            <>
                              <div className="grid grid-cols-2">
                                <span className="font-medium">持卡人:</span>
                                <span>{formData.cardName}</span>
                              </div>
                              <div className="grid grid-cols-2">
                                <span className="font-medium">卡号:</span>
                                <span>**** **** **** {formData.cardNumber.slice(-4)}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="items">
                      <AccordionTrigger>订单商品</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-4">
                          {cart.map((item) => (
                            <div key={item.id} className="flex justify-between">
                              <div>
                                <span className="font-medium">{item.name}</span>
                                <span className="text-muted-foreground"> x {item.quantity}</span>
                              </div>
                              <span>¥{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="flex items-center justify-between border-t p-6">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    返回支付信息
                  </Button>
                  <Button onClick={handleConfirmOrder}>提交订单</Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 订单摘要 */}
        <div>
          <div className="rounded-lg border shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">订单摘要</h2>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span>商品 ({cart.length})</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
