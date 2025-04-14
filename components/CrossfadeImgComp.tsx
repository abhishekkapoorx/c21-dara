'use client'
import React, { useState, useEffect } from "react"
import ImageCrossFade from "./CrossfadeImage"
import wait from "waait"

export default function BackgroundImage({images}: {images: string[]}) {

  const [image, setImage] = useState<number>(0)

  useEffect(() => {
    wait(4000).then(() => {
      setImage((image + 1) % images.length)
    })
  }, [image])

  return (
    <ImageCrossFade
      imgUrl={images[image]} width={1728} height={864}
    />
  )
}