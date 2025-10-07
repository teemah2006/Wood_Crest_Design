import blogs from "@/data/blogs.json"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
export default function BlogSection(){
    return(
        <div className="bg-[#D9D9D9]  h-auto p-4">
            <h2 className="font-semibold text-xl lg:text-2xl text-center my-6">Furniture Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-12">
            {
                blogs.slice(0,4).map((blog, index) => (
                    <div className="bg-[#EEEDED]  w-full h-[342px]" key={index}>
                        <Image src={blog.featuredImage} alt={blog.title} width={200} height={200} className="w-full h-[70%]"/>
                        <p className="capitalize text-center p-4 md:text-xl text-lg">{blog.title}</p>
                    </div>
                ))
            }
            </div>

            <div className="flex items-center justify-center my-6">
            <Link href={`/blog`} className="bg-[#2C2C2C] py-2 px-6 rounded-sm flex gap-2 items-center text-white">More <ArrowRight className="w-[15px] h-[15px]"/></Link>
            </div>
        </div>
    )
}