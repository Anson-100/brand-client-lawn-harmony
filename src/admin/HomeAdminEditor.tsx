import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import useGetCloudContent from "@/hooks/useGetCloudContent"

import useCompressImageUpload from "@/hooks/useCompressImageUpload"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

type GalleryImage = {
  name: string
  status: string
  description?: string
}

// Helper to generate consistent filenames
const generateFilename = (
  status: "single" | "before" | "after",
  sharedTimestamp?: number
) => {
  const timestamp = sharedTimestamp ?? Date.now()
  return `${status}-${timestamp}.jpg`
}

const HomeAdminEditor = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  let touchStartX = 0
  let touchEndX = 0

  const { content, isLoading } = useGetCloudContent("gallery")
  const [isBeforeAfter, setIsBeforeAfter] = useState(true)
  const [uploadKeys, setUploadKeys] = useState<{ [dropzone: string]: string }>(
    {}
  )

  // LOGIC FOR CMS STUFF====================================
  const [stagedImages, setStagedImages] = useState<{
    [key: string]: File | null
  }>({})
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)
  const [dragOverKey, setDragOverKey] = useState<string | null>(null)
  const { compressImage } = useCompressImageUpload()
  const [beforeAfterTimestamp, setBeforeAfterTimestamp] = useState<
    number | null
  >(null)

  const [formData, setFormData] = useState<{ galleryImages: GalleryImage[] }>({
    galleryImages: [],
  })

  const uploadToS3 = async (file: File, filename: string) => {
    const compressed = await compressImage(file)

    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve((reader.result as string).split(",")[1])
      reader.onerror = reject
      reader.readAsDataURL(compressed)
    })

    const res = await fetch(
      "https://wdblvkpth9.execute-api.us-east-1.amazonaws.com/dev/tour-images",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: "home",
          filename,
          fileBase64: base64,
        }),
      }
    )

    if (!res.ok) throw new Error(`Upload failed for ${filename}`)
  }

  const deleteFromS3 = async (filename: string) => {
    const res = await fetch(
      "https://wdblvkpth9.execute-api.us-east-1.amazonaws.com/dev/delete-image",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: "home", filename }),
      }
    )

    if (!res.ok) throw new Error(`Failed to delete ${filename}`)
  }

  const saveUpdatedJson = async (galleryImages: GalleryImage[]) => {
    const res = await fetch(
      "https://wdblvkpth9.execute-api.us-east-1.amazonaws.com/dev/tour-json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { galleryImages } }), // <-- wrap galleryImages inside a data object
      }
    )

    if (!res.ok) throw new Error("Failed to update JSON file")
  }

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    dropzoneKey: string
  ) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return

    let filename = dropzoneKey
    let now = Date.now()

    if (isBeforeAfter) {
      if (!beforeAfterTimestamp) {
        setBeforeAfterTimestamp(now)
      } else {
        now = beforeAfterTimestamp
      }
    }

    if (dropzoneKey.startsWith("upload")) {
      if (isBeforeAfter) {
        if (dropzoneKey === "upload-0")
          filename = generateFilename("before", now)
        if (dropzoneKey === "upload-1")
          filename = generateFilename("after", now)
      } else {
        filename = generateFilename("single", now)
      }
    }

    setStagedImages(prev => ({ ...prev, [filename]: file }))
    setUploadKeys(prev => ({ ...prev, [dropzoneKey]: filename }))
  }

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    let filename = key
    let now = Date.now()

    if (isBeforeAfter) {
      if (!beforeAfterTimestamp) {
        setBeforeAfterTimestamp(now)
      } else {
        now = beforeAfterTimestamp
      }
    }

    if (key.startsWith("upload")) {
      // New file for a dropzone
      if (isBeforeAfter) {
        if (key === "upload-0") filename = generateFilename("before", now)
        if (key === "upload-1") filename = generateFilename("after", now)
      } else {
        filename = generateFilename("single", now)
      }

      setUploadKeys(prev => ({ ...prev, [key]: filename }))
      setStagedImages(prev => ({ ...prev, [filename]: file }))
    } else {
      // Stage replacement image
      setStagedImages(prev => ({ ...prev, [filename]: file }))
    }
  }

  const handleReplace = (key: string) => {
    document.getElementById(`replace-input-${key}`)?.click()
  }

  const handleDelete = (filename: string) => {
    const filenamesToDelete = [filename]

    // Check if the image is part of a before/after pair
    if (filename.startsWith("before-") || filename.startsWith("after-")) {
      const timestamp = filename.split("-")[1].replace(".jpg", "")
      const pairedFilename = filename.startsWith("before-")
        ? `after-${timestamp}.jpg`
        : `before-${timestamp}.jpg`

      // Only add paired filename if it exists in preloadedImages
      if (preloadedImages.some(img => img.name === pairedFilename)) {
        filenamesToDelete.push(pairedFilename)
      }
    }

    // Only add to imagesToDelete, don't remove from preloadedImages or formData yet
    setImagesToDelete(prev => [
      ...prev,
      ...filenamesToDelete.filter(f => !prev.includes(f)),
    ])
  }

  const handleCancelDelete = (filename: string) => {
    const filenamesToCancel = [filename]

    // If part of a before/after pair, cancel both
    if (filename.startsWith("before-") || filename.startsWith("after-")) {
      const timestamp = filename.split("-")[1].replace(".jpg", "")
      const pairedFilename = filename.startsWith("before-")
        ? `after-${timestamp}.jpg`
        : `before-${timestamp}.jpg`

      if (preloadedImages.some(img => img.name === pairedFilename)) {
        filenamesToCancel.push(pairedFilename)
      }
    }

    // Remove from imagesToDelete
    setImagesToDelete(prev => prev.filter(f => !filenamesToCancel.includes(f)))
  }

  const handleCancelReplace = (filename: string) => {
    setStagedImages(prev => {
      const newStagedImages = { ...prev }
      delete newStagedImages[filename]
      return newStagedImages
    })
  }

  const handleCancelDropzone = (dropzoneKey: string) => {
    setUploadKeys(prev => {
      const newUploadKeys = { ...prev }
      delete newUploadKeys[dropzoneKey]
      return newUploadKeys
    })
    setStagedImages(prev => {
      const newStagedImages = { ...prev }
      if (uploadKeys[dropzoneKey]) {
        delete newStagedImages[uploadKeys[dropzoneKey]]
      }
      return newStagedImages
    })
    // Reset timestamp if clearing the first dropzone in Before/After mode
    if (dropzoneKey === "upload-0" && isBeforeAfter) {
      setBeforeAfterTimestamp(null)
    }
  }

  const handleSaveChanges = async () => {
    setIsUploading(true)
    setUploadMessage(null)

    if (isBeforeAfter) {
      const beforeKey = uploadKeys["upload-0"]
      const afterKey = uploadKeys["upload-1"]
      const hasBefore = beforeKey && stagedImages[beforeKey]
      const hasAfter = afterKey && stagedImages[afterKey]

      // Only block if exactly one of the two is present
      if ((hasBefore && !hasAfter) || (!hasBefore && hasAfter)) {
        setUploadMessage({
          type: "error",
          text: "Please upload both before and after images before saving.",
        })
        setIsUploading(false)
        return
      }
    }

    try {
      // 1. Delete images from S3
      for (const filename of imagesToDelete) {
        await deleteFromS3(filename)
      }

      const newGalleryImages: GalleryImage[] = []
      const updatedGalleryImages = [...formData.galleryImages]

      // 2. Upload staged images (including replacements)
      for (const [key, file] of Object.entries(stagedImages)) {
        if (!file) continue

        await uploadToS3(file, key)

        let status: "single" | "before" | "after" = "single"
        if (key.includes("before")) status = "before"
        else if (key.includes("after")) status = "after"
        else if (key.includes("upload-0"))
          status = isBeforeAfter ? "before" : "single"
        else if (key.includes("upload-1")) status = "after"

        // Check if this is a replacement
        const existingIndex = updatedGalleryImages.findIndex(
          img => img.name === key
        )
        if (existingIndex !== -1) {
          // Update existing image, preserve description
          updatedGalleryImages[existingIndex] = {
            name: key,
            status,
            description: updatedGalleryImages[existingIndex].description,
          }
        } else {
          // Add new image with an empty description
          newGalleryImages.push({
            name: key,
            status,
            description: status === "after" ? undefined : "", // Only "single" and "before" images get a description
          })
        }
      }

      // 3. Remove deleted images from galleryImages
      const finalGalleryImages = [
        ...updatedGalleryImages.filter(
          img =>
            !imagesToDelete.includes(img.name) &&
            !newGalleryImages.some(newImg => newImg.name === img.name)
        ),
        ...newGalleryImages,
      ]

      // 4. Save updated JSON
      await saveUpdatedJson(finalGalleryImages)

      // 5. Update preloadedImages to reflect deletions
      setPreloadedImages(prev =>
        prev.filter(img => !imagesToDelete.includes(img.name))
      )

      setUploadMessage({ type: "success", text: "All uploads complete!" })
      // Clear staged images and upload keys after saving
      setStagedImages({})
      setUploadKeys({})
      setImagesToDelete([])
      setBeforeAfterTimestamp(null)
    } catch (err) {
      setUploadMessage({ type: "error", text: String(err) })
    } finally {
      setIsUploading(false)
    }
  }
  // LOGIC FOR CAROUSEL AND IMAGE PULL STUFF================
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

    setFormData({ galleryImages: content.galleryImages })

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
              // fallthrough to placeholder
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
  // =======================================================================================
  // =======================================================================================
  // =======================================================================================

  return (
    <section
      id="routetwo"
      className="relative isolate overflow-hidden rounded-lg py-4"
    >
      <motion.div className="pb-12  w-full">
        {/* HEADER */}
        {/* <div className="sm:mx-auto sm:text-center px-5">
          <SceneHeader
            sceneTitle="Gallery"
            tagline="Transforming lawns, one yard at a time"
          />
        </div> */}

        {/* CAROUSEL */}
        <div className="text-center text-3xl font-semibold mb-6 mt-20">
          Replace or delete photos
        </div>
        <div
          className="relative mx-auto  my-auto w-full max-w-4xl overflow-hidden sm:rounded-md"
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
                            ? "aspect-[3/2] sm:aspect-auto sm:h-full"
                            : "aspect-[3/4] sm:aspect-[3/2]"
                        }`}
                      >
                        <div className="relative w-full h-full group">
                          <img
                            src={
                              stagedImages[currentImg.name]
                                ? URL.createObjectURL(
                                    stagedImages[currentImg.name] as File
                                  )
                                : currentImg.url
                            }
                            alt={currentImg.name}
                            className={`w-full h-full object-cover ${
                              imagesToDelete.includes(currentImg.name) ||
                              stagedImages[currentImg.name]
                                ? "opacity-50"
                                : ""
                            }`}
                          />
                          {imagesToDelete.includes(currentImg.name) ? (
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                              <p className="text-white text-sm font-semibold">
                                Click Save Changes to Delete
                              </p>
                              <button
                                className="mt-2 bg-white/80 text-black px-4 py-1 rounded hover:bg-gray-200"
                                onClick={() =>
                                  handleCancelDelete(currentImg.name)
                                }
                              >
                                Cancel
                              </button>
                            </div>
                          ) : stagedImages[currentImg.name] ? (
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                              <p className="text-white text-sm font-semibold">
                                Click Save Changes to Replace
                              </p>
                              <button
                                className="mt-2 bg-white/80 text-black px-4 py-1 rounded hover:bg-gray-200"
                                onClick={() =>
                                  handleCancelReplace(currentImg.name)
                                }
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                              <button
                                className="bg-white/80 text-black px-4 py-2 rounded hover:cursor-pointer hover:bg-gray-200"
                                onClick={() => handleReplace(currentImg.name)}
                              >
                                Replace
                              </button>
                              <input
                                id={`replace-input-${currentImg.name}`}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={e =>
                                  handleFileUpload(e, currentImg.name)
                                }
                              />
                              <button
                                className="bg-white/80 text-black px-4 py-2 rounded hover:cursor-pointer hover:bg-gray-200"
                                onClick={() => handleDelete(currentImg.name)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                          {currentImg.status !== "single" && (
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-2 py-1 rounded-full border border-gray-300/60">
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
                    {/* SECOND IMAGE CAROUSEL================= */}
                    {secondImg && (
                      <div className="flex-1">
                        <div className="aspect-[3/2] sm:aspect-auto sm:h-full overflow-hidden rounded">
                          <div className="relative w-full h-full group">
                            <img
                              src={
                                stagedImages[secondImg.name]
                                  ? URL.createObjectURL(
                                      stagedImages[secondImg.name] as File
                                    )
                                  : secondImg.url
                              }
                              alt={secondImg.name}
                              className={`w-full h-full object-cover ${
                                imagesToDelete.includes(secondImg.name) ||
                                stagedImages[secondImg.name]
                                  ? "opacity-50"
                                  : ""
                              }`}
                            />
                            {imagesToDelete.includes(secondImg.name) ? (
                              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                                <p className="text-white text-sm font-semibold">
                                  Click Save Changes to Delete
                                </p>
                                <button
                                  className="mt-2 bg-white/80 text-black px-4 py-1 rounded hover:bg-gray-200"
                                  onClick={() =>
                                    handleCancelDelete(secondImg.name)
                                  }
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : stagedImages[secondImg.name] ? (
                              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                                <p className="text-white text-sm font-semibold">
                                  Click Save Changes to Replace
                                </p>
                                <button
                                  className="mt-2 bg-white/80 text-black px-4 py-1 rounded hover:bg-gray-200"
                                  onClick={() =>
                                    handleCancelReplace(secondImg.name)
                                  }
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                                <button
                                  className="bg-white/80 text-black px-4 py-2 rounded hover:cursor-pointer hover:bg-gray-200"
                                  onClick={() => handleReplace(secondImg.name)}
                                >
                                  Replace
                                </button>
                                <input
                                  id={`replace-input-${secondImg.name}`}
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={e =>
                                    handleFileUpload(e, secondImg.name)
                                  }
                                />
                                <button
                                  className="bg-white/80 text-black px-4 py-2 rounded hover:cursor-pointer hover:bg-gray-200"
                                  onClick={() => handleDelete(secondImg.name)}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                            {secondImg.status !== "single" && (
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-2 py-1 rounded-full border border-gray-300/60">
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

          <div className="mt-4 px-4 text-center">
            {(() => {
              let slideIndex = 0
              let i = 0
              let description = ""
              let descriptionKey = ""

              while (i < preloadedImages.length) {
                const currentImg = preloadedImages[i]
                // @ts-ignore
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
                  descriptionKey =
                    currentImg.status === "before"
                      ? currentImg.name
                      : currentImg.name
                  description =
                    formData.galleryImages.find(
                      img => img.name === descriptionKey
                    )?.description || ""
                  break
                }
                slideIndex++
              }

              return (
                <>
                  {/* Edit the description */}
                  <textarea
                    className="w-full max-w-2xl mx-auto p-2 border rounded-md border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="Enter description for this slide..."
                    value={description}
                    onChange={e => {
                      setFormData(prev => ({
                        ...prev,
                        galleryImages: prev.galleryImages.map(img =>
                          img.name === descriptionKey
                            ? { ...img, description: e.target.value }
                            : img
                        ),
                      }))
                    }}
                  />
                </>
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

          {/* SLIDING BAR======================= */}
          <div
            className="w-full max-w-xs bg-white h-3 rounded-full overflow-hidden relative cursor-pointer"
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
                  className="h-full bg-neutral-800 transition-all duration-300 ease-out"
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

        {/* ADD IMAGES SECTION */}
        <div className="mt-24 max-w-4xl mx-auto px-4">
          <div className="text-center text-3xl font-semibold mb-4">
            Upload new photos
          </div>
          {/* Toggle */}
          <div className="flex items-center justify-center font-semibold mb-6">
            <span className="mr-3">Before/After</span>
            <button
              onClick={() => setIsBeforeAfter(!isBeforeAfter)}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition ${
                isBeforeAfter ? "bg-emerald-500" : "bg-gray-400"
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition ${
                  isBeforeAfter ? "translate-x-1" : "translate-x-6"
                }`}
              />
            </button>
            <span className="ml-3">Single</span>
          </div>

          {/* UPLOAD AREA=====================================*/}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* First Dropzone */}
            <div
              className={`bg-white overflow-hidden rounded ${
                isBeforeAfter
                  ? "aspect-[3/2] sm:aspect-square"
                  : "aspect-[3/4] sm:aspect-[2/1]"
              } relative flex-1 border-2 border-dashed ${
                dragOverKey === "upload-0"
                  ? "border-emerald-500 ring-4 ring-emerald-300"
                  : "border-gray-400"
              } flex flex-col justify-center items-center hover:border-emerald-500 hover:bg-emerald-50 cursor-pointer`}
              onDragOver={e => {
                e.preventDefault()
                setDragOverKey("upload-0")
              }}
              onDragLeave={() => setDragOverKey(null)}
              onDrop={e => {
                handleDrop(e, "upload-0")
                setDragOverKey(null)
              }}
            >
              {uploadKeys["upload-0"] &&
              stagedImages[uploadKeys["upload-0"]] ? (
                <>
                  <img
                    src={URL.createObjectURL(
                      stagedImages[uploadKeys["upload-0"]] as File
                    )}
                    alt="Uploaded preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute top-2 right-2 bg-white/80 text-black hover:cursor-pointer px-4 py-2 z-20 rounded hover:bg-gray-200"
                    onClick={() => handleCancelDropzone("upload-0")}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  <p className="text-sm text-gray-500">
                    Drag & Drop or Click to Upload
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={e => handleFileUpload(e, "upload-0")}
              />
            </div>

            {/* Second Dropzone if Before/After */}
            {isBeforeAfter && (
              <div
                className="bg-white overflow-hidden rounded aspect-[3/2] sm:aspect-square relative flex-1 border-2 border-dashed border-gray-400 flex flex-col justify-center items-center hover:border-emerald-500 hover:bg-emerald-50 cursor-pointer"
                onDragOver={e => {
                  e.preventDefault()
                  setDragOverKey("upload-1")
                }}
                onDragLeave={() => setDragOverKey(null)}
                onDrop={e => {
                  handleDrop(e, "upload-1")
                  setDragOverKey(null)
                }}
              >
                {uploadKeys["upload-1"] &&
                stagedImages[uploadKeys["upload-1"]] ? (
                  <>
                    <img
                      src={URL.createObjectURL(
                        stagedImages[uploadKeys["upload-1"]] as File
                      )}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 bg-white/80 z-20 text-black  px-4 py-2 rounded hover:bg-gray-200"
                      onClick={() => handleCancelDropzone("upload-1")}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-center items-center">
                    <p className="text-sm text-gray-500">
                      Drag & Drop or Click to Upload
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={e => handleFileUpload(e, "upload-1")}
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>
      {uploadMessage && (
        <div className="w-full flex">
          <div
            className={`mb-2 px-2 bg-white rounded border mx-auto text-center py-2 font-semibold ${
              uploadMessage.type === "success"
                ? "text-green-700 border-green-700"
                : "text-red-700 border-red-700"
            }`}
          >
            {uploadMessage.text}
          </div>
        </div>
      )}
      <div className="px-4">
        <button
          onClick={handleSaveChanges}
          disabled={isUploading}
          className={`w-full text-white font-medium py-2 rounded hover cursor-pointer ${
            isUploading ? "bg-gray-400" : "bg-emerald-500 hover:bg-emerald-600"
          }`}
        >
          {isUploading ? "Uploading..." : "Save Changes"}
        </button>
      </div>
    </section>
  )
}

export default HomeAdminEditor
