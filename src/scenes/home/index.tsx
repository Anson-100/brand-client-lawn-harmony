import { SelectedPage } from "@/shared/types"
import { motion } from "framer-motion"
import useMediaQuery from "@/hooks/useMediaQuery"

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const Home = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)")

  return (
    <section id="home" className="h-full relative isolate">
      <motion.div
        className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
        onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
      >
        {/* HEADER===================================================================================== */}
        {isAboveMediumScreens ? (
          // DESKTOP SECTION================================================================

          <div></div>
        ) : (
          // MOBILE SECTION================================================================
          <div></div>
        )}
      </motion.div>
    </section>
  )
}

export default Home
