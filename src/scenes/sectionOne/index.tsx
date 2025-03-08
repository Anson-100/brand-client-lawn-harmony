import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"

import ServiceImage from "@/assets/serviceImage.png"

import SceneHeader from "@/shared/SceneHeader"

import {
  FunnelIcon,
  HomeModernIcon,
  BugAntIcon,
} from "@heroicons/react/20/solid"

const features = [
  {
    name: "Lawn Mowing & Maintenance.",
    description:
      "Regular mowing, edging, and trimming to keep your lawn looking pristine.",
    icon: HomeModernIcon,
  },
  {
    name: "Weed Control & Fertilization.",
    description:
      "Customized treatments to eliminate weeds and promote lush, healthy grass.",
    icon: BugAntIcon,
  },
  {
    name: "Aeration & Overseeding.",
    description:
      "Improving soil health and thickening your lawn for stronger, greener grass.",
    icon: FunnelIcon,
  },
]

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const SectionOne = ({ setSelectedPage }: Props) => {
  return (
    <section
      id="sectionone"
      className="overflow-hidden relative isolate py-24 xl:py-40 min-h-full"
    >
      <motion.div
        className="mx-auto max-w-7xl px-5 lg:px-8 "
        onViewportEnter={() => setSelectedPage(SelectedPage.SectionOne)}
      >
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-bottom-right skew-x-[30deg] bg-neutral-200 ring-1 shadow-xl shadow-neutral-600/10 ring-neutral-300 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pt-4 lg:pl-4">
            <div className="lg:max-w-lg">
              <SceneHeader
                sceneTitle="Services"
                tagline="Lawn care made easy. Results you can see."
              />
              <p className="mt-6 text-lg/8 text-gray-600 hidden sm:inline-block">
                A well-maintained lawn isn’t just about looks—it’s about
                creating a healthy, thriving outdoor space. Our expert team
                ensures your yard stays green, lush, and weed-free, so you can
                enjoy a beautiful lawn without the hassle.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map(feature => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute top-1 left-1 w-5 text-zinc-600"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="flex items-start justify-end lg:order-first">
            <img
              alt="Product screenshot"
              src={ServiceImage}
              width={2432}
              height={1442}
              className="w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem] grayscale"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default SectionOne
