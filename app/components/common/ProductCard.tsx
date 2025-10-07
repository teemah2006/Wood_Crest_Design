'use client';

// import { useEffect, useState } from "react";
import { ShoppingCart, Check, Heart } from 'lucide-react'
import { Button } from "../ui/button";
import { ProductDisplayProps } from "@/interfaces";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";

const ProductDisplayCard: React.FC<ProductDisplayProps> = ({ product }) => {
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddCart = () => {
        addToCart({
            product: product,
            quantity: 1
        })
    }

    const IsAdded = () => {
    const cart = useCartStore((state) => state.cart);
    return cart.some(item => item.product.id === product.id);
}
    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-full h-60 group mb-4">
                {product.images && product.images.length > 0 && (
                    <Image width={200} height={200} src={product.images[0]} alt={product.name} className="w-full h-60 object-cover  rounded" />
                )}
                <div className="absolute inset-0 bg-transparent lg:opacity-0 group-hover:opacity-100  transition-opacity duration-300 flex flex-col justify-between rounded p-4">
                    <div className='w-full flex justify-end'>
                        <Button variant='default' className='rounded-full'><Heart/></Button>
                    </div>
                    <div className="flex justify-center gap-4">
                        {IsAdded()? 
                            <Button size="sm" variant="secondary" className='bg-[#E6E6E6] text-[#2C2C2C]'><Check /> Added</Button>
                            :
                            <Button size="sm" variant="secondary" className='bg-[#E6E6E6] text-[#2C2C2C]' onClick={handleAddCart}><ShoppingCart /> Add</Button>
                        }
                        
                        <Button size="sm" variant="secondary" className='bg-[#E6E6E6] text-[#2C2C2C]'>Overview</Button>
                        {/* Add more buttons as needed */}
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-2">RF {product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{product.category}{product.subCategory ? ` > ${product.subCategory}` : ""}</p>

        </div>
    )
}

export default ProductDisplayCard;