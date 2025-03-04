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
    <footer className="bg-neutral-800">
      <div className="w-full flex flex-col items-center pb-4">
        {" "}
        <AnchorLink
          className="z-10 w-full bg-neutral-900 hover:bg-neutral-950 py-3 text-center text-gray-300 "
          onClick={() => setSelectedPage(SelectedPage.Home)}
          href={`#${SelectedPage.Home}`}
        >
          back to top
        </AnchorLink>
        <div className="flex flex-col justify-center items-center gap-6 pt-6">
          <div className="flex  items-center justify-center gap-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <LogoLinkFooter />

              <div className="flex items-center gap-4 justify-center">
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
            </div>

            <div className="flex gap-4 items-center justify-center">
              <div className="flex flex-col gap-4">
                <LinkFooter
                  scrollTo={SelectedPage.SectionOne}
                  displayText="Section 1"
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />

                <LinkFooter
                  scrollTo={SelectedPage.SectionTwo}
                  displayText="Section 2"
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />

                <LinkFooter
                  scrollTo={SelectedPage.SectionThree}
                  displayText="Section 3"
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
                  className=" text-gray-200 hover:underline flex items-center justify-center"
                >
                  Route One
                  <span className="ml-1 text-emerald-theme text-lg">
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            {" "}
            {/* <p className="logo text-xl font-dmsans font-bold text-gray-50 text-center mb-2">
              Ohio Fitness & Martial Arts
            </p> */}
            <p className="text-center text-gray-500 text-sm md:text-base">
              ©2025 Your Company. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
