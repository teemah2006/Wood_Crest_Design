'use client';

// import { useEffect, useState } from "react";
import { ShoppingCart, Check, Heart } from 'lucide-react'
import { Button } from "../ui/button";
import { ProductDisplayProps } from "@/interfaces";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { useState } from 'react';
import Link from 'next/link';
import { useFavStore } from '@/store/useFavStore';
const ProductDisplayCard: React.FC<ProductDisplayProps> = ({ product }) => {
    
    const addToCart = useCartStore((state) => state.addToCart);
    const cart = useCartStore((state) => state.cart);
    const [showButtons, setShowButtons] = useState(false);
    const addToFav = useFavStore((state) => state.addToFav);
    const removeFav = useFavStore((state) => state.removeFromFav);
    const favourites = useFavStore((state) => state.favourites);

    const handleAddCart = () => {
        addToCart({
            product: product,
            quantity: 1
        })
    };

    const isFavourite = favourites.some(fav => fav.product.id === product.id);

    const handleFav = () => {
        
        if (isFavourite) {
            removeFav(product.id);
        } else {
            addToFav({ product });
        }

    };


    const HeartColor = isFavourite ? 'text-red-500 fill-red-500' : ''

    const changeView = () => {
        setShowButtons(!showButtons);
    }

    const IsAdded = cart.some(item => item.product.id === product.id);
    return (
        <div className="border bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300">

            {/* desktop view */}
            <div className="relative hidden lg:block w-full h-60 group mb-4">
                {product.images && product.images.length > 0 && (
                    <Image width={200} height={200} src={product.images[0]} alt={product.name} className="w-full h-60 object-cover  rounded" />
                )}
                <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100  transition-opacity duration-300 flex flex-col justify-between rounded p-4">
                    <div className='w-full flex justify-end'>
                        <Button variant='default' className='rounded-full group' onClick={handleFav}><Heart className={HeartColor} /></Button>
                    </div>
                    <div className="flex justify-center gap-4">
                        {IsAdded ?
                            <Button size="sm" variant="secondary" className='bg-[#E6E6E6] text-[#2C2C2C]'><Check /> Added</Button>
                            :
                            <Button size="sm" variant="secondary" className='bg-[#E6E6E6] text-[#2C2C2C]' onClick={handleAddCart}><ShoppingCart /> Add</Button>
                        }

                        <Button size="sm" variant="secondary" className='bg-[#E6E6E6] text-[#2C2C2C]'><Link href={`/products/${product.category}/${product.publicId}`}>Overview</Link></Button>
                        {/* Add more buttons as needed */}
                    </div>
                </div>
            </div>

            {/* mobile and tab view */}
            <div className="relative lg:hidden w-full h-60 group mb-4" onClick={changeView}>
                {product.images && product.images.length > 0 && (
                    <Image width={200} height={200} src={product.images[0]} alt={product.name} className="w-full h-60 object-cover  rounded" />
                )}
                {showButtons &&
                    <div className="absolute inset-0 bg-transparent transition-opacity duration-300 flex flex-col justify-between rounded p-4">
                        <div className='w-full flex justify-end'>
                            <Button variant='default' className='rounded-full group' onClick={handleFav}><Heart className={HeartColor} /></Button>
                        </div>
                        <div className="flex justify-center gap-4">
                            {IsAdded ?
                                <Button size="sm" variant="secondary" className='bg-[#E6E6E6] text-[#2C2C2C]'><Check /> Added</Button>
                                :
                                <Button size="sm" variant="secondary" className='bg-[#E6E6E6] text-[#2C2C2C]' onClick={handleAddCart}><ShoppingCart /> Add</Button>
                            }

                            <Button size="sm" variant="secondary" className='bg-[#E6E6E6] text-[#2C2C2C]'><Link href={`/products/${product.category}/${product.publicId}`}>Overview</Link></Button>
                            {/* Add more buttons as needed */}
                        </div>
                    </div>
                }

            </div>

            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-2">RF {product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{product.category}{product.subCategory ? ` > ${product.subCategory}` : ""}</p>

        </div>
    )
}

export default ProductDisplayCard;