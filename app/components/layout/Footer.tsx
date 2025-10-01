'use client';

import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { RiTwitterXFill } from "react-icons/ri";
import { FiInstagram } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { useState } from 'react';
import Link from 'next/link';
export default function Footer() {
    const [email, setEmail] = useState('');
    return (
        <footer className="bg-[#EEEEEE] quattrocento-regular">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h1 className="md:text-2xl text-xl font-semibold text-[#905D06]">WoodCrest Designs</h1>
                        <p className="text-muted-foreground">
                            Your trusted partner for modern, quality furniture that transforms spaces into beautiful homes.
                        </p>
                        <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                                <FaFacebookF className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <FiInstagram className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <RiTwitterXFill className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">Quick Links</h4>
                        <div className="space-y-2">
                            <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">Our Story</Link>
                            <Link href="/blog" className="block text-muted-foreground hover:text-primary transition-colors">Blogs</Link>
                            <Link href="/products" className="block text-muted-foreground hover:text-primary transition-colors">Products</Link>
                            <Link href="/register" className="block text-muted-foreground hover:text-primary transition-colors">Register</Link>

                        </div>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">Customer Service</h4>
                        <div className="space-y-2">
                            <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
                            <Link href="/info" className="block text-muted-foreground hover:text-primary transition-colors">Shipping Info</Link>
                            <Link href="/info" className="block text-muted-foreground hover:text-primary transition-colors">Returns</Link>
                            <Link href="/info" className="block text-muted-foreground hover:text-primary transition-colors">Size Guide</Link>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">Stay Updated</h4>
                        <p className="text-muted-foreground text-sm">
                            Subscribe to get the latest offers and updates.
                        </p>
                        <form className="flex space-x-2">
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1"
                                required
                            />
                            <Button type='submit'>Subscribe</Button>

                        </form>
                    </div>
                </div>

                <Separator className="my-8" />

                {/* Contact Info & Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <Link href="mailto:isy@woodcrestdesigns.com">isy@woodcrestdesigns.com</Link>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>+250 784 051 620</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <Link href="https://www.google.com/maps?q=Kg+686+st+#3+Rwanda"
                                target="_blank"
                                rel="noopener noreferrer">Kg 686, st #3, Rwanda</Link>
                        </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        © 2025 Woodcrestdesigns. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}