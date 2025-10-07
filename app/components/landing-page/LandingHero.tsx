'use client';
 import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
 
export default function HeroSection(){
 const router = useRouter();

  const GoToNew = () => {
    router.push('/products?filter=new')
  }

  const GoToShop = () => {
    router.push('/products')
  }
  return (
      <div
        className="relative w-full text-[#FFFFFF] lg:h-[630px] md:h-[500px] h-[400px] bg-cover bg-center flex items-center justify-center lg:justify-start p-6"
        style={{
          backgroundImage:
            "url(https://www.tradegully.com/wp-content/uploads/2024/04/modern-living-room-furniture.jpg)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white opacity-20"></div>
        {/* Content goes here */}
        <div className="relative z-2 text-center lg:text-left text-black p-4">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold sour-gummy">
            CRAFT YOUR PERFECT SPACE
          </h1>
          <p className="lg:text-4xl md:text-2xl text-xl sour-gummy my-8 lg:w-1/2">
            Discover beautifully designed, sustainable furniture that transforms your house into a home.
          </p>
          {/* buttons */}
          <div className="md:flex space-x-6 hidden justify-center lg:justify-start">
            <Button variant="secondary" size="lg" className="p-6" onClick={GoToNew}>Shop Our New Arrivals</Button>
            <Button variant="default" size="lg" className="p-6 bg-[#2C2C2C] text-[#F5F5F5] hover:bg-[#1A1A1A]" onClick={GoToShop}>Explore Our Collections</Button>
          </div>
          <div className="md:hidden space-x-6 flex justify-center">
            <Button variant="secondary" size="lg" className="p-6" onClick={GoToNew}>New Arrivals</Button>
            <Button variant="default" size="lg" className="p-6 bg-[#2C2C2C] text-[#F5F5F5] hover:bg-[#1A1A1A]" onClick={GoToShop}>Collections</Button>
          </div>
        </div>
      </div>
      )

}