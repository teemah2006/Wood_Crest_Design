import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import ProductDisplayCard from "../common/ProductCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default async function SignatureSection() {
    const q = query(collection(db, "products"), where("isSignature", "==", true));
    const snapshot = await getDocs(q);
    const signatureProducts = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name,
            price: data.price,
            description: data.description,
            category: data.category,
            subCategory: data.subCategory,
            images: data.images,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            isSignature: data.isSignature,
        };
    });

    if (signatureProducts.length > 0) {

        return (
            <div className="w-full p-4 my-4">
                {/* heading */}
                <div className="w-full flex flex-col space-y-4 items-center justify-center mb-6">
                    <h2 className="font-semibold text-xl lg:text-2xl">Our Signature Products</h2>
                    <p className="lg:text-xl text-lg text-[#757575]">Explore our premium signature products</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {
                        signatureProducts.map((product) => (
                            <ProductDisplayCard key={product.id} product={product} />
                        ))
                    }
                </div>
                <div className="flex items-center justify-center my-4">
                <Link href={`/products/Statement Furniture Pieces`} className="bg-[#E6E6E6] py-2 px-6 rounded-sm flex gap-2 items-center">More <ArrowRight className="w-[15px] h-[15px]"/></Link>
                </div>
            </div>

        )
    } else {
        return (
            <p className="my-6 bg-white w-full">No signature product</p>
        )
    }
}

