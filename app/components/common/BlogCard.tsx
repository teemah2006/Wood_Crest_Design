import { useState } from "react";
import Image from "next/image";
import BlogPostModal from "./BlogModal";
import { BlogCardProps } from "@/interfaces";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
export default function BlogCard({post}: BlogCardProps){
    const [open, setOpen] = useState(false);

    return(
        <div className="bg-white w-full lg:h-[413px]">
                <Image src={post.featuredImage} alt={post.title} width={200} height={200} className="w-full h-[40%] object-cover" />
                <div className="flex flex-col justify-between h-[60%] ">
                  <p className="capitalize text-left p-4 md:text-lg text-md font-semibold">{post.title}</p>
                  <p className=" px-4 mb-4">
                    {post.brief}
                  </p>
                  <div className="flex-end flex justify-between items-center">
                    <p className="p-4 text-sm text-[#757575] ">
                      Posted on {post.date}
                    </p>
                    <Button variant="link" className="transition-all duration-300 group flex gap-2 " 
                    onClick={()=>setOpen(true)}>Read more <ArrowRight className="hidden group-hover:block transition-hover duration-200" /></Button>
                  </div>
                </div>
                {/* Modal */}
                <BlogPostModal post={post} open={open} onClose={setOpen} />
              </div>
    )
}