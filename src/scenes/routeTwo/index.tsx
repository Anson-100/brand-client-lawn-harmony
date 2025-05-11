import { useState, useEffect } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"
import SceneHeader from "@/shared/SceneHeader"
import useGetCloudContent from "@/hooks/useGetCloudContent"

import { SelectedPage } from "@/shared/types"

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const RouteTwo = ({ setSelectedPage }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  let touchStartX = 0
  let touchEndX = 0

  const { content, isLoading } = useGetCloudContent("gallery")

  const prevSlide = () => {
    let slideCount = 0
    let i = 0

    while (i < preloadedImages.length) {
      if (
        preloadedImages[i].status === "before" &&
        i + 1 < preloadedImages.length &&
        preloadedImages[i + 1].status === "after"
      ) {
        i += 2
      } else {
        i += 1
      }
      slideCount++
    }

    setCurrentIndex(prev => (prev === 0 ? slideCount - 1 : prev - 1))
  }

  const [preloadedImages, setPreloadedImages] = useState<
    { name: string; url: string; status: string; description?: string }[]
  >([])

  useEffect(() => {
    if (!content?.galleryImages) return

    const loadImages = async () => {
      const baseUrl = "https://d3vtu67wrzzshd.cloudfront.net/gallery-photos"
      const cacheBuster = `?v=${Date.now()}`

      const loaded = await Promise.all(
        content.galleryImages.map(
          async (img: {
            name: string
            status: string
            description?: string
          }) => {
            const url = `${baseUrl}/${img.name}${cacheBuster}`

            try {
              const res = await fetch(url, { method: "HEAD" })
              if (res.ok) {
                return {
                  name: img.name,
                  url,
                  status: img.status,
                  description: img.description,
                }
              }
            } catch {
              // try next extension if needed
            }
            return {
              name: img.name,
              url: `${baseUrl}/placeholder.png`,
              status: img.status,
              description: img.description,
            }
          }
        )
      )

      setPreloadedImages(loaded)
    }

    loadImages()
  }, [content])

  const nextSlide = () => {
    let slideCount = 0
    let i = 0

    while (i < preloadedImages.length) {
      if (
        preloadedImages[i].status === "before" &&
        i + 1 < preloadedImages.length &&
        preloadedImages[i + 1].status === "after"
      ) {
        i += 2
      } else {
        i += 1
      }
      slideCount++
    }

    setCurrentIndex(prev => (prev === slideCount - 1 ? 0 : prev + 1))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].clientX
    if (touchStartX - touchEndX > 50) {
      nextSlide()
    } else if (touchStartX - touchEndX < -50) {
      prevSlide()
    }
  }

  if (isLoading)
    return <div className="p-10 text-center text-lg">Loading gallery...</div>

  return (
    <section
      id="routetwo"
      className="relative isolate overflow-hidden min-h-[100vh]"
    >
      <motion.div
        className="min-h-[100vh] pb-12 sm:pb-24 w-full"
        onViewportEnter={() => setSelectedPage(SelectedPage.RouteTwo)}
      >
        {/* HEADER */}
        <div className="sm:mx-auto sm:text-center px-5">
          <SceneHeader
            sceneTitle="Gallery"
            tagline="Making the area greener every day"
          />
        </div>
        {/* CAROUSEL */}
        <div
          className="relative mx-auto mt-10 my-auto sm:mt-10 xl:mt-12 w-full max-w-4xl overflow-hidden sm:rounded-md"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {(() => {
              const slides: JSX.Element[] = []
              let i = 0

              while (i < preloadedImages.length) {
                const currentImg = preloadedImages[i]
                let secondImg = null

                if (
                  currentImg.status === "before" &&
                  i + 1 < preloadedImages.length
                ) {
                  const nextImg = preloadedImages[i + 1]
                  if (nextImg.status === "after") {
                    secondImg = nextImg
                    i += 2
                  } else {
                    i += 1
                  }
                } else {
                  i += 1
                }

                const groupIndex = slides.length

                slides.push(
                  <div
                    key={groupIndex}
                    className="flex-shrink-0 w-full min-w-full flex flex-col sm:flex-row gap-2 px-2"
                  >
                    <div className="flex-1">
                      <div
                        className={`overflow-hidden rounded ${
                          secondImg
                            ? "aspect-[3/2] sm:aspect-[5/6]"
                            : "aspect-[3/4] sm:aspect-[5/3]"
                        }`}
                      >
                        <div className="relative w-full h-full">
                          <img
                            src={currentImg.url}
                            alt={currentImg.name}
                            className="w-full h-full object-cover"
                          />
                          {currentImg.status !== "single" && (
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-2 py-1 rounded-full border border-gray-300/60">
                              <span className="flex items-center gap-1 px-1">
                                {currentImg.status === "before"
                                  ? "Before"
                                  : "After"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {secondImg && (
                      <div className="flex-1">
                        <div className="aspect-[3/2] sm:aspect-[5/6] overflow-hidden rounded">
                          <div className="relative w-full h-full">
                            <img
                              src={secondImg.url}
                              alt={secondImg.name}
                              className="w-full h-full object-cover"
                            />
                            {secondImg.status !== "single" && (
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-2 py-1 rounded-full border border-gray-300/60">
                                <span className="flex items-center gap-1 px-1">
                                  {secondImg.status === "before"
                                    ? "Before"
                                    : "After"}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              return slides
            })()}
          </div>
          {/* DESCRIPTION========================== */}
          <div className="mt-4 px-2 text-center">
            {(() => {
              let slideIndex = 0
              let i = 0
              let description = ""

              while (i < preloadedImages.length) {
                const currentImg = preloadedImages[i]
                // @ts-ignorenp
                let secondImg: {
                  name: string
                  url: string
                  status: string
                  description?: string
                } | null = null

                if (
                  currentImg.status === "before" &&
                  i + 1 < preloadedImages.length &&
                  preloadedImages[i + 1].status === "after"
                ) {
                  secondImg = preloadedImages[i + 1]
                  i += 2
                } else {
                  i += 1
                }

                if (slideIndex === currentIndex) {
                  const descriptionKey =
                    currentImg.status === "before"
                      ? currentImg.name
                      : currentImg.name
                  description =
                    preloadedImages.find(img => img.name === descriptionKey)
                      ?.description || ""
                  break
                }
                slideIndex++
              }

              return description ? (
                <p className="text-neutral-600 ">{description}</p>
              ) : (
                <p className="text-transparent italic">.</p>
              )
            })()}
          </div>

          {/* Left Button */}
          <button
            className="absolute top-1/2 left-2 sm:left-4 hover:cursor-pointer transform -translate-y-1/2 bg-gray-800/30 hover:bg-gray-900/80 text-white p-2 rounded-full sm:border border-gray-400/40"
            onClick={prevSlide}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          {/* Right Button */}
          <button
            className="absolute top-1/2 right-2 sm:right-4 hover:cursor-pointer transform -translate-y-1/2 bg-gray-800/30 hover:bg-gray-900/80 text-white p-2 rounded-full sm:border border-gray-400/40"
            onClick={nextSlide}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
        {/* CLICKABLE SLIDING INDICATOR */}
        <div className="mt-6 flex flex-col items-center">
          {/* Current position text */}
          <div className="text-sm text-neutral-600 mb-2">
            {currentIndex + 1} /{" "}
            {(() => {
              let slideCount = 0
              let i = 0
              while (i < preloadedImages.length) {
                if (
                  preloadedImages[i].status === "before" &&
                  i + 1 < preloadedImages.length &&
                  preloadedImages[i + 1].status === "after"
                ) {
                  i += 2
                } else {
                  i += 1
                }
                slideCount++
              }
              return slideCount
            })()}
          </div>

          {/* Clickable sliding indicator bar */}
          <div
            className="w-full max-w-xs bg-neutral-300 h-3 rounded-full overflow-hidden relative cursor-pointer"
            onClick={e => {
              // Calculate which slide to jump to based on click position
              const rect = e.currentTarget.getBoundingClientRect()
              const x = e.clientX - rect.left // x position within the element
              const clickPositionRatio = x / rect.width

              // Get total slide count
              let slideCount = 0
              let i = 0
              while (i < preloadedImages.length) {
                if (
                  preloadedImages[i].status === "before" &&
                  i + 1 < preloadedImages.length &&
                  preloadedImages[i + 1].status === "after"
                ) {
                  i += 2
                } else {
                  i += 1
                }
                slideCount++
              }

              // Calculate target slide index and set it
              const targetIndex = Math.min(
                Math.floor(clickPositionRatio * slideCount),
                slideCount - 1
              )
              setCurrentIndex(targetIndex)
            }}
          >
            {(() => {
              let slideCount = 0
              let i = 0
              while (i < preloadedImages.length) {
                if (
                  preloadedImages[i].status === "before" &&
                  i + 1 < preloadedImages.length &&
                  preloadedImages[i + 1].status === "after"
                ) {
                  i += 2
                } else {
                  i += 1
                }
                slideCount++
              }

              const progress = (currentIndex / (slideCount - 1)) * 100

              return (
                <div
                  className="h-full bg-emerald-500 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              )
            })()}

            {/* Visual hover effect - shows a tooltip on hover */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-full group">
                <div className="hidden group-hover:block absolute -top-8 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Click to navigate
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default RouteTwo
