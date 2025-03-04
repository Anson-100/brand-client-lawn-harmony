import { SelectedPage } from "@/shared/types"
import AnchorLink from "react-anchor-link-smooth-scroll"

type Props = {
  scrollTo: SelectedPage // The actual target ID for scrolling
  displayText: string // The text shown in the UI
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage) => void
}

const LinkDesktop = ({
  scrollTo,
  displayText,
  selectedPage,
  setSelectedPage,
}: Props) => {
  return (
    <AnchorLink
      className={`mt-1 pb-1 px-1 mx-2 border-b-[1px] ${
        selectedPage === scrollTo
          ? "border-b-[1px] border-emerald-theme"
          : "text-zinc-300 border-transparent hover:border-zinc-700"
      }`}
      href={`#${scrollTo}`} // Now scrolling is based on `scrollTo`
      onClick={() => setSelectedPage(scrollTo)}
    >
      {displayText} {/* Displaying user-friendly text */}
    </AnchorLink>
  )
}

export default LinkDesktop
