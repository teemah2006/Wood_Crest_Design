'use client';
import { useState, useEffect } from "react";
import { getDocs, collection, query, where, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase"; // your firebase config
import { ProductProps } from "@/interfaces";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "../ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./reviewForm";
import { reviewsProps } from "@/interfaces";
import ProductList from "../features/product-list";
import { useFavStore } from "@/store/useFavStore";
export default function ProductClient({ publicId }: { publicId: string }) {
    const [product, setProduct] = useState<ProductProps | null>(null);
    const addToCart = useCartStore((state) => state.addToCart);
    const productId = product?.id;
    const [reviews, setReviews] = useState<reviewsProps[]>(product?.reviews || []);
    const addToFav = useFavStore((state) => state.addToFav);
    const removeFav = useFavStore((state) => state.removeFromFav);
    const favourites = useFavStore((state) => state.favourites);

    const handleAddCart = () => {
        if (product) {
            addToCart({
                product: product,
                quantity: 1
            })
        }
    }

    const handleNewReview = async (newReview: reviewsProps) => {
        if (product) {
            try {
                const productRef = doc(db, "products", product?.id ? product?.id : '');

                // Update Firestore document
                await updateDoc(productRef, {
                    reviews: arrayUnion(newReview),
                });

                // Update local state (optional UI update)
                setReviews((prev) => [...prev, newReview]);

            } catch (error) {
                console.error("Error adding review:", error);
            }
        }
    };

    const isFavourite = favourites.some(fav => fav.product.id === productId);

    const handleFav = () => {
        if(product){
        
        if (isFavourite) {
            removeFav(product.id);
        } else {
            addToFav({ product });
        }
    }

    };


    const HeartColor = isFavourite ? 'text-red-500 fill-red-500' : ''

    useEffect(() => {
        const fetchProducts = async () => {
            const q = query(collection(db, "products"), where("publicId", "==", publicId));
            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const data = snapshot.docs[0].data();


                setProduct({
                    id: snapshot.docs[0].id,
                    publicId: data.publicId ? data.publicId : '',
                    name: data.name,
                    price: data.price,
                    description: data.description,
                    category: data.category,
                    subCategory: data.subCategory,
                    images: data.images,
                    createdAt: data.createdAt?.toDate?.() || new Date(),
                    isSignature: data.isSignature,
                    reviews: data.reviews ? data.reviews : [],
                });
                setReviews(data.reviews ? data.reviews : [])
            }

        };
        fetchProducts()

    }, [publicId])

    if (!product) return <div>Loading...</div>;

    return (
        <div className="">
            <div className="w-full p-4 flex flex-col lg:flex-row gap-6">
                <div className="relative w-1/2">
                
                    {
                        product.images.map((img, index) => (
                            <Image
                                key={index}
                                src={img}
                                alt={product.name}
                                width={300}
                                height={400}
                                className="w-full rounded-lg mb-6"
                            />
                        ))
                    }
                    <div className=' absolute top-2 right-2 w-full flex justify-end'>
                        <Button variant='default' className='rounded-full group' onClick={handleFav}><Heart className={HeartColor} /></Button>
                </div>
                </div>
                <div className="w-1/2">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">{product.name}</h1>
                    <div className="my-6  flex flex-col items-start justify-start">
                        <p className="px-4 py-2 bg-[#E5A000] mb-2 rounded-lg text-white">Tag</p>
                        <p className="font-semibold text-2xl md:text-3xl lg:text-4xl "> <sup className="text-lg">RF</sup>{product.price.toLocaleString()}</p>
                    </div>
                    <p className="text-gray-500">{product.category}</p>

                    <Button size="lg" variant="default" className='w-full my-4' onClick={handleAddCart}><ShoppingCart /> Add to Cart</Button>


                    <Accordion
                        type="single"
                        collapsible
                        className="min-w-full"
                        defaultValue="item-1"
                    >
                        <AccordionItem value="item-1">
                            <AccordionTrigger className=" md:text-lg lg:text-xl">Product Information</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                {product.description.split("\n").map((paragraph, i) => (
                                    <p key={i} className="lg:text-lg ">{paragraph}</p>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className=" md:text-lg lg:text-xl">Shipping Details</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p className="lg:text-lg ">
                                    We offer worldwide shipping through trusted courier partners.
                                    Standard delivery takes 3-5 business days, while express shipping
                                    ensures delivery within 1-2 business days.
                                </p>
                                <p className="lg:text-lg ">
                                    All orders are carefully packaged and fully insured.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className=" md:text-lg lg:text-xl">Return Policy</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p className="lg:text-lg ">
                                    We stand behind our products with a comprehensive 30-day return
                                    policy. If you&apos;re not completely satisfied, simply return the
                                    item in its original condition.
                                </p>
                                <p className="lg:text-lg ">
                                    Our hassle-free return process includes free return shipping and
                                    full refunds processed within 48 hours of receiving the returned
                                    item.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </div>
            </div>

            {/* reviews */}
            <div className="my-8 p-4">
                <h2 className="font-semibold text-xl lg:text-2xl mb-6">Latest reviews</h2>

                {reviews.length > 0 ?
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6">
                        {reviews.map((rev, index) => (
                            <ReviewCard key={index} review={rev} />
                        ))}
                    </div>
                    <ReviewForm onSubmit={handleNewReview} reviews={true}/>
                </div>
                    :
                    <ReviewForm onSubmit={handleNewReview}/>
                }
            </div>

            {/* related products */}
            <div className="w-full bg-[#D9D9D9] p-6">
                <h2 className="font-semibold text-center text-xl lg:text-2xl mb-6">Related Products</h2>
                <ProductList user="customer" categoryFilter={product.category}/>
            </div>
            
        </div>
    );
}