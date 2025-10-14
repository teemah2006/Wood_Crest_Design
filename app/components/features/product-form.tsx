"use client";

import { useState } from "react";
import { db, storage, auth } from "@/lib/firebase";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { subcategories } from "@/constants";
import Button from "../common/Button";
import { doc, getDoc } from "firebase/firestore";
import { ProductInputProps } from "@/interfaces";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
async function isAdmin(userId: string) {
  const userDoc = await getDoc(doc(db, "users", userId));
  return userDoc.exists() && userDoc.data().role === "admin";
}
import { categories } from "@/constants";



export default function AddProductForm(props: ProductInputProps = {}) {

  // console.log("Current user:", auth.currentUser?.uid);
  const router = useRouter();
  const user = auth.currentUser;
  const [name, setName] = useState(props ? props.name ? props.name : "" : "");
  const [price, setPrice] = useState(props ? props.price ? props.price : "" : "");
  const [category, setCategory] = useState(props ? props.category ? props.category : "" : "");
  const [subCategory, setSubCategory] = useState(props ? props.subCategory ? props.subCategory : "" : "");
  const [images, setImages] = useState<File[] | string[]>(props ? props.images ? props.images : [] : []);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(props ? props.description ? props.description : "" : "");
  const [productId, setProductId] = useState(props ? props.id ? props.id : "" : "");
  const [isSignature, setIsSignature] = useState(props?.isSignature ? props.isSignature : false);
  const publicId = props?.publicId ? props.publicId : uuidv4();
  const reviews = props?.reviews ? props.reviews : []


  // Define categories
  



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || images.length === 0)
      return toast.error("Category and at least one image are required.");

    if (!user) return toast.error("You must be logged in to add or edit products.");

    setLoading(true);
    toast.info("Uploading...");

    try {
      const isUserAdmin = await isAdmin(user.uid);
      if (!isUserAdmin) {
        toast.error("You do not have permission to add or edit products.");
        setLoading(false);
        return;
      }

      const uploadedUrls: string[] = [];

      // Upload new images (if any)
      for (const file of images) {
        // Check if file is already a URL (means it's from existing data)
        if (typeof file === "string") {
          uploadedUrls.push(file);
          continue;
        }

        const fileName = `${uuidv4()}-${file.name}`;
        const storageRef = ref(storage, `products/${category}/${fileName}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        uploadedUrls.push(downloadURL);
      }

      const productData = {
        name,
        price: Number(price),
        description,
        category,
        subCategory,
        images: uploadedUrls,
        isSignature,
        reviews,
        publicId,
        updatedAt: new Date(),
      };

      if (productId) {
        // ✏️ Edit mode — update existing product
        const productRef = doc(db, "products", productId);
        await updateDoc(productRef, productData);
        toast.success("Product updated successfully!");
      } else {
        // ➕ Add mode — create new product
        await addDoc(collection(db, "products"), {
          ...productData,
          createdAt: new Date(),
        });
        toast.success("Product added successfully!");
      }

      // Reset form
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setSubCategory("");
      setImages([]);
      setProductId(""); // Optional

      props.onSuccess?.();
      router.refresh();

    } catch (err) {
      console.error("Error saving product:", err);
      toast.error("Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto my-6 transition-all duration-300">
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <textarea
        placeholder="Product description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full rounded"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.fullname} value={cat.fullname}>
            {cat.name}
          </option>
        ))}
      </select>
      {category && subcategories[category] && (
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="">Select Subcategory</option>
          {subcategories[category].map((subcat: string) => (
            <option key={subcat} value={subcat}>
              {subcat}
            </option>
          ))}
        </select>
      )}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setImages(Array.from(e.target.files || []))}
        className="border p-2 w-full rounded"
      />

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {images.map((img, i) => (
            <Image
              width={100}
              height={100}
              key={i}
              src={typeof img === "string" ? img : URL.createObjectURL(img)}
              alt="Preview"
              className="h-24 w-full object-cover rounded"
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="signature"
          checked={isSignature}
          onChange={(e) => setIsSignature(e.target.checked)}
          className="cursor-pointer"
        />
        <label htmlFor="signature" className="cursor-pointer text-sm font-medium">
          Mark as Signature Product
        </label>
      </div>


      <Button size="medium" shape="rounded-md" type="submit" dis={loading} color="black" text=
        {loading ? "Uploading..." : "Add Product"} />

    </form>
  );
}
