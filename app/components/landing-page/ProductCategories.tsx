"use client";
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useState } from "react";
import Image from "next/image";
import ColorThief from "color-thief-browser";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/app/components/ui/carousel";
import { categories } from "@/constants";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
export default function ProductsCategories() {
    const router = useRouter();
    const [colors, setColors] = useState<Record<string, string>>({});

    useEffect(() => {
        const extractColors = async () => {
            const colorThief = new ColorThief();
            const newColors: Record<string, string> = {};

            for (const category of categories) {
                try {
                    const proxiedUrl = `/api/proxy?url=${encodeURIComponent(category.imageUrl)}`;

                    const img = document.createElement("img");
                    img.crossOrigin = "anonymous";
                    img.src = proxiedUrl;

                    await new Promise<void>((resolve, reject) => {
                        img.onload = () => {
                            try {
                                const [r, g, b] = colorThief.getColor(img);
                                newColors[category.name] = `rgb(${r}, ${g}, ${b})`;
                                resolve();
                            } catch (err) {
                                reject(err);
                            }
                        };
                        img.onerror = reject;
                    });
                } catch (error) {
                    console.error("Error extracting color:", error);
                }
            }
            console.log(newColors);
            setColors(newColors);
        };

        extractColors();
    }, []);

    return (
        <div className="w-full p-4 my-4">
            {/* Heading*/}
            <div className="w-full text-center flex justify-center items-center mb-6">
                <div>
                    <h2 className="font-semibold text-xl lg:text-2xl">Our Products</h2>
                    <p className="lg:text-lg text-sm text-[#757575]">
                        Shop from various categories
                    </p>
                </div>
            </div>

            <Carousel opts={{ align: "start" }} className="w-full"
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
            >

                <CarouselContent className="-ml-1">
                    {categories.map((category) => (
                        <CarouselItem
                            key={category.name}
                            className="md:basis-1/3 lg:basis-1/4 pl-0"
                        >
                            <div
                                className="w-full h-[700px] p-4 flex flex-col space-y-4 items-center justify-evenly transition-all duration-500"
                                style={{
                                    backgroundColor: colors[category.name] || "#e5e5e5",
                                }}
                            >
                                <Image
                                    src={category.imageUrl}
                                    alt={category.name}
                                    width={300}
                                    height={700}
                                    className="object-cover w-auto h-[60%]"
                                />

                                <div className="w-full text-center">
                                    <p className="capitalize text-xl md:text-2xl lg:text-3xl">{category.fullname}</p>
                                </div>

                                <Button variant="default" size="lg" className="p-6 bg-[#2C2C2C] text-[#F5F5F5] hover:bg-[#1A1A1A]" onClick={() =>
                                    router.push(`/products/${category.fullname}`)
                                }>View All</Button>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious variant="ghost" size="lg" className="absolute -top-12 lg:left-96 md:left-64 left-11" />
                <CarouselNext variant="ghost" size="lg" className="absolute -top-12 lg:right-96 md:right-64 right-11" />
            </Carousel>
        </div>
    );
}
