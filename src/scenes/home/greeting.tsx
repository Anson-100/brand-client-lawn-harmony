import { useState, useEffect } from "react"

const Greeting = () => {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const getGreeting = () => {
      const now = new Date()
      const hours = now.getHours() // Local time zone is automatically used

      if (hours < 12) {
        setGreeting("Welcome to Lawn Harmony")
      } else if (hours < 18) {
        setGreeting("Welcome to Lawn Harmony")
      } else {
        setGreeting("Welcome to Lawn Harmony")
      }
    }

    getGreeting() // Call on component load

    // Optional: Update the greeting every minute (live update)
    const interval = setInterval(getGreeting, 60000)
    return () => clearInterval(interval) // Clean up on unmount
  }, [])

  return (
    <p className="text-base font-semibold text-emerald-600 tracking-tight sm:hidden">
      {greeting}
    </p>
  )
}

export default Greeting
