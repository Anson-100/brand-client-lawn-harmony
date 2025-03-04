import { Link } from "react-router-dom"
import AnchorLink from "react-anchor-link-smooth-scroll"
import ITLogo from "@/assets/logoMain.png"

const LogoLinkFooter: React.FC = () => {
  const isHomePage = window.location.pathname === "/"
  const lowerCasePage = "home"

  const LogoImage: React.FC = () => (
    <img src={ITLogo} alt="Logo Main" className="h-20 md:h-32 py-2 grayscale" />
  )

  return isHomePage ? (
    // Smooth scroll anchor link for home page
    <AnchorLink href={`#${lowerCasePage}`}>
      <LogoImage />
    </AnchorLink>
  ) : (
    // Regular Link component for other pages
    <Link
      to="/"
      onClick={() => {
        sessionStorage.setItem("selectedPage", lowerCasePage)
      }}
    >
      <LogoImage />
    </Link>
  )
}

export default LogoLinkFooter
