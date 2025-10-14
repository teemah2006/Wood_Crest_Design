import { use} from "react";
import { ProductPageProps } from "@/interfaces";
import ProductClient from "@/app/components/common/ProductClient";

export default function ProductPage({ params }: { params: Promise<ProductPageProps> }) {
  const { category,id } = use(params);

  return <ProductClient publicId={id}/>
  
}
