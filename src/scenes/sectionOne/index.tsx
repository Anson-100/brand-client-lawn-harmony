import { useEffect } from "react"
import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"
import SceneHeader from "@/shared/SceneHeader"

// import MobileTile from "@/components/MobileTile"

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const services = [
  {
    name: "Lawn fertilization",
    role: "Scheduled feeding plans to strengthen roots and promote lush growth",
    imageUrl:
      "https://images.unsplash.com/photo-1700547492500-92fbcc77fa70?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    xUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Soil & pH balancing",
    role: "Test and treat soil to improve nutrient absorption and turf performance",
    imageUrl:
      "https://images.unsplash.com/photo-1712842964271-872137967f59?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    xUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Weed & crabgrass control",
    role: "Eliminate invasive weeds and prevent new growth with targeted treatments",
    imageUrl:
      "https://images.unsplash.com/photo-1714608578706-0f1ac2543f59?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    xUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Shrub shaping & pruning",
    role: "Maintain clean lines and healthy growth with expert pruning and detail work",
    imageUrl:
      "https://images.unsplash.com/photo-1606690133836-418d8143a231?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    xUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Palm trimming & cleanup",
    role: "Professional palm care, frond removal, and storm-prep trimming",
    imageUrl:
      "https://images.unsplash.com/photo-1535392432937-a27c36ec07b5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    xUrl: "#",
    linkedinUrl: "#",
  },

  {
    name: "Outdoor pest control",
    role: "Targeted treatment to eliminate lawn pests and protect plant life",
    imageUrl:
      "https://images.unsplash.com/photo-1702623945459-d2ebfec1ca31?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    xUrl: "#",
    linkedinUrl: "#",
  },
]

const SectionOne = ({ setSelectedPage }: Props) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement
      if (!clickedElement.closest(".skills-mobile")) {
        // setTileStates({})
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <section
      id="sectionone"
      className="min-h-[100vh] overflow-hidden relative isolate"
    >
      <motion.div
        className="pb-24 sm:pb-32"
        onViewportEnter={() => setSelectedPage(SelectedPage.SectionOne)}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SceneHeader
            sceneTitle="Services"
            tagline="Lawn care made easy. Results you can see."
          />

          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {services.map(service => (
              <li key={service.name}>
                <img
                  alt=""
                  src={service.imageUrl}
                  className="aspect-3/2 w-full rounded-2xl object-cover"
                />
                <h3 className="mt-6 text-lg/8 font-semibold tracking-tight text-gray-900">
                  {service.name}
                </h3>
                <p className="text-base/7 text-gray-600">{service.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}

export default SectionOne
