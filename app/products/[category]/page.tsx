'use client'
import React, { useState } from "react";
import ProductList from "@/app/components/features/product-list";
import { use } from "react";
import { categories, subcategories } from "@/constants";
import { CategoryPageProps } from "@/interfaces";
import { filterOptions } from "@/constants";
import { Button } from "@/app/components/ui/button";
import { Check } from "lucide-react";
import { Checkbox } from "@/app/components/ui/checkbox"
import { Label } from "@/app/components/ui/label";
import RangeSlider from 'react-range-slider-input';
// import 'react-range-slider-input/dist/style.css';

export default function CategoryPage({ params }: { params: Promise<CategoryPageProps> }) {
  const { category } = use(params);
  const [sortBy, setSortBy] = useState<'price ascending' | 'price descending' | 'new' | 'name'>('name');
  const [checkedSubCategories, setcheckedSubCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);

  const handleRangeChange = (value: number[]) => {
  setPriceRange(value);
};

  const filterVariant = (filter: string) => {
    return sortBy === filter ? "default" : "secondary";
  }
  const filterClass = "flex items-center gap-2 cursor-pointer min-w-max md:text-sm text-xs";

  const decodedCategory = decodeURIComponent(category);

  const categoryItem = categories.filter((item) => item.fullname === decodedCategory)[0];
  const imageUrl = categoryItem.imageUrl

  return (
    <div className="w-full">
      {/* hero section */}
      <div
        className="relative w-full text-[#FFFFFF] lg:h-[630px] md:h-[500px] sm:h-[400px] h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            `url(${imageUrl})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        {/* Content goes here */}
        <div className="relative z-2 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-shadow uppercase break-words">
            {decodedCategory}
          </h1>
        </div>
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

      {/* products */}
      <div className="md:flex lg:gap-4 md:gap-2 items-start justify-center px-4 mb-8">
        <div className="p-4 w-1/5 hidden md:flex flex-col min-h-[500px]  bg-white border rounded-md border-[#D9D9D9]">
          <p className="font-semibold">Collections</p>
          <div className="flex flex-col gap-6 my-4">
          {
            subcategories[decodedCategory].map((sub) => (
              <div className="flex items-center gap-3" key={sub}>
        <Checkbox id={sub}
        checked={checkedSubCategories.includes(sub.toLocaleLowerCase())}
         onCheckedChange={(checked) => {
                  setcheckedSubCategories((prev) =>
                    checked
                      ? [...prev, sub.toLocaleLowerCase()]
                      : prev.filter((item) => item !== sub.toLocaleLowerCase())
                  );
                }}/>
                <Label htmlFor={sub}>{sub}</Label>
              </div>
            ))
          }

          </div>
          <div className="mt-12 w-full flex-end">
          <div className="font-semibold flex justify-between w-full mb-4">
            <p>Price range</p>
            <p>RF 0-10000</p>
          </div>
          <div className="w-full custom-range-slider">
          <RangeSlider 
          min={0} 
          max={10000} 
          step={5} 
          value={[priceRange[0],priceRange[1]]}
          onInput={handleRangeChange}
          />
          </div>
          </div>
          
        </div>
        <div className="w-full">
          <ProductList user="customer" categoryFilter={decodedCategory} sortBy={sortBy} subCategoryFilter={checkedSubCategories} priceRange={priceRange}/>
        </div>
      </div>


    </div>

  )
}