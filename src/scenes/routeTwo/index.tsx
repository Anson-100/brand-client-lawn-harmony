import SceneHeader from "@/shared/SceneHeader"
import { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

import niceHouseNiceGrass from "@/assets/niceHouseNiceGrass.jpg"
import wateringLawn from "@/assets/wateringLawn.jpg"
import weedWhacking from "@/assets/weedWhacking.jpg"
import dogPoopSign from "@/assets/dogPoopSign.jpg"
import grassLevel from "@/assets/grassLevel.jpg"

const images = [
  niceHouseNiceGrass,
  wateringLawn,
  weedWhacking,
  dogPoopSign,
  grassLevel,
]

const RouteTwo: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  let touchStartX = 0
  let touchEndX = 0

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // Handle touch events for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].clientX
    if (touchStartX - touchEndX > 50) {
      nextSlide() // Swipe Left → Next Slide
    } else if (touchStartX - touchEndX < -50) {
      prevSlide() // Swipe Right → Previous Slide
    }
  }

  return (
    <section
      id="routetwo"
      className="relative isolate overflow-hidden pt-24 min-h-[100vh] sm:pt-32 pb-12 sm:pb-24 w-full"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-neutral-200/10  ring-1 shadow-xl shadow-neutral-600/20 ring-neutral-200 sm:-mr-80 lg:-mr-96"
      />

      {/* HEADER */}
      <div className="sm:mx-auto sm:text-center px-5">
        <SceneHeader
          sceneTitle="Gallery"
          tagline="Transforming lawns, one yard at a time"
        />
      </div>

      {/* CAROUSEL */}
      <div
        className="relative mx-auto mt-10 sm:mt-16 w-full max-w-4xl overflow-hidden dark-shadow sm:rounded-md"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full min-w-full">
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-[350px] sm:h-[500px] object-cover shadow-md"
              />
            </div>
          ))}
        </div>

        {/* Left Button */}
        <button
          className="absolute top-1/2 left-4 hover:cursor-pointer transform -translate-y-1/2 bg-gray-800/50 hover:bg-gray-900/80 text-white p-2 rounded-full sm:border border-gray-400/40"
          onClick={prevSlide}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        {/* Right Button */}
        <button
          className="absolute top-1/2 right-4 hover:cursor-pointer transform -translate-y-1/2 bg-gray-800/50 hover:bg-gray-900/80 text-white p-2 rounded-full sm:border border-gray-400/40"
          onClick={nextSlide}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-3 w-3 rounded-full cursor-pointer transition-all ${
                currentIndex === index
                  ? "bg-neutral-100 border-neutral-900 border"
                  : "bg-neutral-700 border-neutral-900 border-2"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RouteTwo
