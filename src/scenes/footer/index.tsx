import AnchorLink from "react-anchor-link-smooth-scroll"
import { SelectedPage } from "@/shared/types"
import { Link } from "react-router-dom"
import LinkFooter from "./LinkFooter"
import LogoLinkFooter from "./LogoLinkFooter"
import IconFB from "@/assets/IconFB.svg"
import IconInsta from "@/assets/IconInsta.svg"
import IconTikTok from "@/assets/IconTikTok.svg"
import IconYT from "@/assets/IconYT.svg"

type Props = {
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage) => void
}

const Footer = ({ selectedPage, setSelectedPage }: Props) => {
  return (
    <footer className="bg-neutral-700 flex flex-col">
      <AnchorLink
        className="z-10 w-full bg-neutral-800 hover:bg-neutral-900 py-3 font-semibold text-center text-gray-200 "
        onClick={() => setSelectedPage(SelectedPage.Home)}
        href={`#${SelectedPage.Home}`}
      >
        back to top
      </AnchorLink>

      <div className="mx-auto max-w-7xl flex flex-col items-center overflow-hidden px-6 pt-10 pb-10 sm:pb-12 sm:pt-10 lg:px-8">
        <LogoLinkFooter />
        <nav
          aria-label="Footer"
          className="-mb-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-sm/6 mt-4"
        >
          <LinkFooter
            scrollTo={SelectedPage.SectionOne}
            displayText="Services"
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />

          <LinkFooter
            scrollTo={SelectedPage.SectionTwo}
            displayText="About Us"
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />

          <LinkFooter
            scrollTo={SelectedPage.SectionThree}
            displayText="Testimonials"
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />

          <LinkFooter
            scrollTo={SelectedPage.ContactUs}
            displayText="Contact Us"
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />

          <Link
            to="/routeOne"
            onClick={() => {
              sessionStorage.setItem("selectedPage", "routeone")
            }}
            className=" text-gray-200 group flex items-center justify-center"
          >
            <p className="group-hover:underline">Sign In</p>

            <span className="ml-1 text-zinc-500 text-lg">&rarr;</span>
          </Link>
        </nav>
        <div className="mt-16 flex justify-center gap-x-10">
          <a
            href="https://www.instagram.com/ohiofitnessandmartialarts/"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100"
          >
            <img src={IconInsta} alt="Instagram" className="w-8 h-8" />
          </a>
          <a
            href="https://www.facebook.com/ofma5425/"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100"
          >
            <img src={IconFB} alt="Facebook" className="w-8 h-8" />
          </a>
          <span className="opacity-80 hover:opacity-100">
            <img
              src={IconYT}
              alt="YouTube"
              className="w-8 h-8 hover:cursor-pointer"
            />
          </span>
          <span className="opacity-80 hover:opacity-100">
            <img
              src={IconTikTok}
              alt="TikTok"
              className="w-8 h-8 hover:cursor-pointer"
            />
          </span>
        </div>
        <p className="mt-10 text-center text-sm/6 text-gray-400">
          &copy; 2025 Lawn Harmony LLC. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
