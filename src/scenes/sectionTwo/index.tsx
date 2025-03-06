import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"

import AboutImage from "@/assets/aboutImage.png"

const stats = [
  { value: "10+ years", label: "in business" },
  { value: "Sarasota & surrounding areas", label: "communities served" },
  { value: "5,000+", label: "lawns transformed" },
]

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const SectionTwo = ({ setSelectedPage }: Props) => {
  return (
    <section
      id="sectiontwo"
      className="min-h-full relative isolate overflow-hidden pt-32 xl:pt-40"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-neutral-200 ring-1 shadow-xl shadow-neutral-600/10 ring-neutral-300 sm:-mr-80 lg:-mr-96"
      />
      <motion.div
        className="overflow-hidden relative isolate"
        onViewportEnter={() => setSelectedPage(SelectedPage.SectionTwo)}
      >
        <div className="mx-auto max-w-7xl px-6 sm:mt-0 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h2 className="text-base/7 font-semibold text-zinc-600">
              About Us
            </h2>
            <p className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              Our mission
            </p>
            <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
              <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                <p className="text-xl/8 text-gray-600">
                  At Lawn Harmony, we believe a beautiful lawn brings people
                  together. With years of experience, a commitment to quality,
                  and a passion for transforming outdoor spaces, we make lawn
                  care effortless for our customers. Whether it’s weekly
                  maintenance or seasonal treatments, our team ensures your lawn
                  stays lush, healthy, and green year-round.
                </p>
                <p className="mt-10 max-w-xl text-base/7 text-gray-700">
                  Our mission is simple: provide top-quality lawn care with
                  unbeatable customer service—so you can enjoy your yard without
                  the hassle.
                </p>
              </div>
              <div className="lg:flex lg:flex-auto lg:justify-center">
                <dl className="w-64 space-y-8 xl:w-80">
                  {stats.map(stat => (
                    <div
                      key={stat.label}
                      className="flex flex-col-reverse gap-y-4"
                    >
                      <dt className="text-base/7 text-gray-600">
                        {stat.label}
                      </dt>
                      <dd className="text-5xl font-semibold tracking-tight text-gray-900">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Image section */}
        <div className="mt-32 sm:mt-40 ">
          <img
            alt=""
            src={AboutImage}
            className="aspect-5/2 w-full object-cover  grayscale"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default SectionTwo
