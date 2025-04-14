"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Button, Input } from '@heroui/react';

const ContentCarousel = () => {
  const images = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpg",
    "/images/6.jpg",
    "/images/7.jpeg",
    "/images/8.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollY } = useScroll();
  // Enhanced parallax effect - image moves slower than container when scrolling
  // const y1 = useTransform(scrollY, [0, 1000], [0, -300]);
  // const y2 = useTransform(scrollY, [0, 1000], [0, 500]);

  // Auto advance the slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);


  return (
      <div className="relative w-full h-[85vh] overflow-hidden bg-bottom">
        {/* Slideshow with crossfade effect */}
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          // style={{ y: y1, scale: 1.2 }}
          >

            <Image
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              fill
              style={{ objectFit: "cover", backgroundPosition: "bottom" }}
              className=' w-full'
              priority
            />
          </motion.div>
        </AnimatePresence>

        <motion.div className='absolute bottom-0 left-0 w-full'>
          <div className="bg-white dark:bg-black/10 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  rounded-t-2xl flex flex-col items-center justify-center px-8 py-8 gap-4 shadow-lg">
            <div className='w-full flex items-center justify-center gap-4'>
              <h2 className='text-xl md:text-3xl my-4 dark:text-white text-zinc-800 font-semibold text-center'>Find Your Dream Home</h2>
            </div>
            <div className="flex flex-col md:flex-row  w-full gap-4 items-center justify-between">

              <Input color='default' variant='faded' label="Location" placeholder="Enter Location, Property Type, MLS to Search" type="location" />
              <Button variant="solid" color='warning' className='w-full md:w-fit' onPress={() => { }}>Search</Button>
            </div>
          </div>

        </motion.div>
      </div>

  );
};

export default ContentCarousel;