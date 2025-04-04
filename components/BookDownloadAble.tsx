"use client"
import { Button, useDisclosure } from '@heroui/react';
import Link from 'next/link';
import React from 'react'
import ModalComp from './BookDownloadModal';

interface Book {
    title: string;
    description: string;
    format: string;
    size: string;
    url: string;
}

interface BookDownloadAbleProps {
    book: Book;
    index: number;
}

function BookDownloadAble({ book, index }: BookDownloadAbleProps) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <div className="border border-black transition-colors">
            <ModalComp isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} bookHref={book.url} />
            <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{book.description}</p>
                <div className="flex justify-between items-center mt-auto">
                    <div className="text-sm">
                        <span className="text-gray-500">{book.format}</span>
                        <span className="mx-2">•</span>
                        <span className="text-gray-500">{book.size}</span>
                    </div>
                    <Button color="warning" onPress={onOpen} className='flex items-center justify-center bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors'>
                        Download
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default BookDownloadAble