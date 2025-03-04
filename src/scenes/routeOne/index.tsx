import React from "react"
import useMediaQuery from "@/hooks/useMediaQuery"

const RouteOne: React.FC = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)")

  return (
    <section
      id="routeone"
      className="flex flex-col items-center min-h-[100svh] py-16 w-[90%] md:w-5/6 mx-auto relative isolate overflow-hidden"
    >
      {/* HEADER===================================================================================== */}
      {isAboveMediumScreens ? (
        // DESKTOP SECTION================================================================

        <div></div>
      ) : (
        // MOBILE SECTION================================================================
        <div></div>
      )}
    </section>
  )
}

export default RouteOne
