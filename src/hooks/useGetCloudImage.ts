import { useEffect, useState } from "react"

const BASE_DOMAIN = "https://d3vtu67wrzzshd.cloudfront.net"
const PLACEHOLDER = `${BASE_DOMAIN}/landing-photos/placeholder.png`
const EXTENSIONS = ["jpg", "jpeg", "png", "webp"]
const IMAGE_FOLDER = "gallery-photos"

const useGetCloudImage = (imageName: string) => {
  const [image, setImage] = useState<string>(PLACEHOLDER)

  useEffect(() => {
    const fetchImage = async () => {
      const folder = IMAGE_FOLDER
      const cacheBuster = `?v=${Date.now()}`

      for (const ext of EXTENSIONS) {
        const url = `${BASE_DOMAIN}/${folder}/${imageName}.${ext}${cacheBuster}`
        try {
          const res = await fetch(url, { method: "GET" })
          if (res.ok) {
            setImage(url)
            return
          }
        } catch (_) {
          // continue to next extension
        }
      }

      setImage(PLACEHOLDER)
    }

    if (imageName) fetchImage()
  }, [imageName])

  return image
}

export default useGetCloudImage
