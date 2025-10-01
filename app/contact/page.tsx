'use client';
import React, { useEffect } from "react";
import { useForm, ValidationError } from '@formspree/react';
import { toast } from "react-toastify";
import { Input } from "../components/ui/input";
import { Textarea } from "@/app/components/ui/textarea"
import { Button } from "@/app/components/ui/button"
import { Send, Mail, Phone } from 'lucide-react'
import Link from "next/link";
const Contact: React.FC = () => {
  const [state, handleSubmit] = useForm("mzzjgbrv");
  useEffect(() => {
    if (state.succeeded) {
      toast.success("Message sent successfully!");
    }
  }, [state.succeeded]);
  return (
    <div className="container mx-auto w-full min-h-screen  flex flex-col justify-between py-8 mb-8 items-center">
      <div className="flex mb-6 lg:mb-10 w-full justify-between items-center  flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
        <div>
          <h3 className="text-base text-[#9C9B9B] text-center lg:text-left">CONTACT US</h3>
          <p className="text-[#E5A000] lg:text-5xl text-3xl text-center lg:text-left  leading-relaxed">
            Need something else?
            <br />
            Let&apos;s hear it!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="lg:w-1/2 w-full p-4 lg:p-0">
          <div className="mb-4">
            <label htmlFor="name">
              Name
            </label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Your Full Name"
              required
            />
            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="name@example.com"
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message">
              Message
            </label>
            <Textarea
              placeholder="Your Message"
              id="message"
              name="message"
              className="h-32"
              required
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />

          </div>

          <Button type="submit" size="lg" variant='default' disabled={state.submitting} className="float-right cursor-pointer">
            Submit <Send />
          </Button>
        </form>
      </div>

      <div className="flex w-full mt-8 lg:mt-16 flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
        <div className="flex flex-col items-center space-y-4">
          <Mail className="lg:w-60 lg:h-56 md:w-52 md:h-48 w-44 h-40" />
          <Link href="mailto:isy@woodcrestdesigns.com" target="_blank" className="text-[#E5A000] text-xl md:text-2xl lg:text-3xl">isy@woodcrestdesigns.com</Link>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <Phone className="lg:w-60 lg:h-56 md:w-52 md:h-48 w-44 h-40" />
          <Link href="tel:+254701234567" target="_blank" className="text-[#E5A000] text-xl md:text-2xl lg:text-3xl">+254 701 234 567</Link>
        </div>
        <div className="flex flex-col items-center  space-y-4">
          <div className="lg:w-60 lg:h-56 md:w-52 md:h-48 w-44 h-40 rounded-lg overflow-hidden shadow-md">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3987.5295496392487!2d30.0736202!3d-1.9408098!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6a2ec2ddf97%3A0xeb0eb3b19baa4c99!2sKG%20686%20St%2C%20Kigali%2C%20Rwanda!5e0!3m2!1sen!2sng!4v1759336591386!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <Link href="https://www.google.com/maps?q=Kg+686+st+#3+Rwanda" target="_blank" className="text-[#E5A000] text-xl md:text-2xl lg:text-3xl">Kg 686, st #3, Rwanda</Link>
          
        </div>

      </div>
    </div>
  );
};

export default Contact;