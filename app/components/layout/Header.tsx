"use client";
import Link from "next/link"
import { IoMenuOutline } from "react-icons/io5";
import { Button } from "../ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "../ui/navigation-menu"
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { categories } from "@/constants";
import { useRouter } from "next/navigation";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchTerm.trim()) {
                router.push(`/products?query=${encodeURIComponent(searchTerm)}`)
            }
        }, 500)

        return () => clearTimeout(timeout)
    }, [searchTerm, router])

    return (
        <header className="quattrocento-regular bg-white z-10 border-b border-[#D9D9D9] w-full md:h-[96px] h-[80px] flex items-center justify-between md:p-8 p-4 relative">
            {/* Icon button only on mobile */}
            <Button
                variant="ghost"
                size="icon"
                className="size-8 md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Open menu"
            >
                <IoMenuOutline />
            </Button>
            {/* the logo */}
            <h1 className="lg:text-2xl text-xl font-semibold text-[#905D06]">WoodCrest Designs</h1>

            {/* Desktop nav */}
            <NavigationMenu className="hidden md:flex md:flex-row">
                <NavigationMenuList >
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/">Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/about">About Us</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            <Link href='/products'>Products</Link>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="z-20">
                            <ul className="grid w-[200px] gap-4 ">
                                <li>
                                    {
                                        categories.map((category) => (
                                            <NavigationMenuLink asChild key={category.name}>
                                                <Link href={`/products/${category.fullname}`}>{category.name}</Link>
                                            </NavigationMenuLink>
                                        ))
                                    }
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/blog">Blogs</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/contact">Contact Us</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            {/* Mobile nav */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg border-b md:hidden animate-fade-in z-20">
                    <nav>
                        <ul className="flex flex-col gap-2 p-4">
                            <li>
                                <Link href="/" className="block py-2 px-4 rounded hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Home</Link>
                            </li>
                            <li>
                                <Link href="/about" className="block py-2 px-4 rounded hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                            </li>
                            <li>
                                <details>
                                    <summary className="py-2 px-4 rounded cursor-pointer hover:bg-gray-100"><Link href='/products'>Products</Link></summary>
                                    <ul className="pl-4">
                                        {
                                        categories.map((category) => (
                                            <li key={category.name}>
                                                <Link href={`/products/${category.fullname}`}>{category.name}</Link>
                                            </li>
                                        ))
                                    }
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <Link href="/blog" className="block py-2 px-4 rounded hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Blogs</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="block py-2 px-4 rounded hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}

            {/* other nav functions */}
            <div className="flex items-center gap-4">
                {/* desktop search input */}
                <div className="flex-1 max-w-md lg:mx-4 relative hidden md:block">
                    <IoSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        type="text"
                        placeholder="Search furniture..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10 rounded-full border-none bg-[#F5F5F5]  w-full"
                    />
                </div>

                {/* mobile search input */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 md:hidden"
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    aria-label="Search"
                >
                    <IoSearch />
                </Button>
                {isSearchOpen && (
                    <div className="absolute top-full right-0 w-full bg-white shadow-lg border-b md:hidden animate-fade-in z-20 p-4">
                        <div className="relative">
                            <IoSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                                type="text"
                                placeholder="Search furniture..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-10 rounded-full w-full"
                            />
                        </div>
                    </div>
                )}
                <Link href="/favourites" className="">
                    <FaRegHeart className="w-4 h-4 lg:w-6 lg:h-6 cursor-pointer" />
                </Link>
                <Link href="/account" className="">
                    <FiUser className="w-4 h-4 lg:w-6 lg:h-6 cursor-pointer" />
                </Link>

            </div>
        </header>
    )
}