"use client";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { Button } from "../ui/button";

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty, total, clearCart } = useCartStore();

  if (cart.length === 0) return <p className="text-center py-8 text-gray-500">Your cart is empty 🛍</p>;

  return (
    <div className="space-y-4 p-4">
      {cart.map((item) => (
        <div
          key={item.product.id}
          className="flex flex-col md:flex-row lg:flex-nowrap items-center justify-center lg:justify-between border-b py-4 gap-4"
        >
            <div className="flex gap-4 min-w-0 items-center justify-center w-1/2">
                {/* Product Image */}
          <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
            {item.product.images && item.product.images.length > 0 ? (
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                width={70}
                height={70}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-xs text-gray-400">No Image</span>
            )}
          </div>
          {/* Product Info */}
          <div className="flex-1 w-full md:max-w-[70px]  ml-2">
            <h3 className="font-semibold  truncate w-full">{item.product.name}</h3>
            <p className="text-sm text-gray-500">RF {item.product.price}</p>
          </div>
            </div>
          
          {/* Quantity Controls */}
          <div className="flex  items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => decreaseQty(item.product.id)}
              aria-label="Decrease quantity"
            >
              -
            </Button>
            <span className="px-2">{item.quantity}</span>
            <Button
              size="icon"
              variant="outline"
              onClick={() => increaseQty(item.product.id)}
              aria-label="Increase quantity"
            >
              +
            </Button>
          </div>
          {/* Remove Button */}
          <Button
            size="icon"
            variant="destructive"
            onClick={() => removeFromCart(item.product.id)}
            className="ml-2 text-xl"
            aria-label="Remove from cart"
          >
            ×
          </Button>
        </div>
      ))}
      <div className="flex justify-between items-center mt-6">
        <p className="font-bold text-lg">Total: RF {total()}</p>
        <Button variant="secondary" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
}