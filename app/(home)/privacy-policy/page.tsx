import { Heading } from '@/components/TextComps'
import React from 'react'

const page = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full p-4">
            <Heading title='Privacy Policy' />
            
            <div className="flex flex-col gap-8 w-full px-4">
                <p className="text-amber-500 font-light">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
                
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium border-b border-amber-200 pb-2">
                        Information We Collect
                    </h2>
                    <p className="text-gray-300">
                        We collect information that you provide directly to us, including:
                    </p>
                    <ul className="list-none pl-0 space-y-2">
                        <li className="flex items-baseline gap-2">
                            <span className="inline-block w-2 h-2 bg-amber-400"></span>
                            <span>Name and contact information</span>
                        </li>
                        <li className="flex items-baseline gap-2">
                            <span className="inline-block w-2 h-2 bg-amber-400"></span>
                            <span>Email address</span>
                        </li>
                        <li className="flex items-baseline gap-2">
                            <span className="inline-block w-2 h-2 bg-amber-400"></span>
                            <span>Phone number</span>
                        </li>
                        <li className="flex items-baseline gap-2">
                            <span className="inline-block w-2 h-2 bg-amber-400"></span>
                            <span>Communication preferences</span>
                        </li>
                    </ul>
                </section>
                
                <section className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium border-b border-amber-200 pb-2">
                        How We Use Your Information
                    </h2>
                    <p className="text-gray-300">
                        We use the information we collect to:
                    </p>
                    <ul className="list-none pl-0 space-y-2">
                        <li className="flex items-baseline gap-2">
                            <span className="inline-block w-2 h-2 bg-amber-400"></span>
                            <span>Provide real estate services and information</span>
                        </li>
                        <li className="flex items-baseline gap-2">
                            <span className="inline-block w-2 h-2 bg-amber-400"></span>
                            <span>Send newsletters and updates</span>
                        </li>
                        <li className="flex items-baseline gap-2">
                            <span className="inline-block w-2 h-2 bg-amber-400"></span>
                            <span>Respond to your inquiries</span>
                        </li>
                        <li className="flex items-baseline gap-2">
                            <span className="inline-block w-2 h-2 bg-amber-400"></span>
                            <span>Improve our services</span>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default page