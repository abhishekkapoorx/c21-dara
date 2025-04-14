import React, { useEffect, useState } from "react"
import Image from "next/image"
import wait from "waait"

interface ImageCrossFadeProps {
  imgUrl: string;
  width: number;
  height: number;
}

const ImageCrossFade = ({ imgUrl, width, height, }: ImageCrossFadeProps) => {
  const [fadeIn, setFadeIn] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [loadedImage, setLoadedImage] = useState<string>(imgUrl)

  useEffect(() => {
    setLoaded(false)
    setFadeIn(true)
  }, [imgUrl])

  return (
    <div className="absolute top-0 left-0 w-full bg-black bg-center bg-cover">
      {fadeIn && (
        <Image
          onLoadingComplete={() => {
            setLoaded(true)
            wait(1100).then(() => {
              setLoadedImage(imgUrl)
            })
          }}
          alt=""
          src={imgUrl}
          priority
          width={width}
          height={height}
          className={`w-full absolute top-0 left-0 z-10 transition-opacity bg-center bg-cover duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      )}
      {
        loadedImage && (<Image
          onLoadingComplete={() => {
            setFadeIn(false)
          }}
          alt=""
          src={loadedImage}
          priority
          width={width}
          height={height}
          className={`w-full bg-center bg-cover`}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />)
      }
      <div
        className="w-full h-full absolute left-0 bottom-0 z-10"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)",
        }}
      ></div>
    </div>
  )
}

export default React.memo(ImageCrossFade)