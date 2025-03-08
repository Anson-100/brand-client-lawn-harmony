import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"
import SceneHeader from "@/shared/SceneHeader"

const featuredTestimonial = {
  body: "Lawn Harmony completely transformed our yard! The team was professional, efficient, and truly passionate about their work. Our lawn has never looked better!",
  author: {
    name: "Brenna Goyette",
    handle: "Sarasota",
    imageUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80",
    logoUrl:
      "https://tailwindcss.com/plus-assets/img/logos/savvycal-logo-gray-900.svg",
  },
}

const testimonials = [
  [
    [
      {
        body: "Lawn Harmony turned my overgrown backyard into a paradise! The crew was on time, professional, and left everything spotless. Highly recommend!",
        author: {
          name: "Leslie Alexander",
          handle: "Bradenton",
          imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      {
        body: "Amazing service! Lawn Harmony designed and installed a beautiful landscape for our front yard. The attention to detail was outstanding.",
        author: {
          name: "Mark Robertson",
          handle: "Sarasota",
          imageUrl:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
    ],
    [
      {
        body: "We’ve used several landscaping companies before, but Lawn Harmony is by far the best. Our lawn is always lush and green thanks to their maintenance services!",
        author: {
          name: "Lindsay Walton",
          handle: "Lakewood Ranch",
          imageUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
    ],
  ],
  [
    [
      {
        body: "Top-notch lawn care! They take care of everything, from mowing to fertilization, and my lawn has never looked healthier.",
        author: {
          name: "Tom Cook",
          handle: "Sarasota",
          imageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
    ],
    [
      {
        body: "Incredible results! Our backyard was a mess, and Lawn Harmony turned it into an outdoor retreat. Couldn’t be happier!",
        author: {
          name: "Leonard Krasner",
          handle: "Bradenton",
          imageUrl:
            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      {
        body: "Lawn Harmony made our dream lawn a reality. Their landscaping and design services are top-tier!",
        author: {
          name: "Ryan Mitchell",
          handle: "Sarasota",
          imageUrl:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
    ],
  ],
]

export { featuredTestimonial, testimonials }

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const SectionThree = ({ setSelectedPage }: Props) => {
  return (
    <section
      id="sectionthree"
      className="relative isolate  pt-24 pb-32 sm:pt-32 w-full"
    >
      {/* =============================================== */}
      <motion.div
        className="mx-auto max-w-7xl px-5 lg:px-8"
        onViewportEnter={() => setSelectedPage(SelectedPage.SectionThree)}
      >
        <div className="sm:mx-auto sm:text-center">
          {" "}
          <SceneHeader
            sceneTitle="Testimonials"
            tagline="What your neighbors are saying"
          />
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm/6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
          <figure className="rounded-2xl bg-white ring-1 shadow-lg ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
            <blockquote className="p-6 text-lg font-semibold tracking-tight text-gray-900 sm:p-12 sm:text-xl/8">
              <p>{`“${featuredTestimonial.body}”`}</p>
            </blockquote>
            <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
              <img
                alt=""
                src={featuredTestimonial.author.imageUrl}
                className="w-10 flex-none rounded-full bg-gray-50 grayscale"
              />
              <div className="flex-auto">
                <div className="font-semibold">
                  {featuredTestimonial.author.name}
                </div>
                <div className="text-gray-600">{`${featuredTestimonial.author.handle}`}</div>
              </div>
              {/* <img
                alt=""
                src={featuredTestimonial.author.logoUrl}
                className="w-auto flex-none"
              /> */}
            </figcaption>
          </figure>
          {testimonials.map((columnGroup, columnGroupIdx) => (
            <div
              key={columnGroupIdx}
              className="space-y-8 xl:contents xl:space-y-0"
            >
              {columnGroup.map((column, columnIdx) => (
                <div
                  key={columnIdx}
                  className={classNames(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                      (columnGroupIdx === testimonials.length - 1 &&
                        columnIdx === columnGroup.length - 1)
                      ? "xl:row-span-2"
                      : "xl:row-start-1",
                    "space-y-8"
                  )}
                >
                  {column.map(testimonial => (
                    <figure
                      key={testimonial.author.handle}
                      className="rounded-2xl bg-white p-6 ring-1 shadow-lg ring-gray-900/5"
                    >
                      <blockquote className="text-gray-900">
                        <p>{`“${testimonial.body}”`}</p>
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-x-4">
                        <img
                          alt=""
                          src={testimonial.author.imageUrl}
                          className="w-10 rounded-full bg-gray-50 grayscale"
                        />
                        <div>
                          <div className="font-semibold">
                            {testimonial.author.name}
                          </div>
                          <div className="text-gray-600">{`${testimonial.author.handle}`}</div>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default SectionThree
