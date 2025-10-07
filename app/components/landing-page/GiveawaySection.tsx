import { Button } from "../ui/button"
import customBags from "@/public/assets/customs.png"
import Image from "next/image"
export default function GiveawaySection() {
    return (
        <div className="w-full p-4">
            <h2 className="font-semibold text-xl lg:text-2xl hidden md:block text-center">Looking for memorable corporate giveaways?</h2>
            <h2 className="font-semibold text-xl lg:text-2xl block md:hidden text-center">Corporate Giveaways</h2>
            <div className="flex my-6 lg:mb-10 w-full justify-evenly  items-center  flex-col md:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                <div className="md:w-1/2">
                    <p className="text-[#E5A000] lg:text-5xl md:text-3xl text-xl text-center md:text-left  leading-normal">
                        Contact us today to customize your branded wooden design bags.
                    </p>
                    <div className="md:flex space-x-6 hidden justify-center md:justify-start my-6">
                        <Button variant="secondary" size="lg" className="p-6" >View Collections</Button>
                        <Button variant="default" size="lg" className="p-6 bg-[#2C2C2C] text-[#F5F5F5] hover:bg-[#1A1A1A]" >Request a Quote</Button>
                    </div>
                </div>
                <div className="md:w-1/2 md:-mr-16 lg:-mr-24">
                    <Image src={customBags} alt="custom bags" width={300} height={300} className="w-full h-full object-cover"/>
                </div>
                <div className="md:hidden space-y-4 flex flex-col justify-center mb-6">
                        <Button variant="secondary" size="lg" className="p-6" >View Collections</Button>
                        <Button variant="default" size="lg" className="p-6 bg-[#2C2C2C] text-[#F5F5F5] hover:bg-[#1A1A1A]" >Request a Quote</Button>
                    </div>
            </div>

        </div>
    )
}