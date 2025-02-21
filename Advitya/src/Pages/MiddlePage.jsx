"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"

const MiddlePage = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [key, setKey] = useState("")

  useEffect(() => {
    window.history.pushState(null, null, window.location.href)
    window.addEventListener("popstate", () => {
      window.history.pushState(null, null, window.location.href)
    })
  }, [])

  const validateKey = async () => {
    if (!key) return toast.error("Enter the key!")

    try {
      const response = await axios.post(
        "https://ieeeadvityaround-1-production.up.railway.app/game/unlock-next-riddle",
        {
          team_name: state.teamName,
          riddle_id: key,
        },
      )

      toast.success("Key validated! Redirecting...")
      navigate(`/riddle/${response.data.riddle_id}`, {
        state: { question: response.data.question, teamName: state.teamName },
      })
    } catch (error) {
      toast.error("Invalid key. Try again!")
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-10 blur-xl pointer-events-none">
        <span className="text-[20vw] font-bold text-white">IEEE</span>
      </div>
      <h1 className="text-3xl font-bold mb-4 z-10">📍 Go to This Location</h1>
      <p className="text-lg bg-white bg-opacity-10 px-4 py-2 rounded-lg z-10">{state.nextLocation}</p>
      <input
        type="text"
        placeholder="Enter Key"
        className="border border-white bg-black text-white p-3 my-4 w-64 text-center rounded-lg z-10"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button
        className="bg-white text-black px-6 py-3 rounded-lg font-semibold transition hover:bg-gray-200 z-10"
        onClick={validateKey}
      >
        Submit Key 🔑
      </button>
    </div>
  )
}

export default MiddlePage

