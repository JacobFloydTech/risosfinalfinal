'use client'
import { useState } from "react"
import BentoGrid from "./bentoGrid"
import View3DModel from "./view3DModel"
import MissionGrid from "./mission"
import ThreeJSBackground from "../background/sceneBackground"
import Loading from "../loading"
export default function ProductContent() { 
const [loaded, setLoaded] = useState(true)
    return ( 
        <div className="overflow-hidden mt-44">

            {!loaded ? <Loading/> : <>
                <BentoGrid />
                <View3DModel />
                <MissionGrid />
            </>
            }
        </div>
    )
}