"use client";

import { useEffect, useMemo, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { getDocs, doc, deleteDoc, collection } from "firebase/firestore";
import ProductCard from "../common/AdminProductCard";
import { type ProductProps } from "@/interfaces";
import { toast } from "react-toastify";
import ProductDisplayCard from "../common/ProductCard";
import { ProductListProps } from "@/interfaces";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../ui/drawer"
import CartPage from "./CartCard";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";



const ProductList: React.FC<ProductListProps> = ({ user, query, categoryFilter, subCategoryFilter, sortBy, priceRange }) => {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(true);
    const cartTotal = useCartStore((state) => state.totalQuantity());
    const pathname = usePathname();



    const filteredProducts = useMemo(() => {
        let filtered = products;

        // Filter by search query
        if (query) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            );
        }

        // Filter by category
        if (categoryFilter && categoryFilter !== 'All') {
            filtered = filtered.filter(product => product.category === categoryFilter);
        }

        // Filter by sub-category
        if (subCategoryFilter && subCategoryFilter.length > 0) {
            filtered = filtered.filter(product =>
                product.subCategory !== undefined && subCategoryFilter.includes(product.subCategory)
            );
        }


        // Filter by price range
        if (priceRange && priceRange.length === 2) {
            filtered = filtered.filter(product =>
                product.price >= priceRange[0] && product.price <= priceRange[1]
            );
        }

        // Sort products
        switch (sortBy) {
            case 'price descending':
                return filtered.sort((a, b) => b.price - a.price);
            case 'price ascending':
                return filtered.sort((a, b) => a.price - b.price);
            case 'new':
                return filtered.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt.seconds * 1000) : new Date(0);
                    const dateB = b.createdAt ? new Date(b.createdAt.seconds * 1000) : new Date(0);
                    return dateB.getTime() - dateA.getTime();
                });
            default:
                return filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

    }, [query, categoryFilter, subCategoryFilter, products, sortBy, priceRange]);

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
                        createdAt: data.createdAt,
                        isSignature: data.isSignature? data.isSignature : false
                        // add any other fields required by ProductProps here
                    } as ProductProps;
                });
                setProducts(productsList);
            } catch {
                toast.error("Failed to fetch products.");
            }
            setLoading(false);
        };
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

    if (user === "admin") {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto max-h-screen p-4 ">
                {products.map(product => (
                    <ProductCard product={product} key={product.id} onDelete={handleDelete} />
                ))}
            </div>
        );
    }

    return (
        <div className="p-4 max-h-screen mb-4">
            <p className="text-muted-foreground mb-2">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  max-h-screen  ">

                {filteredProducts.map(product => (
                    <ProductDisplayCard product={product} key={product.id} />
                ))}

                {!pathname.startsWith("/admin") && (
                <Drawer direction="right">
                    <DrawerTrigger >
                        <div className="fixed bottom-4 rounded-full md:p-4 p-2 bg-[#D9D9D9] right-2 shadow-lg z-2 cursor-pointer hover:shadow-xl transition-shadow duration-300">
                            <div className="rounded-xl p-2 text-xs md:text-sm bg-black absolute -top-4 text-white">{cartTotal}</div>
                            <ShoppingCart className="text-[#E5A000] w-[40px] h-[40px] md:w-[50px] md:h-[50px]" />
                        </div>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Your Cart</DrawerTitle>
                            <DrawerDescription>These are the products you added to cart.</DrawerDescription>
                        </DrawerHeader>
                        <CartPage />
                        <DrawerFooter>
                            <Button variant="default">Check Out</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
                )}

            </div>
        </div>

    )
}

export default ProductList;