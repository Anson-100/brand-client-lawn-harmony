import { motion } from "framer-motion"

import HomeAdminEditor from "./HomeAdminEditor"
import useAuth from "@/auth/useAuth"
import { useNavigate, Navigate } from "react-router-dom"

import Greeting from "./Greeting"

const AdminDashboard = () => {
  // Load from localStorage on first render
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return <Navigate to="/dev-login" replace />

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("cognito_id_token")
    localStorage.removeItem("selectedSection")
    localStorage.removeItem("selectedTourSlug")
    navigate("/dev-login")
  }

  return (
    <section className="min-h-screen relative isolate overflow-hidden">
      <div className="flex w-full items-center justify-end p-2">
        <button
          onClick={handleLogout}
          className="rounded  bg-gray-500 text-white px-4 py-2 font-semibold hover:bg-gray-600 shadow-md hover:cursor-pointer"
        >
          Log Out
        </button>
      </div>
      <motion.div className="relative mt-32 isolate px-4  mx-auto">
        <Greeting />
        <h1 className="text-4xl font-bold mt-4">Manage your site content</h1>

        <div className="py-12">
          <p className="font-semibold text-2xl pb-4">Gallery Section</p>
          <div className="rounded-lg border border-dashed border-gray-400 bg-gray-100">
            <HomeAdminEditor />
          </div>
        </div>
      </motion.div>{" "}
      <div className="mt-24 flex justify-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:cursor-pointer w-full px-6 py-2  border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-100 font-semibold"
        >
          ↑ Back to Top
        </button>
      </div>
    </section>
  )
}

export default AdminDashboard
