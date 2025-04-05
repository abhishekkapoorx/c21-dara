"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const IconComp = ({ href, Icon }: { href: string, Icon: React.ElementType }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <Link href={href} className={`flex items-center justify-center w-12 h-12 rounded-xl ${!hovered ? 'bg-amber-500' : 'bg-black'} transition-all duration-300 ease-in-out shadow-md hover:-translate-x-2`} onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
            <Icon className={`${hovered ? 'text-amber-500' : 'text-black'} transition-all duration-300 ease-in-out`} />
        </Link>
    )
}

export default IconComp