'use client'

import { useState } from "react";
import ThreeJSBackground from "../background/sceneBackground";
import ContactForm from "./contactUs";
import Loading from "../loading";


export default function ContactPage() {
    const [loaded, setLoaded] = useState(true)
    return (
        <div className="flex flex-col justify-center items-center h-auto 3xl:h-screen w-full">
            <ThreeJSBackground setLoaded={setLoaded}/>
            {loaded ? 
                <>
                    <p className="font-bold md:text-3xl 2xl:text-5xl  text-white mt-72 md:mt-44 2xl:mt-72 3xl:m-0 bg-[rgba(1,1,1,0.1)] px-4 py-2 rounded-full backdrop-blur-xl ">Get in touch with us </p>
                    <ContactForm />
                </>
            : <Loading/>}
   
        </div>
    )
}