import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import LinkDesktop from "./LinkDesktop"
import LinkMobile from "./LinkMobile"
import LogoLinkNav from "./LogoLinkNav"

import {
  Bars2Icon,
  XMarkIcon,
  HomeIcon,
  PaperAirplaneIcon,
  WrenchScrewdriverIcon,
  UserCircleIcon,
  StarIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid"

import { PhoneIcon } from "@heroicons/react/24/outline"

import { SelectedPage } from "@/shared/types"
import useMediaQuery from "@/hooks/useMediaQuery"

type Props = {
  isTopOfPage: boolean
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage) => void
}

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
  const flexBetween = "flex items-center justify-between"
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false)
  const isAboveMediumScreens = useMediaQuery("(min-width: 1300px)")

  const navbarBackground = isTopOfPage ? "bg-neutral-100" : "bg-neutral-100"

  const menuRef = useRef<HTMLDivElement>(null)
  const location = useLocation() // Get the current route

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuToggled(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Check if the current route is `/waivers`
  const isRouteOne = location.pathname === "/routeOne"

  return (
    <nav className="">
      <div
        className={`${navbarBackground} ${flexBetween} border-b border-neutral-300 fixed border-t-[5px] border-t-neutral-700 top-0 z-30 w-full max-w-full backdrop-blur-md h-[84px]`}
      >
        <div className={`${flexBetween} mx-auto w-full px-4 sm:px-0 sm:w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/* LEFT SIDE */}
            <LogoLinkNav />

            {/* RIGHT SIDE */}
            {isRouteOne ? (
              // Simplified Navbar for Waivers Page
              <div>
                <Link
                  to="/"
                  onClick={() => {
                    setSelectedPage(SelectedPage.Home)
                    sessionStorage.setItem("selectedPage", "home")
                  }}
                  className="flex items-center font-semibold text-zinc-800 justify-center gap-2 py-2 px-4 m-2  hover:bg-neutral-300 rounded-md border border-neutral-300"
                >
                  <div className=" text-zinc-500 text-lg">&larr;</div>
                  Home{" "}
                </Link>
              </div>
            ) : isAboveMediumScreens ? (
              // FULL NAV ITEMS=================================================================================
              <div className={`${flexBetween} gap-8`}>
                <div
                  className={`${flexBetween} gap-4 text-md  my-2 pl-4 pr-2 rounded-lg`}
                >
                  <LinkDesktop
                    scrollTo={SelectedPage.Home}
                    displayText="Home"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />

                  <LinkDesktop
                    scrollTo={SelectedPage.SectionOne}
                    displayText="Services"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />

                  <LinkDesktop
                    scrollTo={SelectedPage.SectionTwo}
                    displayText="About Us"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />

                  <LinkDesktop
                    scrollTo={SelectedPage.SectionThree}
                    displayText="Testimonials"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />

                  <LinkDesktop
                    scrollTo={SelectedPage.ContactUs}
                    displayText="Contact Us"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />

                  <div className="h-6 w-[1px] mb-1 bg-zinc-600"></div>
                  <Link
                    to="/routeOne"
                    onClick={() => {
                      sessionStorage.setItem("selectedPage", "routeone")
                    }}
                    className="flex items-center font-semibold text-zinc-800 justify-center gap-2 py-2 px-4 m-2  hover:bg-neutral-300 rounded-md border border-neutral-300"
                  >
                    Customer Sign In
                    <div className=" text-neutral-500 text-lg">&rarr;</div>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 px-4 py-2 text-zinc-400  rounded-lg hover:bg-zinc-100 transition"
                >
                  <PhoneIcon className="w-6 h-6" />
                </a>

                <button
                  className="rounded-full p-2 hover:cursor-pointer"
                  onClick={() => setIsMenuToggled(!isMenuToggled)}
                >
                  {!isMenuToggled ? (
                    <Bars2Icon className="w-6 text-zinc-500" />
                  ) : (
                    <XMarkIcon className="w-6 text-zinc-500" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div
          ref={menuRef}
          className={`fixed mt-[83px] top-0 right-0 w-full md:w-1/3 sm:rounded-bl-md overflow-hidden z-40 bg-neutral-100 transition-opacity  border-b sm:border-l border-neutral-300 ${
            isMenuToggled ? "h-auto opacity-100" : "h-0 opacity-0"
          }`}
        >
          {/* MENU ITEMS */}
          <div className="mt-2 flex flex-col items-center text-lg z-50 mx-2">
            <>
              <LinkMobile
                scrollTo={SelectedPage.Home}
                displayText="Home"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                toggleMenu={() => setIsMenuToggled(false)}
                Icon={HomeIcon}
              />

              <LinkMobile
                scrollTo={SelectedPage.SectionOne}
                displayText="Services"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                toggleMenu={() => setIsMenuToggled(false)}
                Icon={WrenchScrewdriverIcon}
              />

              <LinkMobile
                scrollTo={SelectedPage.SectionTwo}
                displayText="About Us"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                toggleMenu={() => setIsMenuToggled(false)}
                Icon={InformationCircleIcon}
              />

              <LinkMobile
                scrollTo={SelectedPage.SectionThree}
                displayText="Testimonials"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                toggleMenu={() => setIsMenuToggled(false)}
                Icon={StarIcon}
              />

              <LinkMobile
                scrollTo={SelectedPage.ContactUs}
                displayText="Contact Us"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                toggleMenu={() => setIsMenuToggled(false)}
                Icon={PaperAirplaneIcon}
              />
              <div className="w-11/12 h-[1px] bg-neutral-300 my-2"></div>
              <div className="w-full mb-4">
                <Link
                  to="/routeOne"
                  onClick={() => {
                    sessionStorage.setItem("selectedPage", "routeone")
                    setIsMenuToggled(false)
                  }}
                  className="font-semibold pt-4 pb-2 w-full sm:w-5/6 px-4 mx-auto flex items-center text-zinc-500 hover:text-zinc-600"
                >
                  <UserCircleIcon className="h-5 w-5 mr-4" />
                  <p>
                    Sign In{" "}
                    <span className="text-neutral-400 text-lg">&rarr;</span>
                  </p>
                </Link>
              </div>
            </>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
