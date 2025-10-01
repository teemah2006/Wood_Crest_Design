"use client";
import { ProductCardProps } from "@/interfaces";
import Button from "./Button";
import { useState } from "react";
import AddProductForm from "../features/product-form";
import Image from "next/image";
const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onEditSuccess }) => {
    const [isediting, setIsEditing] = useState(false);

    if (isediting) {
        return (
            <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300">
                <AddProductForm
                    {...product}
                    onSuccess={() => {
                        setIsEditing(false);
                        onEditSuccess?.(); // Call parent refresh if provided
                    }}
                />
                <div className="mt-4 flex justify-end">
                    <Button size="small" shape="rounded-md" type="button" color="gray" text="Cancel" onClick={() => setIsEditing(false)} />
                </div>
            </div>
        );
    }
    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300">
            {product.images && product.images.length > 0 && (
                <Image width={200} height={200} src={product.images[0]} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
            )}
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-2">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-sm text-gray-500">Category: {product.category}{product.subCategory ? ` > ${product.subCategory}` : ""}</p>

            <div className="mt-4 flex justify-between">
                <Button size="small" shape="rounded-md" type="button" color="gray" text="Edit" onClick={() => setIsEditing(true)} />
                <Button size="small" shape="rounded-md" type="button" color="black" text="Delete" onClick={() => onDelete(product.id)} />
            </div>

        </div>
    );
}

export default ProductCard;