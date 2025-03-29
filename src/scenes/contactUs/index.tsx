import { useState } from "react"
import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"
import { useForm, Controller } from "react-hook-form"

import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline"

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const ContactUs = ({ setSelectedPage }: Props) => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fullName = `${formState.firstName} ${formState.lastName}`
    const payload = {
      name: fullName,
      email: formState.email,
      phone: formState.phone,
      message: formState.message,
    }

    try {
      const res = await fetch(
        "https://m1ffj58tfe.execute-api.us-east-1.amazonaws.com/LawnHarmonySendEmail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )

      const data = await res.json()
      console.log("Form submitted successfully:", data.message)
    } catch (err) {
      console.error("Form submission error:", err)
    }
  }

  return (
    <section id="contactus" className="min-h-[100vh] relative isolate ">
      <motion.div
        className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2"
        onViewportEnter={() => setSelectedPage(SelectedPage.ContactUs)}
      >
        <div className="relative px-6 pt-24 pb-20 sm:py-36 xl:py-40 flex items-center lg:static lg:px-8">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-neutral-100 ring-1 ring-neutral-900/10 lg:w-1/2">
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full stroke-neutral-300 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              >
                <defs>
                  <pattern
                    x="100%"
                    y={-1}
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect fill="white" width="100%" height="100%" strokeWidth={0} />
                <svg
                  x="100%"
                  y={-1}
                  className="overflow-visible fill-neutral-200/60"
                >
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold tracking-tight text-zinc-600">
                Contact Us
              </h3>
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-zinc-900 sm:text-5xl">
                Get in Touch
              </h2>
            </div>

            <p className="mt-6 text-lg/8 text-gray-600">
              Have questions or need a quote? We're here to help with all your
              lawn and landscaping needs. Reach out by phone, email, or the form
              on this page and we’ll get back to you soon. We look forward to
              hearing from you!
            </p>
            <dl className="mt-10 space-y-4 text-base/7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <BuildingOffice2Icon
                    aria-hidden="true"
                    className="h-7 w-6 text-emerald-500"
                  />
                </dt>
                <dd>
                  555 Gulf of America Ave
                  <br />
                  Bradenton, FL 34208
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-emerald-500"
                  />
                </dt>
                <dd>
                  <a
                    href="tel:+1 (555) 234-5678"
                    className="hover:text-gray-900"
                  >
                    +1 (555) 555-5555
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-emerald-500"
                  />
                </dt>
                <dd>
                  <a
                    href="mailto:hello@example.com"
                    className="hover:text-gray-900"
                  >
                    customerservice@lawnharmony.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        {/* CONTACT FORM=================================================================== */}

        <form
          onSubmit={handleSubmit}
          className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 sm:py-36 xl:py-32 2xl:py-40 my-auto"
        >
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    value={formState.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-neutral-50 px-3.5 py-2 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm/6 font-semibold text-zinc-900"
                >
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    value={formState.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-neutral-50 px-3.5 py-2 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-semibold text-zinc-900"
                >
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="block w-full rounded-md bg-neutral-50 px-3.5 py-2 text-base text-zinc-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phone-number"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Phone number
                </label>
                <div className="mt-2.5">
                  <input
                    id="phone-number"
                    name="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    className="block w-full rounded-md bg-neutral-50 px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-neutral-50 px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="hover:cursor-pointer rounded-md bg-emerald-600 px-5 py-3 w-full sm:w-auto font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"
              >
                Send message
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </section>
  )
}

export default ContactUs
