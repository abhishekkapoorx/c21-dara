import BookDownloadAble from '@/components/BookDownloadAble'
import { Heading } from '@/components/TextComps'
import { Button } from '@heroui/react'
import React from 'react'

const EbookPage = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full p-4">
            <Heading title='Download Ebooks'/>

            <div className="w-full">
                <div className="grid grid-cols-1 gap-6 mt-8">
                    {[
                        {
                            title: "Home Buying 101",
                            description: "A step-by-step guide for first-time home buyers.",
                            size: "3.2 MB",
                            url: "/ebooks/ebook-1.pdf",
                            format: "PDF"
                        },
                        {
                            title: "Home Selling 101",
                            description: "A step-by-step guide for first-time home sellers.",
                            size: "3.2 MB",
                            url: "/ebooks/ebook-1.pdf",
                            format: "PDF"
                        },
                        {
                            title: "Home Owning 101",
                            description: "A step-by-step guide for first-time home owners.",
                            size: "3.2 MB",
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