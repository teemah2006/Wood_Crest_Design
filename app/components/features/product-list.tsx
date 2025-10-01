"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { getDocs, doc, deleteDoc, collection } from "firebase/firestore";
import ProductCard from "../common/ProductCard";
import { type ProductProps } from "@/interfaces";
import { toast } from "react-toastify";
const ProductList = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            // toast.info("Loading products...");
            try {
                const productsSnapshot = await getDocs(collection(db, "products"));
                const productsList = productsSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name,
                        price: data.price,
                        description: data.description,
                        category: data.category,
                        subCategory: data.subCategory,
                        images: data.images,
                        // add any other fields required by ProductProps here
                    } as ProductProps;
                });
                setProducts(productsList);
            } catch {
                toast.error("Failed to fetch products.");
            }
            setLoading(false);
        };
        toast.info("Loading products...");
        fetchProducts();
    }, []);

    const handleDelete = async (productId: string) => {
        if (!auth.currentUser) {
            toast.error("You must be logged in to delete products.");
            return;
        }
        try {
            await deleteDoc(doc(db, "products", productId));
            setProducts(products.filter(product => product.id !== productId));
            toast.success("Product deleted successfully!");
        } catch {
            toast.error("Failed to delete product.")
        }
    };

    if (loading) return <p>Loading products...</p>;
    if (products.length === 0) return <p>No products available.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto max-h-screen p-4 ">
            {products.map(product => (
                <ProductCard product={product} key={product.id} onDelete={handleDelete}  />
            ))}
        </div>
    );
}

export default ProductList;