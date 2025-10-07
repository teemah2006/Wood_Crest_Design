'use client';

import React, { useState, useMemo } from "react";
import blogs from "@/data/blogs.json";
import Image from "next/image";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import BlogCard from "../components/common/BlogCard";
const Blog: React.FC = () => {
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  

  const categories = useMemo(() => {
    const category: string[] = [];
    if (blogs) {
      for (const blog of blogs) {
        if (category.includes(blog.category)) {
          continue
        }
        category.push(blog.category)
      }
    }
    return category
  }, []);


  const filteredBlogs = useMemo(() => {
    let filtered = blogs.slice(1);
    if (checkedCategories && checkedCategories.length > 0) {
      filtered = filtered.filter(blog =>
        blog.category !== undefined && checkedCategories.includes(blog.category)
      );
    }

    return filtered;
  }, [ checkedCategories])

  return (
    <div className="bg-[#F5F5F5] w-full flex flex-col justify-center items-center">
      <div className="bg-white p-8 lg:p-12 md:flex m-4 items-center lg:space-x-8 space-x-6 hidden lg:w-[80%] w-[60%] h-[500px]">
        <Image src={blogs[0].featuredImage} alt={blogs[0].title} width={300} height={300} className="w-1/2 h-full object-cover" />
        <div className="w-1/2">
          <h2 className="font-semibold text-xl lg:text-2xl text-left mb-4">{blogs[0].title}</h2>
          <p className="lg:text-lg text-sm text-[#757575]">
            Posted on {blogs[0].date} by WoodCrest Designs
          </p>
          <p className="mt-4">
            {blogs[0].content}
          </p>
        </div>
      </div>
      <div className="md:flex lg:gap-4 md:gap-2 items-start justify-center p-4 my-8">
        <div className="p-4 w-1/5 hidden md:flex flex-col min-h-[500px]  bg-white border rounded-md border-[#D9D9D9]">
          <p className="text-sm text-[#757575] my-4">
            Blogs
          </p>
          <p className="font-semibold">Categories</p>
          <div className=" my-4">
            {
              categories.map((cat) => (
                <div className="flex items-center gap-3 my-6" key={cat}>
                  <Checkbox id={cat}
                    checked={checkedCategories.includes(cat)}
                    onCheckedChange={(checked) => {
                      setCheckedCategories((prev) =>
                        checked
                          ? [...prev, cat]
                          : prev.filter((item) => item !== cat)
                      );
                    }} />
                  <Label htmlFor={cat}>{cat}</Label>
                </div>
              ))
            }

          </div>

        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            filteredBlogs.map((blog, index) => (
              <BlogCard post={blog} key={index}/>
            ))
          }

        </div>
      </div>
      <div
        className="relative w-full text-[#FFFFFF] lg:h-[500px] md:h-[400px] h-[300px] bg-cover bg-center flex items-center justify-center p-6"
        style={{
          backgroundImage:
            `url(${blogs[5].featuredImage})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <h2 className="text-2xl md:text-3xl lg:text-5xl text-white z-2">Turn your house into a home with the right furniture</h2>
      </div>

    </div>
  );
};

export default Blog;