"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Typed from "typed.js";
const AboutPage: React.FC = () => {
  const router = useRouter();
  const el = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 2500, once: true });
    AOS.refresh();
  }, []);

  useEffect(() => {
    let typed: Typed | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !typed) {
          typed = new Typed(el.current, {
            strings: [
              "Turning natural wood into timeless designs that tell your story.",
            ],
            typeSpeed: 60,
            loop: false,
            showCursor: true,
            cursorChar: "|",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (typed) typed.destroy();
    };
  }, []);

  const GoToShop = () => router.push("/products");

  return (
    <div>
      {/* HERO SECTION */}
      <div
        className="relative w-full text-[#FFFFFF] lg:h-[630px] md:h-[500px] h-[400px] bg-cover bg-center flex items-center justify-center lg:justify-start p-6"
        style={{
          backgroundImage:
            "url(https://www.re-thinkingthefuture.com/wp-content/uploads/2021/08/A5013-Career-Guide-Furniture-Design.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-white opacity-40"></div>

        <div className="relative z-4 text-center lg:text-left text-black p-4">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold">
            ABOUT WOOD CREST DESIGN
          </h1>
          <p className="lg:text-3xl md:text-2xl text-xl my-8 lg:w-2/3">
            Founded by <strong>Mico G. Jamal</strong> and{" "}
            <strong>Yusuf Ibrahim Salihu</strong>, Wood Crest Design was born
            from a shared passion for craftsmanship, innovation, and timeless
            design.
          </p>
          <Button
            variant="default"
            size="lg"
            className="p-6 bg-[#2C2C2C] text-[#F5F5F5] hover:bg-[#1A1A1A]"
            onClick={GoToShop}
          >
            Explore Our Collections
          </Button>
        </div>
      </div>

      {/* OUR STORY SECTION */}
      <section className="py-12 lg:px-24 px-8 md:px-12">
        <div className="border border-[#757575] rounded-lg p-6 flex flex-col md:flex-row gap-8 items-center">
          <div data-aos="fade-right" className="md:w-1/2 w-full">
            <Image
              src="https://media.designcafe.com/wp-content/uploads/2023/07/05120637/modern-furniture-designs.jpg"
              alt="Wood furniture"
              width={500}
              height={400}
              className="w-full rounded-lg"
            />
          </div>

          <div className="text-left md:w-1/2 w-full">
            <p className="text-[#E5A000] mb-4 text-sm lg:text-lg font-semibold">
              OUR STORY
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              Crafting Comfort, Redefining Design
            </h2>
            <p className="text-gray-800 leading-relaxed">
              What started as a small creative studio in Rwanda — blending
              natural wood with modern aesthetics — has evolved into a design
              brand that redefines how people experience furniture and décor.
            </p>
            <p className="mt-4 text-gray-800 leading-relaxed">
              From handcrafted furniture and accent pieces to premium corporate
              giveaways, every Wood Crest creation reflects authentic artistry,
              modern functionality, and deep respect for natural materials. We
              believe great design doesn’t just fill a room — it adds meaning,
              comfort, and character.
            </p>
          </div>
        </div>
      </section>

      {/* TYPED VISION QUOTE */}
      <div
        ref={containerRef}
        className="relative w-full text-[#FFFFFF] lg:h-[400px] md:h-[350px] h-[300px] bg-cover bg-center flex items-center justify-center p-6"
        style={{
          backgroundImage:
            "url(/assets/blog/sustainable-furniture.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-white z-2 text-center w-4/5">
          <span ref={el}></span>
        </h2>
      </div>

      {/* MISSION & VISION SECTION */}
      <section className="py-12 lg:px-24 px-8 md:px-12">
        <div
          className="grid md:grid-cols-2 gap-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="p-6 border border-[#D6D6D6] rounded-lg bg-white shadow-sm">
            <h3 className="text-[#E5A000] mb-2 font-semibold text-lg">
              OUR VISION
            </h3>
            <p className="text-gray-800 italic">
              “To become a leading African design brand that transforms natural
              wood into timeless, sustainable, and globally admired creations.”
            </p>
          </div>

          <div className="p-6 border border-[#D6D6D6] rounded-lg bg-white shadow-sm">
            <h3 className="text-[#E5A000] mb-2 font-semibold text-lg">
              OUR MISSION
            </h3>
            <p className="text-gray-800 italic">
              “To design and craft furniture, décor, and lifestyle pieces that
              blend modern aesthetics with traditional craftsmanship — delivering
              quality, sustainability, and a touch of nature in every detail.”
            </p>
          </div>
        </div>
      </section>

      {/* CORE VALUES SECTION */}
      <section className="py-12 lg:px-24 px-8 md:px-12 bg-[#FAFAFA]">
        <div data-aos="fade-up">
          <h3 className="text-center text-2xl lg:text-3xl font-semibold mb-8">
            Our Core Values
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Craftsmanship",
                desc: "Excellence in every joint, curve, and finish.",
              },
              {
                title: "Innovation",
                desc: "Modern ideas inspired by timeless materials.",
              },
              {
                title: "Sustainability",
                desc: "Responsibly sourced wood, crafted with care for people and planet.",
              },
              {
                title: "Integrity",
                desc: "Honest design, honest materials.",
              },
              {
                title: "Community",
                desc: "Empowering local artisans and celebrating Rwandan creativity.",
              },
            ].map((val, idx) => (
              <div data-aos="flip-left"
                key={idx}
                className="border border-[#D6D6D6] rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
              >
                <h4 className="text-[#E5A000] font-semibold text-lg mb-2">
                  {val.title}
                </h4>
                <p className="text-gray-700">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
