import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-4">
      <h1 className="text-2xl">Welcome to WoodCrest Designs</h1>
      <p>Nothing to see here yet!</p>
      <p>Are you an admin? click <Link href='/admin/dashboard'>here</Link></p>
    </div>
  );
}
