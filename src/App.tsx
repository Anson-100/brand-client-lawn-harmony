import Navbar from "@/scenes/navbar"
import Home from "@/scenes/home"
import SectionOne from "@/scenes/sectionOne"
import SectionTwo from "@/scenes/sectionTwo"
import SectionThree from "@/scenes/sectionThree"
import ContactUs from "@/scenes/contactUs"
import RouteOne from "@/scenes/routeOne"
import RouteTwo from "@/scenes/routeTwo"
import AdminDashboard from "@/admin/AdminDashboard"
import LoginPortal from "@/admin/LoginPortal"
import LineGradient from "@/components/LineGradient"
import Footer from "@/scenes/footer"

import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { SelectedPage } from "@/shared/types"

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  )
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true)
        setSelectedPage(SelectedPage.Home)
      }
      if (window.scrollY !== 0) setIsTopOfPage(false)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Router>
      <div className="app bg-black dark:bg-grayish">
        {!location.pathname.startsWith("/admin") &&
          !location.pathname.startsWith("/dev-login") && (
            <Navbar
              isTopOfPage={isTopOfPage}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          )}

        <Routes>
          {/* Main Scrollable Page */}
          <Route
            path="/"
            element={
              <>
                <Home setSelectedPage={setSelectedPage} />
                <LineGradient />

                <SectionOne setSelectedPage={setSelectedPage} />
                <LineGradient />
                <SectionTwo setSelectedPage={setSelectedPage} />
                <LineGradient />

                <SectionThree setSelectedPage={setSelectedPage} />
                <LineGradient />

                <RouteTwo setSelectedPage={setSelectedPage} />
                <LineGradient />

                <ContactUs setSelectedPage={setSelectedPage} />

                <Footer
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />
              </>
            }
          />

          {/* Standalone Route for FAQ and User Login */}
          <Route path="/faq" element={<RouteOne />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dev-login" element={<LoginPortal />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
