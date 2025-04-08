"use client"
import { IconBrandBooking, IconBrandFacebookFilled, IconBrandInstagram, IconBrandWhatsappFilled } from '@tabler/icons-react'
import IconComp from './IconComp'

const FloatingIcons = () => {
    return (
        <div className="fixed w-fit bottom-0 left-1/2 md:top-1/2 md:bottom-auto md:left-auto md:right-0 -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 z-50 flex flex-row md:flex-col items-center justify-center gap-2 p-2">
            <IconComp href="https://wa.me/14155238886" Icon={IconBrandWhatsappFilled} />
            <IconComp href="https://instagram.com" Icon={IconBrandInstagram} />
            <IconComp href="https://facebook.com" Icon={IconBrandFacebookFilled} />
            <IconComp href="https://booking.com" Icon={IconBrandBooking} />
        </div>
    )
}

export default FloatingIcons