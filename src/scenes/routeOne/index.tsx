import React, { useState } from "react"
import SceneHeader from "@/shared/SceneHeader"

import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid"
import { motion, AnimatePresence } from "framer-motion"

interface PolicyItem {
  id: string
  question: string
  answer: string | (() => JSX.Element)
}

const RouteOne: React.FC = () => {
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({})

  const toggleOpen = (id: string): void => {
    setIsOpen(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }))
  }
  const PolicyItems: PolicyItem[] = [
    {
      id: "policy1",
      question: "What makes a lawn healthy?",
      answer: "Good soil, proper nutrients, water, and sunlight are key.",
    },
    {
      id: "policy2",
      question: "Why hire a professional lawn service?",
      answer: "We know what your lawn needs and when it needs it.",
    },
    {
      id: "policy3",
      question: "How often should lawn care happen?",
      answer: "We recommend weekly or bi-weekly during the growing season.",
    },
    {
      id: "policy4",
      question: "What can I do to help my lawn?",
      answer: "Water properly and avoid cutting the grass too short.",
    },
    {
      id: "policy5",
      question: "How do you care for palm trees?",
      answer: "We trim only as needed to keep palms healthy and clean.",
    },
    {
      id: "policy6",
      question: "What’s the right way to prune shrubs?",
      answer: "We shape shrubs carefully to promote healthy growth.",
    },
    {
      id: "policy7",
      question: "What else affects lawn health?",
      answer: "Things like soil compaction, pests, and traffic all matter.",
    },
  ]

  return (
    <section
      id="routeone"
      className="relative isolate overflow-hidden  min-h-[100vh] pb-12 sm:pb-24 w-full px-5"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-neutral-200/10 ring-1 shadow-xl shadow-neutral-600/10 ring-neutral-200 sm:-mr-80 lg:-mr-96"
      />
      {/* HEADER--------- */}
      <div className="sm:mx-auto sm:text-center">
        {" "}
        <SceneHeader
          sceneTitle="Tips & FAQ"
          tagline="Lawn care advice and answers to common questions"
        />
      </div>

      <div className="w-full h-[1px] bg-neutral-300 mt-8 sm:mt-16  sm:w-5/6 mx-auto"></div>

      {/* WAIVERS======================================================= */}

      <div className="w-full flex flex-col sm:w-5/6 font-quest text-gray-200 text-base md:text-lg mx-auto">
        {PolicyItems.map(item => (
          <div key={item.id} className="flex flex-col">
            <button
              onClick={() => toggleOpen(item.id)}
              className="flex items-center justify-between w-full text-left py-5 sm:py-6 px-2"
            >
              <span
                className={`${
                  isOpen[item.id] ? "text-zinc-700" : "text-zinc-700"
                } transition-all duration-200 font-semibold`}
              >
                {item.question}
              </span>
              {isOpen[item.id] ? (
                <MinusIcon className="w-5 h-5 text-zinc-700" />
              ) : (
                <PlusIcon className="w-5 h-5 text-zinc-700" />
              )}
            </button>
            <AnimatePresence>
              {isOpen[item.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <p className="pb-4 px-2 text-zinc-700">
                    {typeof item.answer === "function"
                      ? item.answer()
                      : item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="w-full h-[1px] bg-neutral-300"></div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RouteOne
