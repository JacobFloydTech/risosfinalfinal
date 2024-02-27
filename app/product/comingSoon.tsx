'use client'
import Loading from "../loading"
import ThreeJSBackground from "../background/sceneBackground"
import { useState } from "react"
export default function ComingSoon() {
    const [loaded, setLoaded] = useState(true)
    
    return (
        <div className="flex w-full flex-col overflow-y-hidden h-screen items-center justify-center">
   
            {loaded ? 
            <p className="uppercase text-white font-bold  text-lg px-4 md:text-5xl">Coming soon...</p> : <Loading/> }


        </div>
    )
}