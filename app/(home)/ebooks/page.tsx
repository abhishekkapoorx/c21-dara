import BookDownloadAble from '@/components/BookDownloadAble'
import { Heading } from '@/components/TextComps'
import { Button } from '@heroui/react'
import React from 'react'

const EbookPage = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full">
            <Heading title='Download Ebooks'/>

            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {[
                        {
                            title: "Home Buying 101",
                            description: "A step-by-step guide for first-time homebuyers",
                            size: "3.2 MB",
                            url: "/ebooks/ebook-1.pdf",
                            format: "PDF"
                        },
                        {
                            title: "Investment Property Strategies",
                            description: "Maximizing returns on residential and commercial investments",
                            size: "2.6 MB",
                            url: "/ebooks/ebook-1.pdf",
                            format: "PDF"
                        },
                    ].map((book, index) => (
                        <BookDownloadAble
                            key={index}
                            book={book}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EbookPage