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
  DocumentTextIcon,
} from "@heroicons/react/24/solid"

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
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)")

  const navbarBackground = isTopOfPage ? "bg-neutral-700" : "bg-neutral-700"

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
        className={`${navbarBackground} ${flexBetween} fixed border-t-[5px] border-t-zinc-700 top-0 z-30 w-full max-w-full border-b-[1px] border-zinc-700 backdrop-blur-md bg-opacity-80 h-[84px]`}
      >
        <div className={`${flexBetween} mx-auto w-5/6`}>
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
                  className="flex items-center justify-center gap-2 py-2 px-4 m-2 bg-neutral-800 hover:bg-neutral-700 rounded-md border border-neutral-500"
                >
                  <div className="font-semibold text-zinc-500 text-lg">
                    &larr;
                  </div>
                  Home{" "}
                </Link>
              </div>
            ) : isAboveMediumScreens ? (
              // FULL NAV ITEMS=================================================================================
              <div className={`${flexBetween} gap-8`}>
                <div
                  className={`${flexBetween} gap-4 text-md bg-neutral-800 my-2 pl-4 pr-2 rounded-lg`}
                >
                  <LinkDesktop
                    scrollTo={SelectedPage.Home}
                    displayText="Home"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />

                  <LinkDesktop
                    scrollTo={SelectedPage.SectionOne}
                    displayText="Section 1"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />

                  <LinkDesktop
                    scrollTo={SelectedPage.SectionTwo}
                    displayText="Section 2"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />

                  <LinkDesktop
                    scrollTo={SelectedPage.SectionThree}
                    displayText="Section 3"
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
                    className="flex items-center justify-center gap-2 py-2 px-4 m-2 bg-neutral-800 hover:bg-neutral-700 rounded-md border border-neutral-500"
                  >
                    Route One
                    <div className="font-semibold text-neutral-500 text-lg">
                      &rarr;
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <button
                className="rounded-full p-2"
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                {!isMenuToggled ? (
                  <Bars2Icon className="w-6 text-gray-400" />
                ) : (
                  <XMarkIcon className="w-6 text-gray-400" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div
          ref={menuRef}
          className={`mobile-menu fixed mt-[60px] top-0 right-0 w-3/4 max-w-[350px] sm:w-1/3 z-40 bg-neutral-800 rounded-l-md transition-all duration-300 ${
            isMenuToggled ? "h-auto" : "h-0"
          }`}
        >
          {/* MENU ITEMS */}
          <div className="flex flex-col items-center text-lg z-50">
            <>
              <LinkMobile
                scrollTo={SelectedPage.Home}
                displayText="Home"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                toggleMenu={() => setIsMenuToggled(false)}
                Icon={HomeIcon}
              />

              <div className="w-full h-[1px] bg-zinc-700 m-auto" />

              <LinkMobile
                scrollTo={SelectedPage.SectionOne}
                displayText="Section 1"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                toggleMenu={() => setIsMenuToggled(false)}
                Icon={HomeIcon}
              />

              <div className="w-full h-[1px] bg-zinc-700 m-auto" />

              <LinkMobile
                scrollTo={SelectedPage.SectionTwo}
                displayText="Section 2"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                toggleMenu={() => setIsMenuToggled(false)}
                Icon={HomeIcon}
              />

              <div className="w-full h-[1px] bg-zinc-700 m-auto" />

              <LinkMobile
                scrollTo={SelectedPage.SectionThree}
                displayText="Section 3"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                toggleMenu={() => setIsMenuToggled(false)}
                Icon={HomeIcon}
              />

              <div className="w-full h-[1px] bg-zinc-700 m-auto" />

              <LinkMobile
                scrollTo={SelectedPage.ContactUs}
                displayText="Contact Us"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                toggleMenu={() => setIsMenuToggled(false)}
                Icon={PaperAirplaneIcon}
              />

              <div className="w-full h-[1px] bg-zinc-700 m-auto" />
              <Link
                to="/routeOne"
                onClick={() => {
                  sessionStorage.setItem("selectedPage", "routeone")
                  setIsMenuToggled(false)
                }}
                className="py-8 px-4 w-full pl-10 bg-zinc-700 flex items-center rounded-bl-md text-gray-300"
              >
                <DocumentTextIcon className="h-6 w-6 mr-4 text-gray-300" />
                <p>
                  RouteOne{" "}
                  <span className="text-emerald-theme text-lg">&rarr;</span>
                </p>
              </Link>
            </>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
