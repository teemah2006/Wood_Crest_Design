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
import { useState } from "react";
import { Input } from "../ui/input";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
        <header className="quattrocento-regular bg-white z-10 border-b border-[#D9D9D9] w-full md:h-[96px] h-[80px] flex items-center justify-between md:p-8 p-6 relative">
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
            <h1 className="md:text-2xl text-xl font-semibold text-[#905D06]">WoodCrest Designs</h1>

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
                        <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-4">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <Link href="/products/Sofas & Seating">Sofas & Seating</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/products/Bedroom Furniture">Bedroom Furniture</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/products/Dining Kitchen">Dining & Kitchen</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/products/Office Furniture">Office Furniture</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/products/Living Room">Living Room</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/products/Outdoor Furniture">Outdoor Furniture</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/products/Space-Saving & Multifunctional">Space-Saving & Multifunctional</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/products/Custom & Dope Designs">Custom & Dope Designs</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/products/Accessories & Decor">Accessories & Decor</Link>
                                    </NavigationMenuLink>
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
                                    <summary className="py-2 px-4 rounded cursor-pointer hover:bg-gray-100">Products</summary>
                                    <ul className="pl-4">
                                        <li>
                                            <Link href="/products/Sofas & Seating" className="block py-1 px-2 rounded hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Sofas & Seating</Link>
                                        </li>
                                        <li>
                                            <Link href="/products/Bedroom Furniture" className="block py-1 px-2 rounded hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Bedroom Furniture</Link>
                                        </li>
                                        <li>
                                            <Link href="/products/Dining Kitchen" className="block py-1 px-2 rounded hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Dining & Kitchen</Link>
                                        </li>
                                        <li>
                                            <Link href="/products/Office Furniture" className="block py-1 px-2 rounded hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Office Furniture</Link>
                                        </li>
                                        <li>
                                            <Link href="/products/Living Room" className="block py-1 px-2 rounded hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Living Room</Link>
                                        </li>
                                        <li>
                                            <Link href="/products/Outdoor Furniture" className="block py-1 px-2 rounded hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Outdoor Furniture</Link>
                                        </li>
                                        <li>
                                            <Link href="/products/Space-Saving & Multifunctional" className="block py-1 px-2 rounded hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Space-Saving & Multifunctional</Link>
                                        </li>
                                        <li>
                                            <Link href="/products/Custom & Dope Designs" className="block py-1 px-2 rounded hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Custom & Dope Designs</Link>
                                        </li>
                                        <li>
                                            <Link href="/products/Accessories & Decor" className="block py-1 px-2 rounded hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Accessories & Decor</Link>
                                        </li>
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
                <div className="flex-1 max-w-md mx-4 relative hidden md:block">
                    <IoSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        type="text"
                        placeholder="Search furniture..."
                        // value={searchQuery}
                        // onChange={(e) => onSearchChange(e.target.value)}
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
                                // value={searchQuery}
                                // onChange={(e) => onSearchChange(e.target.value)}
                                className="pr-10 rounded-full w-full"
                            />
                        </div>
                    </div>
                )}
                <Link href="/favourites" className="">
                    <FaRegHeart className="w-4 h-4 md:w-6 md:h-6 cursor-pointer" />
                </Link>
                <Link href="/account" className="">
                    <FiUser className="w-4 h-4 md:w-6 md:h-6 cursor-pointer" />
                </Link>

            </div>
        </header>
    )
}