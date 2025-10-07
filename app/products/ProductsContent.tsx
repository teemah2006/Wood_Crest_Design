'use client';
import React, { useState } from "react";
import {
  GalleryHorizontalEnd,
  Sofa,
  Bed,
  Microwave,
  BriefcaseBusiness,
  Tv,
  LampDesk,
  Handbag,
  RockingChair,
  SquareStar,
  Check
} from "lucide-react";
import { Button } from "../components/ui/button";
import ProductList from "../components/features/product-list";
import { filterOptions } from "@/constants";
import { useSearchParams } from 'next/navigation';

const categories = [
  { name: "All", icon: GalleryHorizontalEnd, fullname: "All" },
  { name: "Sofas", icon: Sofa, fullname: "Sofas & seating" },
  { name: "Bedroom", icon: Bed, fullname: "Bedroom Furniture" },
  { name: "Dining/Kitchen", icon: Microwave, fullname: "Dining & Kitchen" },
  { name: "Living Room", icon: Tv, fullname: "Living Room Essentials" },
  { name: "Space-Saving", icon: LampDesk, fullname: "Space-Saving & Multifunctional" },
  { name: "Custom Designs", icon: Handbag, fullname: "Custom & Dope Designs" },
  { name: "Outdoor", icon: RockingChair, fullname: "Outdoor Furniture" },
  { name: "Office", icon: BriefcaseBusiness, fullname: "Office Furniture" },
  { name: "Accessories", icon: SquareStar, fullname: "Accessories & Decor" },
];



const ProductsContent: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState<string>("All");
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const filter = searchParams.get('filter') || '';
  const [sortBy, setSortBy] = useState<'price ascending' | 'price descending' | 'new' | 'name'>(filter? filter as 'price ascending' | 'price descending' | 'new' | 'name' : 'name');


  const CategoryVariant = (category: string) => {
    return currentCategory === category ? "default" : "outline";
  };

  const filterVariant = (filter: string) => {
    return sortBy === filter ? "default" : "secondary";
  }

  const CategoryClass = "flex items-center gap-2 cursor-pointer min-w-max";

  const filterClass = "flex items-center gap-2 cursor-pointer min-w-max md:text-sm text-xs"
  return (
    <div className="overflow-auto w-full">
      {/* hero section */}
      <div
        className="relative w-full text-[#FFFFFF] lg:h-[630px] md:h-[500px] sm:h-[400px] h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://www.tradegully.com/wp-content/uploads/2024/04/modern-living-room-furniture.jpg)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        {/* Content goes here */}
        <div className="relative z-2 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-shadow">
            PRODUCTS
          </h1>
          <p className="lg:text-2xl md:text-xl text-lg">
            Shop from various categories
          </p>
        </div>
      </div>

      {/* categories buttons */}
      <div className="flex flex-nowrap overflow-x-auto w-full justify-start lg:justify-center gap-4 my-8 px-4 scrollbar-thin scrollbar-thumb-gray-300">
        {categories.map(({ name, icon: Icon, fullname }) => (
          <Button
            key={name}
            variant={CategoryVariant(fullname)}
            className={CategoryClass}
            onClick={() => setCurrentCategory(fullname)}
          >
            <Icon size={16} /> {name}
          </Button>
        ))}
      </div>

      {/* filters */}
<div className="flex flex-wrap  w-full justify-end gap-4 my-8 px-4">
        {filterOptions.map(({ label, value }) => (
          <Button
            key={label}
            variant={filterVariant(value)}
            className={filterClass}
            onClick={() => setSortBy(value as 'price ascending' | 'price descending' | 'new' | 'name')}
          >
            {sortBy === value ? <Check size={16} /> : null}
            {label}
          </Button>
        ))}
      </div>
      {/* products grid */}
      <div className="px-4 mb-8">
        <ProductList user="customer" categoryFilter={currentCategory} sortBy={sortBy} query={query}/>
      </div>
    </div>
  );
};

export default ProductsContent;