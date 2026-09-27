import { products } from "@/lib/data"
import ProductClient from "./product-client"

export async function generateStaticParams() {
  return products.map((product) => ({ id: product.id }))
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ProductClient id={id} />
}
