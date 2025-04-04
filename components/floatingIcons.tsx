"use client"
import { IconBrandBooking, IconBrandFacebookFilled, IconBrandInstagram, IconBrandWhatsappFilled } from '@tabler/icons-react'
import IconComp from './IconComp'

const FloatingIcons = () => {
    return (
        <div className="fixed top-1/2 -translate-y-1/2 right-0 z-50 flex flex-col items-center justify-center gap-2 p-4">
            <IconComp href="https://wa.me/14155238886" Icon={IconBrandWhatsappFilled} />
            <IconComp href="https://instagram.com" Icon={IconBrandInstagram} />
            <IconComp href="https://facebook.com" Icon={IconBrandFacebookFilled} />
            <IconComp href="https://booking.com" Icon={IconBrandBooking} />
        </div>
    )
}

export default FloatingIcons