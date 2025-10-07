import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";
import Image from "next/image";
import { ModalProps } from "@/interfaces";
export default function BlogPostModal({ post, open, onClose }: ModalProps) {
  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl md:max-w-4xl lg:max-w-5xl p-0 overflow-hidden rounded-2xl">
        {/* Header Section */}
        <DialogHeader className="p-6 bg-[#F5F5F5] border-b">
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            {post.title}
          </DialogTitle>
          <DialogDescription className="flex items-center justify-between text-sm text-gray-500 mt-2">
            <span>{post.category}</span>
            <span>{post.date}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto">

       
        {/* Image */}
        <div className="relative w-full h-[250px] md:h-[350px]">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-gray-700 leading-relaxed">
          {/* Short intro (optional) */}
          {post.brief && (
            <p className="text-lg font-medium text-gray-900">{post.brief}</p>
          )}

          {/* Full content */}
          <article className="prose prose-black max-w-none">
            {post.content.split("\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </article>
        </div>
         </div>
      </DialogContent>
    </Dialog>
  );
}
